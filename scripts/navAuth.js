const navAuth = document.getElementById("navAuth");
const loginLink = document.getElementById("loginLink");
const loginLinkHref = loginLink.getAttribute("href");
let basePath = loginLinkHref.split("/").slice(0, -1).join("/");

const user = JSON.parse(localStorage.getItem("currentUser"));

function getInitials(name) {
    return name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();
}

if (user) {
    navAuth.innerHTML = `
            <a href="${basePath}/profile.html" class="profile-avatar">
                <div class="nav-avatar">
                    ${getInitials(user.name || "U")}
                </div>
            </a>
    `;
}
