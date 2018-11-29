# 面试官问：能否模拟实现`JS`的`call`和`apply`方法

之前写过两篇[《面试官问：能否模拟实现`JS`的`new`操作符》](https://juejin.im/post/5bde7c926fb9a049f66b8b52)和[《面试官问：能否模拟实现`JS`的`bind`方法》](https://juejin.im/post/5bec4183f265da616b1044d7)

其中模拟`bind`方法时是使用的`call`和`apply`修改`this`指向。但面试官可能问：能否不用`call`和`apply`来实现呢。意思也就是需要模拟实现`call`和`apply`的了。
## 先通过`MDN`认识下`call`和`apply`
[MDN 文档：Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)<br>
**语法**<br>
```
fun.call(thisArg, arg1, arg2, ...)
```
**thisArg**<br>
在`fun`函数运行时指定的`this`值。需要注意的是，指定的`this`值并不一定是该函数执行时真正的`this`值，如果这个函数处于**非严格模式**下，则指定为`null`和`undefined`的`this`值会自动指向全局对象(浏览器中就是`window`对象)，同时值为原始值(数字，字符串，布尔值)的`this`会指向该原始值的自动包装对象。<br>
**arg1, arg2, ...**<br>
指定的参数列表<br>
**返回值**<br>
返回值是你调用的方法的返回值，若该方法没有返回值，则返回`undefined`。<br>

[MDN 文档：Function.prototype.apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)<br>
```
func.apply(thisArg, [argsArray])
```
**thisArg**<br>
可选的。在 `func` 函数运行时使用的 `this` 值。请注意，`this`可能不是该方法看到的实际值：如果这个函数处于**非严格模式**下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象，原始值会被包装。<br>
**argsArray**<br>
可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `func` 函数。如果该参数的值为 `null` 或  `undefined`，则表示不需要传入任何参数。从`ECMAScript 5` 开始可以使用类数组对象。<br>
**返回值**<br>
调用有指定this值和参数的函数的结果。
直接先看**例子1**
## `call` 和 `apply` 的异同
**相同点：**<br>
1、`call`和`apply`的第一个参数`thisArg`，都是`func`运行时指定的`this`。而且，`this`可能不是该方法看到的实际值：如果这个函数处于**非严格模式**下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象，原始值会被包装。<br>
2、都可以只传递一个参数。<br>
**不同点：**`apply`只接收两个参数，第二个参数可以是数组也可以是类数组，其实也可以是对象，后续的参数忽略不计。`call`接收第二个及以后一系列的参数。<br>
看两个简单例子1和2**：
```
// 例子1：浏览器环境 非严格模式下
var doSth = function(a, b){
    console.log(this);
    console.log([a, b]);
}
doSth.apply(null, [1, 2]); // this是window  // [1, 2]
doSth.apply(0, [1, 2]); // this 是 Number(0) // [1, 2]
doSth.apply(true); // this 是 Boolean(true) // [undefined, undefined]
doSth.call(undefined, 1, 2); // this 是 window // [1, 2]
doSth.call('0', 1, {a: 1}); // this 是 String('0') // [1, {a: 1}]
```
```
// 例子2：浏览器环境 严格模式下
'use strict';
var doSth2 = function(a, b){
    console.log(this);
    console.log([a, b]);
}
doSth2.call(0, 1, 2); // this 是 0 // [1, 2]
doSth2.apply('1'); // this 是 '1' // [undefined, undefined]
doSth2.apply(null, [1, 2]); // this 是 null // [1, 2]
```
`typeof` 有`7`种类型（`undefined number string boolean symbol object function`），笔者都验证了一遍：**更加验证了相同点第一点，严格模式下，函数的`this`值就是`call`和`apply`的第一个参数`thisArg`，非严格模式下，`thisArg`值被指定为 `null` 或 `undefined` 时`this`值会自动替换为指向全局对象，原始值则会被自动包装，也就是`new Object()`**。

重新认识了`call`和`apply`会发现：**它们作用都是一样的，改变函数里的`this`指向为第一个参数`thisArg`，如果明确有多少参数，那可以用`call`，不明确则可以使用`apply`。也就是说完全可以不使用`call`，而使用`apply`代替。**<br>
也就是说，我们只需要模拟实现`apply`，`call`可以根据参数个数都放在一个数组中，给到`apply`即可。<br>
既然准备模拟实现`apply`，那先得看看`ES5`规范。[`ES5规范 英文版`](http://es5.github.io/#x15.3.4.3)，[`ES5规范 中文版`](http://yanhaijing.com/es5/#322)。`apply`的规范下一个就是`call`的规范，可以点击打开新标签页去查看，这里摘抄一部分。
>**Function.prototype.apply (thisArg, argArray)**<br>
 当以 `thisArg` 和 `argArray` 为参数在一个 `func` 对象上调用 `apply` 方法，采用如下步骤：

>1.如果 `IsCallable(func)` 是 `false`, 则抛出一个 `TypeError` 异常。<br>
>2.如果 `argArray` 是 `null` 或 `undefined`, 则返回提供 `thisArg` 作为 `this` 值并以空参数列表调用 `func` 的 `[[Call]]` 内部方法的结果。<br>
>3.返回提供 `thisArg` 作为 `this` 值并以空参数列表调用 `func` 的 `[[Call]]` 内部方法的结果。<br>
>4.如果 `Type(argArray)` 不是 `Object`, 则抛出一个 `TypeError` 异常。<br>
>5~8 略<br>
>9.提供 `thisArg` 作为 `this` 值并以 `argList` 作为参数列表，调用 `func` 的 `[[Call]]` 内部方法，返回结果。<br>
 `apply` 方法的 `length` 属性是 `2`。<br>

 >在外面传入的 `thisArg` 值会修改并成为 `this` 值。`thisArg` 是 `undefined` 或 `null` 时它会被替换成全局对象，所有其他值会被应用 `ToObject` 并将结果作为 `this` 值，这是第三版引入的更改。<br>

结合上文和规范，如何将函数里的`this`指向第一个参数`thisArg`呢，这是一个问题。
这时候请出**例子3**：
```
// 浏览器环境 非严格模式下
var doSth = function(a, b){
    console.log(this);
    console.log(this.name);
    console.log([a, b]);
}
var student = {
    name: '轩辕Rowboat',
    doSth: doSth,
};
student.doSth(1, 2); // this === student // true // '轩辕Rowboat' // [1, 2]
doSth.apply(student, [1, 2]); // this === student // true // '轩辕Rowboat' // [1, 2]
```
可以**得出结论1**：在对象`student`上加一个函数`doSth`，再执行这个函数，这个函数里的`this`就指向了这个对象。那也就是可以在`thisArg`上新增调用函数，执行后删除这个函数即可。
知道这些后，我们试着容易实现第一版本：

```
// 浏览器环境 非严格模式
function getGlobalObject(){
    return this;
}
Function.prototype.applyFn = function apply(thisArg, argsArray){ // `apply` 方法的 `length` 属性是 `2`。
    // 1.如果 `IsCallable(func)` 是 `false`, 则抛出一个 `TypeError` 异常。
    if(typeof this !== 'function'){
        throw new TypeError(this + ' is not a function');
    }

    // 2.如果 argArray 是 null 或 undefined, 则
    // 返回提供 thisArg 作为 this 值并以空参数列表调用 func 的 [[Call]] 内部方法的结果。
    if(typeof argsArray === 'undefined' || argsArray === null){
        argsArray = [];
    }
    
    // 3.如果 Type(argArray) 不是 Object, 则抛出一个 TypeError 异常 .
    if(argsArray !== new Object(argsArray)){
        throw new TypeError('CreateListFromArrayLike called on non-object');
    }

    if(typeof thisArg === 'undefined' || thisArg === null){
        // 在外面传入的 thisArg 值会修改并成为 this 值。
        // ES3: thisArg 是 undefined 或 null 时它会被替换成全局对象 浏览器里是window
        thisArg = getGlobalObject();
    }

    // ES3: 所有其他值会被应用 ToObject 并将结果作为 this 值，这是第三版引入的更改。
    thisArg = new Object(thisArg);
    thisArg[__fn] = this;
    // 9.提供 thisArg 作为 this 值并以 argList 作为参数列表，调用 func 的 [[Call]] 内部方法，返回结果
    var result = thisArg[__fn](...argsArray);
    delete thisArg[__fn];
    return result;
};
```
实现第一版后，很容易找出两个问题：
- [ ] 1.`__fn` 同名覆盖问题，`thisArg`对象上有`__fn`，那就被覆盖了然后被删除了。

**针对问题1**
解决方案一：采用`ES6` `Sybmol()` 独一无二的。可以本来就是模拟ES3的方法。如果面试官不允许用呢。
解决方案二：自己用`Math.random()`模拟实现独一无二的`key`。面试时可以直接用生成时间戳即可。
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
// 简单实现
// '__' + new Date().getTime();
```
如果这个`key`万一这对象中还是有，为了保险起见，可以做一次缓存操作。比如如下代码：
```
var student = {
    name: '轩辕Rowboat',
    doSth: 'doSth',
};
var originalVal = student.doSth;
var hasOriginalVal = student.hasOwnProperty('doSth');
student.doSth = function(){};
delete student.doSth;
// 如果没有，`originalVal`则为undefined，直接赋值新增了一个undefined，这是不对的，所以需判断一下。
if(hasOriginalVal){
    student.doSth = originalVal;
}
console.log('student:', student); // { name: '轩辕Rowboat', doSth: 'doSth' }
```
- [ ] 2.使用了`ES6`扩展符`...`<br>
解决方案一：采用`eval`来执行函数。<br>
>`eval`把字符串解析成代码执行。<br>

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
更多可以查看`韩子迟`的这篇文章：[为什么用「void 0」代替「undefined」](https://github.com/hanzichi/underscore-analysis/issues/1)

##

##


## 扩展阅读
[《JavaScript设计模式与开发实践》- 第二章 第 2 章　this、call和apply](http://www.ituring.com.cn/book/tupubarticle/7768)

[JS魔法堂：再次认识Function.prototype.call](https://cloud.tencent.com/developer/article/1023535)