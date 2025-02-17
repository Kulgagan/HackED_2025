"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submitLink");
    const repoUrlInput = document.getElementById("repoUrl");
    const summaryResult = document.getElementById("summaryResult");
    const summaryText = document.getElementById("summaryText");
    if (!submitButton || !repoUrlInput || !summaryResult || !summaryText) {
        console.error("Error: Missing elements.");
        return;
    }
    // Handle the button click event
    submitButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        const repoUrl = repoUrlInput.value.trim();
        if (!repoUrl) {
            alert("Please enter a GitHub repository URL.");
            return;
        }
        // Mock API call (you will replace this with the actual backend call later)
        try {
            // Here we are simulating a backend call, which you would replace with an actual API call
            const response = yield simulateRepoAnalysis(repoUrl);
            // Display the returned summary or placeholder text
            if (response && response.summary) {
                summaryText.innerHTML = response.summary;
            }
            else {
                summaryText.innerHTML = "Could not fetch summary. Please try again.";
            }
        }
        catch (error) {
            console.error("Error:", error);
            summaryText.innerHTML = "An error occurred while analyzing the repository.";
        }
    }));
});
// Simulated backend call (mock function to simulate the backend response)
function simulateRepoAnalysis(repoUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        // This is just a mock response simulating what you'd get from the backend
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    summary: `Summary for repository: ${repoUrl} (mock). This would be the content returned by your backend summarizer.`
                });
            }, 1000); // Simulate a 1-second delay
        });
    });
}
