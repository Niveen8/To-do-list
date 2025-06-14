// مصفوفة المهام
let todos = [];

// تحميل المهام من localStorage إن وجدت
const savedTodos = localStorage.getItem("todos");
if (savedTodos) {
  todos = JSON.parse(savedTodos);
}

// حفظ المهام إلى localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// العناصر الرئيسية في الصفحة
const input = document.getElementById("New-Todo");
const addBtn = document.querySelector("button");
const section = document.querySelector(".todo-section");
const filterButtons = document.querySelectorAll(".filter-buttons .btn");
const noTasksMessage = document.querySelector(".no-tasks");

// زر الإضافة
addBtn.addEventListener("click", addTodo);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTodo();
});

let currentFilter = "All";
let taskToDeleteId = null;
let currentTaskId = null;

// إضافة مهمة جديدة
function addTodo() {
  const taskText = input.value.trim();
  if (!taskText) {
    document.getElementById("error-message").textContent = "Please enter a task.";
    return;
  }

let firstCharCode = taskText.charCodeAt(0);
    console.log("first char = "+firstCharCode);
    if (!(firstCharCode >=65 && firstCharCode <=90 || firstCharCode >=97 && firstCharCode <=122) ) { // 32 هو كود المسافة
      document.getElementById("error-message").textContent = "Task must start with a just character";
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

// عرض المهام حسب الفلتر
function renderTodos(filter = "All") {
  section.querySelectorAll(".task").forEach(task => task.remove());

  let filtered = todos;
  if (filter === "Done") {
    filtered = todos.filter(todo => todo.done);
  } else if (filter === "Todo") {
    filtered = todos.filter(todo => !todo.done);
  }

  noTasksMessage.style.display = filtered.length ? "none" : "block";

  filtered.forEach(todo => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";

    const checked = todo.done ? "checked" : "";
    const doneClass = todo.done ? "done-task" : "";

    taskEl.innerHTML = `
      <div class="task-content">
        <span class="${doneClass}">${todo.text}</span>
        <div class="task-actions">
          <input type="checkbox" ${checked} onchange="toggleDone(${todo.id})">
          <i class="fas fa-pen edit-icon" onclick="editTodo(${todo.id})"></i>
          <i class="fas fa-trash delete-icon" onclick="deleteTodo(${todo.id})"></i>
        </div>
      </div>
    `;

    section.appendChild(taskEl);
  });
}

// تبديل حالة الإنجاز
function toggleDone(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) todo.done = !todo.done;
  saveTodos();
  renderTodos(currentFilter);
}

// الفلاتر: الكل / منجز / غير منجز
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.textContent;
    renderTodos(currentFilter);
  });
});

// حذف مهمة واحدة مع التأكيد
function deleteTodo(id) {
  taskToDeleteId = id;
  document.getElementById("confirmDeleteModal").style.display = "block";
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

// حذف المهام المنجزة
function deleteDoneTodos() {
  document.getElementById("deleteAllDoneModal").style.display = "block";
}

function confirmDeleteAllDone() {
  todos = todos.filter(todo => !todo.done);
  saveTodos();
  renderTodos(currentFilter);
  closeDeleteAllDoneModal();
}

function closeDeleteAllDoneModal() {
  document.getElementById("deleteAllDoneModal").style.display = "none";
}

// حذف كل المهام
function deleteAllTodos() {
  document.getElementById("deleteAllModal").style.display = "block";
}

function confirmDeleteAll() {
  todos = [];
  saveTodos();
  renderTodos(currentFilter);
  closeDeleteAllModal();
}

function closeDeleteAllModal() {
  document.getElementById("deleteAllModal").style.display = "none";
}

// تعديل مهمة
const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveBtn = editModal.querySelector(".save");
const cancelBtn = editModal.querySelector(".cancel");

function editTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    currentTaskId = id;
    editInput.value = todo.text;
    editModal.style.display = "block";
  }
}

saveBtn.addEventListener("click", () => {
  const newText = editInput.value.trim();
  if (newText) {
    const todo = todos.find(t => t.id === currentTaskId);
    if (todo) todo.text = newText;
    saveTodos();
    renderTodos(currentFilter);
    editModal.style.display = "none";
    currentTaskId = null;
  }
});

cancelBtn.addEventListener("click", () => {
  editModal.style.display = "none";
  currentTaskId = null;
});

// إغلاق النوافذ عند الضغط خارجها
window.addEventListener("click", function (event) {
  document.querySelectorAll(".modal").forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// عرض المهام عند فتح الصفحة
renderTodos(currentFilter);