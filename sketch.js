let yoffset = 100;
let random = Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1) / 10;
let multiplier = 15;
let ball = [];
let mousePos;
let forceDir;
let button;

let element = document.querySelector("#container");

// make the element go to full-screen mode
function fullscreen() {
	element.requestFullscreen()
		.then(function () {
			// element has entered fullscreen mode successfully
		})
		.catch(function (error) {
			// element could not enter fullscreen mode
		});
}



function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0, 10, 40)
	ball.push(new Ball(yoffset, yoffset, 50));
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
	background(0, 10, 40)
	if (ball.length != 0) {
		ball.forEach(element => {
			element.physics();
		});
	}

}
function keyPressed() {
	let vector = createVector(0, -3);
	if (ball.length != 0) {
		ball.forEach(element => {
			element.thrust(vector);
		});
	}
}
function mousePressed() {
	let firstPos = createVector(mouseX, mouseY);
	mousePos.add(firstPos)
}
function mouseReleased() {
	let first = [width / mousePos.x, height / mousePos.y]
	mousePos.x = 0;
	mousePos.y = 0;
	let second = [width / mouseX, height / mouseY]
	console.log("first: " + first + "\n" + "second: " + second);
	let diffArray = new Array(2);
	diffArray[0] = first[0] - second[0];
	diffArray[1] = first[1] - second[1];
	console.log("\ndiff: " + diffArray);
	forceDir = createVector(multiplier * diffArray[0], multiplier * diffArray[1])

	if (ball.length != 0) {
		ball.forEach(element => {
			element.thrust(forceDir);
		});
	}
}