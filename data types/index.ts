
let firstName:string ;
let lastName:string ;
let fullName:string ;
let age:number ;
let isStudent:boolean ;

firstName = "Ali" ,
lastName = "Haidar" ;
age = 24 ;
isStudent = true ;

fullName = firstName.concat(lastName) ;

console.log(`My name is ${fullName} . I am ${age} years old.`) ;
console.log(`I am a student : ${isStudent}`) ;
console.log("Hello Guys") ;

function addNumber (num1:number,num2:number)
{
    console.log(`The sum is : ${num1+num2}`) ;
}

addNumber(5,2) ;
