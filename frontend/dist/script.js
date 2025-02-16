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
    const dropbtn = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");
    if (dropbtn && dropdownContent) {
        // Toggle dropdown on click
        dropbtn.addEventListener("click", (event) => {
            event.stopPropagation();
            dropdownContent.classList.toggle("show");
        });
        // Close dropdown if user clicks outside
        window.addEventListener("click", (event) => {
            if (!dropbtn.contains(event.target) &&
                !dropdownContent.contains(event.target)) {
                dropdownContent.classList.remove("show");
            }
        });
    }
});
