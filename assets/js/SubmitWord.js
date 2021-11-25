// The word won't be sent if it's empty or blank
Input.submitWord.addEventListener("input", () => {
	if (/^[A-Za-zÀ-ú- ]{4,}$/.test(Input.submitWord.value)) {
		if (/^\s*$/.test(Input.submitWord.value)) Button.submitWord.disabled = true;
		else Button.submitWord.disabled = false
	} else Button.submitWord.disabled = true
});

// Submit word function
const SubmitWord = (word) => {
	HiddenWord.originalWord = word.toUpperCase();
	HiddenWord.length = HiddenWord.originalWord.length;
	HiddenWord.displayWord = HiddenWord.originalWord.replace(HiddenWord.originalWord, "_".repeat(HiddenWord.length));
	HiddenWord.refreshSpan()
};

// Submit word event listener
Modal.submitWord.addEventListener("submit", (e) => {
	// Prevent form from submitting
	e.preventDefault();
	Modal.close();
	SubmitWord(Input.submitWord.value)
})