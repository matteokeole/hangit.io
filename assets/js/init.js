// Game data
const Player = {
	nickname: "",
	defaultNickname: "Invité",
	nicknameColor: null,
	score: 0,
	role: null,
	status: "",
	inQueue: false,
	roundPlayer: false,
	foundIndex: 0
},
Game = {
	started: false,
	finished: false,
	scoresDisplayed: false
},
Round = {
	current: 0,
	max: 0,
	currentRoundPlayer: {
		nickname: "",
		nicknameColor: ""
	}
},
Chat = {lastMessageSender: null},
HiddenWord = {
	submitted: false, // Is the word submitted?
	originalWord: "", // Chosen word
	displayWord: "", // This is the word displayed on the page
	length: 0, // Word length
	tries: 0, // Number of tries
	sentLetters: [], // Sent letters array
	sentWords: [], // Sent words array
	invalidInputs: 0, // Number of errors
	currentInputValidity: true, // Validity of the current proposed letter
	refreshSpan: () => {
		// Reload hidden word span with the value of HiddenWord.displayWord
		Container.gameContainer.querySelector("#HiddenWord").textContent = HiddenWord.displayWord;
		resizeChat()
	}
},
Return = {
	tip: {
		joinGame: "ℹ️ Si vous voulez rejoindre une partie, demandez à l'hébergeur de vous envoyer un lien d'invitation.",
		invalidLink: "⚠️ Ce lien est invalide.<br>Demandez à l'hébergeur de vous renvoyer un autre lien ou <a href='https://matteoo34.github.io/hangit.io'>créez votre propre partie</a> !",
		commandPrefix: "ℹ️ Précédez vos propositions de lettres et de mots par \"!\" pour qu'elles soient interprétées.",
		finishedGame: "🚪 L'hébergeur a terminé la partie.<br><a href='https://matteoo34.github.io/hangit.io'>Actualisez la page</a> pour en commencer une nouvelle."
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
		if (!Game.finished) {
			Overlay.overlay.classList.add("displayed");
			Wrapper.classList.add("overlayed")
		}
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
	open: modal => {
		// Show overlay & open requested modal
		if (!Game.finished) {
			Overlay.show();
			toggleDisplay(modal);
			setTimeout(() => {modal.classList.add("current")});
			Modal.current = modal
		}
	},
	close: () => {
		// Close current opened modal & hide overlay
		Overlay.hide();
		let modal = Modal.current;
		Input.nickname.disabled = false;
		if (modal) {
			modal.classList.remove("current");
			setTimeout(() => {toggleDisplay(modal, "none")}, 200)
		}
	}
},
Layer = {
	current: null,
	round: Overlay.overlay.querySelector(".RoundLayer"),
	roundPlayer: Overlay.overlay.querySelector(".RoundPlayerLayer"),
	show: layer => {
		// Show requested layer
		if (!Game.finished) {
			toggleDisplay(layer);
			setTimeout(() => {layer.classList.add("current")});
			Layer.current = layer
		}
	},
	hide: () => {
		// Close current opened layer
		let layer = Layer.current;
		if (layer) {
			layer.classList.remove("current");
			setTimeout(() => {toggleDisplay(layer, "none")}, 200)
		}
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
ChatContainer = Container.gameContainer.querySelector(".ChatContainer"),
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
ReadyPlayersList = Modal.hostForm.querySelector(".ReadyPlayersList"),
ConnectedPlayersList = Container.gameContainer.querySelector(".ConnectedPlayersList"),
ScorePlayersList = Container.restartGame.querySelector(".ScoreList"),
MessageList = Container.gameContainer.querySelector(".MessageList"),
RemainingTries = Container.gameContainer.querySelector(".RemainingTries"),
// Functions
toggleDisplay = (element, displayType = "block") => {
	// Change the element display value, "block" by default
	element.style.display = displayType
},
startGame = () => {
	// Start a new game (max player number = 4)
	// Close active containers & modals
	Modal.close();
	toggleDisplay(Container.nickname, "none");
	toggleDisplay(Container.openHostForm, "none");
	toggleDisplay(Container.joinGame, "none");

	// Show game content
	toggleDisplay(Container.gameContainer, "flex");
	GameTip.textContent = Return.tip.commandPrefix;
	resizeChat();
	Game.started = true;
	Layer.roundPlayer.children[0].textContent = Round.currentRoundPlayer.nickname;
	Layer.roundPlayer.children[0].style.color = Round.currentRoundPlayer.nicknameColor;
	Container.gameContainer.querySelector(".HiddenWordContainer").children[0].children[0].textContent = Round.currentRoundPlayer.nickname;
	Container.gameContainer.querySelector(".HiddenWordContainer").children[0].style.color = Round.currentRoundPlayer.nicknameColor;
	Container.gameContainer.querySelector(".CanvasContainer").children[0].style.color = Round.currentRoundPlayer.nicknameColor;
	if (Player.nickname == Round.currentRoundPlayer.nickname) {
		// Current round player
		// Submit word modal
		setTimeout(() => {
			Overlay.show();
			Layer.show(Layer.round);
			setTimeout(() => {
				Layer.hide();
				setTimeout(() => {
					Modal.open(Modal.submitWord);
					Input.submitWord.focus()
				}, 400)
			}, 2000)
		}, 200)
	} else {
		// Waiting for submitted word layer
		setTimeout(() => {
			Overlay.show();
			Layer.show(Layer.round);
			setTimeout(() => {
				Layer.hide();
				setTimeout(() => {
					if (!HiddenWord.submitted) Layer.show(Layer.roundPlayer);
					else Overlay.hide()
				}, 400)
			}, 2000)
		}, 200)
	}
},
endGame = () => {
	// End the current game for all users
	toggleDisplay(Container.gameContainer, "none");
	toggleDisplay(GameTip, "none");
	toggleDisplay(Container.restartGame, "flex")
},
// Send/get data functions
sendData = (property, data) => {
	let r = new XMLHttpRequest();
	r.onreadystatechange = () => {
		if (r.readyState == 4) {
			if (r.status != 200) console.error("Server error");
			// else console.info(`[sendData] ${r.response}`)
		}
	}
	r.open("POST", "https://m2x.alwaysdata.net/hangit/server.php", true);
	r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	r.send(`url=${invitationLink}&${property}=${data}`)
},
sendDatabasePlayer = (nickname, color) => {
	let r = new XMLHttpRequest(),
		roundPlayer = false;
	if (Player.role == "host") roundPlayer = true;
	r.onreadystatechange = () => {
		if (r.readyState == 4) {
			if (r.status != 200) console.error("Server error");
			// else console.info(`[sendDatabasePlayer] ${r.response}`)
		}
	}
	r.open("POST", "https://m2x.alwaysdata.net/hangit/server.php", true);
	r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	r.send(`url=${invitationLink}&nickname=${nickname}&color=${color}&roundPlayer=${roundPlayer}`)
},
sendHiddenWord = word => {
	// Send the hidden word to the database
	let r = new XMLHttpRequest();
	r.onreadystatechange = () => {
		if (r.readyState == 4) {
			if (r.status != 200) console.error("Server error");
			// else console.info(`[sendHiddenWord] ${r.response}`)
		}
	}
	r.open("POST", "https://m2x.alwaysdata.net/hangit/server.php", true);
	r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	r.send(`url=${invitationLink}&word=${word}&player=${Player.nickname}`)
},
sendDatabaseMessage = (msg, authorName) => {
	// Send a message to the database
	let r = new XMLHttpRequest();
	r.onreadystatechange = () => {
		if (r.readyState == 4) {
			if (r.status != 200) console.error("Server error");
			// else console.info(`[sendDatabaseMessage] ${r.response}`)
		}
	}
	r.open("POST", "https://m2x.alwaysdata.net/hangit/server.php", true);
	r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	r.send(`url=${invitationLink}&message=${msg}&authorName=${authorName}`)
},
sendPlayerScore = (nickname, foundIndex) => {
	// Change the score of the specified player
	let r = new XMLHttpRequest();
	r.onreadystatechange = () => {
		if (r.readyState == 4) {
			if (r.status != 200) console.error("Server error");
			// else console.info(`[sendPlayerScore] ${r.response}`)
		}
	}
	r.open("POST", "https://m2x.alwaysdata.net/hangit/server.php", true);
	r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	r.send(`url=${invitationLink}&nickname=${nickname}&foundIndex=${foundIndex}`)
},
sendWordFound = (nickname, wordFound) => {
	// Set a found word value for the specified player
	let r = new XMLHttpRequest();
	r.onreadystatechange = () => {
		if (r.readyState == 4) {
			if (r.status != 200) console.error("Server error");
			// else console.info(`[sendWordFound] ${r.response}`)
		}
	}
	r.open("POST", "https://m2x.alwaysdata.net/hangit/server.php", true);
	r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	r.send(`url=${invitationLink}&nickname=${nickname}&wordFound=${wordFound}`)
},
clearData = () => {
	if (
		localStorage.getItem("clearGameRole") &&
		localStorage.getItem("clearGameNickname") &&
		localStorage.getItem("clearGameLink")
	) {
		let role = localStorage.getItem("clearGameRole"),
			nickname = localStorage.getItem("clearGameNickname"),
			link = localStorage.getItem("clearGameLink"),
			r = new XMLHttpRequest();
		r.open("POST", "https://m2x.alwaysdata.net/hangit/server.php", true);
		r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		if (role == "host") {
			// Clear all current game data
			r.send(`url=${link}&clearGame=1&nickname=${nickname}`)
		} else {
			// Clear only current guest data
			r.send(`url=${link}&clearGuestData=1&nickname=${nickname}`)
		}
	}
},
randomHexColor = () => {
	let hex = "0123456789ABC",
		color = "#";
	for (let i = 0; i < 6; i++) {
		color += hex[Math.floor(13 * Math.random())]
	};
	return color
},
htmlDecode = input => {
	let test = document.createElement("div");
	test.innerHTML = input;
	return test.childNodes[0].nodeValue
},
resizeChat = () => {
	let height = 0;
	if (innerHeight <= 600) height = 200;
	else height = document.querySelector(".GameInnerContainer3").offsetHeight;
	ChatContainer.style.height = `${height}px`
};



let current_url = location.href,
invitationLink = null;

// Detect if there is local storage data
clearData();

// Input clearing & animations
[Input.nickname, Input.submitWord].forEach(input => {
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

// Event listeners

// Window resize function on load & resize
addEventListener("load", resizeChat);
addEventListener("resize", resizeChat);

// Closing window triggers clearData()
addEventListener("beforeunload", () => {
	localStorage.setItem("clearGameRole", Player.role);
	localStorage.setItem("clearGameNickname", Player.nickname);
	localStorage.setItem("clearGameLink", invitationLink);
	clearData()
})