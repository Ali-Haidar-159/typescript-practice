var Person = /** @class */ (function () {
    function Person(name, age, isCitizen) {
        this.name = name;
        this.age = age;
        this.isCitizen = isCitizen;
    }
    Person.prototype.display = function () {
        console.log("Name : ".concat(this.name));
        console.log("Age : ".concat(this.age));
        console.log("Status : ", this.isCitizen ? "He is a citizen" : "He is not a citizen");
    };
    return Person;
}());
// object create 
var p1 = new Person("Ali", 25, true);
p1.display();
var p2 = new Person("Antora", 23, true);
p2.display();
var p3 = new Person("Matin", 35, false);
p3.display();
