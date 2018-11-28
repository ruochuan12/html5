# 面试官问：能否模拟实现`JS`的`call`和`apply`方法

之前写过两篇[《面试官问：能否模拟实现`JS`的`new`操作符》](https://juejin.im/post/5bde7c926fb9a049f66b8b52)和[《面试官问：能否模拟实现`JS`的`bind`方法》](https://juejin.im/post/5bec4183f265da616b1044d7)

其中模拟`bind`方法时是使用的`call`和`apply`修改`this`指向。但面试官可能问：能否不用`call`和`apply`来实现呢。意思也就是需要模拟实现`call`和`apply`的了。
直接先看**例子1**
```
// **例子1**
// "use strict"
var doSth = function (name){
    var type = Object.prototype.toString.call(this);
    console.log('this === firstArg:',this === firstArg); // true
    // this.name = name;
    console.log('this:', this); // {name: '轩辕Rowboat', doSth: ƒ}
    console.log('this-type:', type); // [object Object]
    console.log('this.name:', this.name); // 轩辕Rowboat
    console.log('argName:', name); // argName
    return this;
};

var name = 'window';

var student = {
    name: '轩辕Rowboat',
    doSth: doSth,
};
// typeof 7种类型 undefined number string boolean symbol object function
var firstArg = student;
// var firstArg = null; // 非严格模式下 this指向window 严格模式下 指向 null
// var firstArg = undefined; // 非严格模式下 this指向window 严格模式下 指向 undefined
// var firstArg = 1; // this 指向 Number{1}
// var firstArg = '1'; // this 指向 String{1}
// var firstArg = true; // this 指向 Boolean{true}
// var firstArg = Symbol(); // this 指向 Symbol {Symbol()}
// var firstArg = {}; // this 指向 Object{}
// var firstArg = function f(){}; // this 指向 function f(){}

// var result = student.doSth('argName');
var result = student.doSth.call(firstArg, 'argName');
console.log('result:', result); // {name: '轩辕Rowboat', doSth: ƒ }
```
可以得出小结1：
直接搬出[MDN 文档 Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
**语法**
```
fun.call(thisArg, arg1, arg2, ...)
```
**thisArg**
在`fun`函数运行时指定的`this`值。需要注意的是，指定的`this`值并不一定是该函数执行时真正的`this`值，如果这个函数处于非严格模式下，则指定为`null`和`undefined`的`this`值会自动指向全局对象(浏览器中就是`window`对象)，同时值为原始值(数字，字符串，布尔值)的`this`会指向该原始值的自动包装对象。
**arg1, arg2, ...**
指定的参数列表
**返回值**
返回值是你调用的方法的返回值，若该方法没有返回值，则返回`undefined`。

再来看看`Function.prototype.call`的`ES5`规范和`MDN`文档吧。
```
```
[ES5中文规范 Function.prototype.call](http://yanhaijing.com/es5/#323)
>Function.prototype.call (thisArg [ , arg1 [ , arg2, … ] ] )
 当以 thisArg 和可选的 arg1, arg2 等等作为参数在一个 func 对象上调用 call 方法，采用如下步骤：

>1.如果 `IsCallable(func)` 是 `false`, 则抛出一个 `TypeError` 异常。
2.令 `argList` 为一个空列表。
3.如果调用这个方法的参数多余一个，则从 `arg1` 开始以从左到右的顺序将每个参数插入为 `argList` 的最后一个元素。
4.提供 `thisArg` 作为 `this` 值并以 `argList` 作为参数列表，调用 `func` 的 `[[Call]]` 内部方法，返回结果。
 `call` 方法的 `length` 属性是 `1`。

 >在外面传入的 thisArg 值会修改并成为 this 值。thisArg 是 undefined 或 null 时它会被替换成全局对象，所有其他值会被应用 ToObject 并将结果作为 this 值，这是第三版引入的更改。
// 知道这些很容易实现第一版本：

```
function getGlobal(){
    return this;
}
Function.prototype.callFn = function call(thisArg){ // `call` 方法的 `length` 属性是 `1`。
    // 1.如果 `IsCallable(func)` 是 `false`, 则抛出一个 `TypeError` 异常。
    if(typeof this !== 'function'){
        throw new TypeError(this + ' is not a function');
    }

    // 2.令 `argList` 为一个空列表。
    // 3.如果调用这个方法的参数多余一个，则从 `arg1` 开始以从左到右的顺序将每个参数插入为 `argList` 的最后一个元素。
    var args = [...arguments].slice(1);

    if(typeof thisArg === 'undefined' || thisArg === null){
        var global = getGlobal();
        // 在外面传入的 thisArg 值会修改并成为 this 值。
        // thisArg 是 undefined 或 null 时它会被替换成全局对象，所有其他值会被应用 ToObject 并将结果作为 this 值，这是第三版引入的更改。
        // 严格模式 global 为 undefined
        if(typeof global !== 'undefined'){
            thisArg = global;
        }
        return this(...args);
    }
    else{
        // TODO:
        // - [ ] __fn 同名覆盖问题
        // - [ ] 使用了ES6扩展符...
        thisArg = new Object(thisArg);
        thisArg.__fn = this;
        // 4.提供 `thisArg` 作为 `this` 值并以 `argList` 作为参数列表，调用 `func` 的 `[[Call]]` 内部方法，返回结果。
        var result = thisArg.__fn(...args);
        delete thisArg.__fn;
        return result;
    }
};
```
实现第一版后，很容易找出两个问题：
- [ ] 1.`__fn` 同名覆盖问题，`thisArg`对象上有`__fn`，那就被覆盖了然后删除了

**针对问题1**
解决方案一：采用`ES6` `Sybmol()` 独一无二的。可以本来就是模拟ES3的方法。如果面试官不允许用呢。
解决方案二：自己用`Math.random()`模拟实现独一无二的`key`。面试时可以直接用生成时间戳即可。
// 生成UUID 通用唯一识别码
```
// 生成UUID 通用唯一识别码
function generateUUID(){
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '-';
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16);
    }
    // 大概生成 这样一串 '18efca2d-6e25-42bf-a636-30b8f9f2de09'
    return uuid;
}
// '__' + new Date().getTime();
```

```
var student = {
    name: '轩辕Rowboat',
    doSth: 'doSth',
};
var originalVal = student.doSth;
var hasOriginalVal = student.hasOwnProperty('doSth');
student.doSth = 'run';
delete student.doSth;
if(hasOriginalVal){
    student.doSth = originalVal;
}
console.log('student:', student);
```
- [ ] 2.使用了`ES6`扩展符`...`
解决方案一：采用`eval`来执行函数。
>`eval`把字符串解析成代码执行。
解决方案二：采用`new Function()`来生成执行函数。但万一面试官不允许用呢，毕竟`eval`是魔鬼。

## 顺带说下`ES3`中 `undefined` 是能修改的。
可能大部分人不知道。
`ES5`中虽然在全局作用域下不能修改，但在局部作用域中也是能修改的，不信可以复制以下测试代码在控制台执行下。虽然一般情况下是不会的去修改它。
```
function test(){
    var undefined = 3;
    console.log(undefined); // chrome下也是 3
}
test();
```
所以判断一个变量a是不是`undefined`，更严谨的方案是`typeof a === 'undefined'`或者`a === void 0;`
这里面用的是`void`，`void`的作用是计算表达式，始终返回`undefined`，也可以这样写`void(0)`。
更多可以查看韩子迟的这篇文章：[为什么用「void 0」代替「undefined」](https://github.com/hanzichi/underscore-analysis/issues/1)

##

##


## 扩展阅读
[《JavaScript设计模式与开发实践》- 第二章 第 2 章　this、call和apply](http://www.ituring.com.cn/book/tupubarticle/7768)

[JS魔法堂：再次认识Function.prototype.call](https://cloud.tencent.com/developer/article/1023535)