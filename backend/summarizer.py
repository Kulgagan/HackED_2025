from dotenv import load_dotenv
import ollama
import os 

load_dotenv()

class summarizer():

    engine = 'llama2'

    # constructor
    def __init__(self):

        self.ai_key = self.get_api_key()
    
    # gets api key
    def get_api_key(self):

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
        )

        if 'message' in response:
            summarized = response['message']['content']
        else:
            summarized = "No summary generated."

        client.close()

        return summarized

    
