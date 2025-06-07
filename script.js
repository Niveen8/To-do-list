let todos = [];
 /*localStorage*/
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }