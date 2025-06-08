function deleteDoneTodos() {
    document.getElementById("deleteAllDoneModal").style.display = "block";
  }

    function confirmDeleteAllDone() {
    todos = todos.filter(todo => !todo.done);
    document.getElementById("deleteAllDoneModal").style.display = "none";
    saveTodos();  
    renderTodos(currentFilter);
  }