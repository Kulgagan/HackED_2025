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
    // 🎯 GitHub Repository Summarizer Elements
    const submitButton = document.getElementById("submitLink");
    const linkInput = document.getElementById("linkInput");
    const summaryResult = document.getElementById("summary-result");
    // 🎯 Quiz Generator Elements
    const startQuizBtn = document.getElementById("startQuiz");
    const quizContainer = document.getElementById("quizContainer");
    const questionContainer = document.getElementById("questionContainer");
    const quizForm = document.getElementById("quizForm");
    const quizResults = document.getElementById("quizResults");
    const scoreOutput = document.getElementById("scoreOutput");
    let quizData = [];
    /** 🟢 GitHub Repo Summarizer Logic */
    submitButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        const repoUrl = linkInput.value.trim();
        if (!repoUrl) {
            alert("Please enter a GitHub repository URL.");
            return;
        }
        try {
            const response = yield fetch("http://127.0.0.1:8000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ repo_url: repoUrl }),
            });
            const result = yield response.json();
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
            console.error("Error:", error);
            summaryResult.innerText = "Failed to fetch summary.";
        }
    }));
    /** 🟢 Quiz Generator Logic */
    startQuizBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://127.0.0.1:8000/generate-quiz/");
            const data = yield response.json();
            quizData = data.quiz;
            displayQuiz(quizData);
        }
        catch (error) {
            console.error("Error fetching quiz:", error);
        }
    }));
    function displayQuiz(quiz) {
        questionContainer.innerHTML = "";
        quizContainer.classList.remove("hidden");
        quiz.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question-block");
            questionDiv.innerHTML = `
                <p><strong>${q.questions}</strong></p>
                ${q.options
                .map((option) => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}">
                        ${option}
                    </label><br>
                `)
                .join("")}
            `;
            questionContainer.appendChild(questionDiv);
        });
    }
    quizForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let score = 0;
        quizData.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) {
                const userAnswer = selectedOption.value;
                if (userAnswer.startsWith(q.answer)) {
                    score++;
                }
            }
        });
        quizResults.classList.remove("hidden");
        scoreOutput.innerText = `You scored ${score} out of ${quizData.length}!`;
    });
});
