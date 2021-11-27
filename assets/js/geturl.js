<<<<<<< HEAD
let curent_url = document.location.href;
queue_url = curent_url.substring (curent_url.lastIndexOf( "/" )+1 );
console.log(queue_url);

function get_data(url) {
	let req = new XMLHttpRequest();
	//let url=url;
	req.open('GET', url);
	req.onreadystatechange = function() {
	if (req.readyState == 4 && req.status == 200) {
	    //let data = JSON.parse(req.responseText);
	    let data =req.responseText;
	    //return data;
	    console.log(data);
	    }
	    else{
	    	return "probleme server";
	    }
	}
	req.send();
}
/*

let req = new XMLHttpRequest();
let url="https://luha.alwaysdata.net/api/?hour=1";
req.open('GET', url);
req.onreadystatechange = function() {
if (req.readyState == 4 && req.status == 200) {
    let data = JSON.parse(req.responseText);
    let citation=data.citation;
    console.log(data);
}
}

req.send();
*/
console.log(get_data('https://m2x.alwaysdata.net/hangit/server.php?allmessage=1'));
=======
let current_url = document.location.href,
	queue_url = current_url.substring(current_url.lastIndexOf("/") + 1);
// console.log(queue_url);
// console.info(getData("https://m2x.alwaysdata.net/hangit/server.php?allmessage=1"))
>>>>>>> fb056af7cbf135c40e783a07ffd86df4fe2f870e
