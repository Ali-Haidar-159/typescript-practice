let user1:object ;
user1 = {
    name : "Ali" ,
    age : 23 ,
    isStudent : true
}

let user2 : {
    name : string ,
    roll : number ,
    isAlumni ? : boolean //this is optional property
}

user2 = {
    name : "Antora" ,
    roll : 101 ,
    // isAlumni : true
}

console.log(`User1 is : ${JSON.stringify(user1)}`) ;
console.log(`User2 is : ${JSON.stringify(user2)}`) ;

let allUsers : object[] ; //declare
allUsers = [] ; //initialize

allUsers.push(user1) ;
allUsers.push(user2) ;

console.log(allUsers) ;