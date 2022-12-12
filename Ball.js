class Ball {
    constructor(m, x, y, R, Vx, Vy) {
        this.R = R;
        this.b = 0.8;
        this.m = m;
        this.pos = new Vector(x, y);
        this.v = new Vector(Vx, Vy);
        this.gravity = new Vector(0, 0.8);
        this.color = color("#1dd35e");
        this.id = ball.length+1;
    }
    physics() {
        fill(this.color);
        stroke(255);
        strokeWeight(2.5);
        circle(this.pos.x, this.pos.y, this.R)

        this.v = this.v.add(this.gravity);
        this.pos = this.pos.add(this.v);

        if (this.pos.y + this.R / 2 > height) {
            this.pos.y = height - this.R / 2
            this.v.x *= +this.b;
            this.v.y *= - this.b;
        } else if (this.pos.y < this.R / 2) {
            this.pos.y = this.R / 2
            this.v.y *= - 1;
        }

        if (this.pos.x > width - this.R / 2) {
            this.v.x *= - this.b;
            this.pos.x = width - this.R / 2
        }
        else if (this.pos.x < this.R / 2) {
            this.v.x *= - this.b;
            this.pos.x = this.R / 2
        }
    }
    thrust(vector) {
        this.v = this.v.add(vector);
    }

    collision(other) {

        let distance = other.pos.sub(this.pos);
        let fOverlap = 0.5 * (distance.mag() - this.R / 2 - other.R / 2);
        //Displace current ball
        this.pos.x -= fOverlap * (this.pos.x - other.pos.x) / distance.mag();
        this.pos.y -= fOverlap * (this.pos.y - other.pos.y) / distance.mag();
        //Displace target ball
        other.pos.x += fOverlap * (this.pos.x - other.pos.x) / distance.mag();
        other.pos.y += fOverlap * (this.pos.y - other.pos.y) / distance.mag();

        this.v = this.v.add(distance.mult(-1).mult(dive));
        other.v = other.v.add(distance.mult(dive));

    }
}

function getOne(number) {
    if (number < 0) {
        return 1;
    } else return -1;
}