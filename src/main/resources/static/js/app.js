function loadTasks() {
    getTasks().then(renderTasks);
}

function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value) return;

    addTaskApi(input.value).then(() => {
        input.value = '';
        loadTasks();
    });
}

function deleteTask(id) {
    deleteTaskApi(id).then(loadTasks);
}

function startEdit(id) {
    document.getElementById(`text-${id}`).style.display = 'none';
    document.getElementById(`edit-${id}`).style.display = 'inline';

    const saveBtn = document.querySelector(`#edit-${id}`)
        .nextElementSibling
        .querySelector('button:nth-child(2)');
    saveBtn.style.display = 'inline';
}

function saveEdit(id) {
    const newName = document.getElementById(`edit-${id}`).value;
    updateTaskApi(id, newName).then(loadTasks);
}

document.getElementById('addBtn')
    .addEventListener('click', addTask);

loadTasks();
