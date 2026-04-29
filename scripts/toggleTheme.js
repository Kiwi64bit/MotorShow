// toggles the theme by changing `<html>` element `data-theme` attribute between "light" and "dark"
function toggleTheme(event) {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme") || "light";
    const newTheme = currentTheme == "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);
}

// an array of buttons with the `theme-toggler` class
const themeButtons = document.querySelectorAll(".theme-toggler");

// loop through each button and add an event listener
for (const btn of themeButtons) {
    btn.addEventListener("click", toggleTheme);
}
