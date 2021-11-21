<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-type: text/html; charset=UTF-8'); 
header('Access-Control-Allow-Headers: X-Requested-With');
$pop=$_POST['value'];
$connection = new mysqli('localhost','root','','ewa','3306');
$resultat=$connection->query('SELECT * FROM `test`');// ==> false : objet
$nonbre=$resultat->num_rows;
if ($nonbre >0) {
	$sql = "UPDATE test SET le_truc ='".$pop."' WHERE id=1;";
	$result = $connection->query($sql);
}else{
	$sql = 'INSERT INTO test (le_truc) VALUES($pop);' ;
	$result = $connexion->query( $sql ) ;
}
echo "$nonbre";
//echo $_POST['Mp'];
  ?>