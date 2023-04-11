const form = document.querySelector("form");
const input = document.querySelector("input");
const todoList = document.querySelector("#todoList");

// Define a function to add a new todo item to the list
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

  // Create a new list item and add it to the list
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  li.className = "flex align-items-center";
  li.appendChild(checkbox);
  checkbox.className = "form-checkbox h-5 w-5 text-gray-600 mr-2 ";
  li.appendChild(document.createTextNode(todoText));
  todoList.appendChild(li);

  // Add event listener to checkbox
  checkbox.addEventListener("change", isChecked);

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

// Define a function to mark a todo item as completed
function completeTodoItem(event) {
  // If the clicked element is not an li, do nothing
  if (event.target.tagName !== "LI") {
    return;
  }

  // Toggle the completed class on the clicked li
  event.target.classList.toggle("completed");
}

// Add event listeners to the form and the todo list
form.addEventListener("submit", addTodoItem);
todoList.addEventListener("click", completeTodoItem);
