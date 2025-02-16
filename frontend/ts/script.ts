document.addEventListener("DOMContentLoaded", () => {
    // Header shrink effect on scroll
    const banner = document.getElementById("banner") as HTMLElement;

    if (banner) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                banner.classList.add("shrink");
            } else {
                banner.classList.remove("shrink");
            }
        });
    }

    // Dropdown Menu Interaction
    const exploreButton = document.querySelector(".dropbtn") as HTMLElement;
    const dropdownContent = document.querySelector(".dropdown-content") as HTMLElement;

    exploreButton.addEventListener("click", () => {
        dropdownContent.classList.toggle("show");
    });

    // Close dropdown if user clicks outside
    window.addEventListener("click", (event) => {
        if (!exploreButton.contains(event.target as Node) && !dropdownContent.contains(event.target as Node)) {
            dropdownContent.classList.remove("show");
        }
    });
});
