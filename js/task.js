const BASE_API = "https://falakfatma.pythonanywhere.com/"
const AUTH_URL = BASE_API + "api/"
const TASK_URL_API = AUTH_URL + "todoslist"
const token = localStorage.getItem('token')
const headersData = {"Authorization": `Bearer ${token}`}

// GET TASK
const getTask = () => {
  const headersMethodGet = {method:'GET', headers: headersData}
  fetch(TASK_URL_API, headersMethodGet)
  .then((resp) => {
    return resp.json()
  })
  .then((data) => {
    console.log(data)
  })
}
window.onload = getTask()

// DELETE TASK
const deleteTask = () => {
  const headersMethodDelete = {method:'DELETE', headers: headersData}
  fetch(TASK_URL_API, headersMethodDelete)
  .then((resp) => {
    console.log(resp)
  })
}

// CREATE TASK 
const createTask = (e) => {
    e.preventDefault();
    let taskName = document.getElementById('taskName').value;
    const todoslistData = {
        'name': taskName
    }
    
    const header = {
        method: 'POST',
        headers: headersData,
        body: JSON.stringify(todoslistData)
    }
    fetch(TASK_URL_API, header)
    .then(response => {
        if (response.ok){
            return response.json()
        }
        return Promise.reject(response);
    })
    .then(data => {
        return data;
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
};

let taskFormId = document.getElementById('taskFormId');
taskFormId.addEventListener('submit', createTask)