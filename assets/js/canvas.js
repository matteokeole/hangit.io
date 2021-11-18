// Canvas init
const canvas = document.querySelector("#canvas"),
ctx = canvas.getContext("2d");
ctx.canvas.width = 400;
ctx.canvas.height = 400;

const togglePart = function(part, toggle) {
	// Toggle part on/off
	// Set color
	if (toggle === 1) {
		ctx.fillStyle = "#000";
		ctx.strokeStyle = "#000"
	} else {
		ctx.fillStyle = "#aaa";
		ctx.strokeStyle = "#aaa"
	}
	// Show/hide part
	ctx.lineWidth = 4;
	ctx.beginPath();
	switch (part) {
		case 1:
		case "ground":
			// Ground
			ctx.fillRect(100, 350, 100, 4);
			break;
		case 2:
		case "vertical":
			// Vertical pillar
			ctx.fillRect(148, 100, 4, 250);
			break;
		case 3:
		case "horizontal":
			// Horizontal wood
			ctx.fillRect(150, 100, 130, 4);
			break;
		case 4:
		case "diagonal":
			// Diagonal wood
			ctx.moveTo(150, 152);
			ctx.lineTo(198, 102);
			ctx.stroke();
			break;
		case 5:
		case "rope":
			// Rope
			ctx.fillRect(280, 100, 4, 50);
			break;
		case 6:
		case "head":
			// Head
			ctx.arc(282, 170, 20, 0, 2 * Math.PI, false);
			ctx.stroke();
			break;
		case 7:
		case "body":
			// Body
			ctx.fillRect(280, 190, 4, 60);
			break;
		case 8:
		case "arm1":
			// Left arm
			ctx.moveTo(282, 196);
			ctx.lineTo(260, 220);
			ctx.stroke();
			break;
		case 9:
		case "arm2":
			// Right arm
			ctx.moveTo(282, 196);
			ctx.lineTo(304, 220);
			ctx.stroke();
			break;
		case 10:
		case "foot1":
			// Left foot
			ctx.moveTo(282, 246);
			ctx.lineTo(276, 280);
			ctx.stroke();
			break;
		case 11:
		case "foot2":
			// Right foot
			ctx.moveTo(282, 246);
			ctx.lineTo(290, 280);
			ctx.stroke();
			break
	}
	ctx.closePath()
}

togglePart("ground", 1);
togglePart("vertical", 1);
togglePart("horizontal", 1);
togglePart("diagonal", 1);
togglePart("rope", 1);
togglePart("head", 0);
togglePart("body", 0);
togglePart("arm1", 0);
togglePart("arm2", 0);
togglePart("foot1", 0);
togglePart("foot2", 0)