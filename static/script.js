// JavaScript code for validation
document.getElementById('myForm').addEventListener('submit', function(event) {
    var timeInput = document.getElementById('timeElapsedInput').value;
    if (!isValidTimeFormat(timeInput)) {
        alert('Please enter time in the format HH:MM:SS');
        event.preventDefault(); // Prevent form submission
    }
});

function isValidTimeFormat(time) {
    var regex = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
    return regex.test(time);
}