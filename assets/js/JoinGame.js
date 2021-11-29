Button.joinGame.addEventListener("click", () => {
	// Set player nickname
	SetNickname(Input.nickname.value);
	Input.nickname.value = "";
	Input.nickname.disabled = true;
	// Send link to database
	sendDataTwo("invite", Input.nickname.value, "joinlink", current_url);
	// Join game
	joinGame()
})