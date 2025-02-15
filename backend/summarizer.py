from dotenv import load_dotenv
from openai import OpenAI, completions
import os 
load_dotenv()


class summarizer():

    engine = 'gpt-4o'

    # constructor
    def __init__(self):

        self.ai_key = self.get_api_key()
    
    # gets api key
    def get_api_key(self):

        return os.getenv('ai_key')

    # summarize 
    def average(self, collection, code):

        client = OpenAI(ai_key = self.ai_key)
        prompt = code
        # make request

        completetion = client.chat.completions.create(
            model = self.engine,
            messages = [{"role": "system", "content": "You are a analyzer that analyzes git hub repos."},
                        {"role": "user", "content": prompt}]
        )

        summarized = completions.choices[0].message.content

        client.close()

        return summarized

    
