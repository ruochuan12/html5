/**
 * @file debounce.js
 * @desc 防抖 this指向和event参数
 * @version 0.0.1
 * @author 轩辕Rowboat lxchuan12@163.com
 * @date 2017-11-30
 * @copyright 2017
 */

var count = 1;
var container = document.getElementById('app');

function getUserAction(ev) {
    // console.log(ev, this);
    container.innerHTML = count++;
};

function debounce(func, wait){
    var timer;
    return function(){
        var context = this;
        var args = arguments;
        console.log([...args]);
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(function(){
            func.apply(context, args);
        }, wait);
    }
}
// container.onmousemove = getUserAction;
container.onmousemove = debounce(getUserAction, 1000);