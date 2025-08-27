let formDiv = document.querySelector("#formDiv");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let country = document.querySelector("#country");
formDiv.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = {
        email: email.value,
        password: password.value,
        country: country.value
    };
    console.log(data);
});
