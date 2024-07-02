   document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value;
        addTask(taskText);
        saveTask(taskText);
        taskInput.value = '';
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const taskItem = e.target.parentElement;
            removeTask(taskItem);
            taskItem.remove();
        } else if (e.target.classList.contains('edit')) {
            const taskItem = e.target.parentElement;
            const newText = prompt('Edit your task', taskItem.firstChild.textContent);
            if (newText) {
                updateTask(taskItem, newText);
            }
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(taskText));

        const editBtn = document.createElement('span');
        editBtn.className = 'edit';
        editBtn.textContent = 'Edit';
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = 'Delete';
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    }

    function saveTask(taskText) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(task => addTask(task));
    }

    function removeTask(taskItem) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks = tasks.filter(task => task !== taskItem.firstChild.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTask(taskItem, newText) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        const index = tasks.indexOf(taskItem.firstChild.textContent);
        if (index !== -1) {
            tasks[index] = newText;
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskItem.firstChild.textContent = newText;
    }
});
