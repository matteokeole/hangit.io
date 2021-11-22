// DOM elements
const wrapper = document.querySelector("#wrapper"),
main = document.querySelector("main"),
footer = document.querySelector("footer"),
btnProposeLetter = document.querySelector(".btn-propose-letter"),
Card = {
	submitWord: document.querySelector(".card.submit-word"),
	word: document.querySelector(".card.word")
},
Overlay = {
	overlay: document.querySelector("#overlay"),
	show: () => {
		Overlay.overlay.style["-webkit-animation-name"] = "overlayFadeIn";
		Overlay.overlay.style.animationName = "overlayFadeIn";
		wrapper.classList.add("overlayed")
	},
	hide: () => {
		Overlay.overlay.style["-webkit-animation-name"] = "overlayFadeOut";
		Overlay.overlay.style.animationName = "overlayFadeOut";
		wrapper.classList.remove("overlayed");
		Modal.refreshInputError()
	}
},
Modal = {
	container: document.querySelector(".modal"),
	get error() {return this.container.querySelector(".error")},
	get cancel() {return this.container.querySelector(".btn-cancel")},
	get validate() {return this.container.querySelector(".btn-validate")},
	refreshInputError: () => {document.querySelector(".error").textContent = "Seulement une lettre"}
},
Input = {
	submitWord: document.querySelector("input#new-word"),
	letter: document.querySelector("input#letter")
},
word = document.querySelector("#word");

// Game variables
let Word = {
	tries: 0, // Number of tries
	foundLetters: 0, // Number of found letters
	invalidLetters: 0, // Number of errors
	currentLetterValidity: false, // Validity of the current submitted letter
	originalWord: "", // Chosen word
	displayWord: "" // This is the word displayed on the page
};

// Event listeners
// Hide modal when Escape key pressed
document.addEventListener("keydown", (e) => {
	if (e.keyCode === 27) Overlay.hide()
});
// Hide modal when cancel button clicked
Modal.cancel.addEventListener("click", () => {Overlay.hide()});
// Input functions
document.querySelectorAll("input").forEach((input) => {
	// Clear inputs
	input.value = "";
	// Focus animation
	input.addEventListener("focus", () => {input.classList.add("focused")});
	// Blur animation
	input.addEventListener("blur", () => {
		if (input.value === "") input.classList.remove("focused")
	})
});
// Start button
document.querySelector(".btn-start").addEventListener("click", () => {
	if (Input.submitWord.value === "") Card.submitWord.querySelector(".error").textContent = "Cette information est obligatoire";
	else {
		// Word submitted, start game
		Word.originalWord = Input.submitWord.value.toUpperCase();
		Word.displayWord = Word.originalWord.replace(Word.originalWord, "_".repeat(Word.originalWord.length));
		// Hide word submit card, show game card & display word
		Card.submitWord.style.display = "none";
		Card.word.style.display = "block";
		word.textContent = Word.displayWord;
		// Show footer
		footer.classList.add("displayed");
		btnProposeLetter.addEventListener("click", () => {
			Overlay.show();
			Modal.validate.addEventListener("click", () => {
				// Empty input
				if (Input.letter.value === "") {
					Modal.error.textContent = "Cette information est obligatoire";
					// Refresh input
					Input.letter.addEventListener("focus", () => {Modal.error.textContent = "Seulement une lettre"})
				}
				// 2 or more letters
				else if (Input.letter.value.length > 1) {
					Modal.error.textContent = "Seulement une lettre";
					// Refresh input
					Input.letter.addEventListener("focus", () => {Modal.error.textContent = "Seulement une lettre"})
				}
				else {
					Word.tries++;
					Overlay.hide();
					let replacement = Input.letter.value.toUpperCase();
					// Clear input
					Input.letter.value = "";
					Input.letter.classList.remove("focused");
					Word.currentLetterValidity = false;
					// Change word content
					for (let i = 0; i < Word.originalWord.length; i++) {
						if (Word.originalWord.charAt(i) === replacement) {
							Word.currentLetterValidity = true;
							Word.displayWord = Word.displayWord.substr(0, i) + replacement + Word.displayWord.substr(i + 1);
							word.textContent = Word.displayWord;
							Word.foundLetters++
						}
					}
					if (!Word.currentLetterValidity) {
						// Invalid letter, +1 error
						Word.invalidLetters++;
						if (Word.invalidLetters <= 10) {
							// Not enough errors to lose
							togglePart(Word.invalidLetters, 1);
							console.error("Cette lettre n'est pas dans le mot !")
						} else {
							togglePart(11, 1);
							console.warn("Vous avez fait trop d'erreurs. Vous êtes pendu(e) !")
						}
					}
					// Game end, display number of tries
					if (Word.foundLetters === Word.originalWord.length) {
						console.info(`Vous avez trouvé le mot en ${Word.tries} essai(s)`)
					}
				}
			})
		})
	}
})