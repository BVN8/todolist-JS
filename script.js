const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-btn");
const todoList = document.getElementById("todo-list");


const saveTodo = () => {
    const todos = [];
    document.querySelectorAll(".todo-item").forEach(item => {
        todos.push({
            task: item.firstChild.textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
};


const loadTodo = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.textContent = todo.task;
        if (todo.completed) {
            newTodo.classList.add("completed");
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => {
            newTodo.remove();
            saveTodo();
        });

        newTodo.addEventListener("click", () => {
            newTodo.classList.toggle("completed");
            saveTodo();
        });

        newTodo.appendChild(deleteButton);
        todoList.appendChild(newTodo);
    });
};

document.addEventListener('DOMContentLoaded', loadTodo);

const addTodo = () => {
    const task = todoInput.value.trim();

    if (task === "") {
        alert("Veuillez entrer une tâche valide");
        return;
    }

    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => {
        newTodo.remove();
        saveTodo();
    });

    newTodo.addEventListener("click", () => {
        newTodo.classList.toggle("completed");
        saveTodo();
    });

    newTodo.appendChild(deleteButton);
    todoList.appendChild(newTodo);
    saveTodo();

    todoInput.value = "";
};

todoButton.addEventListener("click", addTodo);
