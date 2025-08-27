let users;
users = [];
let user1 = {
    name: "Ali",
    id: 101,
    marks: 88
};
let user2 = {
    name: "Antora",
    id: 102,
    marks: 99
};
users.push(user1);
users.push(user2);
function display(user) {
    console.log(`Name : ${user.name} , id: ${user.id} , mark : ${user.marks}`);
}
users.forEach(function (item) {
    display(item);
});
