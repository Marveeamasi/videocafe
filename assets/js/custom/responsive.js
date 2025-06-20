document.addEventListener("DOMContentLoaded", function () {
    const contentHead = document.querySelector(".content-head");
    const navMenu = document.querySelector(".nav-top");
    const sideMenu = document.querySelector(".sidebar");

    // Creating the toggle buttons
    const toggleBtn = document.createElement("div");
    toggleBtn.className = "nav-toggle";
    toggleBtn.innerHTML = "&#9776;";

    const toggleBtnSide = document.createElement("div");
    toggleBtnSide.className = "side-toggle";
    // Detect path depth
    const pathDepth = window.location.pathname.split("/").filter(Boolean).length;
    const pathPrefix = "../".repeat(pathDepth);

    toggleBtnSide.innerHTML = `
       <div><img src="${pathPrefix}assets/images/vclawd-Logo.png" alt="logo"></div>&#9660;
    `;

    // Inserting the nav toggle button into the header before nav
    if (contentHead && navMenu) {
        contentHead.insertBefore(toggleBtn, navMenu);
    }

    // Inserting the side toggle button into the header before nav
    if (contentHead && sideMenu) {
        contentHead.insertBefore(toggleBtnSide, navMenu);
    }


    // Toggle nav menu on click
    toggleBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Toggle side menu on click
    toggleBtnSide.addEventListener("click", function () {
        sideMenu.classList.toggle("active");
    });


    // Close nav if clicking outside
    document.addEventListener("click", function (event) {
        const isClickInside = navMenu.contains(event.target) || toggleBtn.contains(event.target) || sideMenu.contains(event.target) || toggleBtnSide.contains(event.target);
        if (!isClickInside) {
            navMenu.classList.remove("active");
            sideMenu.classList.remove("active");
        }
    });
});
