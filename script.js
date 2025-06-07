let todos = [];
 /*localStorage*/
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const input = document.getElementById("New-Todo");
  const addBtn = document.querySelector("button"); /*زر "add new task"*/
  const section = document.querySelector(".todo-section");
  const filterButtons = document.querySelectorAll(".filter-buttons .btn");
  const noTasksMessage = document.querySelector(".no-tasks");
  addBtn.addEventListener("click", addTodo);

  function addTodo() {
    const taskText = input.value.trim();
    if (taskText === "") {
      document.getElementById("error-message").textContent = "Please enter a task.";
      return;
    }}