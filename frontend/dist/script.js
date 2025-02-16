"use strict";
const button = document.getElementById("clickMe");
const message = document.getElementById("message");
button.addEventListener("click", () => {
    message.textContent = "Hello, TypeScript!";
});
document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', function () {
        const dropdownContent = this.querySelector('.dropdown-content');
        dropdownContent.classList.toggle('show');
    });
});
// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(function (dropdown) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
};
document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("banner");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            banner === null || banner === void 0 ? void 0 : banner.classList.add("shrink");
        }
        else {
            banner === null || banner === void 0 ? void 0 : banner.classList.remove("shrink");
        }
    });
});
// Dropdown Menu Interaction
const dropdown = document.querySelector(".dropdown");
dropdown.addEventListener("click", function () {
    const dropdownContent = this.querySelector(".dropdown-content");
    dropdownContent.classList.toggle("show");
});
// Close dropdown if user clicks outside
window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
        document.querySelectorAll(".dropdown-content").forEach(dropdown => {
            dropdown.classList.remove("show");
        });
    }
};
;
