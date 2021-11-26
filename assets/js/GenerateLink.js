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

// Generate unique link function
const GenerateLink = () => {return (new Date()).getTime()};

// Generate game link
Input.invitationLink.value = `https://matteoo34.github.io/hangit.io/?g=${GenerateLink()}`

// Generate game linktest in local
//Input.invitationLink.value = `http://localhost:1000/?g=${GenerateLink()}`

//send player nickname to the server
senddata('Link_game',Input.invitationLink.value);