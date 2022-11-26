const BASE_API = "https://falakfatma.pythonanywhere.com/";
const AUTH_URL = BASE_API + "api/auth/";
const REGISTER_URL_API = AUTH_URL + "register";

let registerFormId = document.getElementById('registerFormId');

registerFormId.addEventListener('submit', function registerFunc(e){
  e.preventDefault();
  let firstName =document.getElementById('firstName');
  let lastName =document.getElementById('lastName');
  let username = document.getElementById('username');
  let email = document.getElementById('email');
  let password = document.getElementById('password');

  let errorMsgTemplate = `<span class="invalid-feedback">Field cannot be blank</span>`
  // let invalidFeedback = document.getElementsByClassName('invalid-feedback');

  // TODO - Check this for all in a single go
  if (email.value === ''){
    email.classList = 'form-control is-invalid';
    email.insertAdjacentHTML('afterend', errorMsgTemplate);
    return
  }
   else if (firstName.value === ''){
    firstName.classList = 'form-control is-invalid';
    firstName.insertAdjacentHTML('afterend', errorMsgTemplate);
     return
  }
   else if (lastName.value === ''){
    lastName.classList = 'form-control is-invalid';
    lastName.insertAdjacentHTML('afterend', errorMsgTemplate);
     return
  }
   else if (password.value === ''){
    password.classList = 'form-control is-invalid';
    password.insertAdjacentHTML('afterend', errorMsgTemplate);
     return
  }
  const registerData = {
      'first_name': firstName.value,
      'last_name': lastName.value,
      'username': username.value,
      'email': email.value,
      'password': password.value
  }

  const header = {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(registerData)
  }
  fetch(REGISTER_URL_API, header)
  .then(resp => {
      if(resp.status===201){
          document.location = 'login.html'
          return resp.json()
      }
      return Promise.reject(resp);
  })
  .then(data => {
      console.log(data)
  })
  .catch((errresp) => {
      errresp.json().then(err => {
        console.log('error:', err)
        let errorMessageAlert = document.getElementById('errorMessageAlert');
        let errorMsg = document.getElementById('errorMsg');
        for (const [key, value] of Object.entries(err)) {
          errorMsg.innerHTML += `${key}: ${value} <br>`;
        }
        if (errorMessageAlert.style.display != 'block'){
            errorMessageAlert.style.display = 'block';
        }
      })
  })

})
