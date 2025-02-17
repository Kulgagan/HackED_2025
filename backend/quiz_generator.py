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

    i = 0 
    while i < len(lines):
        line = lines[i].strip()

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
        
        i += 1
    
    if current_question:
        questions.append(current_question)
        options.append(current_options)

    return questions, options, correct_answers

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
                                                  f"'Answer X: ' where X is A, B, C, or D."}]
    )['message']['content']

    questions, options, correct_answers = parse_quiz(response)

    quiz = []
    for i in range(len(questions)):
        quiz.append({"question": questions[i], "options": options[i]})

    return {"quiz": quiz, "total_questions": len(questions)}

@app.post("/submit-answers/")
def submit_answers(user_answers: UserAnswers):
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
                                                  f"'Answer X: ' where X is A, B, C, or D."}]
    )['message']['content']

    _, _, correct_answers = parse_quiz(response)

    user_answers_list = user_answers.answers
    score = 0

    if len(user_answers.answers) != len(correct_answers):
        raise HTTPException(status_code=400, detail="Not enough answers")
    
    for i in range(len(correct_answers)):
        user_answer = user_answers_list[i].upper()
        correct_answer = correct_answers[i]

        if user_answer == correct_answer:
            score += 1
<<<<<<< HEAD
=======
        
        i += 1
>>>>>>> 05d526121d2c08f5cc74bda232d037a6bc61040c

    return {"score": score, "total": len(correct_answers), "correct_answers": correct_answers, "user_answers": user_answers.answers}