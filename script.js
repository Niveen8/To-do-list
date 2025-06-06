let todos = JSON.parse(localStorage.getItem('todos')) || [];
function dateTodo() {
const todoInput = document.getElementById('newTodo');
const errorMessage = document.getElementById('error message');
const value = todoInput.value.trim();
if (value === '') {
        errorMessage.textContent = 'Must contain a search and not be empty';
        return false;
    }
if (taskText.length < 10) {
        errorMessage.textContent = 'Your search must contain at least 10 characters.';
        return false;
    }

}