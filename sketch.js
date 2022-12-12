let yoffset = 100;
let random = Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1) / 10;
let multiplier = 50;
let ball = [];
let mousePos;
let forceDir;
let button;
let firstPos;
let secondPos;
let dive;
let element = document.querySelector("#container");

// make the element go to full-screen mode
function fullscreen() {
	var full_screen_element = document.fullscreenElement;

	// If no element is in full-screen
	if (full_screen_element !== null)
		console.log('FullScreen mode is activated');
	else
		console.log('FullScreen mode is not activated');
}




function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0, 10, 40)
	ball.push(new Ball(1, yoffset, yoffset, 100, 0, 0));
	ball.push(new Ball(1, yoffset + 200, yoffset, 100, 0, 0));
	ball.push(new Ball(1, yoffset + 400, yoffset, 100, 0, 0));
	mousePos = new Vector(0, 0);
	button = createButton('Fullscreen');
	button.position(0, 0);
	button.mousePressed(fullscreen);
	dive = 0.01;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
function draw() {
	frameRate(144);
	background(123, 4, 40)
	if (ball.length != 0) {
		ball.forEach(eachball => {
			eachball.physics();
			for (let other of ball) {
				if (other == eachball) continue;
				eachball.collision(other);
			}
		});
	}

}
function keyPressed() {
	if (keyCode == CONTROL) {
		ball.push(new Ball(1, mouseX, mouseY, 100, 0, 0));
	}

}

function mousePressed() {
	firstPos = new Vector(mouseX, mouseY);
	mousePos = mousePos.add(firstPos)
}
function mouseReleased() {
	secondPos = new Vector(mouseX, mouseY);
	let first = [firstPos.x, firstPos.y]
	let second = [secondPos.x, secondPos.y]
	console.log("firstPos: " + first + "\n" + "second: " + second);
	let diffArray = new Array(2);
	diffArray[0] = (secondPos.x - firstPos.x) / windowWidth;
	diffArray[1] = (secondPos.y - firstPos.y) / windowHeight;

	console.log("\ndiff: " + diffArray);
	forceDir = new Vector(multiplier * diffArray[0], multiplier * diffArray[1])

	if (ball.length != 0) {
		ball.forEach(element => {

			if (firstPos.x < element.pos.x + element.R / 2 &&
				firstPos.x > element.pos.x - element.R / 2 &&
				firstPos.y < element.pos.y + element.R / 2 &&
				firstPos.y > element.pos.y - element.R / 2) {
					
				element.thrust(forceDir);
			}
		});
	}
}