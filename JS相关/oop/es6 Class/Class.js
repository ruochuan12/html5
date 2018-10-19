function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
console.log(p, 'p');

//定义类
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

Point.prototype.sum = (x, y) => {
    return x + y;
}

var p = new Point(1, 2);
console.log(p, 'p');
var result = p.sum(12,3);
console.log(result);
var keys = Object.keys(Point.prototype);
console.log(keys);
// sum
var names = Object.getOwnPropertyNames(Point.prototype);
console.log(names);
// ["constructor","toString"]

class A {
    constructor() {
        console.log(new.target.name);
    }
}
class B extends A {
    constructor() {
        super();
    }
}
new A() // A
new B() // B

