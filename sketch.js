let yoffset = 100;
let random = Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1) / 10;
let multiplier = 50;
let ball = [];
let mousePos;
let forceDir;
let button;
let firstPos;
let secondPos;

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
	ball.push(new Ball(yoffset, yoffset, 50));
	ball.push(new Ball(yoffset + 200, yoffset, 50));
	mousePos = createVector(0, 0);
	button = createButton('Fullscreen');
	button.position(0, 0);
	button.mousePressed(fullscreen);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
function draw() {
	frameRate(144);
	// console.log(windowWidth,windowHeight);

	background(0, 10, 40)
	if (ball.length != 0) {
		ball.forEach(element1 => {
			element1.physics();
		});
	}

}
function keyPressed() {
	if (keyCode == CONTROL) {
		ball.push(new Ball(mouseX, mouseY, 50, width / mouseX, height / mouseY));
	}

}

function mousePressed() {
	firstPos = createVector(mouseX, mouseY);
	mousePos.add(firstPos)
}
function mouseReleased() {
	secondPos = createVector(mouseX, mouseY);
	let first = [firstPos.x, firstPos.y]
	let second = [secondPos.x, secondPos.y]
	console.log("firstPos: " + first + "\n" + "second: " + second);
	let diffArray = new Array(2);
	diffArray[0] = (secondPos.x - firstPos.x) / windowWidth;
	diffArray[1] = (secondPos.y - firstPos.y) / windowHeight;

	console.log("\ndiff: " + diffArray);
	forceDir = createVector(multiplier * diffArray[0], multiplier * diffArray[1])

	if (ball.length != 0) {
		ball.forEach(element => {

			if (firstPos.x < element.pos.x + element.rad / 2 &&
				firstPos.x > element.pos.x - element.rad / 2 &&
				firstPos.y < element.pos.y + element.rad / 2 &&
				firstPos.y > element.pos.y - element.rad / 2) {

				element.thrust(forceDir);
			}
		});
	}
}