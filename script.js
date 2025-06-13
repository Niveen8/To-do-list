document.addEventListener("DOMContentLoaded", () => {
  let todos = [];
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }

  const input = document.getElementById("New-Todo");
  const addBtn = document.querySelector("button");
  const section = document.querySelector(".todo-section");
  const filterButtons = document.querySelectorAll(".filter-buttons .btn");
  const noTasksMessage = document.querySelector(".no-tasks");
  const errorMessage = document.getElementById("error-message");

  let currentFilter = "All";

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function validateInput(value) {
    if (value === '') {
      errorMessage.textContent = 'Must contain a search and not be empty';
      return false;
    }
    if (value.length < 5) {
      errorMessage.textContent = 'Your search must contain at least 5 characters.';
      return false;
    }
    if (value[0] >= '0' && value[0] <= '9') {
      errorMessage.textContent = 'Search cannot start with a number';
      return false;
    }
    if (!/^[a-zA-Z0-9\s.,'!?-]+$/.test(value)) {
      errorMessage.textContent = 'Search must contain only English characters and digits (0-9)';
      return false;
    }
    errorMessage.textContent = '';
    return true;
  }

  function renderTodos(filter = "All") {
    // حذف المهام القديمة
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
            <input type="checkbox" ${todo.done ? "checked" : ""}>
          </div>
        </div>
      `;

      // حدث حالة المهمّة عند تغيير التشيك بوكس
      const checkbox = taskEl.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", () => {
        todo.done = checkbox.checked;
        saveTodos();
        renderTodos(currentFilter);
      });

      section.appendChild(taskEl);
    });
  }

  function addTodo() {
    const taskText = input.value.trim();
    if (!validateInput(taskText)) return;

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

  addBtn.addEventListener("click", addTodo);

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentFilter = btn.textContent;
      renderTodos(currentFilter);
    });
  });

  renderTodos(currentFilter);
});
