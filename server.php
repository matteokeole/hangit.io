<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	header("Content-type: text/html; charset=UTF-8"); 
	header("Access-Control-Allow-Headers: X-Requested-With");

	class Game_Server {
		private $bdd, $game, $chat, $player, $hiddenword;
		// Constructor
		function __construct() {
			$this->bdd = new PDO("mysql:host=mysql-m2x.alwaysdata.net;dbname=m2x_game", "m2x", "moul_976", array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
			$this->bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		// Create new game
		public function Set_Game($round_number, $max_player, $player_activ, $link_game) :void {
			$setmessage = $this->bdd->prepare("INSERT INTO `game` (round_number, max_player, player_activ, link_game) VALUES (?, ?, ?, ?)");
			$setmessage->execute(array($round_number, $max_player, $player_activ, $link_game));
			$this->game = $this->getgame();
		}
		public function Edit_Game($round_number, $max_player, $player_activ) :void {
			$setmessage = $this->bdd->prepare("UPDATE `game` SET round_number = ?, max_player = ?, player_activ = ? WHERE id_game = ?");
			$setmessage->execute(array($round_number, $max_player, $player_activ, $this->getgame()));
		}
		public function getgame() :string {
			$setgame = $this->bdd->query("SELECT * FROM `game` ORDER BY id_game DESC LIMIT 1");
			$value = $setgame->fetch();
			return $value["id_game"];
		}
		public function geturlgame():string
		{
			$setgame=$this->bdd->query('SELECT * from game order by id_game desc limit 1');
			$value=$setgame->fetch();
			return $value['link_game'];
		}
		public function url_existe($url)
		{
			$url_existe=$this->bdd->prepare('SELECT * from game WHERE link_game =?');
			$url_existe->execute(array($url));
			return $url_existe->rowCount();

		}
		public function getchat() :string {
			$setgame = $this->bdd->query("SELECT * FROM `chat` ORDER BY id_chat DESC LIMIT 1");
			$value = $setgame->fetch();
			return $value["id_chat"];
		}
		// Write message in chat
		public function Setmessage($text) :void {
			$setmessage = $this->bdd->prepare("INSERT INTO `message` (text, id_game, id_player) VALUES (?, ?, ?)");
			$setmessage->execute(array($text, $this->getgame(), $this->getplayer()));
		}
		public function getplayer() :string {
			$setgame = $this->bdd->query("SELECT * FROM `player` ORDER BY id_player DESC LIMIT 1");
			$value = $setgame->fetch();
			return $value["id_player"];
		}
		public function get_score_player($name) :string {
			$setgame = $this->bdd->prepare("SELECT score FROM `player` WHERE nickname = ? AND id_game = ? LIMIT 1");
			$setgame->execute(array($name, $this->getgame()));
			$value = $setgame->fetch();
			return $value["score"];
		}
		public function Setplayer($name, $score, $color) {
			$setmessage = $this->bdd->prepare("INSERT INTO `player` (nickname, score, id_game, color) VALUES (?, ?, ?, ?)");
			$setmessage->execute(array($name, $score, $this->getgame(), $color));
			$this->player = $this->getplayer();
		    return true;
		}
		public function Setplayer_on_partie($name,$game_url,$score) {
			$setmessage = $this->bdd->prepare("INSERT INTO player (nickname,id_game,score) VALUES (?,(SELECT id_game FROM game WHERE link_game=?),?);");
			$setmessage->execute(array($name,$game_url,$score));
			#$this->player = $this->getplayer();
		    return true;
		}
		public function Edit_player($name, $score) :void {
			$setmessage = $this->bdd->prepare("UPDATE `player` SET nickname = ?, score = ? WHERE id_player = ?");
			$setmessage->execute(array($name, $score, $this->getplayer()));
		}
		public function get_all_message_game($game) {
			$getmessage = $this->bdd->prepare("SELECT player.nickname, message.text ,player.color FROM `player` JOIN `message` ON message.id_player=player.id_player JOIN `game` ON game.id_game = player.id_game WHERE game.link_game =?;");
			$getmessage->execute(array($game));
			$value = $getmessage->fetchAll();
			return $value;
		}
		public function set_hidden_word($word) :void {
			$setmessage = $this->bdd->prepare("INSERT INTO `hidden_word` (word, id_player) VALUES (?, ?)");
			$setmessage->execute(array($word, $this->getplayer()));
			$this->hiddenword = $this->gethiddenword();
		}
		public function get_all_player_game($game)
		{
			$getmessage=$this->bdd->prepare("SELECT player.nickname FROM `player` JOIN game ON player.id_game=game.id_game WHERE game.link_game=?");
			$getmessage->execute(array($game));
			$value=$getmessage->fetchAll();
			return $value;
		}
		public function gethiddenword() {
			$setgame = $this->bdd->query("SELECT word FROM `hidden_word` WHERE id_player = " . $this->getplayer() . " ORDER BY id_player DESC LIMIT 1");
			$value = $setgame->fetch();
			return $value["word"];
		}
/*
		public function ($value='')
		{
			# code...
		}*/
	}

	$Partie = new Game_Server();
	if (isset($_POST["Link_game"])) {
		$Link_game = htmlspecialchars($_POST["Link_game"]);
		if ($Partie->url_existe($Link_game )){
			echo "erreur lien existe";
		}else{
			$Partie->Set_Game("0", "0", "0", $Link_game);
			echo true;
		}
	}
	if (isset($_POST["First_player"], $_POST["color"])) {
		$First_player = htmlspecialchars($_POST["First_player"]);
		$color = htmlspecialchars($_POST["color"]);
		$Partie->Edit_Game("0", "0", "1");
		$Partie->Setplayer($First_player, "0", $color);
		echo true;
	}

   
	if (isset($_POST["invite"],$_POST['joinlink'])) {
		$joinlink = htmlspecialchars($_POST["joinlink"]);
		$invite = htmlspecialchars($_POST["invite"]);
		$Partie->Setplayer_on_partie($invite,$joinlink,'0');
		echo true;
	}

	if (isset($_POST["Max_Rounds"])) {
		$Max_Rounds = htmlspecialchars($_POST["Max_Rounds"]);
		$Partie->Edit_Game($Max_Rounds, "4", "1");
		echo true;
	}
	if (isset($_POST["Word"])) {
		$Word = htmlspecialchars($_POST["Word"]);
		$Partie->set_hidden_word($Word);
		echo true;
	}
	if (isset($_POST["message"])) {
		$message = htmlspecialchars($_POST["message"]);
		$Partie->Setmessage($message);
		echo true;
	}
	if (isset($_GET["allplayer"])) {
		echo json_encode($Partie->get_all_player_game());
	}
	if (isset($_GET['liens'])) {
		$mon_liens=htmlspecialchars($_GET['liens']);
		$arrayName = array('liens' => $Partie->url_existe($mon_liens));
		echo json_encode($arrayName);
	}
	/*
	if (isset($_GET['getmessage'])) {
		$getmessage=htmlspecialchars($_GET['getmessage']);
		//$arrayName = array('o' => $Partie->get_all_message_game($getmessage));
		echo json_encode($Partie->get_all_message_game($getmessage));
	}
	*/
	if (isset($_GET['getmessage'])) {
		$getmessage=htmlspecialchars($_GET['getmessage']);
		//$arrayName = array('o' => $Partie->get_all_message_game($getmessage));
		echo json_encode($Partie->get_all_message_game($getmessage));
	}
?>