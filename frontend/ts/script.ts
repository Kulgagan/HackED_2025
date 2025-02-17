document.addEventListener("DOMContentLoaded", () => {
    const startQuizBtn = document.getElementById("startQuiz");
    const quizContainer = document.getElementById("quizContainer");
    const questionContainer = document.getElementById("questionContainer");
    const quizForm = document.getElementById("quizForm");
    const quizResults = document.getElementById("quizResults");
    const scoreOutput = document.getElementById("scoreOutput");

    let quizData = {}; // Stores quiz questions and answers

    startQuizBtn.addEventListener("click", async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/generate-quiz/");
            const data = await response.json();

            quizData = data.quiz; // Store quiz data
            displayQuiz(quizData);
        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    });

    function displayQuiz(quiz) {
        questionContainer.innerHTML = ""; 
        quizContainer.classList.remove("hidden");

        quiz.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question-block");

            questionDiv.innerHTML = `
                <p><strong>${q.questions}</strong></p>
                ${q.options.map(option => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}">
                        ${option}
                    </label><br>
                `).join("")}
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

        // Show results
        quizResults.classList.remove("hidden");
        scoreOutput.innerText = `You scored ${score} out of ${quizData.length}!`;
    });
});
