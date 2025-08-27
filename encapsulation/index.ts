class Person
{
    name:string ; //public
    private age : number ; 
    protected semester : number ;
    readonly dept : string ;
    marks : number[] ;

    constructor(name:string , age:number , semester:number , dept : string , marks:number[])
    {
        this.name = name ;
        this.age = age ;
        this.semester = semester ;
        this.dept = dept ;
        this.marks = marks ;
    }

    setAge(age:number):void //setter
    {
        this.age = age ;
    }

    getAge():number //getter
    {
        return this.age ;
    }

    display():void
    {
        console.log(`Name : ${this.name}`) ;
        console.log(`Age : ${this.age}`) ;
        console.log(`Marks : ${this.marks}`) ;
    }

    magic ():number
    {
        return this.age ;
    }
}

let p1 = new Person("Ali" , 23 , 11 , "CSE" , [77,89,85]) ;
console.log(`My age is : ${p1.name}`) ; //access public member 
console.log(`My age is : ${p1.getAge()}`) ; //access private member 
// console.log(`My age is : ${p1.semester}`) ; //access protected member 
console.log(`My marks is : ${p1.marks}`) ;
console.log(`My dept is : ${p1.dept}`) ;

console.log(`-------------------`) ;

p1.name = "Antora" ;
// p1.dept = "EEE" ; //not changeable

console.log(`My age is : ${p1.name}`) ; //access public member after modify
console.log(`My dept is : ${p1.dept}`) ; //access read only member after modify