Button.joinGame.addEventListener("click", () => {
	// Set player nickname
	SetNickname(Input.nickname.value);
	Input.nickname.value = "";
	Input.nickname.disabled = true;
	// Send player nickname to server
	sendData("First_player", Player.nickname)
})