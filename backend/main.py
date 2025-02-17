from fastapi import FastAPI, HTTPException
import requests
import base64
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')

app = FastAPI()

# Pydantic model to define the structure of the request
class RepoRequest(BaseModel):
    repo_url: str

@app.post("/analyze")
def fetch_repo_name(repo_request: RepoRequest):
    repo_url = repo_request.repo_url.strip()
    repo_name = repo_url.split("github.com/")[-1]  # Get the repo name from the URL

    if not repo_name:
        raise HTTPException(status_code=400, detail="Invalid GitHub Repo URL")

    api_url = f"https://api.github.com/repos/{repo_name}"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    response = requests.get(api_url, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="Repo not found")

    repo_data = response.json()

    # Get repository files (Python and JavaScript files)
    files = list_repo_files(repo_name)

    return {
        "repo_url": repo_url,
        "repo_name": repo_data.get("name"),
        "files": files
    }

def list_repo_files(repo_name: str):
    """Lists Python and JavaScript files from GitHub repo."""
    api_url = f"https://api.github.com/repos/{repo_name}/contents/"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    response = requests.get(api_url, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="Could not fetch repo contents")

    files = response.json()
    return [file["path"] for file in files if file["path"].endswith((".py", ".js"))]
