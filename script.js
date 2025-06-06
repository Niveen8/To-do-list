let todos = JSON.parse(localStorage.getItem('todos')) || [];
function dateTodo() {
const todoInput = document.getElementById('newTodo');
const errorMessage = document.getElementById('error message');
const value = todoInput.value.trim();
if (value === '') {
        errorMessage.textContent = '⛔ Task cannot be empty';
        return false;
    }
    

}