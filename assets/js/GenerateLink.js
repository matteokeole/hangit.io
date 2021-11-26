// Generate unique link function
const GenerateLink = () => {return (new Date()).getTime()};

// Generate game link
Input.invitationLink.value = `https://matteoo34.github.io/hangit.io/?g=${GenerateLink()}`