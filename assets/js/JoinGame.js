Button.joinGame.addEventListener("click", () => {
	// Set player nickname
	SetNickname(Input.nickname.value);
	Input.nickname.value = "";
	Input.nickname.disabled = true;
	sendDataTwo("invite",Input.nickname.value,"joinlink",current_url);
	// Join game
	joinGame()
})