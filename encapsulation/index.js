var Person = /** @class */ (function () {
    function Person(name, age, semester, dept, marks) {
        this.name = name;
        this.age = age;
        this.semester = semester;
        this.dept = dept;
        this.marks = marks;
    }
    Person.prototype.setAge = function (age) {
        this.age = age;
    };
    Person.prototype.getAge = function () {
        return this.age;
    };
    Person.prototype.display = function () {
        console.log("Name : ".concat(this.name));
        console.log("Age : ".concat(this.age));
        console.log("Marks : ".concat(this.marks));
    };
    Person.prototype.magic = function () {
        return this.age;
    };
    return Person;
}());
var p1 = new Person("Ali", 23, 11, "CSE", [77, 89, 85]);
console.log("My age is : ".concat(p1.name)); //access public member 
console.log("My age is : ".concat(p1.getAge())); //access private member 
// console.log(`My age is : ${p1.semester}`) ; //access protected member 
console.log("My marks is : ".concat(p1.marks));
console.log("My dept is : ".concat(p1.dept));
console.log("-------------------");
p1.name = "Antora";
p1.dept = "EEE";
console.log("My age is : ".concat(p1.name)); //access public member after modify
console.log("My dept is : ".concat(p1.dept)); //access read only member after modify
