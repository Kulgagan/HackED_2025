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
    // Get elements with proper TypeScript type assertions
    const submitButton = document.getElementById("submitLink");
    const linkInput = document.getElementById("linkInput");
    const summaryResult = document.getElementById("summary-result");
    if (!submitButton || !linkInput || !summaryResult) {
        console.error("❌ Missing required elements in HTML.");
        return;
    }
    submitButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        const repoUrl = linkInput.value.trim();
        if (!repoUrl) {
            alert("Please enter a GitHub repository URL.");
            return;
        }
        try {
            // Send request to FastAPI backend
            const response = yield fetch("http://127.0.0.1:8000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ repo_url: repoUrl }),
            });
            const result = yield response.json();
            // Display summaries
            if (result.summaries) {
                summaryResult.innerHTML = "<h3>Code Summaries:</h3>";
                Object.entries(result.summaries).forEach(([file, summary]) => {
                    summaryResult.innerHTML += `<p><strong>${file}:</strong> ${summary}</p>`;
                });
            }
            else {
                summaryResult.innerText = "No summaries found.";
            }
        }
        catch (error) {
            console.error("❌ Error fetching summary:", error);
            summaryResult.innerText = "Failed to fetch summary.";
        }
    }));
});
