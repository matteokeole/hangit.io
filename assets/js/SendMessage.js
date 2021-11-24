// The message won't be sent if it's empty
Input.message.addEventListener("input", () => {
	if (Input.message.value.length === 0) Button.sendMessage.disabled = true;
	else Button.sendMessage.disabled = false
});

// Send message function
const checkMessage = (msg) => {
	// Check if the value matches with a letter of the whole word
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
	e.preventDefault();
	if (Input.message.value.length != 0) {
		// Filled input, check message before sending
		let msg = Input.message.value;
		checkMessage(msg);
		// Send message & scroll
		let listFullHeight = MessageList.scrollHeight,
			listVisibleHeight = MessageList.offsetHeight;
		sendMessage(false, msg, Player.nickname);
		setMessageListPosition(listFullHeight, listVisibleHeight);
		// Disable send button & clear message input
		Button.sendMessage.disabled = false;
		Input.message.value = "";
		// Re-focus input
		Input.message.focus()
	}
})