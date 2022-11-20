const BASE_API = "http://falakfatma.pythonanywhere.com/"
const AUTH_URL = BASE_API + "api/auth/"
const REGISTER_URL_API = AUTH_URL + "login"

let loginFormId = document.getElementById('loginFormId');

loginFormId.addEventListener('submit', function loginFunc(e){
    e.preventDefault();
  let firstNameInput =document.getElementById('FirstNameInput').value
  let lastNameInput =document.getElementById('LastNameInput').value
    let emailInput = document.getElementById('emailInput').value;
    let passwordInput = document.getElementById('passwordInput').value;
    const loginData = {
        'username': emailInput,
        'password': passwordInput
    }
    fetch(REGISTER_URL_API, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    }).then((response) => response.json())
    .then((data) => console.log(data));
});
