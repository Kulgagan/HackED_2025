from fastapi import FastAPI, HTTPException
import requests 
import os
import git

"""
Explanation
1. post expects a string
2. get the repo name from repo_url
3. use that in api url 
"""
app = FastAPI()

GITHUB_TOKEN = "find the token" #get ur token
@app.post("/analyze")
def analyze_repo(repo_url:str):     #expects a stirng

    #converting github url into api url
    repo_name = repo_url.split("github.com/") [-1] 
    if not repo_name:
        raise HTTPException(status_code = 400, detail = "invalid GitHub Repo URL")
    
    api_url = f"https://api.github.com/repos/{repo_name}"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}    #whats going on in these 2
    response = requests.get(api_url, headers)

    
    if response.status_code != 200:
        raise HTTPException(status_code = 404, detail = "repo not found") 
    
    return response.json()

