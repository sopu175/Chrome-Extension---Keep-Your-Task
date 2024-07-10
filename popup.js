document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value;
    if (task) {
        addTask(task);
        taskInput.value = '';
    }
});

function addTask(task) {
    chrome.storage.sync.get('tasks', function(data) {
        let tasks = data.tasks || [];
        tasks.push(task);
        chrome.storage.sync.set({tasks: tasks}, function() {
            displayTasks();
        });
    });
}

function displayTasks() {
    chrome.storage.sync.get('tasks', function(data) {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        let tasks = data.tasks || [];
        tasks.forEach((task, index) => {
            let taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.textContent = task;
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                deleteTask(index);
            });
            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);
        });
    });
}

function deleteTask(index) {
    chrome.storage.sync.get('tasks', function(data) {
        let tasks = data.tasks || [];
        tasks.splice(index, 1);
        chrome.storage.sync.set({tasks: tasks}, function() {
            displayTasks();
        });
    });
}

document.addEventListener('DOMContentLoaded', displayTasks);
