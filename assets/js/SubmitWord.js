function senddata(mon,data) {
    var requete = new XMLHttpRequest();
    requete.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            console.log(this.response);
            //document.getElementById('pet-select').value;
            //console.log(document.getElementById('pet-select').value);
        }else if (this.readyState==4){
            console.log("Un probleme avec le server");
        }
    };
    requete.open("POST","https://m2x.alwaysdata.net/hangit/server.php",true)
    requete.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    requete.send(mon+"="+data);
}

// The word won't be sent if it's empty or blank
Input.submitWord.addEventListener("input", () => {
	if (/^[A-Za-zÀ-ú- ]{4,}$/.test(Input.submitWord.value)) {
		// Blank word
		if (/^\s*$/.test(Input.submitWord.value)) Button.submitWord.disabled = true;
		else Button.submitWord.disabled = false
	} else Button.submitWord.disabled = true
});


// Submit word function
const SubmitWord = (word) => {
	HiddenWord.originalWord = word.toUpperCase();
	HiddenWord.length = HiddenWord.originalWord.length;
	HiddenWord.displayWord = HiddenWord.originalWord.replace(HiddenWord.originalWord, "_".repeat(HiddenWord.length));
	// Highlight spaces and hyphens
	checkForCharInWord(" ");
	checkForCharInWord("-");
	HiddenWord.refreshSpan()
};

// Submit word event listener
Modal.submitWord.addEventListener("submit", (e) => {
	// Prevent form from submitting
	e.preventDefault();
	Modal.close();
	//send player Input.maxRounds.value to the server
	senddata('Word',Input.submitWord.value);
	SubmitWord(Input.submitWord.value)
})