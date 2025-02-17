"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Banner and related elements
    const banner = document.getElementById("banner");
    const navButtons = document.getElementById("nav-buttons");
    const logo = document.getElementById("logo");
    // Adjust the size of header, logo, and nav buttons on scroll
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 100) {
            // Add shrink classes when scrolling down
            banner.classList.add("shrink");
            logo.classList.add("shrink-logo");
            navButtons.classList.add("shrink-nav");
        }
        else {
            // Remove shrink classes when scrolling back to top
            banner.classList.remove("shrink");
            logo.classList.remove("shrink-logo");
            navButtons.classList.remove("shrink-nav");
        }
    });
});
