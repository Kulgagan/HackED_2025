from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import ollama 
from backend.main import Summary  # Import the global Summary from main

app = FastAPI()

class UserAnswers(BaseModel):
    answers: List[str]

def parse_quiz(response):
    lines = response.strip().split('\n')
    questions = []
    options = []
    correct_answers = []

    current_question = ''
    current_options = []

    for line in lines:
        line = lines.strip()

        if line.startswith('Q'):
            if current_question:
                questions.append(current_question)
                options.append(current_options)
                current_options = []
            
            current_question = line[2:].strip()

        elif line.startswith(("A)", "B)", "C)", "D)" )):
            current_options.append(line)
        
        elif line.lower().startswith("answer: "):
            correct_answer = line.split(':')[1].strip().upper()
            correct_answers.append(correct_answer)
    
    if current_question:
        questions.append(current_question)
        options.append(current_options)
    
    quiz = []
    for i in range(len(questions)):

        quiz.append({
            "questions": questions[i],
            "options": options[i] if i < len(options) else [],
            "answer": correct_answers[i] if i < len(correct_answers) else None
        }
        )

    return quiz

@app.get("/generate-quiz/")
def generate_quiz():
    global Summary  # Access the global Summary variable

    if not Summary:
        raise HTTPException(status_code=404, detail="No summary available. Please analyze a repository first.")

    response = ollama.chat(
        model='llama3.1',
        messages = [{"role": "system", "content": "You are a quiz generator "},
                    {"role": "user", "content": f"Generate a  multiple choice practice quiz based on this code summary:\n\n"
                                                  f"{Summary}"
                                                  f"Provide exactly 5 multiple choice questions with 4 options (A, B, C, D). With the question starting with 'Q: '"
                                                  f"After each question, state the correct answer in this format: \n"
                                                  f"'Answer X: ' where X is A, B, C, or D."
                                                  f"Make sure the answer isn't the same letter each time."}]
    )['message']['content']

    quiz = parse_quiz(response)

    if not quiz:
        raise HTTPException(status_code = 500, detail = "Failed to generate quiz from response")

    return {"quiz": quiz, "total_questions": len(quiz)}
