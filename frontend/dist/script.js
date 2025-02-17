"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Get essential elements
    const header = document.getElementById("banner");
    const dropdownBtn = document.getElementById("dropdown-btn");
    const dropdownContent = document.getElementById("dropdown-content");
    if (!header || !dropdownBtn || !dropdownContent) {
        console.error("Missing essential elements in the DOM.");
        return;
    }
    // Toggle the dropdown menu on button click
    dropdownBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the click from bubbling up
        dropdownContent.classList.toggle("show");
    });
    // Close the dropdown when clicking outside of it
    document.addEventListener("click", (event) => {
        if (!dropdownBtn.contains(event.target) &&
            !dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove("show");
        }
    });
    // Shrink header on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("shrink");
        }
        else {
            header.classList.remove("shrink");
        }
    });
});
