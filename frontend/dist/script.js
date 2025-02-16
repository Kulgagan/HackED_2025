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
    // Dropdown Menu - Close if clicking outside
    window.onclick = function (event) {
        if (!event.target.matches(".dropbtn")) {
            document.querySelectorAll(".dropdown-content").forEach(dropdown => {
                dropdown.style.display = "none";
            });
        }
    };
    // Ensure dropdown remains functional
    const dropdown = document.querySelector(".dropdown");
    if (dropdown) {
        dropdown.addEventListener("mouseenter", function () {
            const dropdownContent = this.querySelector(".dropdown-content");
            dropdownContent.style.display = "block";
        });
        dropdown.addEventListener("mouseleave", function () {
            const dropdownContent = this.querySelector(".dropdown-content");
            dropdownContent.style.display = "none";
        });
    }
});
