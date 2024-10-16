// Attaching an event listener to the login button
document.getElementById('loginbutton').addEventListener('click', function (event) {
    event.preventDefault();

    // Remove any existing error messages
    document.querySelectorAll('.error').forEach(function (error) {
        error.remove();
    });

    // Assume the form is valid initially
    let isValid = true;

    // Validate the email field
    let email = document.getElementById('email').value;
    if (email === '') {
        errorMessage('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        errorMessage('email', 'Kindly enter a valid email address');
        isValid = false;
    }

    // Validate the password field
    let password = document.getElementById('password').value;
    if (password === '') {
        errorMessage('password', 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        errorMessage('password', 'Password must be at least 8 characters, contain an uppercase letter, at least 3 digits, and a special character');
        isValid = false;
    }

    // If form is valid, you can proceed 
    if (isValid) {
        console.log('Form submitted successfully');

        //clearing the fields manually
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('chk').checked = false;
    }
});

// Function to display an error message for a specific form field
function errorMessage(fieldId, message) {
    const field = document.getElementById(fieldId);
    // Creating a new span element for the error message
    const error = document.createElement("span");
    error.innerHTML = message;
    error.className = "error";
    field.insertAdjacentElement("afterend", error); //inserting error message 
}

// Function that is validating email to confirm if it is appropriate
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Function to validate passwords based on the conditions 
function validatePassword(password) {
    const minLength = 8;
    const uppercase = /[A-Z]/.test(password);
    const digits = /\d{3,}/.test(password); // At least 3 digits
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && uppercase && digits && specialChar;
}
