const todoManger = new TodoManager();

const todoInput = document.getElementById("todo-input");
const todoBtn = document.getElementById("todo-btn");
const todoList = document.getElementById("todo-list");
const todoStatus = document.getElementById("todo-status");
const errorMessage = document.getElementById("error-message");



renderToDoList();
todoBtn.addEventListener('click', () => {

    addToDo(todoInput.value)
})



todoList.addEventListener('click', (e) => {

    const todoId = Number(e.target.closest("li[data-todo-id]").dataset.todoId);
 
    const shouldRemove = e.target.classList.contains("bi-trash-fill");
    if (shouldRemove) {
        todoManger.remove(todoId);
    } else {
        todoManger.changeDone(todoId)
    }
    renderToDoList();
})
todoInput.addEventListener('input', (e) => {
    if (e.target.value.length < 2) {
        renderError("Task must be at least two characters long")
    } else {
        renderError("")
    }
});

function addToDo(text) {
    try {
        renderError("");
        todoManger.add(text);
        clearInput();
        renderToDoList();
    } catch (e) {
        renderError(e.message)
    }
}

function clearInput() {
    todoInput.value = "";
}

function renderError(text) {
    if (!text) {
        errorMessage.style.display = 'none';
        return;
    }
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = text;
}

function renderToDoList() {
    const todos = todoManger.getAll();
    renderStatus();

    todoList.innerHTML = todos.sort((a)=> a.isDone?1:-1)
        .map(
            (todo) => `
    <li data-todo-id=${todo.id} class="list-group-item">
    <i class="bi bi-trash-fill text-danger"  > </i>
    <span class="ms-2 ${todo.isDone ? "text-decoration-line-through text-muted" : ""
                }">
    ${todo.text}
    </span>
  </li>
    `
        )
        .join("")
}

function renderStatus() {
    const amountDone = todoManger.getAll().filter((todo) => todo.isDone).length;
    todoStatus.innerHTML = `${amountDone}/${todoManger.getAll().length}`
}





