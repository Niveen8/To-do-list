let todos = [];
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const input = document.getElementById("New-Todo");
  const addBtn = document.querySelector("button"); 
  const section = document.querySelector(".todo-section");
  const filterButtons = document.querySelectorAll(".filter-buttons .btn");
  const noTasksMessage = document.querySelector(".no-tasks");
  addBtn.addEventListener("click", addTodo);

  function addTodo() {
    const taskText = input.value.trim();
    if (taskText === "") {
      document.getElementById("error-message").textContent = "Please enter a task.";
      return;
    }
    document.getElementById("error-message").textContent = "";

    const newTodo = {
      id: Date.now(),
      text: taskText,
      done: false
    };

    todos.push(newTodo);
    input.value = "";
    saveTodos(); 
    renderTodos(currentFilter);
  }

  function renderTodos(filter = "All") {
  const existingTasks = section.querySelectorAll(".task");
  existingTasks.forEach(task => task.remove());

  let filtered = todos;
 if (filter === "Done") {
    filtered = todos.filter(todo => todo.done);
  } else if (filter === "Todo") {
    filtered = todos.filter(todo => !todo.done);
  }

  noTasksMessage.style.display = filtered.length === 0 ? "block" : "none";