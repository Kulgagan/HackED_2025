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