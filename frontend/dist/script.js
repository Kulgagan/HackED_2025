"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const header = document.getElementById("banner");
    const dropdownBtn = document.getElementById("dropdown-btn");
    const dropdownContent = document.getElementById("dropdown-content");
    if (!header || !dropdownBtn || !dropdownContent) {
        console.error("Missing essential elements in the DOM.");
        return;
    }
    // Function to toggle dropdown menu
    function toggleDropdown(event) {
        event.stopPropagation(); // Prevent closing when clicking on the button itself
        dropdownContent.classList.toggle("show");
    }
    // Close dropdown when clicking outside
    function closeDropdown(event) {
        if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove("show");
        }
    }
    // Shrink header on scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add("shrink");
        }
        else {
            header.classList.remove("shrink");
        }
    }
    // Attach event listeners
    dropdownBtn.addEventListener("click", toggleDropdown);
    document.addEventListener("click", closeDropdown);
    window.addEventListener("scroll", handleScroll);
});
