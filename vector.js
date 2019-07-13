class Vec {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    plus(vect) {
        let sumOfX = this.x + vect.x;
        let sumOfY = this.y + vect.y;
        return new Vec(sumOfX, sumOfY);
    }
    minus(vect) {
        let diffOfX = this.x - vect.x;
        let diffOfY = this.y - vect.y;
        return new Vec(diffOfX, diffOfY);
    }
    get length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
}

let value = new Vec(3,4);
let value2 = new Vec(2,4);
console.log(value.length);