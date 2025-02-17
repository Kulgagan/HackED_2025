from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import ollama 
from backend.main import Summary  # Import the global Summary from main

app = FastAPI()

Sample_summary = "**Summary of Code Analysis**\n\nThis GitHub code is for a Python script called \"Study Suggester\" that helps users improve their studying skills by suggesting various study techniques and providing in-depth information about each technique.\n\n**What it Does:**\n\nThe code fetches study techniques from a specified URL, parses the HTML content to extract relevant information, and presents it to the user in an interactive format. The script allows users to choose which study technique they want to learn more about and provides detailed descriptions of each method.\n\n**How it Works:**\n\n1. The script starts by introducing itself to the user and asking if they want to proceed.\n2. If the user agrees, the script fetches the HTML content from the specified URL using the `requests` library.\n3. It then uses BeautifulSoup (BS) to parse the HTML content and extract the titles and descriptions of study techniques.\n4. The extracted information is stored in a list of tuples, where each tuple contains the title and description of a study technique.\n5. The script presents the list of study techniques to the user, allowing them to choose which one they want to learn more about.\n6. Once a study technique is selected, the script displays its detailed description.\n7. After displaying the description, the script asks if the user wants to explore more options.\n\n**Key Features:**\n\n* Interactive interface that allows users to choose which study techniques they want to learn more about\n* Fetches study techniques from a specified URL and presents them in an interactive format\n* Provides detailed descriptions of each study technique\n\n**Code Quality and Readability:**\n\nThe code is well-structured, readable, and follows good coding practices. It uses descriptive variable names, comments, and clear function definitions. The script also handles potential errors when fetching the webpage content.\n\nOverall, this code is a useful tool for students or anyone looking to improve their studying skills by exploring various study techniques."


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

    if not Sample_summary:
        raise HTTPException(status_code=404, detail = "No summary available. Please analyze a repository first.")

    response = ollama.chat(
        model='llama3.1',
        messages = [{"role": "system", "content": "You are a quiz generator "},
                    {"role": "user", "content": f"Generate a  multiple choice practice quiz based on this code summary:\n\n"
                                                  f"{Sample_summary}"
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