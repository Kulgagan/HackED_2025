"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Shrinking header on scroll
    const banner = document.getElementById("banner");
    if (banner) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                banner.classList.add("shrink");
            }
            else {
                banner.classList.remove("shrink");
            }
        });
    }
    // Dropdown Menu Interaction
    const exploreButton = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");
    // Toggle dropdown on Explore button click
    exploreButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent click from propagating to window
        dropdownContent.classList.toggle("show");
    });
    // Close dropdown if user clicks outside the button or dropdown
    window.addEventListener("click", (event) => {
        if (!exploreButton.contains(event.target) &&
            !dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove("show");
        }
    });
});
