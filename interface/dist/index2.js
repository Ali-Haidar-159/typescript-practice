class User {
    constructor(name, id, mark) {
        this.display = function () {
            return `Name : ${this.name} , id : ${this.id} , mark : ${this.mark}`;
        };
        this.name = name;
        this.id = id;
        this.mark = mark;
    }
}
let u1 = new User("Ali", 101, 85);
console.log(u1.display());
