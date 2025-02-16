from fastapi import FastAPI
from github_analyzer import fetch_repo_name, list_repo_files, read_file_contents
from summarizer import sum
app = FastAPI()

@app.post("/analyze")
def analyze_repo(repo_url: str): 
    repo_data = fetch_repo_name(repo_url)
    repo_name = repo_data["full_name"] 
    code_files = list_repo_files(repo_name)

    summarizer = sum()
    summaries = {}
    
    for file_path in code_files: 
        content = read_file_contents(repo_name, file_path)
        if content: 
            summary = summarizer.Summarize(content) 
            summaries[file_path] = summary

    return{
        "repo_name": repo_data["name"],
        "owner": repo_data["owner"]["login"],
        "description": repo_data.get("description", "No description"),
        "stars": repo_data["stargazers_count"],
        "language": repo_data["language"],
        "code_files": code_files
    }