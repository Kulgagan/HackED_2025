from backend.main import summary
import ollama 

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

# generates quiz and sends out summary
def generate_quiz(summary):
    
    # Make request
    
    response = ollama.chat(
        engine = 'llama3.1',
        messages = [{"role": "system", "content": "You are a quiz generator "},
                    {"role": "system", "content": f"Generate a  multiple choice practice quiz based on this code summary:\n\n"
                                                  f"{summary}"
                                                  f"Provide exactly 5 multiple choice questions with 4 options (A, B, C, D). With the question starting with 'Q: '"
                                                  f"After each question, state the correct answer in this format: \n"
                                                  f"'Answer X: ' where X is A, B, C, or D."}]
    )['messages']['content']

    questions, options, correct_answers = parse_quiz(response)

