from fastapi import FastAPI, HTTPException
import requests 
import base64
from dotenv import load_dotenv
import os
load_dotenv()
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
app = FastAPI()


@app.post("/analyze")
def fetch_repo_name(repo_url: str):
    repo_name = repo_url.split("github.com/")[-1]   #this wouldnt work. Fetch from website
    if not repo_name:
        raise HTTPException(status_code=400, detail="Invalid GitHub Repo URL")

    api_url = f"https://api.github.com/repos/{repo_name}"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    response = requests.get(api_url, headers=headers)

    # Debugging: Print the API response

    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="Repo not found")

    return response.json()


def list_repo_files(repo_name: str):
    """Lists Python and JavaScript files from GitHub repo."""
    api_url = f"https://api.github.com/repos/{repo_name}/contents/"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    response = requests.get(api_url, headers=headers)

    # Debugging: Print the API response

    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="Could not fetch repo contents")

    files = response.json()
    return [file["path"] for file in files if file["path"].endswith((".py", ".js"))]
        
def read_file_contents(repo_name: str, file_path: str): 
    api_url = f"https://api.github.com/repos/{repo_name}/contents/{file_path}"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    response = requests.get(api_url, headers=headers) 

    if response.status_code != 200:
        return None
    
    content = response.json().get("content", "")
    return base64.b64decode(content).decode("utf-8")



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

        response = ollama.chat(
            model=self.engine,
            messages=[
                {"role": "system", "content": "You are a code analyzer that summarizes code files. Once you analyze them, you tell the user a summary of what the code is doing, what its used for, and how it works. This summary should be 400 words long"},
                {"role": "user", "content": prompt}
            ]
        )

        if 'message' in response:
            return response['message']['content']
        
        return "No summary generated."