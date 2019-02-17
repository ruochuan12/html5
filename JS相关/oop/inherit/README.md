用过`React`的读者知道，经常用`extends`继承`React.Component`。

```
// 部分源码
function Component(props, context, updater) {
  // ...
}
Component.prototype.setState = function(partialState, callback){
    // ...
}
const React = {
    Component,
    // ...
}
// 使用
class index extends React.Component{
    // ...
}
```
[点击这里查看 React github源码](https://github.com/facebook/react/blob/master/packages/react/src/ReactBaseClasses.js)

面试官可以顺着这个问`JS`继承的相关问题，比如：**`es6`的`class`继承用es5如何实现**。据说很多人答得不好。<br/>
### 构造函数、原型对象和实例之间的关系

要弄懂extends继承之前，先来复习一下构造函数、原型对象和实例之间的关系。
代码表示：
```
function f(){}
var F = new f();
// 构造器
f.prototype.constructor === f; // true
f.__proto__ === Function.prototype;
Function.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null; // true

// 实例
F.__proto__ === f.prototype; // true
f.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null; // true
```
笔者画了一张图表示：
![构造函数-原型对象-实例关系图By@若川](https://user-gold-cdn.xitu.io/2019/2/17/168fb9af13e33adf?w=1058&h=596&f=png&s=59763)
### `ES6 extends` 继承做了什么操作
我们先看看这段包含静态方法的`ES6`继承代码：
```
// ES6
class Parent{
    constructor(name){
        this.name = name;
    }
    static sayHello(){
        console.log('hello');
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
console.log('parent: ', parent); // parent:  Parent {name: "Parent"}
Parent.sayHello(); // hello
parent.sayName(); // my name is Parent
console.log('child: ', child); // child:  Child {name: "Child", age: 18}
Child.sayHello(); // hello
child.sayName(); // my name is Child
child.sayAge(); // my age is 18
```
其中这段代码里有两条原型链，不信看具体代码。
```
// 1、构造器原型链
Child.__proto__ === Parent; // true
Parent.__proto__ === Function.prototype; // true
Function.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null; // true
// 2、实例原型链
child.__proto__ === Child.prototype; // true
Child.prototype.__proto__ === Parent.prototype; // true
Parent.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null; // true
```
一图胜千言，笔者也画了一张图表示，如图所示：

![ES6继承(extends)关系图By@若川](https://user-gold-cdn.xitu.io/2019/2/17/168fb9a3828f9cb4?w=1188&h=1007&f=png&s=107996)
结合代码和图可以知道。
`ES6 extends` 继承，主要就是：
- 1、把子类构造函数(`Child`)的原型(`__proto__`)指向了父类构造函数(`Parent`)，
- 2、把子类实例`child`的原型对象(`Child.prototype`) 的原型(`__proto__`)指向了父类`parent`的原型对象(`Parent.prototype`)。

也就是图中用不同颜色标记的两条线。

```

```

## 


### 推荐阅读
[JavaScript高级程序设计第3版-第6章 面向对象的程序设计]() 6种继承的方案。

[JavaScript面向对象编程第2版-第6章 继承]() 12种继承的方案。

[ES6标准入门-第21章class的继承](http://es6.ruanyifeng.com/#docs/class-extends)

[深入理解ES6-第9章 JavaScript中的类]()

[你不知道的JavaScript-上卷-第6章 行为委托和附录A ES6中的class]()


## 备忘
[nodejs utils inherits](https://github.com/nodejs/node/blob/master/lib/util.js#L295-L313)
