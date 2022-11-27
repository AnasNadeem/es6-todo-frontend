const BASE_API = "https://falakfatma.pythonanywhere.com/"
const AUTH_URL = BASE_API + "api/"
const TASK_URL_API = AUTH_URL + "todoslist"
const token = localStorage.getItem('token')
const headersData = {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"}
let taskListId = document.getElementById('taskListId');

// GET TASK
const getTask = () => {

  const headersMethodGet = {method:'GET', headers: headersData}
  fetch(TASK_URL_API, headersMethodGet)
  .then((resp) => {
    return resp.json()
  })
  .then((data) => {
    data.forEach(task => {
      taskListId.innerHTML += `<li class="list-group-item" id="task${task.id}">${task.name}</li>`;
    });
  })
}
window.onload = getTask()

// CREATE TASK 
const createTask = (e) => {
    e.preventDefault();
    let taskName = document.getElementById('taskName');
    const todoslistData = {
        'name': taskName.value
    }

    const header = {
        method: 'POST',
        headers: headersData,
        body: JSON.stringify(todoslistData)
    }
    fetch(TASK_URL_API, header)
    .then(response => {
        if (response.ok){
          taskName.value = '';
            return response.json()
        }
        return Promise.reject(response);
    })
    .then(data => {
        taskListId.innerHTML += `<li class="list-group-item" id="task${data.id}">${data.name}</li>`;
        return data;
    })
    .catch((errresp) => {
        errresp.json().then(err => {
            let errorMessageAlert = document.getElementById('errorMessageAlert');
            let errorMsg = document.getElementById('errorMsg');
            for (const error in err) {
              errorMsg.innerHTML += `${error} ${err[error]}`;
            }
            if (errorMessageAlert.style.display != 'block'){
                errorMessageAlert.style.display = 'block';
            }
        })
    })
};

let taskFormId = document.getElementById('taskFormId');
taskFormId.addEventListener('submit', createTask)

// DELETE TASK
const deleteTask = () => {
  const headersMethodDelete = {method:'DELETE', headers: headersData}
  fetch(TASK_URL_API, headersMethodDelete)
  .then((resp) => {
    console.log(resp)
  })
}