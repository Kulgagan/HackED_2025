"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Button Click Event
    const button = document.getElementById("clickMe");
    const message = document.getElementById("message");
    if (button && message) {
        button.addEventListener("click", () => {
            message.textContent = "Hello, TypeScript!";
        });
    }
    // Dropdown Menu Interaction
    const dropdown = document.querySelector(".dropdown");
    if (dropdown) {
        dropdown.addEventListener("click", function () {
            const dropdownContent = this.querySelector(".dropdown-content");
            dropdownContent.classList.toggle("show");
        });
    }
    // Banner Scroll Effect
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
});
// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
        document.querySelectorAll(".dropdown-content").forEach(dropdown => {
            dropdown.classList.remove("show");
        });
    }
};
