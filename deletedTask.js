document.addEventListener('DOMContentLoaded', () => {
    const filterPrioritySelect = document.getElementById('filterPriority');
    const filterStatusSelect = document.getElementById('filterStatus');
    const deletedTaskTableBody = document.querySelector('#deletedTaskTable tbody');

    let deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];
    
    const renderDeletedTasks = (tasks) => {
        deletedTaskTableBody.innerHTML = '';
        tasks.forEach((task, index) => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = task.title;

            const priorityCell = document.createElement('td');
            priorityCell.textContent = task.priority;
            priorityCell.classList.add(`priority-${task.priority.toLowerCase()}`);

            const statusCell = document.createElement('td');
            statusCell.textContent = task.status;

            const restoreCell = document.createElement('td');
            const restoreButton = document.createElement('button');
            restoreButton.textContent = 'restore';
            restoreButton.classList.add('restore-button');
            restoreButton.addEventListener('click', () => {
                const restoredTask = deletedTasks.splice(index, 1)[0];
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                tasks.push(restoredTask);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
                renderDeletedTasks(deletedTasks);
            });
            restoreCell.appendChild(restoreButton);

            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                deletedTasks.splice(index, 1);
                localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
                renderDeletedTasks(deletedTasks);
            });
            deleteCell.appendChild(deleteButton);

            row.appendChild(nameCell);
            row.appendChild(priorityCell);
            row.appendChild(statusCell);
            row.appendChild(restoreCell);
            row.appendChild(deleteCell);

            deletedTaskTableBody.appendChild(row);
        });
    };

    const filterTasks = () => {
        const priority = filterPrioritySelect.value;
        const status = filterStatusSelect.value;
        let filteredTasks = deletedTasks;

        if (priority) {
            filteredTasks = filteredTasks.filter(task => task.priority.toLowerCase() === priority.toLowerCase());
        }

        if (status) {
            filteredTasks = filteredTasks.filter(task => task.status.toLowerCase() === status.toLowerCase());
        }

        renderDeletedTasks(filteredTasks);
    };
    
    deleteButton.addEventListener('click', () => {
    deletedTasks.splice(index, 1);
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
    renderDeletedTasks(deletedTasks);
});
    
    
    filterPrioritySelect.addEventListener('change', filterTasks);
    filterStatusSelect.addEventListener('change', filterTasks);
    
    renderDeletedTasks(deletedTasks);
});
