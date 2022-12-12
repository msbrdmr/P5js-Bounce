class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        // this.x += v.x;
        // this.y += v.y;
        return new Vector(this.x + v.x, this.y + v.y)

    }

    sub(v) {
        // this.x -= v.x;
        // this.y -= v.y;
        return new Vector(this.x - v.x, this.y - v.y)
    }

    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    mult(n) {
        // this.x *= n;
        // this.y *= n;
        return new Vector(this.x * n, this.y * n)
    }

    normal() {
        return new Vector(-this.y, this.x).unit();
    }

    unit() {
        if (this.mag() === 0) {
            return new Vector(0, 0);
        } else {
            return new Vector(this.x / this.mag(), this.y / this.mag());
        }
    }
}