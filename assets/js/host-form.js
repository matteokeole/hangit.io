document.querySelectorAll("input[type='range']").forEach((input) => {
	input.addEventListener("input", () => {
		let value = input.value;
		input.previousElementSibling.children[0].textContent = value
	})
})
// Copy link function
Button.copyLink.addEventListener("click", () => {
	link.select();
	link.setSelectionRange(0, link.textContent.length);
	document.execCommand("copy")
})