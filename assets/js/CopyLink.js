// Copy invitation link
Button.copyLink.addEventListener("click", () => {
	Button.copyLink.textContent = "✔️ Copié !";
	setTimeout(() => {Button.copyLink.textContent = "Copier le lien"}, 2000);
	Input.invitationLink.select();
	Input.invitationLink.setSelectionRange(0, Input.invitationLink.value.length);
	document.execCommand("copy")
});

let req = new XMLHttpRequest(),
	url = `https://m2x.alwaysdata.net/hangit/server.php?liens=${current_url}`,
	data = "";
req.open("GET", url);
req.send();
req.onreadystatechange = function() {
	if (req.status == 200) {
		data = JSON.parse(req.response);
		if (data.liens) {
			// Join game
			toggleDisplay(Container.nickname);
			toggleDisplay(Container.joinGame);
			console.info("Joining game")
		} else if (current_url.includes("?")) {
			// There is a link but it is invalid
			GameTip.textContent = Return.tip.invalidLink;
			toggleDisplay(GameTip)
		} else if (!data.liens) {
			// Host game
			toggleDisplay(Container.nickname);
			toggleDisplay(Container.openHostForm);
			GameTip.textContent = Return.tip.joinGame;
			toggleDisplay(GameTip);
			sendData("Link_game", Input.invitationLink.value)
		}
	}
}
// console.log(test('https://luha.alwaysdata.net/api/'))