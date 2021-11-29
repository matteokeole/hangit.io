Button.joinGame.addEventListener("click", () => {
	// Set player nickname
	SetNickname(Input.nickname.value);
	// Send link to database
	// sendDataTwo("invite", Input.nickname.value, "joinlink", current_url);
	Input.nickname.value = "";
	Input.nickname.disabled = true;
	// Join game
	joinGame()
})