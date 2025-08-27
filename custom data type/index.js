var std1 = {
    name: "Ali",
    id: 101,
    isAlumni: false
};
var std2 = {
    name: "Antora",
    id: 102,
    isAlumni: true
};
var allStudents;
allStudents = [];
allStudents.push(std1);
allStudents.push(std2);
for (var n in allStudents) {
    console.log(allStudents[n]);
}
allStudents.forEach(function (item) {
    console.log(item);
});
