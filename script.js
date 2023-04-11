const form = document.querySelector("form");
const input = document.querySelector("input");
const todoList = document.querySelector("#todoList");

class Todo {
  constructor(text, completed) {
    this.text = text;
    this.completed = completed;
  }
}

// Create an array of initial todo items
const initialTodos = [new Todo("Demo Todo", false)];

// Define a function to render a todo item as an li element
function renderTodoItem(todo) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  li.className = "flex align-items-center";
  li.appendChild(checkbox);
  checkbox.className =
    "form-checkbox h-5 w-5 text-gray-600 mr-2 bg-red-100 border-red-300 text-red-500 focus:ring-red-200";
  li.appendChild(document.createTextNode(todo.text));
  const deleteButton = document.createElement("button");
  deleteButton.className = "ml-auto";
  deleteButton.innerText = "Delete";
  li.appendChild(deleteButton);
  todoList.appendChild(li);

  // Add event listener to checkbox
  checkbox.addEventListener("change", isChecked);

  // Add event listener to delete button
  deleteButton.addEventListener("click", deleteTodoItem);

  if (todo.completed) {
    li.classList.add("line-through");
    li.classList.add("text-slate-500");
    checkbox.checked = true;
  }
}

// Define a function to render all initial todo items
function renderInitialTodos() {
  initialTodos.forEach((todo) => renderTodoItem(todo));
}

// Define a function to add a new todo item to the list
function addTodoItem(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the value of the input field
  const todoText = input.value.trim();

  // If the input field is empty, do nothing
  if (!todoText) {
    return;
  }

  // Create a new todo object and add it to the list
  const todo = new Todo(todoText, false);
  renderTodoItem(todo);

  // Reset the input field to an empty string
  input.value = "";
}

function isChecked(event) {
  const checkbox = event.target;
  const li = checkbox.parentNode;

  if (checkbox.checked) {
    li.classList.add("line-through");
    li.classList.add("text-slate-500");
  } else {
    li.classList.remove("line-through");
    li.classList.remove("text-slate-500");
  }

  // Loop through all li elements and remove the completed class
  const allLis = document.querySelectorAll("li");
  allLis.forEach((li) => li.classList.remove("completed"));
}

// Define a function to delete a todo item
function deleteTodoItem(event) {
  const li = event.target.parentNode;
  todoList.removeChild(li);
}

// Render all initial todo items when the page loads
renderInitialTodos();

// Add event listeners to the form and the todo list
form.addEventListener("submit", addTodoItem);
