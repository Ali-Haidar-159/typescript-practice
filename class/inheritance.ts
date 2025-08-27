class Person 
{
    name : string ;
    age : number ;

    constructor(name:string , age:number)
    {
        this.name = name ;
        this.age = age ;
    }

    display() : void 
    {
        console.log(`Name : ${this.name}`) ;
        console.log(`Age : ${this.age}`) ;
    }
}


class Student extends Person
{ 
    stdID : number ;

    constructor(name:string , age:number , stdID:number)
    {
        super(name,age) ;
        this.stdID = stdID ;
    }

    display(): void  //method override
    {
        console.log(`Name : ${this.name}`) ;
        console.log(`Age : ${this.age}`) ;
        console.log(`Student ID : ${this.stdID}`) ;
    }
}

let s1:Student = new Student("Ali" , 23 , 121374323) ;
s1.display() ;