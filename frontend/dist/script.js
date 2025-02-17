"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Banner Shrinking Effect
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
    // Dropdown Menu - Open and Close
    const dropdownButton = document.getElementById("dropdown-btn");
    const dropdownContent = document.getElementById("dropdown-content");
    if (dropdownButton && dropdownContent) {
        // Toggle dropdown visibility when the button is clicked
        dropdownButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent triggering the document click handler
            dropdownContent.classList.toggle("show");
        });
        // Close dropdown if clicking outside of the dropdown
        document.addEventListener("click", (event) => {
            if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
                dropdownContent.classList.remove("show");
            }
        });
    }
    // Ensure the dropdown menu shows when hovering over the button
    const dropdown = document.querySelector(".dropdown");
    if (dropdown) {
        const dropdownContent = dropdown.querySelector(".dropdown-content");
        if (dropdownContent) {
            dropdown.addEventListener("mouseenter", () => {
                dropdownContent.style.display = "block";
            });
            dropdown.addEventListener("mouseleave", () => {
                dropdownContent.style.display = "none";
            });
        }
    }
});
