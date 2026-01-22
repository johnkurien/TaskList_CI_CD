const API_URL = '/api/tasks';

function getTasks() {
    return fetch(API_URL).then(r => r.json());
}

function addTaskApi(name) {
    return fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(name)
    }).then(r => r.json());
}

function deleteTaskApi(id) {
    return fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}

function updateTaskApi(id, name) {
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(name)
    });
}
