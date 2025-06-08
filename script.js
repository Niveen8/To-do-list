
let todos = [];

  // ✅ تحميل البيانات من localStorage

  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const input = document.getElementById("New-Todo");
  const addBtn = document.querySelector("button"); // زر "add new task"
  const section = document.querySelector(".todo-section");
  const filterButtons = document.querySelectorAll(".filter-buttons .btn");
  const noTasksMessage = document.querySelector(".no-tasks");

  addBtn.addEventListener("click", addTodo);

  let taskToDeleteId = null;

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
    saveTodos(); // ✅ حفظ بعد الإضافة
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

 


const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveBtn = editModal.querySelector(".save");
const cancelBtn = editModal.querySelector(".cancel");

let currentTaskId = null;

function editTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    currentTaskId = id;
    editInput.value = todo.text;
    editModal.style.display = "block";
  }
}

// حفظ التعديل
saveBtn.addEventListener("click", () => {
  const newText = editInput.value.trim();
  if (newText !== "") {
    todos = todos.map(todo => {
      if (todo.id === currentTaskId) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    saveTodos();
    renderTodos(currentFilter);
    editModal.style.display = "none";
    currentTaskId = null;
  }
});

// إلغاء التعديل
cancelBtn.addEventListener("click", () => {
  editModal.style.display = "none";
  currentTaskId = null;
});





function deleteTodo(id) {
  taskToDeleteId = id;
  document.getElementById("confirmDeleteModal").style.display = "block";
  saveTodos();
}
  
function confirmSingleDelete() {
  todos = todos.filter(todo => todo.id !== taskToDeleteId);
  saveTodos();
  renderTodos(currentFilter);
  closeSingleDeleteModal();
}

function closeSingleDeleteModal() {
  document.getElementById("confirmDeleteModal").style.display = "none";
  taskToDeleteId = null;
}




  // ✅ عرض المهام المحفوظة عند فتح الصفحة
  renderTodos(currentFilter);

