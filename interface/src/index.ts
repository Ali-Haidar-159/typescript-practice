
interface iUser{
    name :string ,
    id : number ,
    marks : number
}

let users : iUser[] ;

users = []

let user1 : iUser = {
    name : "Ali" ,
    id : 101 ,
    marks : 88
}

let user2 : iUser = {
    name : "Antora" ,
    id : 102 ,
    marks : 99
}

users.push(user1) ;
users.push(user2) ;

function display(user : iUser):void 
{

    console.log(`Name : ${user.name} , id: ${user.id} , mark : ${user.marks}`) ;

}


users.forEach(function(item:iUser){

    display(item) ;

})