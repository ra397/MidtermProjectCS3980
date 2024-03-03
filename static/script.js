const api = 'http://localhost:8000';

var addRunButton = document.getElementById('addRun');

if (addRunButton != null) {
    addRunButton.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('USER WANTS TO ADD A RUN');

        // grab the data to send to FastAPI from HTML elements
        const runTitle = document.getElementById('textInput').value;
        const runMileage = document.getElementById('milesInput').value;
        const runTimeElapsed = document.getElementById('timeElapsedInput').value;

        // validate that the elapsed time input is in the correct format
        if (!isValidTimeFormat(runTimeElapsed)) {
            alert("Please enter time in the form HH:MM:SS");
        } else {
            // if valid, send to FastAPI
            submitRun(runTitle, runMileage, runTimeElapsed);

            // go back to running log (index.html)
            window.location.href = '/static/index.html';
        }
    });
}

function submitRun(runTitle, runMileage, runTimeElapsed) {
    // this is the data to send
    const requestData = {
        title: runTitle,
        num_miles: runMileage,
        time_elapsed: runTimeElapsed
    }

    // Make a POST request using fetch
    fetch('/runs/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// gets all run entries from FastAPI and adds the latest run to the display
function getAndDisplayRuns() {
    // Make a GET request to fetch all runs
    fetch('/runs/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Display or process the retrieved runs data
        console.log('Runs:', data);
        // Assuming you have a function to display runs, you can call it here
        if (data.length > 0) {
            displayRuns(data);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// helper function for getAndDisplayRuns() that displays all runs
function displayRuns(runs) {
    const tableBody = document.querySelector('#runTable tbody');
    for (let i = 0; i < runs.length; i ++) {
        const run = runs[i];

        const row = tableBody.insertRow();
        const titleCell = row.insertCell(0);
        const milesCell = row.insertCell(1);
        const timeCell = row.insertCell(2);
        const actionCell = row.insertCell(3);

        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = run.title;
        titleInput.disabled = true; // disable input until 'EDIT' button is pressed
        titleCell.appendChild(titleInput);

        const milesInput = document.createElement('input');
        milesInput.type = 'number';
        milesInput.step = 0.1;
        milesInput.min = 0.0;
        milesInput.value = run.num_miles;
        milesInput.disabled = true; // disable input until 'EDIT' button is pressed
        milesCell.appendChild(milesInput);

        const timeInput = document.createElement('input');
        timeInput.type = 'text';
        timeInput.value = run.time_elapsed;
        timeInput.disabled = true; // disable input until 'EDIT' button is pressed
        timeCell.appendChild(timeInput);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.onclick = () => enableEdit(row, titleInput, milesInput, timeInput, run);
        actionCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteRun(run);
        actionCell.appendChild(deleteButton);
    }
}

async function deleteRun(run) {
    const runId = run.id;
    const runTitle = run.title;
    const confirmDelete = confirm(`Are you sure you want to delete "${runTitle}"?`);

    if (confirmDelete) {
        const response = await fetch(`/runs/${runId}`, {
            method: 'DELETE'
        });
        await response.json();
        location.reload();
    }
}

async function enableEdit(row, titleInput, milesInput, timeInput, run_data) {
    console.log('USER WANTS TO EDIT');
}

async function editRun(run) {
    

}

function isValidTimeFormat(time) {
    var regex = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
    return regex.test(time);
}