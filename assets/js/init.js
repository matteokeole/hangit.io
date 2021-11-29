// Game data
const Player = {
		nickname: "",
		defaultNickname: "Invité",
		nicknameColor: null,
		score: 0
	},
	Chat = {
		lastMessageSender: null
	},
	HiddenWord = {
		originalWord: "", // Chosen word
		displayWord: "", // This is the word displayed on the page
		length: 0, // Word length
		tries: 0, // Number of tries
		sentLetters: [], // Sent letters array
		sentWords: [], // Sent words array
		invalidInputs: 0, // Number of errors
		currentInputValidity: true, // Validity of the current proposed letter
		refreshSpan: () => {Container.gameContainer.querySelector("#HiddenWord").textContent = HiddenWord.displayWord}
	},
	Return = {
		tip: {
			joinGame: "Si vous voulez rejoindre une partie, demandez à l'hébergeur de vous envoyer un lien d'invitation.",
			invalidLink: "Ce lien n'est pas valide. Demandez à l'hébergeur de vous renvoyer un lien valide.",
			commandPrefix: "Précédez vos propositions de lettres et de mots par \"!\" pour qu'elles soient correctement interprétées."
		},
		eligibleChars: "❌ Le mot peut contenir uniquement des caractères alphabétiques, des espaces et des tirets (-).",
		invalidLetter: "⛔ Cette lettre n'est pas dans le mot !",
		invalidWord: "⛔ Ce n'est pas le bon mot !",
		gameOver: "🤕 Vous avez fait trop d'erreurs. Vous êtes pendu(e) !"
	},
	// DOM elements
	Overlay = {
		overlay: document.body.children[0],
		show: () => {
			Overlay.overlay.classList.add("displayed");
			Wrapper.classList.add("overlayed")
		},
		hide: () => {
			Overlay.overlay.classList.remove("displayed");
			Wrapper.classList.remove("overlayed")
		}
	},
	Modal = {
		current: null,
		hostForm: Overlay.overlay.querySelector(".HostFormModal"),
		submitWord: Overlay.overlay.querySelector(".SubmitWordModal"),
		open: (modal) => {
			// Show overlay & open requested modal
			Overlay.show();
			toggleDisplay(modal);
			setTimeout(() => {modal.classList.add("current")});
			Modal.current = modal
		},
		close: () => {
			// Close current opened modal & hide overlay
			Overlay.hide();
			let modal = Modal.current;
			if (modal) modal.classList.remove("current");
			Input.nickname.disabled=false;
			setTimeout(() => {toggleDisplay(modal, "none")}, 200)
		}
	},
	Layer = {
		current: null,
		round: Overlay.overlay.querySelector(".RoundLayer"),
		roundPlayer: Overlay.overlay.querySelector(".RoundPlayerLayer"),
		roundPlayerEnd: Overlay.overlay.querySelector(".RoundPlayerEndLayer"),
		show: (layer) => {
			// Show requested layer
			toggleDisplay(layer);
			setTimeout(() => {layer.classList.add("current")});
			Layer.current = layer
		},
		hide: () => {
			// Close current opened layer
			let layer = Layer.current;
			if (layer) layer.classList.remove("current");
			setTimeout(() => {toggleDisplay(layer, "none")}, 200)
		}
	},
	Wrapper = document.body.children[1],
	Main = Wrapper.children[1],
	Container = {
		nickname: Main.children[0],
		openHostForm: Main.children[1],
		joinGame: Main.children[2],
		gameContainer: Main.children[3],
		restartGame: Main.querySelector(".RestartGameContainer")
	},
	Form = {sendMessage: Container.gameContainer.querySelector(".MessageForm")},
	Button = {
		openHostForm: Container.openHostForm.children[0],
		joinGame: Container.joinGame.children[0],
		copyLink: Modal.hostForm.querySelector("#CopyLink"),
		startHostGame: Modal.hostForm.querySelector("#StartHostGame"),
		submitWord: Modal.submitWord.querySelector("#SubmitWord"),
		sendMessage: Form.sendMessage.querySelector("#SendMessage"),
		restart: Container.restartGame.querySelector("#RestartGame")
	},
	Input = {
		nickname: Container.nickname.querySelector("#NicknameInput"),
		maxRounds: Modal.hostForm.querySelector("#MaxRoundsInput"),
		invitationLink: document.querySelector("#InvitationLinkInput"),
		submitWord: Modal.submitWord.querySelector("#WordInput"),
		message: Container.gameContainer.querySelector("#MessageInput")
	},
	Canvas = Container.gameContainer.querySelector("#Canvas"),
	GameTip = Main.querySelector(".GameTip"),
	Word = Container.gameContainer.querySelector("#word"),
	GameEndTitle = Container.restartGame.querySelector(".RestartGameContainer h3"),
	PlayerList = Modal.hostForm.querySelector(".PlayerList"),
	MessageList = Container.gameContainer.querySelector(".MessageList"),
	RemainingTries = Container.gameContainer.querySelector(".RemainingTries"),
	// Functions
	toggleDisplay = (element, displayType = "block") => {
		// Change the element display value, "block" by default
		element.style.display = displayType
	},
	Round = {
		max: 0,
		currentIndex: 0,
		currentPlayerIndex: 0
	},
	playerList = ["bob", "pouet", "majel beddouze", "zemmour"],
	startGame = (maxRounds) => {
		// Start a new game (player max number = 4)
		// Show game content
		toggleDisplay(Container.gameContainer);
		Round.max = maxRounds;
		Container.gameContainer.children[0].children[1].textContent = Round.max;
		nextRound()
	},
	nextRound = () => {
		// Force next round
		Round.currentIndex++;
		if (Round.currentIndex > Round.max) {
			// All rounds finished, game ended
			toggleDisplay(Container.gameContainer, "none");
			toggleDisplay(Container.restartGame)
		} else {
			sendMessage(true, `Début du round ${Round.currentIndex} !`);
			// Display round number
			Container.gameContainer.children[0].children[0].textContent = Round.currentIndex;
			Layer.round.children[0].textContent = Round.currentIndex;
			// Show layers & word form
			setTimeout(() => {
				Overlay.show();
				Layer.show(Layer.round);
				setTimeout(() => {
					Layer.hide();
					setTimeout(nextRoundPlayer)
				}, 2000)
			}, 200)
		}
	},
	nextRoundPlayer = () => {
		// Force next round player
		if (Round.currentPlayerIndex == playerList.length) {
			// All players proposed a word, round finished
			// Reset current player index
			Round.currentPlayerIndex = 0;
			nextRound()
		} else {
			// Round not finished, increment player index
			Round.currentPlayerIndex++;
			// Clear player data
			HiddenWord.sentLetters = [];
			HiddenWord.sentWords = [];
			// Display round player number
			Layer.roundPlayer.children[0].textContent = Player.nickname;
			Layer.roundPlayer.children[0].style.color = Player.nicknameColor;
			Layer.roundPlayerEnd.children[0].textContent = Player.nickname;
			Layer.roundPlayerEnd.children[0].style.color = Player.nicknameColor;
			Container.gameContainer.querySelector("#HiddenWordAuthor").textContent = Player.nickname;
			// Show layers & word form
			setTimeout(() => {
				Overlay.show();
				if (Round.currentPlayerIndex != 1) {
					Layer.show(Layer.roundPlayerEnd);
					setTimeout(() => {
						Layer.hide();
						// Submit word modal
						setTimeout(() => {
							Modal.open(Modal.submitWord);
							Input.submitWord.focus()
						}, 400);
						// Waiting for submitted word layer
						/*setTimeout(() => {
							Layer.show(Layer.roundPlayer);
							setTimeout(() => {
								Layer.hide();
								Overlay.hide()
							}, 3000)
						}, 400)*/
					}, 2000)
				} else {
					// Round just started
					// Submit word modal
					setTimeout(() => {
						Modal.open(Modal.submitWord);
						Input.submitWord.focus()
					}, 200);
					// Waiting for submitted word layer
					/*setTimeout(() => {
						Layer.show(Layer.roundPlayer);
						setTimeout(() => {
							Layer.hide();
							Overlay.hide()
						}, 3000)
					}, 400)*/
				}
			}, 200)
		}
	},
	// Send/get data functions
	sendData = (mon, data) => {
		var r = new XMLHttpRequest();
		r.onreadystatechange = function() {
			if (r.readyState == 4) {
				if (r.status == 200) console.info(r.response);
				else console.error("Erreur du serveur")
			}
		}
		r.open("POST", "https://m2x.alwaysdata.net/hangit/server.php", true)
		r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		r.send(`${mon}=${data}`)
	},
	getData = (url) => {
		let r = new XMLHttpRequest(),data="";
		r.open("GET", url);
		r.onreadystatechange = () => {
			if (r.readyState == 4 && r.status == 200) {
				 data = r.responseText;
				// console.log(data);
				// return data;
				//console.info(data)
				updateResult(data);
			} else return "Erreur du serveur"
		}
		r.send();
	},
	randomHexColor = () => {
		let hex = "0123456789ABC",
			color = "#";
		for (let i = 0; i < 6; i++) {
			color += hex[Math.floor(13 * Math.random())]
		};
		return color
	},
	updateResult = (data) => {
		return data;	
	};
	let current_url = document.location.href;
	console.log(getData('https://luha.alwaysdata.net/api/'));
    //queue_url = current_url.substring(current_url.lastIndexOf("/") + 1);
