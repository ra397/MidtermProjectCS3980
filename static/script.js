const api = 'http://localhost:8000';

var addRunButton = document.getElementById('addRun');

function isValidTimeFormat(time) {
    var regex = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
    return regex.test(time);
}

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
        getAndDisplayRuns();
    }
});


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
        displayRuns(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// adds most recently submitted run to display
function displayRuns(runs) {
    const tableBody = document.querySelector('#runTable tbody');
    const run = runs[runs.length - 1];
    const row = tableBody.insertRow();
    row.insertCell().textContent = run.title;
    row.insertCell().textContent = run.num_miles;
    row.insertCell().textContent = run.time_elapsed;
}


