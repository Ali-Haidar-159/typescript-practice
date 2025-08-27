let id:string | number ;

id = "2022-1-60-193" ;
id = 193 ;
console.log(`My student id is : ${id}`) ;

function addSomething(element1:number|string , element2:number|string)
{
    console.log(`After addition : ${element1 + element2}`) ;
}

addSomething(20,40) ;
addSomething(20, "ali") ;