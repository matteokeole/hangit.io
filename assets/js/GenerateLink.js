// Generate unique link function
const GenerateLink = () => {return (new Date()).getTime()};

// Generate game link
Input.invitationLink.value = `https://matteoo34.github.io/hangit.io/?g=${GenerateLink()}`;

// Generate game link (local test)
// Input.invitationLink.value = `http://localhost:1000/?g=${GenerateLink()}`;

// Send player nickname to server
sendData("Link_game", Input.invitationLink.value)