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

Button.openHostForm.addEventListener("click", () => {
	// Set player nickname
	SetNickname(Input.nickname.value);
	//send player nickname to the server
	senddata('First_player',Input.nickname.value)
	//console.log(Input.nickname.value);
	// Open form modal
	Modal.open(Modal.hostForm);
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
	// Close active containers
	toggleDisplay(Container.nickname, "none");
	toggleDisplay(Container.openHostForm, "none");
	toggleDisplay(JoinHelp, "none");
	// Start game
	//send player Input.maxRounds.value to the server
	senddata('Max_Rounds',Input.maxRounds.value)
	startGame(Input.maxRounds.value)
})