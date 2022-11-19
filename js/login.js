const BASE_API = "http://falakfatma.pythonanywhere.com/"
const LOGIN_URL_API = BASE_API + "login"

let loginFormId = document.getElementById('loginFormId');

loginFormId.addEventListener('click', function loginFunc(e){
    e.preventDefault();
    let emailInput = document.getElementById('emailInput').value;
    let passwordInput = document.getElementById('passwordInput').value;
    const data = {
        'username': emailInput,
        'password': passwordInput
    }
    console.log(data)
});


