Button.openHostForm.addEventListener("click", () => {
	// Set player nickname
	SetNickname(Input.nickname.value);
	// Open form modal
	Modal.open(Modal.hostForm);
	// Input disabled when modal is open
	Input.nickname.disabled = true;
	PlayerList.querySelector(".HostPlayer").textContent = Player.nickname
});
document.querySelectorAll("input[type='range']").forEach((input) => {
	input.addEventListener("input", () => {
		let value = input.value;
		input.previousElementSibling.children[0].textContent = value
	})
});
let refreshReadyPlayers = setInterval(() => {
	fetch(`https://m2x.alwaysdata.net/hangit/server.php?liens=getmessage=${current_url}`)
		.then(response => response.json())
		.then(data => {console.log(data)})
}, 1000);
// Launch hosted game
Button.startHostGame.addEventListener("click", () => {
	clearInterval(refreshReadyPlayers);
	// Close form modal
	Modal.close();
	// Close active containers
	toggleDisplay(Container.nickname, "none");
	toggleDisplay(Container.openHostForm, "none");
	GameTip.textContent = Return.tip.commandPrefix;
	// Start game
	// Send max rounds value to  server
	sendData("Max_Rounds", Input.maxRounds.value);
	startGame(Input.maxRounds.value)
})