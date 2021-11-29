// Copy invitation link
Button.copyLink.addEventListener("click", () => {
	Button.copyLink.textContent = "✔️ Copié !";
	setTimeout(() => {Button.copyLink.textContent = "Copier le lien"}, 2000);
	Input.invitationLink.select();
	Input.invitationLink.setSelectionRange(0, Input.invitationLink.value.length);
	document.execCommand("copy")
});
// Get URL invitation link
let r = new XMLHttpRequest(),
	url = `https://m2x.alwaysdata.net/hangit/server.php?liens=${current_url}`,
	data = "";
r.open("GET", url);
r.send();
r.addEventListener("load", () => {
	data = JSON.parse(r.response);
	if (data.liens) {
		// The player is about to join a game
		toggleDisplay(Container.nickname);
		toggleDisplay(Container.joinGame);
		console.info("Status: Joining game")
	} else if (current_url.includes("?")) {
		// There is a link but it is invalid (not into the database)
		GameTip.textContent = Return.tip.invalidLink;
		toggleDisplay(GameTip);
		console.warn("Invalid invitation link!")
	} else if (!data.liens) {
		// The player is about to host a new game
		toggleDisplay(Container.nickname);
		toggleDisplay(Container.openHostForm);
		GameTip.textContent = Return.tip.joinGame;
		toggleDisplay(GameTip);
		console.info("Status: Hosting game");
		sendData("Link_game", Input.invitationLink.value)
	}
})