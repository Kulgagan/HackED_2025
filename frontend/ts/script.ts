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
    const exploreButton = document.querySelector(".dropbtn") as HTMLElement;
    const dropdownContent = document.querySelector(".dropdown-content") as HTMLElement;
  
    // Toggle dropdown on Explore button click
    exploreButton.addEventListener("click", (event: MouseEvent) => {
      event.stopPropagation(); // Prevent click from propagating to window
      dropdownContent.classList.toggle("show");
    });
  
    // Close dropdown if user clicks outside the button or dropdown
    window.addEventListener("click", (event: MouseEvent) => {
      if (
        !exploreButton.contains(event.target as Node) &&
        !dropdownContent.contains(event.target as Node)
      ) {
        dropdownContent.classList.remove("show");
      }
    });
  });
  
