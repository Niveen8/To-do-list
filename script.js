let todos = JSON.parse(localStorage.getItem('todos')) || [];
function dateTodo() {
const todoInput = document.getElementById('newTodo');
const errorMessage = document.getElementById('error message');
const value = todoInput.value.trim();
if (value === '') {/*فاضية */
        errorMessage.textContent = 'Must contain a search and not be empty';
        return false;
    }
if (taskText.length < 9) { /*لحد  اقل اشي9 مشان اعرف امشي   */
        errorMessage.textContent = 'Your search must contain at least 10 characters.';
        return false;
    }
    if (taskText[0] >= '0' && taskText[0] <= '9') {/*0-9*/       
         errorMessage.textContent = ' search cannot start with a number';
        return;
    }
if (!/^[a-zA-Z0-9\s.,'!?-]+$/.test(value)) { /*احرف وارقام */
        errorMessage.textContent = 'search must contain only English characters,0-9';
        return false;
    }
 errorMessage.textContent ='';
    return true;
}
function adding(){
const todoInput = document.getElementById('NEW....');
 if (!dateTodo()) return;
 todos.push({ text: todoInput.value.trim(), done: false });
    saveTodos();
    todoInput.value = '';
    render();
}
function render() {
    const todoList = document.getElementById('Todo List');
    todoList.innerHTML ='';

    if (todos.length === 0) {
        todoList.innerHTML = '<li>No Any Tasks</li>';
        return;
    }
      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        todoList.appendChild(li);
    });
}
function saveTodos() {
    localStorage.setItem('Tasks', JSON.stringify(Tasks));
}

document.addEventListener('DOMContentLoaded', () => {
    render();
});
saveTodos();