// Event listeners
// Hide host form modal when Escape key pressed
addEventListener("keydown", (e) => {
	if (e.keyCode == 27 && Modal.hostForm.classList.contains("current")) Modal.close()
});
// Hide modal when cancel button clicked
document.querySelectorAll(".Modal .CancelButton").forEach((btn) => {
	btn.addEventListener("click", Modal.close)
});
// Input clearing & animations
[Input.nickname, Input.submitWord].forEach((input) => {
	// Clear input value
	input.value = "";
	// Focus animation
	input.addEventListener("focus", () => {input.classList.add("focused")});
	// Blur animation
	input.addEventListener("blur", () => {
		if (input.value.length == 0) input.classList.remove("focused")
	})
});
Input.maxRounds.value = Input.maxRounds.min;
// Display join game tip
GameTip.textContent = Return.tip.joinGame;
// Display last used nickname from local storage if it exists
if (localStorage.getItem("nickname")) {
	Input.nickname.value = localStorage.getItem("nickname");
	Input.nickname.classList.add("focused")
}
// Set new nickname color on player and nickname input
Player.nicknameColor = randomHexColor();
Input.nickname.style.borderColor = Player.nicknameColor;
Input.nickname.style.color = Player.nicknameColor;
Input.nickname.nextElementSibling.style.color = Player.nicknameColor;
// Set root variables for nickname color
document.documentElement.style.setProperty("--nickname-color", Player.nicknameColor);
document.documentElement.style.setProperty("--nickname-color-light", `${Player.nicknameColor}30`);
// Restart game
Button.restart.addEventListener("click", () => {location.href = ""})