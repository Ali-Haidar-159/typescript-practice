var Directions;
(function (Directions) {
    Directions[Directions["up"] = 1] = "up";
    Directions[Directions["down"] = 2] = "down";
    Directions[Directions["left"] = 3] = "left";
    Directions[Directions["right"] = 4] = "right";
})(Directions || (Directions = {}));
var side;
side = 1; //1
switch (side) {
    case Directions.up: {
        console.log("This is one");
        break;
    }
    case Directions.down: {
        console.log("This is two");
        break;
    }
    case Directions.left: {
        console.log("This is three");
        break;
    }
    case Directions.right: {
        console.log("This is four");
        break;
    }
}
