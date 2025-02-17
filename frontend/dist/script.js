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
// Fetch the elements
const repoUrlInput = document.getElementById("repoUrl");
const submitButton = document.getElementById("submitLink");
const summaryText = document.getElementById("summaryText");
const summaryResult = document.getElementById("summaryResult");
// When the submit button is clicked
submitButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const repoUrl = repoUrlInput.value.trim();
    if (repoUrl === "") {
        alert("Please enter a valid GitHub repository URL.");
        return;
    }
    // Send POST request to backend to analyze the repo
    try {
        const response = yield fetch("http://localhost:8000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ repo_url: repoUrl })
        });
        const data = yield response.json();
        // Check if the response contains repository details
        if (response.ok) {
            // Update the summary result
            summaryResult.classList.remove("hidden");
            summaryText.innerHTML = `
                <strong>Repository URL:</strong> <a href="${data.repo_url}" target="_blank">${data.repo_url}</a><br>
                <strong>Repository Name:</strong> ${data.repo_name}<br>
                <strong>Files:</strong><ul>
                    ${data.files.map((file) => `<li>${file}</li>`).join('')}
                </ul>
            `;
        }
        else {
            alert(data.detail || "Error analyzing repository.");
        }
    }
    catch (error) {
        console.error("Error:", error);
        alert("There was an error fetching the repository data.");
    }
}));
