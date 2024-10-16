// Attaching an event listener to the register button
document.getElementById('register').addEventListener('click', function (event) {
    event.preventDefault();

    // error handling
    clearErrors();

    // Assuming the form is valid initially
    let isValid = true;

    // Validating first name
    let fname = document.getElementById('fname').value;
    if (fname.trim() === '') {
        showError('fname', 'First name is required');
        isValid = false;
    }

    // Validating last name
    let lname = document.getElementById('lname').value;
    if (lname.trim() === '') {
        showError('lname', 'Last name is required');
        isValid = false;
    }

    // Validating email
    let email = document.getElementById('email').value;
    if (email.trim() === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Kindly enter a valid email');
        isValid = false;
    }

    // Validating password
    let password = document.getElementById('password').value;
    if (password.trim() === '') {
        showError('password', 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError('password', 'Password must be at least 8 characters, include an uppercase letter, 3 digits, and a special character');
        isValid = false;
    }

    // Ensure that terms and conditions are checked
    let terms = document.getElementById('chk').checked;
    if (!terms) {
        alert('kindly agree to the terms and conditions to proceed');
        isValid = false;
    }

    // If all validations pass then submit the form
    if (isValid) {
        console.log('Form submitted successfully');
                //clearing the fields manually
        document.getElementById('fname').value = '';
        document.getElementById('lname').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('chk').checked = false;
    }
});

// Function for validating email format
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Function for validating password
function validatePassword(password) {
    const minLength = 8;
    const uppercase = /[A-Z]/.test(password);
    const digits = /\d{3,}/.test(password);  // At least 3 digits
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && uppercase && digits && specialChar;
}

// Function to display error messages for specific form fields
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    // Create a span element for the error message
    const error = document.createElement("span");
    error.textContent = message;
    error.className = "error";
    field.insertAdjacentElement("afterend", error); //putting the error message to the field
}

// Function to clear all error messages
function clearErrors() {
    document.querySelectorAll('.error').forEach(function (error) {
        error.remove();
    });
}
