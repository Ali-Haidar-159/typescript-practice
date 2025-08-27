enum Directions{

    up=1 ,
    down ,
    left ,
    right

}

let side:Directions ;
side = 1 ; //1

switch(side) {
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
