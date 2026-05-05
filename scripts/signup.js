const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid =
        validateNameInput(nameInput) &&
        validatePhoneInput(phoneInput) &&
        validateEmailInput(email) &&
        validatePasswordInput(password);

    if (isValid) {
        signup(nameInput.value.trim(), email.value.trim(), phoneInput.value.trim(), password.value.trim());
    }
});

function signup(name, emailValue, phone, passwordValue) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.email === emailValue);

    // email already exists
    if (exists) {
        showError(email, "Email already exists");
        return;
    }

    // success
    const newUser = {
        name: name,
        email: emailValue,
        phone: phone,
        password: passwordValue,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    alert("Signup successful!");
    window.location.href = "../index.html"
}
