document.addEventListener('DOMContentLoaded', () => {
    const taskTitleInput = document.getElementById('taskTitle');
    const taskPrioritySelect = document.getElementById('taskPriority');
    const btnTask = document.getElementById('btnTask');
    const taskTableBody = document.querySelector('#taskTable tbody');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = (tasks) => {
        taskTableBody.innerHTML = '';
        tasks.forEach((task, index) => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = task.title;

            const priorityCell = document.createElement('td');
            priorityCell.textContent = task.priority;
            priorityCell.classList.add(`priority-${task.priority.toLowerCase()}`);

            const statusCell = document.createElement('td');
            const statusButton = document.createElement('button');
            statusButton.textContent = task.status;
            statusButton.classList.add('status-button', `status-${task.status.toLowerCase()}`);
            statusButton.addEventListener('click', () => {
                task.status = task.status === 'pending' ? 'in-progress' : task.status === 'in-progress' ? 'complete' : 'pending';
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks(tasks);
            });
            statusCell.appendChild(statusButton);

            const removeCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'remove';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', () => {
                const deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];
                const removedTask = tasks.splice(index, 1)[0];
                deletedTasks.push(removedTask);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
                renderTasks(tasks);
            });
            removeCell.appendChild(removeButton);

            row.appendChild(nameCell);
            row.appendChild(priorityCell);
            row.appendChild(statusCell);
            row.appendChild(removeCell);

            taskTableBody.appendChild(row);
        });
    };

    btnTask.addEventListener('click', () => {
        const title = taskTitleInput.value.trim();
        const priority = taskPrioritySelect.value;
        if (!title || !priority) {
            alert('Task cannot be empty!');
            return;
        }
        const newTask = {
            title,
            priority,
            status: 'pending'
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskTitleInput.value = '';
        taskPrioritySelect.value = '';
        renderTasks(tasks);
    });
    
    
    renderTasks(tasks);
});
