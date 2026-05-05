// Feedback function
function clearError(input) {
    const formGroup = input.parentElement;
    const feedback = formGroup.querySelector(".form-feedback");
    feedback.innerText = "";
    feedback.classList.remove("error");
    input.classList.remove("is-error");
}

function clearSuccess(input) {
    const formGroup = input.parentElement;
    const feedback = formGroup.querySelector(".form-feedback");
    feedback.innerText = "";
    feedback.classList.remove("success");
    input.classList.remove("is-success");
}

function clearState(input) {
    clearError(input);
    clearSuccess(input);
}

function showError(input, message) {
    clearState(input);
    const formGroup = input.parentElement;
    const feedback = formGroup.querySelector(".form-feedback");
    feedback.innerText = message;
    feedback.classList.add("error");
    input.classList.add("is-error");
}

function showSuccess(input, message) {
    clearState(input);
    const formGroup = input.parentElement;
    const feedback = formGroup.querySelector(".form-feedback");
    feedback.innerText = message;
    feedback.classList.add("success");
    input.classList.add("is-success");
}

// Validation functions
function validateEmailInput(input) {
    const regex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

    clearState(input);

    if (input.value.trim() === "") {
        showError(input, "Email is required");
        return false;
    }

    if (!regex.test(input.value)) {
        showError(input, "Enter a valid email address");
        return false;
    }

    showSuccess(input, "Valid email");
    return true;
}

function validatePasswordInput(input) {
    clearState(input);

    if (input.value.trim() === "") {
        showError(input, "Password is required");
        return false;
    }

    if (input.value.length < 8) {
        showError(input, "Password must be at least 8 characters");
        return false;
    }

    showSuccess(input, "Valid password");
    return true;
}

function validateNameInput(input) {
    clearState(input);

    if (!input || input.value.trim() === "") {
        showError(input, "Name is required");
        return false;
    }

    if (input.value.trim().length < 3) {
        showError(input, "Name must be at least 3 characters");
        return false;
    }

    showSuccess(input, "Valid name");
    return true;
}

function validatePhoneInput(input) {
    clearState(input);

    const regex = /^(010|011|012|015)[0-9]{8}$/;

    if (!input || input.value.trim() === "") {
        showError(input, "Phone is required");
        return false;
    }

    if (!regex.test(input.value)) {
        showError(input, "Enter a valid phone number");
        return false;
    }

    showSuccess(input, "Valid phone");
    return true;
}
