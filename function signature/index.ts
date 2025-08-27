let magic : () => void ;
let calculateMark : (mark1:number , mark2:number , mark3:number , name:string) => string ;

magic = function():void 
{
    console.log("This is magic function") ;
}

calculateMark = function fun(mark1:number , mark2:number , mark3:number , name:string){
    let avg : number = (mark1 + mark2 + mark3) / 3 ;
    return `${name} got ${avg}` ;
}

magic() ;
console.log(calculateMark(88,75,92,"ali"));