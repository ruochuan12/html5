# 面试官问：this的常见的使用场景指向

## 全局上下文
非严格模式和严格模式中this都是指向顶层对象（浏览器中是`window`）。
```
this === window // true
'use strict'
this === window;
```
## 函数上下文
### 普通函数
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

对`call`，`apply`熟悉的同学会类比为
```
doSth.call(undefined);
doSth.apply(undefined);
```
效果是一样的，call，apply作用之一就是用来修改函数中的this指向为第一个参数的。
第一个参数是`undefined`或者`null`，非严格模式下，是指向`window`。严格模式下，就是指向第一个参数。
后文详细解释。
### 对象中的函数
```
var name = 'window';
var doSth = function(){
    console.log(this.name);
}
var student = {
    name: '轩辕Rowboat',
    doSth: doSth,
}
student.doSth(); // '轩辕Rowboat'
```

### call、apply、bind

### 构造函数

### 箭头函数

### 原型链中的 this

### getter 与 setter 中的 this

### 作为一个DOM事件处理函数

### 作为一个内联事件处理函数