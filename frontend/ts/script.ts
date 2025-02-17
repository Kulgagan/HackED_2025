// Fetch the elements
const repoUrlInput = document.getElementById("repoUrl") as HTMLInputElement;
const submitButton = document.getElementById("submitLink") as HTMLButtonElement;
const summaryText = document.getElementById("summaryText") as HTMLElement;
const summaryResult = document.getElementById("summaryResult") as HTMLElement;

// When the submit button is clicked
submitButton.addEventListener("click", async () => {
    const repoUrl = repoUrlInput.value.trim();
    
    if (repoUrl === "") {
        alert("Please enter a valid GitHub repository URL.");
        return;
    }
    
    // Send POST request to backend to analyze the repo
    try {
        const response = await fetch("http://localhost:8000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ repo_url: repoUrl })
        });

        const data = await response.json();

        // Check if the response contains repository details
        if (response.ok) {
            // Update the summary result
            summaryResult.classList.remove("hidden");
            summaryText.innerHTML = `
                <strong>Repository URL:</strong> <a href="${data.repo_url}" target="_blank">${data.repo_url}</a><br>
                <strong>Repository Name:</strong> ${data.repo_name}<br>
                <strong>Files:</strong><ul>
                    ${data.files.map((file: string) => `<li>${file}</li>`).join('')}
                </ul>
                <strong>Summary:</strong><br><pre>${data.summary}</pre>
            `;
        } else {
            alert(data.detail || "Error analyzing repository.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("There was an error fetching the repository data.");
    }
});
