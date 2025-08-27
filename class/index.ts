class Person
{
    name : string ;
    age : number ;
    isCitizen : boolean ;

    constructor(name:string , age:number , isCitizen:boolean)
    {
        this.name = name ;
        this.age = age ;
        this.isCitizen = isCitizen ;
    }

    display() : void 
    {
        console.log(`Name : ${this.name}`) ;
        console.log(`Age : ${this.age}`) ;
        console.log( "Status : " , this.isCitizen ? `He is a citizen` : "He is not a citizen") ;
    }

}

// object create 
let p1 = new Person("Ali" , 25 , true) ;
p1.display() ;

let p2 = new Person("Antora" , 23 , true) ;
p2.display() ;

let p3= new Person("Matin" , 35 , false) ;
p3.display() ;