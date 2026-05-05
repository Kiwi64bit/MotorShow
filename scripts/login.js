const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid = validateEmailInput(email) && validatePasswordInput(password);

    if (isValid) {
        login(email.value.trim(), password.value.trim());
    }
});

function login(emailValue, passwordValue) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === emailValue);

    // email not found
    if (!user) {
        showError(email, "Email does not exist");
        clearState(password);
        return;
    }

    // wrong password
    if (user.password !== passwordValue) {
        showError(password, "Incorrect password");
        return;
    }

    // success
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful!");
}
