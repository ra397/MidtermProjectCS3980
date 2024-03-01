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
        console.log(runTitle + ", " + runMileage + ", " + runTimeElapsed);
        console.log(typeof runTimeElapsed);

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
});