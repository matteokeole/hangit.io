<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	header("Content-type: text/html; charset=UTF-8"); 
	header("Access-Control-Allow-Headers: X-Requested-With");
	// Server methods
	class Game_Server {
		private $bdd, $game, $chat, $player, $hiddenword;
		// Constructor
		function __construct() {
			$this->bdd = new PDO("mysql:host=mysql-m2x.alwaysdata.net;dbname=m2x_game", "m2x", "moul_976");
			$this->bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		// Create new game
		public function Set_Game($round_number, $max_player, $player_activ, $link_game): void {
			$setmessage = $this->bdd->prepare("INSERT INTO `game` (round_number, max_player, player_activ, link_game) VALUES (?, ?, ?, ?)");
			$setmessage->execute(array($round_number, $max_player, $player_activ, $link_game));
			$this->game = $this->getgame($link_game);
		}
		public function Edit_Game($round_number, $max_player, $player_activ, $link_game): void {
			$setmessage = $this->bdd->prepare("UPDATE `game` SET round_number = ?, max_player = ?, player_activ = ? WHERE id_game = ?");
			$setmessage->execute(array($round_number, $max_player, $player_activ, $this->getgame($link_game)));
		}

		// public function getgame($link_game): string {
		// 	$setgame = $this->bdd->query("SELECT id_game FROM `game` where link_game = $link_game");
		// 	$value = $setgame->fetch();
		// 	return $value;
		// }
		public function getgame($game_url): string {
			$setgame = $this->bdd->query("SELECT id_game FROM `game` where link_game = $game_url");
			$value = $setgame->fetch();
			return $value['id_game'];
		}
		public function geturlgame($link_game): string {
			$setgame = $this->bdd->query("SELECT link_game FROM `game` WHERE id_game = " . $this->getgame($link_game));
			$value = $setgame->fetch();
			return $value;
		}
		public function url_existe($url) {
			$url_existe = $this->bdd->prepare("SELECT * from game WHERE link_game = ?");
			$url_existe->execute(array($url));
			return $url_existe->rowCount();
		}
		public function getchat(): string {
			$setgame = $this->bdd->query("SELECT * FROM `chat` ORDER BY id_chat DESC LIMIT 1");
			$value = $setgame->fetch();
			return $value["id_chat"];
		}
		// Write message in chat
		public function Setmessage($text, $player, $link): void {
			$setmessage = $this->bdd->prepare("INSERT INTO message (text,id_game,id_player) VALUES (?,(SELECT id_game FROM game WHERE right(game.link_game,13) = ?),(SELECT id_player FROM player JOIN game ON game.id_game=player.id_game WHERE nickname = ? AND right(game.link_game,13) = ?));");
			$setmessage->execute(array($text,$link,$player,$link));
		}
		/*public function Setmessage($text, $nickname): void {
			$setmessage = $this->bdd->prepare("INSERT INTO message (text, id_game, id_player) VALUES (?, ?, ?)");
			$setmessage->execute(array($text,$this->getgame(),getplayer($nickname)));
		}*/
		public function getplayer($player): string {
			$setgame = $this->bdd->query("SELECT id_player FROM player where id_game = " . $this->getgame($link_game));
			$value = $setgame->fetch();
			return $value["id_player"];
		}
		public function Edit_score($name, $score,$link_game): void {
			$setmessage = $this->bdd->prepare("UPDATE `player` SET score = ? WHERE id_game = ? and id_player=?");
			$setmessage->execute(array($name, $this->getgame($link_game),$this->getplayer($name)));
		}
		/*public function get_score_player($name): string {
			$setgame = $this->bdd->prepare("SELECT score FROM `player` WHERE id_player = ? AND id_game = ? LIMIT 1");
			$setgame->execute(array($name, $this->getgame()));
			$value = $setgame->fetch();
			return $value["score"];
		}
		public function get_score_player(): string {
			$setgame = $this->bdd->prepare("SELECT score FROM `player` WHERE id_player = ? AND id_game = ? LIMIT 1");
			$setgame->execute(array($this->getplayer(), $this->getgame()));
			$value = $setgame->fetch();
			return $value["score"];
		}*/
		public function Setplayer($name, $score, $nicknameColor, $link_game, $roundPlayer) {
			$setmessage = $this->bdd->prepare("INSERT INTO `player` (nickname, score, id_game, nicknameColor, roundPlayer) VALUES (?, ?, ?, ?, ?)");
			$setmessage->execute(array($name, $score, $this->getgame($link_game), $nicknameColor, $roundPlayer));
			// $this->player = $this->getplayer();
			return true;
		}
		public function Setplayer_on_partie($name, $game_url, $score) {
			$setmessage = $this->bdd->prepare("INSERT INTO `player` (nickname, id_game, score) VALUES (?, (SELECT id_game FROM game WHERE link_game = ?), ?);");
			$setmessage->execute(array($name,$game_url,$score));
			// $this->player = $this->getplayer();
			return true;
		}
		public function Edit_player($name, $score, $link_game): void {
			$setmessage = $this->bdd->prepare("UPDATE `player` SET nickname = ?, score = ? WHERE id_player = ?");
			$setmessage->execute(array($name, $score, $this->getplayer($link_game)));
		}
		public function get_all_message_game($game) {
			$getmessage = $this->bdd->prepare("SELECT message.text, player.nickname, player.nicknameColor FROM `player` JOIN `message` ON message.id_player = player.id_player JOIN `game` ON game.id_game = player.id_game WHERE game.link_game = ?;");
			$getmessage->execute(array($game));
			$value = $getmessage->fetchAll();
			/*$value = array();
			while ($g = $getmessage->fetch()) {
				$value[] = [
					$g["nickname"] => [
						"text" => $g["text"],
						"color" => $g["nicknameColor"]
					]
				];
			}*/
			return $value;
		}
		public function set_hidden_word($word, $player, $link_game): void {
			$setmessage = $this->bdd->prepare("INSERT INTO `hidden_word` (word, id_player) VALUES (?, ?)");
			$setmessage->execute(array($word, $this->getplayer($player)));
			$this->hiddenword = $this->gethiddenword($link_game);
		}
		public function get_all_player_game($game) {
			$getmessage = $this->bdd->prepare("SELECT player.nickname, player.nicknameColor, player.score, player.roundPlayer FROM `player` JOIN `game` ON player.id_game = game.id_game WHERE game.link_game = ?");
			$getmessage->execute(array($game));
			$value = $getmessage->fetchAll();
			return $value;
		}
		public function gethiddenword($link_game) {
			$setgame = $this->bdd->query("SELECT word FROM `hidden_word` WHERE id_player = " . $this->getplayer($link_game) . " ORDER BY id_player DESC LIMIT 1");
			$value = $setgame->fetch();
			return $value["word"];
		}
		public function get_round($game) {
			$setgame = $this->bdd->query("SELECT count(id_round) FROM `round` JOIN `game` ON game.id_game = round.id_game WHERE link_game = " . $game . ";");
			$value = $setgame->fetch();
			return $value;
		} 
		public function set_round($game) {
			$setmessage = $this->bdd->prepare("INSERT INTO `round` (id_game) VALUES ((SELECT id_game from `game` where link_game = ?))");
			$setmessage->execute(array($game));
			// $this->round = $this->getround($game);
		}
		/*public function set_put_player_in_round($game, $player) {
			// En cours
			// $setplayerinround = $this->bdd->prepare("INSERT INTO `round_player` (id_player, id_round) VALUES ((SELECT id_player FROM `player` JOIN `game` ON game.id_game = player.id_game WHERE link_game = "http://localhost/hangit.io/?s1638270215336"), (SELECT id_round FROM `round` JOIN `game` ON game.id_game = round.id_game WHERE link_game = "http://localhost/hangit.io/?g=1638270215336"));");
		}*/
	}
	// Game server
	$Partie = new Game_Server();
	if (isset($_POST["link_game"])) {
		$Link_game = htmlspecialchars($_POST["link_game"]);
		if ($Partie->url_existe($Link_game)) echo "erreur lien existe";
		else {
			$Partie->Set_Game("0", "0", "0", $Link_game);
			echo true;
		}
	}
	/*if (isset($_POST["message"], $_POST["nickmane"])) {
		$message = htmlspecialchars($_POST["message"]);
		$Partie->Setmessage($message, $_POST["nickmane"]);
		echo true;
	}*/
	if (isset($_POST["set_round"])) {
		$setround = $_POST["set_round"];
		$Partie->$setround($setround);
		echo true;
	}
	if (isset($_POST["url"], $_POST["nickname"], $_POST["color"], $_POST['roundPlayer'])) {
		$url = htmlspecialchars($_POST["url"]);
		$nickname = htmlspecialchars($_POST["nickname"]);
		$nicknameColor = htmlspecialchars($_POST["color"]);
		$Partie->Edit_Game("0", "0", "1", $url);
		$Partie->Setplayer($nickname, "0", $nicknameColor, $url, $_POST['roundPlayer']);
		echo true;
	}
	if (isset($_POST["invite"], $_POST["joinlink"])) {
		$joinlink = htmlspecialchars($_POST["joinlink"]);
		$invite = htmlspecialchars($_POST["invite"]);
		$Partie->Setplayer_on_partie($invite, $joinlink, "0");
		echo true;
	}
	if (isset($_POST["maxRounds"], $_POST["url"])) {
		$link_game = htmlspecialchars($_POST["url"]);
		$maxRounds = htmlspecialchars($_POST["maxRounds"]);
		$Partie->Edit_Game($maxRounds, "4", "1", $link_game);
		echo true;
	}
	if (isset($_POST["word"], $_POST["player"], $_POST["url"])) {
		$link_game = htmlspecialchars($_POST["url"]);
		$word = htmlspecialchars($_POST["word"]);
		$player = htmlspecialchars($_POST["player"]);
		$Partie->set_hidden_word($word, $player, $link_game);
		echo true;
	}
	if (isset($_POST["message"], $_POST["authorName"], $_POST["url"])) {
		$message = htmlspecialchars($_POST["message"]);
		$authorName = htmlspecialchars($_POST["authorName"]);
		$Partie->Setmessage($message, $authorName, $_POST["url"]);
		echo true;
	}
	if (isset($_GET["getallplayer"])) {
		$getallplayer = htmlspecialchars($_GET["getallplayer"]);
		$Partie->get_all_player_game($getallplayer);
		echo json_encode($Partie->get_all_player_game($getallplayer));
	}
	if (isset($_GET["liens"])) {
		$mon_liens = htmlspecialchars($_GET["liens"]);
		$arrayName = array("liens" => $Partie->url_existe($mon_liens));
		echo json_encode($arrayName);
	}
	if (isset($_GET["getmessage"])) {
		$getmessage = htmlspecialchars($_GET["getmessage"]);
		// $arrayName = array("o" => $Partie->get_all_message_game($getmessage));
		echo json_encode($Partie->get_all_message_game($getmessage));
	}
?>