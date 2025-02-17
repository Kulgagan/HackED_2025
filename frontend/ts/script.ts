"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // 🎯 GitHub Repository Summarizer Elements
    const submitButton = document.getElementById("submitLink") as HTMLButtonElement;
    const linkInput = document.getElementById("linkInput") as HTMLInputElement;
    const summaryResult = document.getElementById("summary-result") as HTMLDivElement;

    // 🎯 Quiz Generator Elements
    const startQuizBtn = document.getElementById("startQuiz") as HTMLButtonElement;
    const quizContainer = document.getElementById("quizContainer") as HTMLDivElement;
    const questionContainer = document.getElementById("questionContainer") as HTMLDivElement;
    const quizForm = document.getElementById("quizForm") as HTMLFormElement;
    const quizResults = document.getElementById("quizResults") as HTMLDivElement;
    const scoreOutput = document.getElementById("scoreOutput") as HTMLParagraphElement;

    let quizData: { questions: string; options: string[]; answer: string }[] = [];

    /** 🟢 GitHub Repo Summarizer Logic */
    submitButton.addEventListener("click", async () => {
        const repoUrl = linkInput.value.trim();
        if (!repoUrl) {
            alert("Please enter a GitHub repository URL.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ repo_url: repoUrl }),
            });

            const result = await response.json();

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

    /** 🟢 Quiz Generator Logic */
    startQuizBtn.addEventListener("click", async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/generate-quiz/");
            const data = await response.json();
            quizData = data.quiz;

            displayQuiz(quizData);
        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    });

    function displayQuiz(quiz: { questions: string; options: string[]; answer: string }[]) {
        questionContainer.innerHTML = "";
        quizContainer.classList.remove("hidden");

        quiz.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question-block");

            questionDiv.innerHTML = `
                <p><strong>${q.questions}</strong></p>
                ${q.options
                    .map(
                        (option) => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}">
                        ${option}
                    </label><br>
                `
                    )
                    .join("")}
            `;

            questionContainer.appendChild(questionDiv);
        });
    }

    quizForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let score = 0;

        quizData.forEach((q, index) => {
            const selectedOption = document.querySelector(
                `input[name="question${index}"]:checked`
            ) as HTMLInputElement;

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
