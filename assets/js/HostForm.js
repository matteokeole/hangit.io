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
Queliens=GenerateLink();

console.log(Queliens);
console.log(`${current_url}?g=${Queliens}`);
let refreshReadyPlayers = setInterval(() => {
	if (current_url.includes("?")) {
		// Join game
		console.error(Queliens)
		console.log("contien:"+current_url);
		//current_url = `${current_url}?g=${Queliens}`;
		fetch("https://m2x.alwaysdata.net/hangit/server.php?getmessage="+current_url)
			.then(response => response.text())
			.then(data => {console.log(data)})
	}else{
		// Host game
		console.log("ne contien pas :"+current_url)
		console.warn(Queliens)
		fetch("https://m2x.alwaysdata.net/hangit/server.php?getmessage="+current_url+"?g="+Queliens)
			.then(response => response.text())
			.then(data => {console.log(data)})
	}
}, 1000);
// Launch hosted game
Button.startHostGame.addEventListener("click", () => {
	//clearInterval(refreshReadyPlayers);
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