document.addEventListener("DOMContentLoaded", () => {
    // Get elements with proper TS assertions
    const submitButton = document.getElementById("submitLink") as HTMLButtonElement | null;
    const linkInput = document.getElementById("linkInput") as HTMLInputElement | null;
    const summaryResult = document.getElementById("summary-result") as HTMLDivElement | null;
    const gitAuthButton = document.getElementById("git-auth-button") as HTMLButtonElement | null;

    if (!submitButton || !linkInput || !summaryResult) {
        console.error("❌ Missing required elements in HTML.");
        return;
    }

    // 👉 Simple direct-redirect approach for GitHub auth
    gitAuthButton?.addEventListener("click", () => {
        // If your FastAPI runs on localhost:8000, just point to the endpoint:
        window.location.href = "http://127.0.0.1:8000/auth/github";
    });

    // Example of how you're handling the "Analyze" button
    submitButton.addEventListener("click", async () => {
        const repoUrl: string = linkInput.value.trim();
        if (!repoUrl) {
            alert("Please enter a GitHub repository URL.");
            return;
        }

        try {
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
