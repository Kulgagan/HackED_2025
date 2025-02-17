document.addEventListener("DOMContentLoaded", () => {
    const linkInput = document.getElementById("linkInput") as HTMLInputElement;
    const submitButton = document.getElementById("submitLink") as HTMLButtonElement;
    const storedLinksList = document.getElementById("storedLinks") as HTMLUListElement;

    // Retrieve stored links from localStorage (if any)
    function loadStoredLinks() {
        const links = JSON.parse(localStorage.getItem("submittedLinks") || "[]");
        storedLinksList.innerHTML = ""; // Clear previous list
        links.forEach((link: string) => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
            storedLinksList.appendChild(li);
        });
    }

    // Save link when the button is clicked
    submitButton.addEventListener("click", () => {
        const link = linkInput.value.trim();
        if (link) {
            let links = JSON.parse(localStorage.getItem("submittedLinks") || "[]");
            links.push(link);
            localStorage.setItem("submittedLinks", JSON.stringify(links));
            linkInput.value = ""; // Clear input field
            loadStoredLinks(); // Update displayed list
        }
    });

    // Load stored links when the page loads
    loadStoredLinks();
});

