document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("mouseenter", function (this: HTMLElement) {
            const dropdownContent = this.querySelector(".dropdown-content") as HTMLElement;
            if (dropdownContent) {
                dropdownContent.style.display = "block";
            }
        });

        dropdown.addEventListener("mouseleave", function (this: HTMLElement) {
            const dropdownContent = this.querySelector(".dropdown-content") as HTMLElement;
            if (dropdownContent) {
                dropdownContent.style.display = "none";
            }
        });
    });
});