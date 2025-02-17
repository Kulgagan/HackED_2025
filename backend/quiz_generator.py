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
        line = line.strip()

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
    global generated_quiz

    if not Summary:
        raise HTTPException(status_code=404, detail = "No summary available. Please analyze a repository first.")

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
    
    generated_quiz.clear()
    generated_quiz.extend(quiz)

    return {"quiz": quiz, "total_questions": len(quiz)}

@app.get("/get-quiz/")
def get_quiz():
    '''
    sends quiz questions and options to the frontend (without answers).
    '''
    if not generated_quiz:
        raise HTTPException(status_code = 404, detail = "No quiz available.")
    
    for item in generated_quiz:
        quiz_for_frontend = [
            {
                "question": item["question"],
                "options": item["options"]
        }]

    return{"quiz": quiz_for_frontend, "total_questions": len(quiz_for_frontend)}

@app.post("/submit-answers/")
def submit_answers(user_answers: UserAnswers):

    if not generated_quiz:
        raise HTTPException(status_code = 404, detail = "No quiz available")
    
    if len(user_answers.answers) != len(generated_quiz):
        raise HTTPException(status_code = 404, detail = "Not enough answers for questions")
    
    correct_count = 0
    results = []

    for i in range(len(user_answers.answers)):
        user_answer = user_answers.answers[i].upper()
        correct_answer = generated_quiz[i]['answer']

        is_correct = user_answer == correct_answer

        is_correct = user_answer == correct_answer
        if is_correct:
            correct_count += 1
        
        results.append({
            "question": generated_quiz[i]["question"],
            "user_answer": user_answer,
            "correct_answer": correct_answer,
            "is_correct": is_correct
        })

        return {
            "score": correct_count,
            "total_questions": len(generate_quiz),
            "results": results
        }