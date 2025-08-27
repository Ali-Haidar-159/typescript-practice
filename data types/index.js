var firstName;
var lastName;
var fullName;
var age;
var isStudent;
firstName = "Ali",
    lastName = "Haidar";
age = 24;
isStudent = true;
fullName = firstName.concat(lastName);
console.log("My name is ".concat(fullName, " . I am ").concat(age, " years old."));
console.log("I am a student : ".concat(isStudent));
console.log("Hello Guys");
function addNumber(num1, num2) {
    console.log("The sum is : ".concat(num1 + num2));
}
addNumber(5, 2);
