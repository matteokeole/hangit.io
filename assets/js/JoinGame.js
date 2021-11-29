Button.joinGame.addEventListener("click", () => {
	// Set player nickname
	SetNickname(Input.nickname.value);
	Input.nickname.value = "";
	Input.nickname.disabled = true;
	// Toggle containers display
	toggleDisplay(Container.nickname, "none");
	toggleDisplay(Container.joinGame, "none");
	toggleDisplay(Container.gameContainer, "flex")
})