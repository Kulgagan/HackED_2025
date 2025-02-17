document.addEventListener("DOMContentLoaded", () => {
    // Banner Shrinking Effect
    const banner = document.getElementById("banner");
    if (banner) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                banner.classList.add("shrink");
            } else {
                banner.classList.remove("shrink");
            }
        });
    }

    // Dropdown Menu - Close if clicking outside
    window.onclick = function(event: MouseEvent) {
        if (!(event.target as HTMLElement).matches(".dropbtn")) {
            document.querySelectorAll(".dropdown-content").forEach(dropdown => {
                (dropdown as HTMLElement).style.display = "none";
            });
        }
    };

    // Ensure dropdown remains functional using mouseenter and mouseleave
    const dropdown = document.querySelector(".dropdown");
    if (dropdown) {
        dropdown.addEventListener("mouseenter", function() {
            const dropdownContent = this.querySelector(".dropdown-content") as HTMLElement;
            if (dropdownContent) {
                dropdownContent.style.display = "block";
            }
        });

        dropdown.addEventListener("mouseleave", function() {
            const dropdownContent = this.querySelector(".dropdown-content") as HTMLElement;
            if (dropdownContent) {
                dropdownContent.style.display = "none";
            }
        });
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
