let names:string [] ; //this is a syntax to declare array
let ages : Array<number> ; //this is another syntax to declare array

names = ["ali" , "antora"] ;
ages = [25,23] ;

for(let i:number = 0 ; i<2 ; i++)
{
    console.log(`${names[i]} is ${ages[i]} years old\n`) ;
}