const API_KEY = 'patd4be9mcFIwTRFZ.c5fc8501b9efc4d7c87852dcef050e76000e9a11e6932629b82ff05c45473801'; // Replace with your Airtable API key
const BASE_ID = 'appLeIwOqjOgWfv1m'; // Replace with your Airtable Base ID
const TABLE_NAME = 'Tasks'; // Replace with your table name
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

async function fetchTasks() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayTasks(data.records);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = `${task.fields.Task} - Status: ${task.fields.Status}`;
        taskList.appendChild(listItem);
    });
}

// Fetch tasks on page load
fetchTasks();
