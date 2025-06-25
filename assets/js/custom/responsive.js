document.addEventListener("DOMContentLoaded", function () {
    const contentHead = document.querySelector(".content-head");
    const navMenu = document.querySelector(".nav-top");
    const sideMenu = document.querySelector(".sidebar");
    const sideMenuCourses = document.querySelector(".nav-landing-outter");
    const logo = document.querySelector(".logo_output_link");

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

        const toggleBtnSideCourses = document.createElement("div");
toggleBtnSideCourses.className = "side-toggle";
    toggleBtnSideCourses.innerHTML = `
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

     // Inserting the side toggle button into the header before nav
    if (sideMenuCourses) {
        contentHead.insertBefore(toggleBtnSideCourses, navMenu);
    }

window.addEventListener('resize', function () {
    if (sideMenuCourses && logo && window.innerWidth < 1355) {
        logo.style.display = 'none';
        contentHead.insertBefore(toggleBtnSideCourses, navMenu);
    }else{
         logo.style.display = 'block';
    }
});

window.onload = function () {
      if (sideMenuCourses && logo && window.innerWidth < 1355) {
        logo.style.display = 'none';
        contentHead.insertBefore(toggleBtnSideCourses, navMenu);
    }else{
         logo.style.display = 'block';
    }
};

    // Toggle nav menu on click
    toggleBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Toggle side menu on click
    toggleBtnSide.addEventListener("click", function () {
        sideMenu.classList.toggle("active");
    });

        // Toggle side menu courses on click
    toggleBtnSideCourses.addEventListener("click", function () {
        sideMenuCourses.classList.toggle("active");
    });



    // Close nav if clicking outside
    document.addEventListener("click", function (event) {
        const isClickInside = navMenu.contains(event.target) || toggleBtn.contains(event.target) || sideMenu.contains(event.target) || toggleBtnSide.contains(event.target);
        if (!isClickInside) {
            navMenu.classList.remove("active");
            sideMenu.classList.remove("active");
        }
    });

    if (document.title === 'Emails') {
  document.querySelector('.content-body .container-fluid')?.classList.add('overflow-horizontal');
}

// manipulating teams pages
   if (document.title === 'Team') {
  document.querySelector('.flex--content-wrapper')?.classList.add('team-item');
   document.querySelector('.tab-content')?.classList.add('teams');
  
}

// manipulating tables to make it overflow-x
   if (document.title === 'Text to Speech') {
  const content = document.querySelector('.table-text--speech');

const wrapper = document.createElement('div');
wrapper.className = 'mobile-table-wrapper';
content.parentNode.insertBefore(wrapper, content);
wrapper.appendChild(content);
  
}

});
