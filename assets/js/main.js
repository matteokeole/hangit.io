const main = document.querySelector("main"),
overlay = document.querySelector(".overlay"),
footer = document.querySelector("footer"),
btnProposeLetter = document.querySelector(".btn.propose-letter"),
Modal = {
	show: function() {
		overlay.style.display = "flex";
		main.classList.add("overlayed");
		Modal.container.style.opacity = 1;
		Modal.container.style.zIndex = 11;
		// Refresh input
		document.querySelector(".error").textContent = "Seulement une lettre"
	},
	hide: function() {
		overlay.style.display = "none";
		main.classList.remove("overlayed");
		Modal.container.style.opacity = 0;
		Modal.container.style.zIndex = -1
	},
	container: document.querySelector(".modal"),
	get cancel() {return this.container.querySelector(".btn-cancel")},
	get validate() {return this.container.querySelector(".btn-validate")}
};

// Event listeners
// Hide modal when cancel button clicked
Modal.cancel.addEventListener("click", function() {Modal.hide(Modal.container)});
// Clear inputs
document.querySelectorAll("input").forEach(function(input) {input.value = ""});
// Input focus/blur animations
document.querySelectorAll("input").forEach((input) => {
	input.addEventListener("focus", function() {this.classList.add("focused")});
	input.addEventListener("blur", function() {
		if (this.value === "") this.classList.remove("focused")
	})
})
document.querySelector(".card button").addEventListener("click", function() {
	if (document.querySelector(".card input").value === "") {
		document.querySelector(".card .error").textContent = "Cette information est obligatoire"
	}
	else {
		let foundLetters = 0,
		tests = 0,
		secretWord = document.querySelector(".card input").value.toUpperCase(),
		center = secretWord.replace(secretWord, "_".repeat(secretWord.length)),
		card = document.querySelector(".card"),
		footer = document.querySelector("footer"),
		modal = document.querySelector(".modal");
		// Update card & footer
		card.textContent = center;
		card.style.color = "#000";
		card.style.textAlign = "center";
		card.style.fontSize = "52px";
		card.style.letterSpacing = "12px";
		footer.style.bottom = 0;
		footer.style.opacity = 1;
		btnProposeLetter.addEventListener("click", function() {
			tests++;
			Modal.show();
			modal.getElementsByTagName("button")[1].addEventListener("click", function() {
				// Empty input
				if (modal.querySelector("input").value === "") {
					modal.querySelector(".error").textContent = "Cette information est obligatoire"
					// Refresh input
					modal.querySelector("input").addEventListener("focus", function() {modal.querySelector(".error").textContent = "Seulement une lettre"})
				}
				// 2 or more letters
				else if (modal.querySelector("input").value.length > 1) {
					modal.querySelector(".error").textContent = "Seulement une lettre"
					// Refresh input
					modal.querySelector("input").addEventListener("focus", function() {modal.querySelector(".error").textContent = "Seulement une lettre"})
				}
				else {
					Modal.hide();
					var letter = modal.querySelector("input").value.toUpperCase();
					modal.querySelector("input").value = "";
					for (var scanner = 0; scanner < secretWord.length; scanner++) {
						if (secretWord.charAt(scanner) === letter) {
							center = center.substr(0, scanner) + letter + center.substr(scanner + letter.length);
							document.querySelector(".card").textContent = center;
							foundLetters++
						}
					}
					/*if (foundLetters == secretWord.length) {
						var end = confirm("¡ Habéis ganado ! (en " + tests + " ensayos)\n¿ Quéréis empezar de nuevo ?");
						if (end) {location.reload()}
					}*/
				}
			})
		})
	}
})