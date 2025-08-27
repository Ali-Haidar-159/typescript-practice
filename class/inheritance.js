var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.display = function () {
        console.log("Name : ".concat(this.name));
        console.log("Age : ".concat(this.age));
    };
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age, stdID) {
        var _this = _super.call(this, name, age) || this;
        _this.stdID = stdID;
        return _this;
    }
    Student.prototype.display = function () {
        console.log("Name : ".concat(this.name));
        console.log("Age : ".concat(this.age));
        console.log("Student ID : ".concat(this.stdID));
    };
    return Student;
}(Person));
var s1 = new Student("Ali", 23, 121374323);
s1.display();
