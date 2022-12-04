const BASE_API = "https://falakfatma.pythonanywhere.com/"
const AUTH_URL = BASE_API + "api/"
const TASK_URL_API = AUTH_URL + "todoslist"
const TODO_URL_API = AUTH_URL + "todos"
const token = localStorage.getItem('token')
const headersData = {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"}
let taskListId = document.getElementById('taskListId');
let todoListId = document.getElementById('todoListId');
let todoCardId = document.getElementById('todoCardId');
let taskId = document.getElementById('taskId');

if(!localStorage.getItem('token')){
  document.location = 'login.html'
}

// GET TASK
const getTask = () => {
  const headersMethodGet = {method:'GET', headers: headersData}
  fetch(TASK_URL_API, headersMethodGet)
  .then((resp) => {
    return resp.json()
  })
  .then((data) => {
    data.forEach(task => {
      taskListId.innerHTML += `
      <li class="list-group-item" id="task${task.id}">
        <span onclick=getTodos(${task.id})>
          ${task.name}
        </span>
        <span onclick=deleteTask(${task.id})>
            <i class="fa-solid fa-trash float-end"></i>
        </span>
      </li>
      `;
    });
  })
}
window.onload = getTask()

// CREATE TASK 
const createTask = (e) => {
    e.preventDefault();
    let taskName = document.getElementById('taskName');
    const todoslistData = {
        'name': taskName.value,
        'owner': localStorage.getItem('user')
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
        taskListId.innerHTML += `
        <li class="list-group-item" id="task${data.id}">
          <span>
            ${data.name}
          </span>
          <span>
              <i class="fa-solid fa-trash float-end"></i>
          </span>
        </li>`;
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
taskFormId.addEventListener('submit', createTask);

// DELETE TASK
const deleteTask = (id) => {
  let taskElem = document.getElementById(`task${id}`);
  const headersMethodDelete = {method:'DELETE', headers: headersData}
  fetch(`${TASK_URL_API}/${id}`, headersMethodDelete)
  .then(resp => {
    if (resp.ok){
      taskElem.remove()
      return resp
    }
  })
}

// GET TODO
const getTodos = (id) => {
  todoCardId.style.display = 'block';
  taskId.value = `${id}`
  todoListId.innerHTML = ``;

  const headersMethodGet = {method:'GET', headers: headersData}
  fetch(`${TODO_URL_API}?todos_list=${id}`, headersMethodGet)
  .then((resp) => {
    return resp.json()
  })
  .then((data) => {
    if(data.length === 0){
      todoListId.innerHTML = `
      <li class="list-group-item">No Todos yet. Create below</li>
      `;
    }else{
    data.forEach(todo => {
      todoListId.innerHTML += `
      <li class="list-group-item" id="${todo.id}">
        ${todo.name}
        <span onclick=deleteTodo(${todo.id})>
            <i class="fa-solid fa-trash float-end"></i>
        </span>
      </li>
      `;
    });
    }
  })
}

// CREATE TODO 
const createTodo = (e) => {
  e.preventDefault();
  let todoName = document.getElementById('todoName');
  const todoslistData = {
      'name': todoName.value,
      'todo_list': taskId.value
  }

  const header = {
      method: 'POST',
      headers: headersData,
      body: JSON.stringify(todoslistData)
  }
  fetch(TODO_URL_API, header)
  .then(response => {
      if (response.ok){
        todoName.value = '';
        taskId.value = '';
          return response.json()
      }
      return Promise.reject(response);
  })
  .then(todo => {
    todoListId.innerHTML += `
      <li class="list-group-item" id="${todo.id}">
        ${todo.name}
        <span onclick=deleteTodo(${todo.id})>
            <i class="fa-solid fa-trash float-end"></i>
        </span>
      </li>  
    `;
      return todo;
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

// DELETE TODO
const deleteTodo = (id) => {
  let todoElem = document.getElementById(`${id}`);
  const headersMethodDelete = {method:'DELETE', headers: headersData}
  fetch(`${TODO_URL_API}/${id}`, headersMethodDelete)
  .then(resp => {
    if (resp.ok){
      todoElem.remove()
      return resp
    }
  })
}

let todoFormId = document.getElementById('todoFormId');
todoFormId.addEventListener('submit', createTodo);