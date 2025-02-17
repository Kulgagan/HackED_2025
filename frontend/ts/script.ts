document.addEventListener("DOMContentLoaded", () => {
    // Get elements with proper TypeScript type assertions
    const submitButton = document.getElementById("submitLink") as HTMLButtonElement | null;
    const linkInput = document.getElementById("linkInput") as HTMLInputElement | null;
    const summaryResult = document.getElementById("summary-result") as HTMLDivElement | null;

    if (!submitButton || !linkInput || !summaryResult) {
        console.error("❌ Missing required elements in HTML.");
        return;
    }

    submitButton.addEventListener("click", async () => {
        const repoUrl: string = linkInput.value.trim();
        if (!repoUrl) {
            alert("Please enter a GitHub repository URL.");
            return;
        }

        try {
            // Send request to FastAPI backend
            const response: Response = await fetch("http://127.0.0.1:8000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ repo_url: repoUrl }),
            });

            const result: { summaries?: Record<string, string> } = await response.json();

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
            console.error("❌ Error fetching summary:", error);
            summaryResult.innerText = "Failed to fetch summary.";
        }
    });
});
