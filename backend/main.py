#FastAPI Server
"""
~~~~~LEARNING~~~~~
Errors:
1. import HTTPexeption from fast api
2. if item exist then its calm 
3. if not it raises an error code 404

"""

from fastapi import FastAPI, HTTPException
import requests 
import os
import git

app = FastAPI()

GITHUB_TOKEN = "find the token" #get ur token
@app.post("/analyze")
def analyze_repo(repo_url:str): 

    #converting github url into api url
    repo_name = repo_url.split("github.com/") [-1] 
    api_url = f"https://api.github.com/repos/{repo_name}"

    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    response = requests.get(api_url, headers)

    
    if response.status_code != 200:
        raise HTTPException(status_code = 404, detail = "repo not found") 
    
    repo_data = response.json()

