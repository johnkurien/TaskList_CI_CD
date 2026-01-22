function renderTasks(tasks) {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');

        li.innerHTML = `
            <span id="text-${task.id}">${task.name}</span>

            <input id="edit-${task.id}" value="${task.name}"
                   style="display:none; width:60%"/>

            <div class="actions">
                <button onclick="startEdit(${task.id})">Edit</button>
                <button onclick="saveEdit(${task.id})" style="display:none">Save</button>
                <button onclick="deleteTask(${task.id})">X</button>
            </div>
        `;

        list.appendChild(li);
    });
}
