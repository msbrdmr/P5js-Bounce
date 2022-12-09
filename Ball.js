class Ball {
    constructor(x, y, rad, Vx, Vy) {
        this.rad = rad;
        this.b = 0.8;
        this.pos = createVector(x, y);
        this.v = createVector(Vx, Vy);
        this.gravity = createVector(0, 0.5);
        this.color = color(123, 255, 31);
    }
    physics() {
        fill(this.color);
        stroke(0);
        strokeWeight(5);
        circle(this.pos.x, this.pos.y, this.rad)

        this.v.add(this.gravity);
        this.pos.add(this.v);

        if (this.pos.y + this.rad / 2 > height) {
            this.pos.y = height - this.rad / 2
            this.v.x *= +this.b;
            this.v.y *= - this.b;
        } else if (this.pos.y < this.rad / 2) {
            this.pos.y = this.rad / 2
            this.v.y *= - 1;
        }

        if (this.pos.x > width - this.rad / 2) {
            this.v.x *= - this.b;
            this.pos.x = width - this.rad / 2
        }
        else if (this.pos.x < this.rad / 2) {
            this.v.x *= - this.b;
            this.pos.x = this.rad / 2
        }
    }
    thrust(vector) {
        this.v.add(vector);
    }

    collision(other) {
        if (Math.sqrt(sq(this.pos.y - other.pos.y) + sq(this.pos.x - other.pos.x)) < this.rad + other.rad)
            fill(19, 243, 228);
    }
}