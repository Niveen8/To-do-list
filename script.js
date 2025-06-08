 

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
   filtered.forEach(todo => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";
    taskEl.innerHTML = `
      <div class="task-content">
        <span class="${todo.done ? 'done-task' : ''}">
          ${todo.text}
        </span>
        <div class="task-actions">
          <input type="checkbox" ${todo.done ? "checked" : ""} onchange="toggleDone(${todo.id})">
          <i class="fas fa-pen edit-icon" onclick="editTodo(${todo.id})"></i>
          <i class="fas fa-trash delete-icon" onclick="deleteTodo(${todo.id})"></i>
        </div>
      </div>
    `;
    section.appendChild(taskEl);
  });
}

function toggleDone(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  saveTodos(); // ✅ حفظ بعد التعديل
  renderTodos(currentFilter);
}
let currentFilter = "All";
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.textContent;
    renderTodos(currentFilter);
  });
});

function deleteDoneTodos() {
    document.getElementById("deleteAllDoneModal").style.display = "block";
  }

    function confirmDeleteAllDone() {
    todos = todos.filter(todo => !todo.done);
    document.getElementById("deleteAllDoneModal").style.display = "none";
    saveTodos(); // ✅ حفظ بعد الحذف
    renderTodos(currentFilter);
  }
    function closeDeleteAllDoneModal() {
    document.getElementById("deleteAllDoneModal").style.display = "none";
  }
    function deleteAllTodos() {
    document.getElementById("deleteAllModal").style.display = "block";
  }
   function confirmDeleteAll() {
    todos = [];
    document.getElementById("deleteAllModal").style.display = "none";
    saveTodos(); // ✅ حفظ بعد الحذف الكلي
    renderTodos(currentFilter);
  }
    function closeDeleteAllModal() {
    document.getElementById("deleteAllModal").style.display = "none";
  }
    function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      input.value = todo.text;
      deleteTodo(id); // نحذف القديم لتعديله
    }
  }
   function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos(); // ✅ حفظ بعد الحذف الفردي
    renderTodos(currentFilter);
  } 



