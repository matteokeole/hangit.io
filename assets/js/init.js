// Game data
const Player = {
		nickname: "",
		defaultNickname: "Invité",
		nicknameColor: null
	},
	HiddenWord = {
		tries: 0, // Number of tries
		foundLetters: 0, // Number of found letters
		invalidLetters: 0, // Number of errors
		currentLetterValidity: false, // Validity of the current submitted letter
		originalWord: "Cassoulet", // Chosen word
		displayWord: "", // This is the word displayed on the page
		length: 0 // Word length
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
			Overlay.overlay.style["-webkit-animation-name"] = "OverlayFadeIn";
			Overlay.overlay.style.animationName = "OverlayFadeIn";
			Wrapper.classList.add("overlayed")
		},
		hide: () => {
			Overlay.overlay.style["-webkit-animation-name"] = "OverlayFadeOut";
			Overlay.overlay.style.animationName = "OverlayFadeOut";
			Wrapper.classList.remove("overlayed")
		}
	},
	Modal = {
		current: Overlay.overlay.querySelector(".Modal.current"),
		hostForm: Overlay.overlay.querySelector(".Modal.HostFormModal"),
		open: (modal) => {
			// Show overlay & open requested modal
			Overlay.show();
			modal.classList.add("current");
			Modal.current = modal
		},
		close: () => {
			// Close current opened modal & hide overlay
			Overlay.hide();
			setTimeout(() => {
				if (Modal.current) Modal.current.classList.remove("current")
			}, 200)
		}
	},
	RoundLayer = Overlay.overlay.querySelector(".RoundLayer"),
	RoundPlayerLayer = Overlay.overlay.querySelector(".RoundPlayerLayer"),
	Wrapper = document.body.children[1],
	Main = Wrapper.children[1],
	Container = {
		nickname: Main.children[0],
		openHostForm: Main.children[1],
		gameContainer: Main.children[2],
		restartGame: Main.querySelector(".RestartGameContainer")
	},
	Form = {
		sendMessage: document.querySelector(".MessageForm")
	},
	Button = {
		openHostForm: Container.openHostForm.children[0],
		copyLink: Modal.hostForm.querySelector("#CopyLink"),
		startHostGame: document.querySelector("#StartHostGame"),
		sendMessage: document.querySelector("#SendMessage"),
		restart: document.querySelector("#RestartGame")
	},
	Input = {
		nickname: Container.nickname.querySelector("#NicknameInput"),
		maxRounds: Modal.hostForm.querySelector("#MaxRoundsInput"),
		maxPlayers: Modal.hostForm.querySelector("#MaxPlayersInput"),
		// submitWord: document.querySelector("input#submit-word"),
		message: document.querySelector("#MessageInput")
	},
	Canvas = document.querySelector("#Canvas"),
	joinHelp = document.querySelector(".JoinHelp"),
	word = document.querySelector("#word"),
	gameEndTitle = document.querySelector(".RestartGameContainer h3"),
	link = document.querySelector("#link"),
	PlayerList = Modal.hostForm.querySelector(".PlayerList"),
	MessageList = Container.gameContainer.querySelector(".MessageList"),
	// Functions
	toggleDisplay = (element, displayType = "block") => {
		// Change the element display value, block-displayed by default
		element.style.display = displayType
	},
	startGame = (maxRounds, maxPlayers) => {
		// Show game content
		toggleDisplay(Container.gameContainer);
		Container.gameContainer.children[0].children[1].textContent = maxRounds;
		let i = 0;
		nextRound(i)
	},
	nextRound = (i) => {
		i++;
		Container.gameContainer.children[0].children[0].textContent = i;
		RoundLayer.children[0].textContent = i;
		RoundPlayerLayer.children[0].textContent = Player.nickname;
		RoundPlayerLayer.children[0].style.color = Player.nicknameColor;
		document.querySelector("#HiddenWordAuthor").textContent = Player.nickname;
		setTimeout(() => {
			Overlay.show();
			RoundLayer.classList.add("displayed");
			setTimeout(() => {
				RoundLayer.classList.remove("displayed");
				RoundPlayerLayer.classList.add("displayed");
				setTimeout(() => {
					Overlay.hide();
					setTimeout(() => {RoundPlayerLayer.classList.remove("displayed")}, 200)
				}, 3000)
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
// Hide modal when Escape key pressed
addEventListener("keydown", (e) => {
	if (e.keyCode == 27 && Overlay.overlay.style.opacity !== 0) Modal.close()
});
// Hide modal when cancel button clicked
document.querySelectorAll(".Modal .CancelButton").forEach((btn) => {
	btn.addEventListener("click", Modal.close)
});
// Input functions
// Text inputs
document.querySelectorAll("input[type='text']:not(#link)").forEach((input) => {
	// Clear inputs
	input.value = "";
	// Focus animation
	input.addEventListener("focus", () => {input.classList.add("focused")});
	// Blur animation
	input.addEventListener("blur", () => {
		if (input.value.length == 0) input.classList.remove("focused")
	})
});
// Range inputs
const resetRangeInputs = (input) => {input.value = input.min};
resetRangeInputs(Input.maxRounds);
resetRangeInputs(Input.maxPlayers);
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



/*Word.originalWord = Input.submitWord.value.toUpperCase();
Word.length = Word.originalWord.length;
Word.displayWord = Word.originalWord.replace(Word.originalWord, "_".repeat(Word.length));*/
/*validateLetter = () => {
	// Empty input
	if (Input.submitLetter.value === "") Modal.error.textContent = Message.requiredField;
	// 2 or more letters
	else if (Input.submitLetter.value.length > 1) Modal.error.textContent = Message.onlyOneLetter;
	// Valid input
	else {
		Word.tries++;
		Overlay.hide();
		let replacement = Input.submitLetter.value.toUpperCase();
		// Clear input
		Input.submitLetter.value = "";
		Input.submitLetter.classList.remove("focused");
		Word.currentLetterValidity = false;
		// Change word content
		for (let i = 0; i < Word.length; i++) {
			if (Word.originalWord.charAt(i) == replacement) {
				Word.currentLetterValidity = true;
				Word.displayWord = Word.displayWord.substr(0, i) + replacement + Word.displayWord.substr(i + 1);
				word.textContent = Word.displayWord;
				Word.foundLetters++
			}
		}
		if (!Word.currentLetterValidity) {
			// Invalid letter, +1 error
			Word.invalidLetters++;
			if (Word.invalidLetters < 11) {
				// Not enough errors to lose
				toggleCanvasPart(Word.invalidLetters);
				console.error(Message.letterNotInWord)
			} else {
				// Game over!
				// Show canvas last part
				toggleCanvasPart(11);
				word.textContent = Word.originalWord;
				Card.proposeLetter.style.display = "none";
				Card.canvasContainer.style.display = "none";
				Card.restart.style.display = "block";
				gameEndTitle.classList.add("lose");
				gameEndTitle.textContent = Message.gameOver
			}
		}
		// Game end, display number of tries
		if (Word.foundLetters == Word.length) {
			Card.proposeLetter.style.display = "none";
			Card.canvasContainer.style.display = "none";
			Card.restart.style.display = "block";
			gameEndTitle.classList.add("win");
			gameEndTitle.textContent = `🎉 Bravo, vous avez trouvé le mot en ${Word.tries} essai(s) !`
		}
	}
};*/