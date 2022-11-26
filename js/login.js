const BASE_API = "https://falakfatma.pythonanywhere.com/"
const AUTH_URL = BASE_API + "api/auth/"
const LOGIN_URL_API = AUTH_URL + "login"

let loginFormId = document.getElementById('loginFormId');

loginFormId.addEventListener('submit', function loginFunc(e){
    e.preventDefault();
    let userInput = document.getElementById('userInput').value;
    let passwordInput = document.getElementById('passwordInput').value;
    const loginData = {
        'username': userInput,
        'password': passwordInput
    }

    const header = {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(loginData)
    }
    fetch(LOGIN_URL_API, header)
    .then(response => {
        if (response.ok){
            return response.json()
        }
        return Promise.reject(response);
    })
    .then(data => {
        localStorage.setItem('username', data.username);
        localStorage.setItem('token', data.token);
        document.location = 'task.html'
    })
    .catch((errresp) => {
        errresp.json().then(err => {
            let errorMessageAlert = document.getElementById('errorMessageAlert');
            let errorMsg = document.getElementById('errorMsg');
            errorMsg.innerHTML = err.error;
            if (errorMessageAlert.style.display != 'block'){
                errorMessageAlert.style.display = 'block';
            }
        })
    })
});
