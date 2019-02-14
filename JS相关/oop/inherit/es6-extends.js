// ES6
class Parent{
    constructor(name){
        this.name = name;
    }
    sayName(){
        console.log('my name is ' + this.name);
        return this.name;
    }
}
class Child extends Parent{
    constructor(name, age){
        super(name);
        this.age = age;
    }
    sayAge(){
        console.log('my age is ' + this.age);
        return this.age;
    }
}
let parent = new Parent('Parent');
let child = new Child('Child', 18);
console.log('parent: ', parent);
parent.sayName();
console.log('child: ', parent);
child.sayName();
child.sayAge();