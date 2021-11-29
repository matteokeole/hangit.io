const SetNickname = (nickname) => {
	// Test for empty or blank nickname
	if (/^[A-Za-zÀ-ú-_ ]*$/.test(nickname)) {
		// Blank nickname
		if (/^\s*$/.test(nickname)) {
			// Guest player
			Player.nickname = Player.defaultNickname;
			// Send player nickname to server
			sendData("First_player", Player.nickname);
			localStorage.removeItem("nickname")
		} else {
			Player.nickname = nickname;
			// Send player nickname to server
			sendData("First_player", Player.nickname);
			localStorage.setItem("nickname", Player.nickname)
		}
	} else {
		// Guest player
		Player.nickname = Player.defaultNickname;
		// Send player nickname to server
		sendData("First_player", Player.nickname);
		localStorage.removeItem("nickname")
	}
}