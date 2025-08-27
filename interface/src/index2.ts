interface IPotato
{
    mark : number ;

    display : () => string ;
}

class User implements IPotato
{
    private name : string ;
    private id : number ;
    mark : number ; 

    constructor(name:string , id:number , mark:number)
    {
        this.name = name ;
        this.id = id  ;
        this.mark = mark ;
    }

    display = function(){

        return `Name : ${this.name} , id : ${this.id} , mark : ${this.mark}` ;

    }

}

let u1 : User = new User("Ali" , 101 , 85) ;
console.log(u1.display()) ;