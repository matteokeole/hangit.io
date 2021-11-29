// Copy invitation link
Button.copyLink.addEventListener("click", () => {
	Button.copyLink.textContent = "✔️ Copié !";
	setTimeout(() => {Button.copyLink.textContent = "Copier le lien"}, 2000);
	Input.invitationLink.select();
	Input.invitationLink.setSelectionRange(0, Input.invitationLink.value.length);
	document.execCommand("copy")
})

url='server.php?liens='+current_url;
let req = new XMLHttpRequest();
req.open('GET', url);
req.send();
req.onreadystatechange = function() {
if (req.status == 200) {
    	let data = JSON.parse(req.responseText);
    	//data.liens=1;
    	if (data.liens==1) { 
    		toggleDisplay(Container.nickname);
    		toggleDisplay(Container.joinGame);
    		console.log('je rejoint une game'); 

    	}
    	console.log(data);
    	console.log(data);
    	//console.log(data);
    	//return data 
    	//return data;
   		// updateResult(data);
 } 
}
/*
console.log(test('https://luha.alwaysdata.net/api/'));
*/