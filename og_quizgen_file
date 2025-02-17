from backend.main import Summary
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import ollama 

app = FastAPI

class UserAnswers(BaseModel):
    answers: List[str]

'''
Takes the response from ollama and parses through it to seperate it 
into different variables, to store the information

'''
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
# generates quiz and sends out summary
def generate_quiz(summary):
    
    # Make request
    
    response = ollama.chat(
        engine = 'llama3.1',
        messages = [{"role": "system", "content": "You are a quiz generator "},
                    {"role": "user", "content": f"Generate a  multiple choice practice quiz based on this code summary:\n\n"
                                                  f"{Summary}"
                                                  f"Provide exactly 5 multiple choice questions with 4 options (A, B, C, D). With the question starting with 'Q: '"
                                                  f"After each question, state the correct answer in this format: \n"
                                                  f"'Answer X: ' where X is A, B, C, or D."}]
    )['messages']['content']

    questions, options, correct_answers = parse_quiz(response)

    quiz = []
    for i in range(len(questions)):
        quiz.append({"question:": questions[i], "options": options[i]})

    return {"quiz": quiz, "total questions": len(questions)}


'''
API: Endpoint: Submit answers and get scores from the quiz

'''
@app.post("/submit-answers/")
def submit_answers(user_answers: UserAnswers):

    response = ollama.chat(
        engine = 'llama3.1',
        messages = [{"role": "system", "content": "You are a quiz generator "},
                    {"role": "user", "content": f"Generate a  multiple choice practice quiz based on this code summary:\n\n"
                                                  f"{Summary}"
                                                  f"Provide exactly 5 multiple choice questions with 4 options (A, B, C, D). With the question starting with 'Q: '"
                                                  f"After each question, state the correct answer in this format: \n"
                                                  f"'Answer X: ' where X is A, B, C, or D."}]
    )['messages']['content']

    _, _, correct_answers = parse_quiz(response)

    user_answers_list = user_answers.answers
    score = 0

    if len(user_answers.answers) != len(correct_answers):

        raise HTTPException(status_code = 400, detail = "Not enough answers")
    
    i = 0
    while i < len(correct_answers):
        user_answer = user_answers_list[i].upper()
        correct_answer = correct_answers[i]

        if user_answer == correct_answer:
            score += 1
        
        i += 1

    return {"score": score, "total": len(correct_answers), "correct_answers": correct_answers, "user_answers": user_answers.answers}






