<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	header("Content-type: text/html; charset=UTF-8"); 
	header("Access-Control-Allow-Headers: X-Requested-With");
	$pop = $_POST["value"];
	// New connection
	include "db.php";
	$pdo = new PDO("mysql:host=" . $host . ";dbname=" . $db, $user, $pwd);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	// Get row count
	$rows = $pdo->query("SELECT count(*) FROM `test`;")->fetchColumn();
	if ($rows > 0) $pdo->query("UPDATE `test` SET le_truc = $pop WHERE id = 1;");
	else $pdo->query("INSERT INTO `test` (le_truc) VALUES($pop);");
	echo $rows;
?>