document.addEventListener("DOMContentLoaded", () => {
    // Banner Shrinking Effect
    const banner = document.getElementById("banner") as HTMLElement;
    const navButtons = document.getElementById("nav-buttons") as HTMLElement;
    const logo = document.getElementById("logo") as HTMLElement;

    // Adjust the size of header, logo, and nav buttons on scroll
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 10) {
            // Shrink header and logo, and adjust the nav buttons' height
            banner.style.height = "60px"; // Adjust header height when scrolled down
            logo.style.maxWidth = "120px"; // Shrink logo
            navButtons.style.padding = "10px 0"; // Reduce padding for the navigation buttons
        } else {
            // Reset to original size when scrolled to top
            banner.style.height = "80px"; // Reset header height
            logo.style.maxWidth = "180px"; // Reset logo size
            navButtons.style.padding = "15px 0"; // Reset nav buttons padding
        }
    });
});
