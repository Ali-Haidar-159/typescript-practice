var user1;
user1 = {
    name: "Ali",
    age: 23,
    isStudent: true
};
var user2;
user2 = {
    name: "Antora",
    roll: 101,
    // isAlumni : true
};
console.log("User1 is : ".concat(JSON.stringify(user1)));
console.log("User2 is : ".concat(JSON.stringify(user2)));
var allUsers; //declare
allUsers = []; //initialize
allUsers.push(user1);
allUsers.push(user2);
console.log(allUsers);
