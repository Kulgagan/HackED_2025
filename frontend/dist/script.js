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
document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submitLink");
    const repoUrlInput = document.getElementById("repoUrl");
    const summaryResult = document.getElementById("summaryResult");
    const summaryText = document.getElementById("summaryText");
    if (!submitButton || !repoUrlInput || !summaryResult || !summaryText) {
        console.error("Error: Missing elements.");
        return;
    }
    submitButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        const repoUrl = repoUrlInput.value.trim();
        if (!repoUrl) {
            alert("Please enter a GitHub repository URL.");
            return;
        }
        try {
            const response = yield simulateRepoAnalysis(repoUrl);
            if (response && response.summary) {
                summaryText.innerHTML = response.summary;
                summaryResult.classList.remove("hidden");
            }
            else {
                summaryText.innerHTML = "Could not fetch summary. Please try again.";
            }
        }
        catch (error) {
            console.error("Error:", error);
            summaryText.innerHTML = "An error occurred while analyzing the repository.";
            summaryResult.classList.remove("hidden");
        }
    }));
});
// Simulated API call for mock functionality
function simulateRepoAnalysis(repoUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    summary: `Summary for repository: ${repoUrl} (mock). This would be the content returned by your backend summarizer.`
                });
            }, 1000);
        });
    });
}
