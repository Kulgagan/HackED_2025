from openai import OpenAI
import os


class Summarizer:

    # Chatgpt model we will use
    engine = 'gpt-4o'

    def init(self):
        self.apikey = "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"
    
    def average(self, list_of_sentences):

        client = OpenAI(api_key = self.apikey)

