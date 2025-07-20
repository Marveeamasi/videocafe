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
    if (contentHead && sideMenu) {
        contentHead.insertBefore(toggleBtnSide, navMenu);
    }
    if (sideMenuCourses) {
        contentHead.insertBefore(toggleBtnSideCourses, navMenu);
    }

    // === Resize and load handlers
    function handleResponsiveLogo() {
        if (sideMenuCourses && logo && window.innerWidth < 1355) {
            logo.style.display = 'none';
            contentHead.insertBefore(toggleBtnSideCourses, navMenu);
        } else {
            if (logo) logo.style.display = 'block';
        }
    }

    window.addEventListener('resize', handleResponsiveLogo);
    window.onload = handleResponsiveLogo;

    // === Toggle click events
    toggleBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    toggleBtnSide.addEventListener("click", function () {
        sideMenu.classList.toggle("active");
    });

    toggleBtnSideCourses.addEventListener("click", function () {
        sideMenuCourses.classList.toggle("active");
    });

    // === Close on outside click
    document.addEventListener("click", function (event) {
        const isClickInside =
            navMenu.contains(event.target) ||
            toggleBtn.contains(event.target) ||
            sideMenu.contains(event.target) ||
            toggleBtnSide.contains(event.target);
        if (!isClickInside) {
            navMenu.classList.remove("active");
            sideMenu.classList.remove("active");
        }
    });

    // === Page-specific tweaks
    if (document.title === 'Emails') {
        document.querySelector('.content-body .container-fluid')?.classList.add('overflow-horizontal');
    }

    if (document.title === 'Team') {
        document.querySelector('.flex--content-wrapper')?.classList.add('team-item');
        document.querySelector('.tab-content')?.classList.add('teams');
    }

    if (document.title === 'Text to Speech') {
        const content = document.querySelector('.table-text--speech');
        const wrapper = document.createElement('div');
        wrapper.className = 'mobile-table-wrapper';
        content.parentNode.insertBefore(wrapper, content);
        wrapper.appendChild(content);
    }
});
