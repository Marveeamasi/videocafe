document.addEventListener("DOMContentLoaded", function () {
    const contentHead = document.querySelector(".content-head");
    const navMenu = document.querySelector(".nav-top");
    const sideMenu = document.querySelector(".sidebar");
    const sideMenuCourses = document.querySelector(".nav-landing-outter");
    const logo = document.querySelector(".logo_output_link");

    // === Detect path depth and build path prefix
    const pathDepth = window.location.pathname.split("/").filter(Boolean).length;
    const pathPrefix = "../".repeat(pathDepth);

    // === Create toggle buttons
    const toggleBtn = document.createElement("div");
    toggleBtn.className = "nav-toggle";
    toggleBtn.innerHTML = "&#9776;";

    const toggleBtnSide = document.createElement("div");
    toggleBtnSide.className = "side-toggle";
    toggleBtnSide.innerHTML = `
       <div><img src="${pathPrefix}assets/images/vclawd-Logo.png" alt="logo"></div>&#9660;
    `;

    const toggleBtnSideCourses = document.createElement("div");
    toggleBtnSideCourses.className = "side-toggle";
    toggleBtnSideCourses.innerHTML = `
       <div><img src="${pathPrefix}assets/images/vclawd-Logo.png" alt="logo"></div>&#9660;
    `;

    // === Insert toggle buttons
    if (contentHead && navMenu) {
        contentHead.insertBefore(toggleBtn, navMenu);
    }
    if (contentHead && sideMenu && navMenu) {
        contentHead.insertBefore(toggleBtnSide, navMenu);
    }
    if (contentHead && sideMenuCourses && navMenu) {
        contentHead.insertBefore(toggleBtnSideCourses, navMenu);
    }

    // === Resize and load handlers
    function handleResponsiveLogo() {
        if (sideMenuCourses && logo && contentHead && navMenu) {
            if (window.innerWidth < 1355) {
                logo.style.display = 'none';
                contentHead.insertBefore(toggleBtnSideCourses, navMenu);
            } else {
                logo.style.display = 'block';
            }
        }
    }

    window.addEventListener('resize', handleResponsiveLogo);
    window.addEventListener('load', handleResponsiveLogo);

    // === Toggle click events
    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    if (toggleBtnSide && sideMenu) {
        toggleBtnSide.addEventListener("click", function () {
            sideMenu.classList.toggle("active");
        });
    }

    if (toggleBtnSideCourses && sideMenuCourses) {
        toggleBtnSideCourses.addEventListener("click", function () {
            sideMenuCourses.classList.toggle("active");
        });
    }

    // === Close on outside click
    document.addEventListener("click", function (event) {
        const clickedInside =
            (navMenu && navMenu.contains(event.target)) ||
            (toggleBtn && toggleBtn.contains(event.target)) ||
            (sideMenu && sideMenu.contains(event.target)) ||
            (toggleBtnSide && toggleBtnSide.contains(event.target));

        if (!clickedInside) {
            if (navMenu) navMenu.classList.remove("active");
            if (sideMenu) sideMenu.classList.remove("active");
        }
    });

    // === Page-specific tweaks
    if (document.title === 'Emails') {
        const container = document.querySelector('.content-body .container-fluid');
        if (container) container.classList.add('overflow-horizontal');
    }

    if (document.title === 'Team') {
        const wrapper = document.querySelector('.flex--content-wrapper');
        const tabContent = document.querySelector('.tab-content');
        if (wrapper) wrapper.classList.add('team-item');
        if (tabContent) tabContent.classList.add('teams');
    }

    if (document.title === 'Text to Speech') {
        const content = document.querySelector('.table-text--speech');
        if (content && content.parentNode) {
            const wrapper = document.createElement('div');
            wrapper.className = 'mobile-table-wrapper';
            content.parentNode.insertBefore(wrapper, content);
            wrapper.appendChild(content);
        }
    }
});
