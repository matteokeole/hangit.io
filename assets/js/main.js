const animateInputs = function(top, color, size) {
	document.querySelectorAll("input").forEach(function(input) {input.style.borderColor = color; input.style.color = color});
	document.querySelectorAll("label").forEach(function(label) {
		label.style.top = top;
		label.style.color = color;
		label.style.fontSize = size
	});
	document.querySelectorAll(".error").forEach(function(msg) {msg.style.color = color})
},
main = document.querySelector("main"),
overlay = document.querySelector(".overlay"),
footer = document.querySelector("footer"),
btnProposeLetter = document.querySelector(".btn.propose-letter"),
modal = document.querySelector(".modal"),
Modal = {
	show: function() {
		overlay.style.display = "flex";
		main.classList.add("overlayed");
		Modal.container.style.opacity = 1;
		Modal.container.style.zIndex = 11;
		// Refresh input
		animateInputs("88px", "#757575", "16px");
		document.querySelector(".error").textContent = "¡ Solo una letra !"
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

// Hide modal when cancel button clicked
Modal.cancel.addEventListener("click", function() {Modal.hide(Modal.container)});
// Clear inputs
// document.querySelectorAll("input").forEach(function(input) {input.value = ""});
document.querySelector(".card input").addEventListener("focus", function() {
	animateInputs("146px", "#FFB300", "12px")
})
document.querySelector(".modal input").addEventListener("focus", function() {animateInputs("70px", "#ffb300", "12px")})
document.querySelector(".card button").addEventListener("click", function() {
	if (document.querySelector(".card input").value === "") {
		animateInputs("102px", "#FF1744", "16px");
		document.querySelector(".card .error").textContent = "Cette information est obligatoire"
	}
	else {
		var foundLetters = 0,
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
					animateInputs("82px", "#FF1744", "16px");
					modal.querySelector(".error").textContent = "Cette information est obligatoire"
					// Refresh input
					modal.querySelector("input").addEventListener("focus", function() {modal.querySelector(".error").textContent = "Seulement une lettre"})
				}
				// 2 or more letters
				else if (modal.querySelector("input").value.length > 1) {
					animateInputs("88px", "#FF1744", "12px");
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