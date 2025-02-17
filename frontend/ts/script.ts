document.addEventListener("DOMContentLoaded", () => {
    // Get essential elements
    const header = document.getElementById("banner") as HTMLElement;
    const dropdownBtn = document.getElementById("dropdown-btn") as HTMLElement;
    const dropdownContent = document.getElementById("dropdown-content") as HTMLElement;

    if (!header || !dropdownBtn || !dropdownContent) {
        console.error("Missing essential elements in the DOM.");
        return;
    }

    // Toggle the dropdown menu on button click
    dropdownBtn.addEventListener("click", (event: MouseEvent) => {
        event.stopPropagation(); // Prevent the click from closing the dropdown immediately
        dropdownContent.classList.toggle("show");
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener("click", (event: MouseEvent) => {
        if (
            !dropdownBtn.contains(event.target as Node) &&
            !dropdownContent.contains(event.target as Node)
        ) {
            dropdownContent.classList.remove("show");
        }
    });

    // Shrink header on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("shrink");
        } else {
            header.classList.remove("shrink");
        }
    });
});

