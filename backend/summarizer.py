from dotenv import load_dotenv
import ollama

load_dotenv()

class Summarizer:
    engine = 'llama3.1'  # Use 'mistral' or 'llama2' if needed

    def __init__(self):
        pass  # No API key needed for Ollama

    def summarize(self, code: str):
        """Summarizes code using Ollama."""
        prompt = f"Summarize this GitHub code:\n\n{code}"

        response = ollama.chat(
            model=self.engine,
            messages=[
                {"role": "system", "content": "You are a code analyzer that summarizes GitHub repositories."},
                {"role": "user", "content": prompt}
            ]
        )

        return response['message']['content'] if 'message' in response else "No summary generated."

    
