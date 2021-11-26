let curent_url = document.location.href;
queue_url = curent_url.substring (curent_url.lastIndexOf( "/" )+1 );
console.log(queue_url);
