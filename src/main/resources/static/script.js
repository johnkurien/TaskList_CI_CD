function loadTasks() {
    fetch('/api/tasks')
        .then(res => res.json())
        .then(tasks => {
            const list = document.getElementById("taskList");
            list.innerHTML = '';
            tasks.forEach(t => {
                list.innerHTML +=
                    `<li>${t.name}
                        <button onclick="deleteTask(${t.id})">X</button>
                     </li>`;
            });
        });
}

function addTask() {
    const name = document.getElementById("taskInput").value;

    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(name)
    }).then(loadTasks);
}

function deleteTask(id) {
    fetch(`/api/tasks/${id}`, { method: 'DELETE' })
        .then(loadTasks);
}

loadTasks();
