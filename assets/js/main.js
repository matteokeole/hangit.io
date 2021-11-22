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
	show: function() {
		Overlay.overlay.style["-webkit-animation-name"] = "overlayFadeIn";
		Overlay.overlay.style.animationName = "overlayFadeIn";
		wrapper.classList.add("overlayed")
	},
	hide: function() {
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
	refreshInputError: function() {document.querySelector(".error").textContent = "Seulement une lettre"}
},
Input = {
	submitWord: document.querySelector("input#new-word"),
	letter: document.querySelector("input#letter")
},
word = document.querySelector("#word");

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
// Start game
document.querySelector(".btn-start").addEventListener("click", () => {
	if (Input.submitWord.value === "") Card.submitWord.querySelector(".error").textContent = "Cette information est obligatoire";
	else {
		let foundLetters = 0,
		tests = 0,
		secretWord = Input.submitWord.value.toUpperCase(),
		dispWord = secretWord.replace(secretWord, "_".repeat(secretWord.length)),
		card = document.querySelector(".card"),
		footer = document.querySelector("footer");
		// Update card
		Card.submitWord.style.display = "none";
		Card.word.style.display = "block";
		word.textContent = dispWord;
		// Show footer
		footer.style.bottom = 0;
		footer.style.opacity = 1;
		btnProposeLetter.addEventListener("click", function() {
			Overlay.show();
			Modal.validate.addEventListener("click", function() {
				// Empty input
				if (Input.letter.value === "") {
					Modal.error.textContent = "Cette information est obligatoire";
					// Refresh input
					Input.letter.addEventListener("focus", function() {Modal.error.textContent = "Seulement une lettre"})
				}
				// 2 or more letters
				else if (Input.letter.value.length > 1) {
					Modal.error.textContent = "Seulement une lettre";
					// Refresh input
					Input.letter.addEventListener("focus", function() {Modal.error.textContent = "Seulement une lettre"})
				}
				else {
					tests++;
					Overlay.hide();
					let letter = Input.letter.value.toUpperCase();
					// Clear input
					Input.letter.value = "";
					Input.letter.classList.remove("focused");
					for (var scan = 0; scan < secretWord.length; scan++) {
						if (secretWord.charAt(scan) === letter) {
							dispWord = dispWord.substr(0, scan) + letter + dispWord.substr(scan + 1);
							word.textContent = dispWord;
							foundLetters++
						}
					}
					if (foundLetters == secretWord.length) {
						console.info(`Vous avez trouvé le mot en ${tests} essai(s)`)
					}
				}
			})
		})
	}
})