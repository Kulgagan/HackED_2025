"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Existing elements
    const submitButton = document.getElementById("submitLink");
    const linkInput = document.getElementById("linkInput");
    const summaryResult = document.getElementById("summary-result");

    submitButton.addEventListener("click", async () => {
        const repoUrl = linkInput.value.trim();
        if (!repoUrl) {
            alert("Please enter a GitHub repository URL.");
            return;
        }

        try {
            // Send a request to FastAPI
            const response = await fetch("http://127.0.0.1:8000/analyze", { // Use FastAPI port
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ repo_url: repoUrl })
            });

            const result = await response.json();
            
            // Display summaries
            if (result.summaries) {
                summaryResult.innerHTML = "<h3>Code Summaries:</h3>";
                Object.entries(result.summaries).forEach(([file, summary]) => {
                    summaryResult.innerHTML += `<p><strong>${file}:</strong> ${summary}</p>`;
                });
            } else {
                summaryResult.innerText = "No summaries found.";
            }
        } catch (error) {
            console.error("Error:", error);
            summaryResult.innerText = "Failed to fetch summary.";
        }
    });
});
