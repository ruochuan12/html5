# 面试官问：this的常见使用场景的指向

## 全局上下文
非严格模式和严格模式中this都是指向顶层对象（浏览器中是`window`）。
```
this === window // true
'use strict'
this === window;
```
## 函数上下文
### 普通函数调用模式
```
// 非严格模式
var name = 'window';
var doSth = function(){
    console.log(this.name);
}
doSth(); // 'window'
```
你可能会误以为`window.doSth()`是调用的，所以是指向`window`。虽然本例中`window.doSth`确实等于`doSth`。`name`等于`window.name`。上面代码中这是因为在`ES5`中，全局变量是挂载在顶层对象（浏览器是`window`）中。
事实上，并不是如此。
```
// 非严格模式
let name2 = 'window2';
let doSth2 = function(){
    console.log(this === window);
    console.log(this.name2);
}
doSth2() // true, undefined
```
这个例子中`let`没有给顶层对象中（浏览器是window）添加属性，`window.name2和window.doSth`都是`undefined`。

严格模式中，普通函数中的`this`则表现不同，表现为`undefined`。
```
// 严格模式
'use strict'
var name = 'window';
var doSth = function(){
    console.log(typeof this === 'undefined');
    console.log(this.name);
}
doSth(); // true，// 报错，因为this是undefined
```
看过的《你不知道的`JavaScript`》上卷的同学，应该知道书上将这种叫做默认绑定。
对`call`，`apply`熟悉的同学会类比为：
```
doSth.call(undefined);
doSth.apply(undefined);
```
效果是一样的，`call`，`apply`作用之一就是用来修改函数中的`this`指向为第一个参数的。
第一个参数是`undefined`或者`null`，非严格模式下，是指向`window`。严格模式下，就是指向第一个参数。
后文详细解释。
### 对象中的函数（方法）调用模式
```
var name = 'window';
var doSth = function(){
    console.log(this.name);
}
var student = {
    name: '轩辕Rowboat',
    doSth: doSth,
    other: {
        name: 'other',
        doSth: doSth,
    }
}
student.doSth(); // '轩辕Rowboat'
student.other.doSth(); // 'other'
// 用call类比则为：
student.doSth.call(student);
// 用call类比则为：
student.other.doSth.call(student);
```
但往往会有以下场景，把对象中的函数赋值成一个变量了。
这样其实又变成普通函数了，所以使用普通函数的规则（默认绑定）。
```
var studentDoSth = student.doSth;
studentDoSth(); // 'window'
// 用call类比则为：
studentDoSth.call(undefined);
```
### call、apply、bind调用模式
上文提到`call`、`apply`，这里详细解读一下。先通过`MDN`认识下`call`和`apply`
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
`apply`和`call`类似。只是参数不一样。它的参数是数组（或者类数组）。

根据参数`thisArg`的描述，可以知道，`call`就是改变函数中的`this`指向为`thisArg`，并且执行这个函数，这也就使`JS`灵活很多。严格模式下，`thisArg`是原始值是值类型，也就是原始值。不会被包装成对象。举个例子：
```
var doSth = function(name){
    console.log(this);
    console.log(name);
}
doSth.call(2, '轩辕Rowboat'); // Number{2}, '轩辕Rowboat'
var doSth2 = function(name){
    'use strict';
    console.log(this);
    console.log(name);
}
doSth2.call(2, '轩辕Rowboat'); // 2, '轩辕Rowboat'
```
虽然一般不会把`thisArg`参数写成值类型。但还是需要知道这个知识。
之前写过一篇文章：[面试官问：能否模拟实现`JS`的`call`和`apply`方法](https://juejin.im/post/5bf6c79bf265da6142738b29)
就是利用对象上的函数`this`指向这个对象，来模拟实现`call`和`apply`的。感兴趣的同学可以去看看。


### 构造函数调用模式

### 原型链中的 this

### 箭头函数调用模式


### getter 与 setter 中的 this

### 作为一个DOM事件处理函数

### 作为一个内联事件处理函数


## 扩展阅读
[前端基础进阶（五）：全方位解读this](https://www.jianshu.com/p/d647aa6d1ae6)
[JavaScript深入之从ECMAScript规范解读this](https://github.com/mqyqingfeng/Blog/issues/7)