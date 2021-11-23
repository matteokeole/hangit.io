document.querySelectorAll("input[type='range']").forEach((input) => {
	input.addEventListener("input", () => {
		let value = input.value;
		input.previousElementSibling.children[0].textContent = value
	})
})
// Copy link function
Button.copyLink.addEventListener("click", () => {
	Button.copyLink.textContent = "✔️ Copié !";
	setTimeout(() => {Button.copyLink.textContent = "Copier le lien"}, 2000);
	link.select();
	link.setSelectionRange(0, link.value.length);
	document.execCommand("copy")
})
// Start host game
Button.startHostGame.addEventListener("click", () => {
	Overlay.hide();
	Card.nickname.style.display = "none";
	Card.openHostForm.style.display = "none";
	joinHelp.style.display = "none";
	Card.gameContainer.style.display = "block"
})