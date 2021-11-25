// Game data
const Player = {
		nickname: "",
		defaultNickname: "Invité",
		nicknameColor: null
	},
	HiddenWord = {
		originalWord: "", // Chosen word
		displayWord: "", // This is the word displayed on the page
		length: 0, // Word length
		tries: 0, // Number of tries
		foundLetters: [], // Found letters array
		invalidLetters: 0, // Number of errors
		currentLetterValidity: false, // Validity of the current proposed letter
		refreshSpan: () => {Container.gameContainer.querySelector("#HiddenWord").textContent = HiddenWord.displayWord}
	},
	Message = {
		alphaNumValue: "❌ Veuillez rentrer une valeur alphanumérique ci-dessus",
		requiredField: "❌ Ce champ est requis",
		onlyOneLetter: "❌ Ecrivez seulement une lettre",
		letterNotInWord: "⛔ Cette lettre n'est pas dans le mot !",
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
			setTimeout(() => {toggleDisplay(modal, "none")}, 200)
		}
	},
	Layer = {
		current: null,
		roundLayer: Overlay.overlay.querySelector(".RoundLayer"),
		roundPlayerLayer: Overlay.overlay.querySelector(".RoundPlayerLayer"),
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
		gameContainer: Main.children[2],
		restartGame: Main.querySelector(".RestartGameContainer")
	},
	Form = {sendMessage: Container.gameContainer.querySelector(".MessageForm")},
	Button = {
		openHostForm: Container.openHostForm.children[0],
		copyLink: Modal.hostForm.querySelector("#CopyLink"),
		startHostGame: Modal.hostForm.querySelector("#StartHostGame"),
		submitWord: Modal.submitWord.querySelector("#SubmitWord"),
		sendMessage: Form.sendMessage.querySelector("#SendMessage"),
		restart: Container.restartGame.querySelector("#RestartGame")
	},
	Input = {
		nickname: Container.nickname.querySelector("#NicknameInput"),
		maxRounds: Modal.hostForm.querySelector("#MaxRoundsInput"),
		maxPlayers: Modal.hostForm.querySelector("#MaxPlayersInput"),
		invitationLink: document.querySelector("#InvitationLinkInput"),
		submitWord: Modal.submitWord.querySelector("#WordInput"),
		message: Container.gameContainer.querySelector("#MessageInput")
	},
	Canvas = Container.gameContainer.querySelector("#Canvas"),
	JoinHelp = Main.querySelector(".JoinHelp"),
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
	startGame = (maxRounds, maxPlayers) => {
		// Show game content
		toggleDisplay(Container.gameContainer);
		Container.gameContainer.children[0].children[1].textContent = maxRounds;
		let i = 0;
		nextRound(i)
	},
	nextRound = (i, playerList) => {
		i++;
		// Display round number
		Container.gameContainer.children[0].children[0].textContent = i;
		Layer.roundLayer.children[0].textContent = i;
		Layer.roundPlayerLayer.children[0].textContent = Player.nickname;
		Layer.roundPlayerLayer.children[0].style.color = Player.nicknameColor;
		Container.gameContainer.querySelector("#HiddenWordAuthor").textContent = Player.nickname;
		// Show layers & word form
		setTimeout(() => {
			Overlay.show();
			Layer.show(Layer.roundLayer);
			setTimeout(() => {
				Layer.hide();
				setTimeout(() => {
					Modal.open(Modal.submitWord);
					Input.submitWord.focus()
				}, 400);
				/*Layer.roundPlayerLayer.classList.add("current");
				setTimeout(() => {
					Overlay.hide();
					setTimeout(() => {Layer.roundPlayerLayer.classList.remove("current")}, 200)
				}, 3000)*/
			}, 2000)
		}, 200)
	},
	randomHexColor = () => {
		let hex = "0123456789ABCDEF",
			color = "#";
		for (let i = 0; i < 6; i++) {
			color += hex[Math.floor(16 * Math.random())]
		};
		return color
	};

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
[Input.maxRounds, Input.maxPlayers].forEach((input) => {input.value = input.min});
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
document.documentElement.style.setProperty("--nickname-color-light", `${Player.nicknameColor}30`)