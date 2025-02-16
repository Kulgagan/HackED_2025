document.addEventListener("DOMContentLoaded", () => {
    // Shrinking header on scroll
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
  
    // Dropdown Menu Interaction
    const dropbtn = document.querySelector(".dropbtn") as HTMLElement | null;
    const dropdownContent = document.querySelector(".dropdown-content") as HTMLElement | null;
  
    if (dropbtn && dropdownContent) {
      // Toggle dropdown on click
      dropbtn.addEventListener("click", (event: MouseEvent) => {
        event.stopPropagation();
        dropdownContent.classList.toggle("show");
      });
  
      // Close dropdown if user clicks outside
      window.addEventListener("click", (event: MouseEvent) => {
        if (
          !dropbtn.contains(event.target as Node) &&
          !dropdownContent.contains(event.target as Node)
        ) {
          dropdownContent.classList.remove("show");
        }
      });
    }
  });
  
