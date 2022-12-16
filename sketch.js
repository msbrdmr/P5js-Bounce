let yoffset = 100;
let random = Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1) / 10;
let multiplier = 0.05;
let ball = [];
let mousePos;
let forceDir;
let fullscreenButton;
let generateButton;
let resetGravityButton;
let checkBox;
let firstPos;
let secondPos;
let dive;
let controlMode = false;
let element = document.querySelector("#container");

let val;
let sliderText;
let slider;

// make the element go to full-screen mode


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0, 10, 40)
	ball.push(new Ball(10, yoffset + 200, yoffset, 100, 0, 0));
	mousePos = new Vector(0, 0);
	fullscreenButton = createButton('Fullscreen', false);
	fullscreenButton.mousePressed(fullscreen);
	fullscreenButton.position(0, 0);

	resetGravityButton = createButton("Reset Gravity");
	resetGravityButton.position(227, 0);
	resetGravityButton.mousePressed(resetGravity);

	

	checkBox = createCheckbox()
	checkBox.changed(checkEvent);

	generateButton = createButton("Generate Ball")
	generateButton.position(100, 0)
	generateButton.mousePressed(generateBall)


	slider = createSlider(0, 255, 100);
	slider.position(130, 65);
	slider.style('width', '120px');
	slider.input(updateGravity);


	dive = 0.01;
}


function draw() {
	frameRate(144);
	background(123, 4, 40)

	checkBox.position(width - 40, 8);

	noStroke();
	textSize(20)
	text("Mode", width - 100, 25)
	textSize(32)
	text("Gravity ", 0, 80)
	textSize(20)
	text((slider.value() * (98 * 0.001)).toFixed(2), 150 + slider.width, 80)
	if (ball.length != 0) {
		ball.forEach(eachball => {
			eachball.physics();
			for (let other of ball) {
				if (eachball.id == other.id) continue;
				if (DoCirclesOverlap(eachball.pos.x, eachball.pos.y, eachball.R, other.pos.x, other.pos.y, other.R)) {
					eachball.collision(other);
				}
			}
		});
	}

}

function checkEvent() {
	if (checkBox.checked()) {
		controlMode = true;
	} else {
		controlMode = false;
	}
}

function DoCirclesOverlap(x1, y1, r1, x2, y2, r2) {
	return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) <= r1 / 2 + r2 / 2
}

// function mouseDragged() { generateBall() }
function mousePressed() {
	firstPos = new Vector(mouseX, mouseY);
	mousePos = mousePos.add(firstPos)
}
function mouseReleased() {
	secondPos = new Vector(mouseX, mouseY);
	let first = [firstPos.x, firstPos.y]
	let second = [secondPos.x, secondPos.y]
	let diffArray = new Array(2);
	diffArray[0] = (secondPos.x - firstPos.x);
	diffArray[1] = (secondPos.y - firstPos.y);

	forceDir = new Vector(multiplier * diffArray[0], multiplier * diffArray[1])

	if (ball.length != 0) {
		ball.forEach(element => {

			if (firstPos.x < element.pos.x + element.R / 2 &&
				firstPos.x > element.pos.x - element.R / 2 &&
				firstPos.y < element.pos.y + element.R / 2 &&
				firstPos.y > element.pos.y - element.R / 2 && controlMode) {
				element.thrust(forceDir);
			}
			else if (!controlMode) element.thrust(forceDir);
		});
	}
} function fullscreen() {
	var full_screen_element = document.fullscreenElement;
}

function generateBall() {
	let ran = Math.random();
	ball.push(new Ball(5, ran * windowWidth, mouseY, 100, 0, 0));
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function updateGravity() {
	ball.forEach(element => {
		element.gravity = new Vector(0, slider.value() * (5 * 0.001));
	});
}

function resetGravity() {
	slider.value(100);
}