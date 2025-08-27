let formDiv = document.querySelector("#formDiv") as HTMLFormElement ;
let email = document.querySelector("#email") as HTMLInputElement ;
let password = document.querySelector("#password") as HTMLInputElement ;
let country = document.querySelector("#country") as HTMLSelectElement ;

formDiv.addEventListener("submit" , function(e){

    e.preventDefault() ;

    let data = {
        email : email.value ,
        password : password.value ,
        country : country.value

    }

    console.log(data) ;

})