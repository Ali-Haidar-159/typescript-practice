type Student = {

    name : string ,
    id : number ,
    isAlumni : boolean

}

let std1 : Student = {

    name  : "Ali" ,
    id : 101 ,
    isAlumni : false 

}

let std2 : Student = {

    name  : "Antora" ,
    id : 102 ,
    isAlumni : true 

}

let allStudents : Array<Student> ;
allStudents = [] ;

allStudents.push(std1) ;
allStudents.push(std2) ;

for(let n in allStudents)
{
    console.log(allStudents[n]) ;
}

allStudents.forEach(function(item:Student){

    console.log(item) ;

})