<?php
$connection = new mysqli('localhost','root','','ewa','3306');
$resultat=$connection->query('SELECT * FROM `test`');// ==> false : objet
//$connection->connect_error();
//$connection->close();
$row=$resultat->fetch_array( MYSQLI_ASSOC );
$tab= array('le_truc' =>$row['le_truc']);
$response=json_encode($tab);
//echo "$nonbre".$row['nom']." ".$row['prenom']."<br>";
echo $response;



?>