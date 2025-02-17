document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submitLink");
    const repoUrlInput = document.getElementById("repoUrl");
    const summaryResult = document.getElementById("summaryResult");
    const summaryText = document.getElementById("summaryText");
  
    if (!submitButton || !repoUrlInput || !summaryResult || !summaryText) {
      console.error("Error: Missing elements.");
      return;
    }
  
    submitButton.addEventListener("click", async () => {
      const repoUrl = repoUrlInput.value.trim();
      
      if (!repoUrl) {
        alert("Please enter a GitHub repository URL.");
        return;
      }
  
      try {
        const response = await simulateRepoAnalysis(repoUrl);
  
        if (response && response.summary) {
          summaryText.innerHTML = response.summary;
          summaryResult.classList.remove("hidden");
        } else {
          summaryText.innerHTML = "Could not fetch summary. Please try again.";
        }
      } catch (error) {
        console.error("Error:", error);
        summaryText.innerHTML = "An error occurred while analyzing the repository.";
        summaryResult.classList.remove("hidden");
      }
    });
  });
  
  // Simulated API call for mock functionality
  async function simulateRepoAnalysis(repoUrl) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          summary: `Summary for repository: ${repoUrl} (mock). This would be the content returned by your backend summarizer.`
        });
      }, 1000);
    });
  }
  
