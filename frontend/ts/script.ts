document.addEventListener("DOMContentLoaded", () => {
    // Banner Shrinking Effect
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

    // Dropdown Menu - Open and Close
    const dropdownButton = document.getElementById("dropdown-btn") as HTMLElement;
    const dropdownContent = document.getElementById("dropdown-content") as HTMLElement;

    if (dropdownButton && dropdownContent) {
        // Toggle dropdown visibility when the button is clicked
        dropdownButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent triggering the document click handler
            dropdownContent.classList.toggle("show");
        });

        // Close dropdown if clicking outside of the dropdown
        document.addEventListener("click", (event) => {
            if (!dropdownButton.contains(event.target as Node) && !dropdownContent.contains(event.target as Node)) {
                dropdownContent.classList.remove("show");
            }
        });
    }

    // Ensure the dropdown menu shows when hovering over the button
    const dropdown = document.querySelector(".dropdown") as HTMLElement;
    if (dropdown) {
        const dropdownContent = dropdown.querySelector(".dropdown-content") as HTMLElement;

        if (dropdownContent) {
            dropdown.addEventListener("mouseenter", () => {
                dropdownContent.style.display = "block";
            });

            dropdown.addEventListener("mouseleave", () => {
                dropdownContent.style.display = "none";
            });
        }
    }
});
