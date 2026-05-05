const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}

const avatar = document.getElementById("avatar");
const displayName = document.getElementById("displayName");
const displayEmail = document.getElementById("displayEmail");
const viewPhone = document.getElementById("viewPhone");

const viewMode = document.getElementById("viewMode");
const editMode = document.getElementById("editMode");

const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");

const editBtn = document.getElementById("editBtn");
const cancelBtn = document.getElementById("cancelBtn");
const logoutBtn = document.getElementById("logoutBtn");

// render user
function renderUser() {
    displayName.textContent = currentUser.name;
    displayEmail.textContent = currentUser.email;
    viewPhone.textContent = currentUser.phone;

    avatar.textContent = currentUser.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();
}

renderUser();

// enter edit mode
editBtn.addEventListener("click", () => {
    viewMode.classList.add("hidden");
    editMode.classList.remove("hidden");

    nameInput.value = currentUser.name;
    phoneInput.value = currentUser.phone;
});

cancelBtn.addEventListener("click", () => {
    editMode.classList.add("hidden");
    viewMode.classList.remove("hidden");
});

// save edit
editMode.addEventListener("submit", e => {
    e.preventDefault();

    const isValid = validateNameInput(nameInput) && validatePhoneInput(phoneInput);

    if (!isValid) return;

    currentUser.name = nameInput.value.trim();
    currentUser.phone = phoneInput.value.trim();

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // update users list too
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map(u => (u.email === currentUser.email ? currentUser : u));
    localStorage.setItem("users", JSON.stringify(users));

    renderUser();

    editMode.classList.add("hidden");
    viewMode.classList.remove("hidden");
});

// logout
logoutBtn.addEventListener("click", () => {
    const confirmLogout = confirm("Are you sure you want to sign out?");

    if (!confirmLogout) return;

    localStorage.removeItem("currentUser");
    window.location.replace("login.html");
});
