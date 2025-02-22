document.getElementById('task-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
        const result = await response.json();
        alert(result.message);
        loadTasks();
    } else {
        alert('Failed to add task');
    }
});

async function loadTasks() {
    console.log('Loading tasks...');
    const response = await fetch('http://localhost:3000/tasks');
    if (response.ok) {
        const data = await response.json();
        console.log('Tasks loaded:', data);
        const tasksList = document.getElementById('tasks-list');
        tasksList.innerHTML = '';
        data.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.textContent = `${task.title}: ${task.description}`;

            const editButton = document.createElement('button');
            editButton.className = 'btn btn-warning btn-sm mr-2';
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editTask(task.id));

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(task.id));

            const buttonGroup = document.createElement('div');
            buttonGroup.appendChild(editButton);
            buttonGroup.appendChild(deleteButton);

            li.appendChild(buttonGroup);
            tasksList.appendChild(li);
        });
    } else {
        console.error('Failed to load tasks');
    }
}

async function deleteTask(id) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('Task deleted');
        loadTasks();
    } else {
        alert('Failed to delete task');
    }
}

async function editTask(id) {
    const newTitle = prompt('Enter new title:');
    const newDescription = prompt('Enter new description:');

    if (newTitle && newDescription) {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle, description: newDescription}),
        });

        if (response.ok) {
            alert('Task updated');
            loadTasks();
        } else {
            alert('Failed to update task');
        }
    }
}

loadTasks();