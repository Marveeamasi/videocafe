document.addEventListener("DOMContentLoaded", function () {
    const contentHead = document.querySelector(".content-head");
    const navMenu = document.querySelector(".nav-top");

  // Creating the toggle button
    const toggleBtn = document.createElement("div");
    toggleBtn.className = "nav-toggle";
    toggleBtn.innerHTML = "&#9776;";

    // Inserting the toggle button into the header before nav
    if (contentHead && navMenu) {
        contentHead.insertBefore(toggleBtn, navMenu);
    }

    // Toggle nav menu on click
    toggleBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Close nav if clicking outside
    document.addEventListener("click", function (event) {
        const isClickInside = navMenu.contains(event.target) || toggleBtn.contains(event.target);
        if (!isClickInside) {
            navMenu.classList.remove("active");
        }
    });
});
