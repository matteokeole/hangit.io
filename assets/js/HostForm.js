Button.openHostForm.addEventListener("click", () => {
	// Set player nickname
	SetNickname(Input.nickname.value);
	// Send player nickname to server
	// sendData("First_player", Input.nickname.value);
	//console.log(Input.nickname.value);
	// Open form modal
	Modal.open(Modal.hostForm);
	// Input disabled when modal is open
	Input.nickname.disabled=true;
	PlayerList.querySelector(".HostPlayer").children[0].textContent = Player.nickname
});
document.querySelectorAll("input[type='range']").forEach((input) => {
	input.addEventListener("input", () => {
		let value = input.value;
		input.previousElementSibling.children[0].textContent = value
	})
});
// Launch hosted game
Button.startHostGame.addEventListener("click", () => {
	// Close form modal
	Modal.close();
	Input.nickname.disabled=false;
	// Close active containers
	toggleDisplay(Container.nickname, "none");
	toggleDisplay(Container.openHostForm, "none");
	GameTip.textContent = Message.commandPrefixTip;
	// Start game
	// Send max rounds value to  server
	// sendData("Max_Rounds", Input.maxRounds.value);
	startGame(Input.maxRounds.value)
})