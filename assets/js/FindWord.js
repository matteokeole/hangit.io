// Check for a specific character in the hidden word and highlight it
const checkForCharInWord = (char) => {
	let check = false;
	for (let i = 0; i < HiddenWord.length; i++) {
		if (HiddenWord.originalWord[i] == char) {
			// New letter found
			check = true;
			HiddenWord.displayWord = HiddenWord.displayWord.substr(0, i) + char + HiddenWord.displayWord.substr(i + 1)
		}
	}
	HiddenWord.refreshSpan();
	return check
},
// Check if the requested word and the hidden word are the same
checkForFullWord = (word) => {
	let check = false;
	if (HiddenWord.originalWord == word) {
		check = true;
		HiddenWord.displayWord = HiddenWord.originalWord
	}
	HiddenWord.refreshSpan();
	return check
}