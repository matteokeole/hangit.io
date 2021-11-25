// The message won't be sent if it's empty or blank
Input.message.addEventListener("input", () => {
	if (/^\s*$/.test(Input.message.value)) Button.sendMessage.disabled = true;
	else Button.sendMessage.disabled = false
});

// Send message function
const checkMessage = (msg) => {
	// Check if a sent message matches with the hidden word
	msg = msg.toUpperCase();
	if (msg.length == 1) {
		// Letter found, reveal it on the hidden word
		for (let i = 0; i < HiddenWord.length; i++) {
			if (HiddenWord.originalWord[i] == msg) {
				HiddenWord.currentLetterValidity = true;
				// HiddenWord.foundLetters++;
				HiddenWord.displayWord = HiddenWord.displayWord.substr(0, i) + msg + HiddenWord.displayWord.substr(i + 1)
			}
		}
		if (!HiddenWord.currentLetterValidity) {
			// Invalid letter, +1 error
			HiddenWord.invalidLetters++;
			// Display remaining tries
			let remainingTries = (11 - HiddenWord.invalidLetters),
				s = (remainingTries > 1) ? "s": "";
			RemainingTries.textContent = (remainingTries > 0) ? `${remainingTries} essai${s} restant${s}.` : "Pendu(e) !";
			if (HiddenWord.invalidLetters < 11) {
				// Not enough errors to lose
				toggleCanvasPart(HiddenWord.invalidLetters)
			} else {
				// Game over!
				setTimeout(() => {Input.message.blur()});
				toggleCanvasPart(11); // Show canvas last part
				HiddenWord.displayWord = HiddenWord.originalWord;
				HiddenWord.refreshSpan();
				Overlay.show()
			}
		}
	} else if (msg == HiddenWord.originalWord) {
		// Whole word found, next turn
		HiddenWord.displayWord = HiddenWord.originalWord
	}
	HiddenWord.refreshSpan();
	// Reset word data
	HiddenWord.currentLetterValidity = false
},
sendMessage = (auto, msg, authorName, authorColor) => {
	// Send a message on the chat
	// auto = send automatic message (author-less, true|false)
	// Create message DOM
	let message = document.createElement("li"),
		inner = document.createElement("div"),
		content = document.createElement("span"),
		date = document.createElement("span");
	// Set element classes
	message.className = "Message";
	inner.className = "MessageInner";
	content.className = "MessageContent";
	date.className = "MessageDate";
	// Set values
	content.textContent = msg;
	date.textContent = "maintenant";
	// Non-automatic message
	if (!auto) {
		// User message, create author section
		let author = document.createElement("span");
		author.className = "MessageAuthor";
		author.textContent = authorName;
		author.style.color = authorColor;
		message.appendChild(author)
	}
	// Append elements
	inner.appendChild(content);
	inner.appendChild(date);
	message.appendChild(inner);
	// Show message
	MessageList.appendChild(message)
},
setMessageListPosition = (fullHeight, visibleHeight) => {
	// Scroll to end of the message list
	if (MessageList.scrollTop == (fullHeight - visibleHeight)) {
		// The user is already at the end of the message list, continue scrolling
		MessageList.scrollTop = MessageList.scrollHeight
	}
};

// Send message event listener
Form.sendMessage.addEventListener("submit", (e) => {
	// Prevent form from submitting
	e.preventDefault();
	// Filled and non-blank input, check message before sending
	let msg = Input.message.value;
	checkMessage(msg);
	// Send message & scroll
	let listFullHeight = MessageList.scrollHeight,
		listVisibleHeight = MessageList.offsetHeight;
	sendMessage(false, msg, Player.nickname, Player.nicknameColor);
	setMessageListPosition(listFullHeight, listVisibleHeight);
	// Disable send button & clear message input
	Button.sendMessage.disabled = true;
	Input.message.value = "";
	// Re-focus input
	Input.message.focus()
})