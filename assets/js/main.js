// DOM elements
const wrapper = document.querySelector("#wrapper"),
main = document.querySelector("main"),
gameEndTitle = document.querySelector(".card.restart h3"),
link = document.querySelector("#link"),
MessageList = document.querySelector(".MessageList"),
Form = {
	sendMessage: document.querySelector(".MessageForm")
},
Button = {
	openHostForm: document.querySelector(".btn-open-host-form"),
	startHostGame: document.querySelector(".btn-start-host-game"),
	copyLink: document.querySelector(".btn-copy-link"),
	start: document.querySelector(".btn-start"),
	proposeLetter: document.querySelector(".btn-propose-letter"),
	restart: document.querySelector(".btn-restart"),
	sendMessage: document.querySelector("#SendMessage")
},
Card = {
	nickname: document.querySelector(".card.nickname"),
	openHostForm: document.querySelector(".card.open-host-form"),
	gameContainer: document.querySelector(".card.GameContainer"),
	submitWord: document.querySelector(".card.submit-word"),
	word: document.querySelector(".card.word"),
	canvasContainer: document.querySelector(".card.CanvasContainer"),
	proposeLetter: document.querySelector(".card.propose-letter"),
	restart: document.querySelector(".card.restart")
},
joinHelp = document.querySelector(".join-help"),
Overlay = {
	overlay: document.querySelector("#overlay"),
	show: () => {
		setTimeout(() => {Input.submitLetter.focus()}, 10);
		Overlay.overlay.style["-webkit-animation-name"] = "overlayFadeIn";
		Overlay.overlay.style.animationName = "overlayFadeIn";
		wrapper.classList.add("overlayed")
	},
	hide: () => {
		if (Modal.current) Modal.current.classList.remove("current");
		Overlay.overlay.style["-webkit-animation-name"] = "overlayFadeOut";
		Overlay.overlay.style.animationName = "overlayFadeOut";
		wrapper.classList.remove("overlayed");
		// setTimeout(Modal.refreshInputError, 200)
	}
},
Modal = {
	current: document.querySelector(".modal.current"),
	hostForm: document.querySelector(".modal.host-form"),
	open: (modal) => {
		if (Modal.current) Modal.current.classList.remove("current");
		Modal[modal].classList.add("current");
		Overlay.show()
	}
	// refreshInputError: () => {Modal.querySelector(".error").textContent = ""}
},
Input = {
	submitWord: document.querySelector("input#submit-word"),
	submitLetter: document.querySelector("input#submit-letter"),
	message: document.querySelector("#MessageInput")
},
word = document.querySelector("#word"),
Message = {
	alphaNumValue: "❌ Veuillez rentrer une valeur alphanumérique ci-dessus",
	requiredField: "❌ Ce champ est requis",
	onlyOneLetter: "❌ Ecrivez seulement une lettre",
	letterNotInWord: "⛔ Cette lettre n'est pas dans le mot !",
	gameOver: "🤕 Vous avez fait trop d'erreurs. Vous êtes pendu(e) !"
},
// validateLetter = () => {
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
				togglePart(Word.invalidLetters, 1);
				console.error(Message.letterNotInWord)
			} else {
				// Game over!
				// Show canvas last part
				togglePart(11, 1);
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
// };

// Game variables
let HiddenWord = {
	tries: 0, // Number of tries
	foundLetters: 0, // Number of found letters
	invalidLetters: 0, // Number of errors
	currentLetterValidity: false, // Validity of the current submitted letter
	originalWord: "Cassoulet", // Chosen word
	displayWord: "", // This is the word displayed on the page
	length: 0, // Word length
	fontSize: 0
};

// Event listeners
// Hide modal when Escape key pressed
document.addEventListener("keydown", (e) => {
	if (e.keyCode == 27 && Overlay.overlay.style.opacity !== 0) Overlay.hide()
});
// Hide modal when cancel button clicked
document.querySelectorAll(".modal .btn-cancel").forEach((btn) => {
	btn.addEventListener("click", () => {Overlay.hide()})
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
		if (input.value === "") input.classList.remove("focused")
	})
});
// Range inputs
document.querySelectorAll("input[type='range']").forEach((input) => {
	// Set default value
	input.value = input.min;
});
// Open host game form button
Button.openHostForm.addEventListener("click", () => {Modal.open("hostForm")});
// Start button
Button.start.addEventListener("click", () => {
	if (Input.submitWord.value === "") Card.submitWord.querySelector(".error").textContent = Message.requiredField;
	else {
		// Word submitted, start game
		Word.originalWord = Input.submitWord.value.toUpperCase();
		Word.length = Word.originalWord.length;
		Word.displayWord = Word.originalWord.replace(Word.originalWord, "_".repeat(Word.length));
		// Toggle cards
		Card.submitWord.style.display = "none";
		Card.word.style.display = "block";
		word.textContent = Word.displayWord;
		Card.canvasContainer.style.display = "block";
		Card.proposeLetter.style.display = "block";
		Button.proposeLetter.addEventListener("click", Overlay.show)
	}
});
// Restart button
Button.restart.addEventListener("click", () => {location.reload()})