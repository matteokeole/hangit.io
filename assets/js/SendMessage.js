function senddata(mon,data) {
    var requete = new XMLHttpRequest();
    requete.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            console.log(this.response);
            //document.getElementById('pet-select').value;
            //console.log(document.getElementById('pet-select').value);
        }else if (this.readyState==4){
            console.log("Un probleme avec le server");
        }
    };
    requete.open("POST","https://m2x.alwaysdata.net/hangit/server.php",true)
    requete.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    requete.send(mon+"="+data);
}

// The message won't be sent if it's empty or blank
Input.message.addEventListener("input", () => {
	if (/^\s*$/.test(Input.message.value)) Button.sendMessage.disabled = true;
	else Button.sendMessage.disabled = false
});

// Send message function
const checkMessage = (msg) => {
	// Check if a sent message matches with the hidden word
	msg = msg.toUpperCase();
	if (msg[0] == "!") {
		// Command
		msg = msg.substr(1, msg.length - 1);
		if (/^[A-ZÀ-Ú]{1}$/.test(msg)) {
			// Letter sent, reveal it on the hidden word if valid
			// Test if the letter hasn't already been proposed
			let letterAlreadyProposed = false;
			for (let i = 0; i < HiddenWord.sentLetters.length; i++) {
				if (HiddenWord.sentLetters[i] == msg) letterAlreadyProposed = true
			}
			if (letterAlreadyProposed) sendMessage(true, "Vous avez déjà proposé cette lettre !");
			else {
				// Add letter to submitted letters
				HiddenWord.sentLetters.push(msg);
				// Check for letter in hidden word
				HiddenWord.currentInputValidity = checkForCharInWord(msg)
			}
		} else if (msg.length > 1) {
			// Word sent, reveal it on the hidden word if valid
			// Test if the word hasn't already been proposed
			let wordAlreadyProposed = false;
			for (let i = 0; i < HiddenWord.sentWords.length; i++) {
				if (HiddenWord.sentWords[i] == msg) wordAlreadyProposed = true
			}
			if (wordAlreadyProposed) sendMessage(true, "Vous avez déjà proposé ce mot !");
			else {
				// Add letter to submitted letters
				HiddenWord.sentWords.push(msg);
				// Check for word in hidden word
				HiddenWord.currentInputValidity = checkForFullWord(msg)
			}
		}
	}
	if (!HiddenWord.currentInputValidity) {
		// Invalid input, +1 error
		HiddenWord.invalidInputs++;
		// Display remaining tries
		let remainingTries = (11 - HiddenWord.invalidInputs),
			s = (remainingTries > 1) ? "s" : "";
		RemainingTries.textContent = (remainingTries > 0) ? `${remainingTries} essai${s} restant${s}.` : "Pendu(e) !";
		if (HiddenWord.invalidInputs < 11) {
			// Not enough errors to lose
			toggleCanvasPart(HiddenWord.invalidInputs)
		} else {
			// Game over!
			setTimeout(() => {Input.message.blur()});
			toggleCanvasPart(11) // Show canvas last part
		}
	}
	// Set input validity to true
	HiddenWord.currentInputValidity = true
},
sendMessage = (auto, msg, authorName, authorColor) => {
	// Send a message on the chat
	// auto = send automatic message (author-less, true|false)
	// Create message DOM
	let listFullHeight = MessageList.scrollHeight,
		listVisibleHeight = MessageList.offsetHeight,
		message = document.createElement("li"),
		inner = document.createElement("div"),
		content = document.createElement("span");
	// Set element classes
	message.className = "Message";
	inner.className = "MessageInner";
	content.className = "MessageContent";
	// Set values
	content.textContent = msg;
	// Append elements
	inner.appendChild(content);
	// Non-automatic message
	if (!auto) {
		// User message, create author section
		let author = document.createElement("span"),
			date = document.createElement("span");
		author.className = "MessageAuthor";
		date.className = "MessageDate";
		author.textContent = authorName;
		author.style.color = authorColor;
		date.textContent = "maintenant";
		message.appendChild(author);
		inner.appendChild(date)
	}
	message.appendChild(inner);
	// Show message
	MessageList.appendChild(message);
	setMessageListPosition(listFullHeight, listVisibleHeight)
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

	//send player msg to the server
	senddata('message',msg);
	// Send/check message
	sendMessage(false, msg, Player.nickname, Player.nicknameColor);
	checkMessage(msg);
	// Disable send button & clear message input
	Button.sendMessage.disabled = true;
	Input.message.value = "";
	// Re-focus input
	Input.message.focus()
})