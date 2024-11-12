document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const icon = document.getElementById("darkModeIcon");
    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon-o");
        icon.classList.add("fa-sun-o");
    } else {
        icon.classList.remove("fa-sun-o");
        icon.classList.add("fa-moon-o");
    }
});
