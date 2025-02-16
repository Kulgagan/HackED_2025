const button = document.getElementById("clickMe") as HTMLButtonElement;
const message = document.getElementById("message") as HTMLParagraphElement;

button.addEventListener("click", () => {
    message.textContent = "Hello, TypeScript!";
});
document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.querySelector('.dropdown') as HTMLElement;
    dropdown.addEventListener('click', function() {
        const dropdownContent = this.querySelector('.dropdown-content') as HTMLElement;
        dropdownContent.classList.toggle('show');
    });
});

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event: MouseEvent) {
    if (!(event.target as HTMLElement).matches('.dropbtn')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(function(dropdown) {
            if ((dropdown as HTMLElement).classList.contains('show')) {
                (dropdown as HTMLElement).classList.remove('show');
            }
        });
    }
};