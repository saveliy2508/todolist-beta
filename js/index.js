function onPageLoaded () {
    const input = document.querySelector('input[type="text"]');
    const ul = document.querySelector('ul.list-area_unordered');

    function createTodo() {
        const li = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.classList.add('todo-text');
        const newTodo = input.value;
        textSpan.append(newTodo);
        
        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('todo-trash');
        const icon = document.createElement('button');
        icon.innerHTML = '&#10060;';
        icon.classList.add('trash');
        deleteBtn.appendChild(icon);

        ul.appendChild(li).append(textSpan, deleteBtn);
        input.value = '';

        listenDeleteTodo(deleteBtn)
    }

    function onClickTodo (event) {
        if(event.target.tagName =='LI') {
            event.target.classList.toggle('checked')
        }
    }

    function listenDeleteTodo(element) {
        element.addEventListener('click', (event) => {
            element.parentElement.remove();
            event.stopPropagation();
        });
    }

    input.addEventListener('keypress', (keyPressed) => {
        const keyEnter = 13;
        if(keyPressed.which == keyEnter) {
            createTodo();
        }
    })
    ul.addEventListener('click', onClickTodo);

    const saveButton = document.querySelector('button.save-button');
    const clearButton = document.querySelector('button.clean-button');
    const helpButton = document.querySelector('button.help-button');

    saveButton.addEventListener('click', () => {
        localStorage.setItem('todos', ul.innerHTML);
    })
    clearButton.addEventListener('click', () => {
        ul.innerHTML = '';
        localStorage.removeItem('todos', ul.innerHTML);
    })
    helpButton.addEventListener('click', () => {
        var help = document.querySelector('ul.help__unordered');
        help.classList.toggle('hide')
        helpButton.classList.toggle('active-button')
    })
    
    function loadTodos() {
        const data = localStorage.getItem('todos');
        if(data) {
            ul.innerHTML = data;
        }
        const deleteButtons = document.querySelectorAll('span.todo-trash');
        for(const button of deleteButtons) {
            listenDeleteTodo(button);
        }
    }
    
    loadTodos()
}

document.addEventListener('DOMContentLoaded', onPageLoaded)