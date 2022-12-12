let yoffset = 100;
let random = Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1) / 10;
let multiplier = 50;
let ball = [];
let mousePos;
let forceDir;
let button;
let button2;
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

function generateBall() {

	let ran = Math.random();
	console.log(ran);
	ball.push(new Ball(1, ran*windowWidth, mouseY, 100, 0, 0));


}




function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0, 10, 40)
	ball.push(new Ball(1, yoffset + 200, yoffset, 100, 0, 0));
	mousePos = new Vector(0, 0);
	button = createButton('Fullscreen');
	button.position(0, 0);
	button.mousePressed(fullscreen);
	button2 = createButton('GenerateBall');
	button2.position(100, 0);
	button2.mousePressed(generateBall);


	dive = 0.01;

	for (let i = 0; i < ball.length; i++) {
		console.log(ball[i].id);

	}
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
				if (eachball.id == other.id) continue;
				if (DoCirclesOverlap(eachball.pos.x, eachball.pos.y, eachball.R, other.pos.x, other.pos.y, other.R)) {
					console.log("coll");
					eachball.collision(other);


				}
			}
		});
	}

}

function DoCirclesOverlap(x1, y1, r1, x2, y2, r2) {
	return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) <= r1 / 2 + r2 / 2
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