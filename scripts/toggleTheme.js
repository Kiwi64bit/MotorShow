// gets the page theme
function getTheme() {
    const theme = document.documentElement.getAttribute("data-theme");
    return theme || "light";
}

// saves the current theme to local storage
function saveTheme() {
    const theme = getTheme();
    localStorage.setItem("theme", theme);
}

// sets the page theme
function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    saveTheme(theme);
}

// loads the theme from local storage
function loadTheme() {
    const theme = localStorage.getItem("theme") || "light";
    setTheme(theme);
}

// toggles the theme between "light" and "dark"
function toggleTheme() {
    const currentTheme = getTheme();
    if (currentTheme == "light") {
        setTheme("dark");
    } else {
        setTheme("light");
    }
}

loadTheme();

// an array of all `theme-toggler` buttons in the page
const themeButtons = document.querySelectorAll(".theme-toggler");

// loop through each button and add an event listener
for (const btn of themeButtons) {
    btn.addEventListener("click", toggleTheme);
}
