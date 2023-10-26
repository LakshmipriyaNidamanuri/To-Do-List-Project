
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.onload = displayTasks;

function addTask() {
    let taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() === '') return;

    let task = {
        id: new Date().getTime(),
        title: taskInput.value,
        completed: false
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    displayTasks();
}

function displayTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span ${task.completed ? 'style="text-decoration: line-through;"' : ''} onclick="editTask(${task.id})">${task.title}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newTitle = prompt("Edit task:", task.title);
    
    if (newTitle !== null && newTitle.trim() !== '') {
        task.title = newTitle;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}
