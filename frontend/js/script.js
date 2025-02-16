var button = document.getElementById("clickMe");
var message = document.getElementById("message");
button.addEventListener("click", function () {
    message.textContent = "Hello, TypeScript!";
});
document.addEventListener("DOMContentLoaded", function () {
    var dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', function () {
        var dropdownContent = this.querySelector('.dropdown-content');
        dropdownContent.classList.toggle('show');
    });
});
// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(function (dropdown) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
};
