from fastapi import FastAPI
from backend.github_analyzer import fetch_repo_name, list_repo_files, read_file_contents
from backend.summarizer import Summarizer
from pydantic import BaseModel
from backend.git_authentication import router as auth_router
import time

app = FastAPI()
app.include_router(auth_router) 

@app.get("/")  # Home page
def read_root():
    return {"message": "Welcome to the AI Onboarding API!"}

class RepoUrlRequest(BaseModel):
    repo_url: str

@app.post("/analyze")
def analyze_repo(request: RepoUrlRequest): 
    repo_url = request.repo_url
    repo_data = fetch_repo_name(repo_url)
    repo_name = repo_data["full_name"] 
    code_files = list_repo_files(repo_name)

    summarizer = Summarizer()
    summaries = {}

    for file_path in code_files: 
        content = read_file_contents(repo_name, file_path)
        if content: 
            summary = summarizer.summarize(content) 
            summaries[file_path] = summary
    
    user_info = {
        "repo_name": repo_data["name"],
        "owner": repo_data["owner"]["login"],
        "description": repo_data.get("description", "No description"),
        "stars": repo_data["stargazers_count"],
        "language": repo_data["language"],
        "code_files": code_files
    }
    Summary = {
        "summaries": summaries  # Include summaries in the response
    }

    return Summary
