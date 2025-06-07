let todos = JSON.parse(localStorage.getItem('todos')) || [];
function dateTodo() {
const todoInput = document.getElementById('newTodo');
const errorMessage = document.getElementById('error message');
const value = todoInput.value.trim();
if (value === '') {
        errorMessage.textContent = 'Must contain a search and not be empty';
        return false;
    }
if (taskText.length < 9) {
        errorMessage.textContent = 'Your search must contain at least 10 characters.';
        return false;
    }
    if (taskText[0] >= '0' && taskText[0] <= '9') {
        errorMessage.textContent = ' search cannot start with a number';
        return;
    }
if (!/^[a-zA-Z0-9\s.,'!?-]+$/.test(value)) { /*احرف وارقام */
        errorMessage.textContent = 'search must contain only English characters';
        return false;
    }
 errorMessage.textContent = '';
    return true;
}