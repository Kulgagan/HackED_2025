from dotenv import load_dotenv
import ollama

load_dotenv()

class Summarizer:
    engine = 'llama3.1'  # Or 'mistral'

    def __init__(self):
        pass  # No API key needed for Ollama

    def summarize(self, code: str):
        """Summarizes code using Ollama."""
        prompt = f"Summarize this GitHub code:\n\n{code}"

<<<<<<< HEAD
        return os.getenv('ai_key')

    # summarize 
    def summarize(self, collection, code):

        client = ollama.Client()
        prompt = code
        # make request

        response = client.chat(
            model = self.engine,
            messages = [{"role": "system", "content": "You are a analyzer that analyzes git hub repos."},
                        {"role": "user", "content": prompt}]
=======
        response = ollama.chat(
            model=self.engine,
            messages=[
                {"role": "system", "content": "You are a code analyzer that summarizes code files. Once you analyze them, you tell the user a summary of what the code is doing, what its used for, and how it works. This summary should be 400 words long"},
                {"role": "user", "content": prompt}
            ]
>>>>>>> e6fabb672336939e11b28a18b744d86ab1fd130e
        )

        if 'message' in response:
            return response['message']['content']
        
        return "No summary generated."
