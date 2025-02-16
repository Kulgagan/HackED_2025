"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("mouseenter", function () {
            const dropdownContent = this.querySelector(".dropdown-content");
            if (dropdownContent) {
                dropdownContent.style.display = "block";
            }
        });
        dropdown.addEventListener("mouseleave", function () {
            const dropdownContent = this.querySelector(".dropdown-content");
            if (dropdownContent) {
                dropdownContent.style.display = "none";
            }
        });
    });
});
