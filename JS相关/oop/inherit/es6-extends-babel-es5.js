'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Parent = function () {
    function Parent(name) {
        _classCallCheck(this, Parent);

        this.name = name;
    }

    _createClass(Parent, [{
        key: 'sayName',
        value: function sayName() {
            console.log('my name is ' + this.name);
            return this.name;
        }
    }]);

    return Parent;
}();

var Child = function (_Parent) {
    _inherits(Child, _Parent);

    function Child(name, age) {
        _classCallCheck(this, Child);

        var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name));

        _this.age = age;
        return _this;
    }

    _createClass(Child, [{
        key: 'sayAge',
        value: function sayAge() {
            console.log('my age is ' + this.age);
            return this.age;
        }
    }]);

    return Child;
}(Parent);

var parent = new Parent('Parent');
var child = new Child('Child', 18);
console.log('parent: ', parent);
parent.sayName();
console.log('child: ', parent);
child.sayName();
child.sayAge();