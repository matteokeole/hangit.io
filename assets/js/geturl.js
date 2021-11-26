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
console.log(get_data('server.php?allmessage=1'));
