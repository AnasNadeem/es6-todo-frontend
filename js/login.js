const BASE_API = "http://falakfatma.pythonanywhere.com/"
const AUTH_URL = BASE_API + "api/auth/"
const LOGIN_URL_API = AUTH_URL + "login"

let loginFormId = document.getElementById('loginFormId');

loginFormId.addEventListener('submit', function loginFunc(e){
    e.preventDefault();
    let emailInput = document.getElementById('emailInput').value;
    let passwordInput = document.getElementById('passwordInput').value;
    const loginData = {
        'username': emailInput,
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
        localStorage.setItem('user', data.username);
        localStorage.setItem('token', data.token);
        // return <Navigate to="/register" />
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
