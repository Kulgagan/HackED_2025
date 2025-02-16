// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const header = document.getElementById("banner") as HTMLElement;
    const dropdownBtn = document.getElementById("dropdown-btn") as HTMLElement;
    const dropdownContent = document.getElementById("dropdown-content") as HTMLElement;
  
    if (!header || !dropdownBtn || !dropdownContent) {
      console.error("Missing essential elements in the DOM.");
      return;
    }
  
    // Function to toggle dropdown menu
    function toggleDropdown() {
      dropdownContent.classList.toggle("show");
    }
  
    // Close dropdown when clicking outside
    function closeDropdown(event: MouseEvent) {
      if (!dropdownBtn.contains(event.target as Node) && !dropdownContent.contains(event.target as Node)) {
        dropdownContent.classList.remove("show");
      }
    }
  
    // Shrink header on scroll
    function handleScroll() {
      if (window.scrollY > 50) {
        header.classList.add("shrink");
      } else {
        header.classList.remove("shrink");
      }
    }
  
    // Attach event listeners
    dropdownBtn.addEventListener("click", toggleDropdown);
    document.addEventListener("click", closeDropdown);
    window.addEventListener("scroll", handleScroll);
  });
  