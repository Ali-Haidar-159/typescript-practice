abstract class Person
{
    name : string ;
    age : number ;

    constructor(name:string , age:number)
    {
        this.name = name ;
        this.age = age ;
    }

    abstract display():void ;

    magic():void
    {
        console.log("This is a normal method !") ;
    }

}


class Student extends Person
{
    stdID : number ;

    constructor(name:string , age:number , stdID:number)
    {
        super(name , age) ;
        this.stdID = stdID ;
    }

    display():void
    {
        console.log(`Name : ${this.name}`) ;
        console.log(`Age : ${this.age}`) ;
        console.log(`Student ID : ${this.stdID}`) ;
    }

}

let s1:Student = new Student("ali" , 23 , 132232) ;
s1.display() ;
s1.magic() ;