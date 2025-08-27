var magic;
var calculateMark;
magic = function () {
    console.log("This is magic function");
};
calculateMark = function fun(mark1, mark2, mark3, name) {
    var avg = (mark1 + mark2 + mark3) / 3;
    return "".concat(name, " got ").concat(avg);
};
magic();
console.log(calculateMark(88, 75, 92, "ali"));
