const SetNickname = (nickname) => {
	// Test for empty or blank nickname
	if (/^\s*$/.test(nickname)) Player.nickname = Player.defaultNickname;
	else Player.nickname = nickname;
	localStorage.setItem("nickname", Player.nickname)
}