"use strict";

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submitLink") as HTMLButtonElement | null;
    const repoUrlInput = document.getElementById("repoUrl") as HTMLInputElement | null;
    const summaryResult = document.getElementById("summaryResult") as HTMLDivElement | null;
    const summaryText = document.getElementById("summaryText") as HTMLParagraphElement | null;

    if (!submitButton || !repoUrlInput || !summaryResult || !summaryText) {
        console.error("Error: Missing elements.");
        return;
    }

    // Handle the button click event
    submitButton.addEventListener("click", async () => {
        const repoUrl = repoUrlInput.value.trim();
        
        if (!repoUrl) {
            alert("Please enter a GitHub repository URL.");
            return;
        }

        // Mock API call (you will replace this with the actual backend call later)
        try {
            // Here we are simulating a backend call, which you would replace with an actual API call
            const response = await simulateRepoAnalysis(repoUrl);

            // Display the returned summary or placeholder text
            if (response && response.summary) {
                summaryText.innerHTML = response.summary;
            } else {
                summaryText.innerHTML = "Could not fetch summary. Please try again.";
            }
        } catch (error) {
            console.error("Error:", error);
            summaryText.innerHTML = "An error occurred while analyzing the repository.";
        }
    });
});

// Simulated backend call (mock function to simulate the backend response)
async function simulateRepoAnalysis(repoUrl: string): Promise<any> {
    // This is just a mock response simulating what you'd get from the backend
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                summary: `Summary for repository: ${repoUrl} (mock). This would be the content returned by your backend summarizer.`
            });
        }, 1000); // Simulate a 1-second delay
    });
}
