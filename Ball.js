class Ball {
    constructor(x, y, rad) {
        this.rad = rad;
        this.b = 0.8;
        this.pos = createVector(x, y);
        this.v = createVector(5, 0);
        this.gravity = createVector(0, 0.5);
    }
    physics() {
        fill(255, 255, 0);
        stroke(0);
        strokeWeight(5);
        circle(this.pos.x, this.pos.y, this.rad)
a
        this.v.add(this.gravity);
        this.pos.add(this.v);

        if (this.pos.y + this.rad / 2 > height) {
            this.pos.y = height - this.rad / 2
            this.v.x *= +this.b;
            this.v.y *= - this.b;
        } else if (this.pos.y + this.rad / 2 < this.rad / 2) {
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
}