let todos = JSON.parse(localStorage.getItem('todes'))|| [];
function dateTodo() {
const todoInput = document.getElementById('new-todo');
const errorMessage = document.getElementById('error-message');

const value = todoInput.value.trim();
if (value === '') {/*فاضية */
        errorMessage.textContent = 'Must contain a search and not be empty';
        return false;
    }
if (value.length< 10) { /*لحد  اقل اشي9 مشان اعرف امشي   */
        errorMessage.textContent = 'Your search must contain at least 10 characters.';
        return false;
    }
    if (value[0] >= '0' && value[0] <= '9') {/*0-9*/       
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
const todoInput = document.getElementById('new-todo');
 if (!dateTodo()) return;
 todos.push({ text: todoInput.value.trim(), done: false });
    saveTodos();
    todoInput.value = '';
    render();
}
function render() {
  const todoList = document.getElementById('todo-list');
    todoList.innerHTML ='';

    if (todos.length === 0) {
        todoList.innerHTML = 'No Any Tasks';
        return;
    }
      todos.forEach((todo, index) => {
        const li = document.createElement('div');
        li.textContent = todo.text;
        todoList.appendChild(div);
    });
}
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));

}

document.addEventListener(
    'DOMContentLoaded', () => {
    render();
});

