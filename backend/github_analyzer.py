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
def fetch_repo_name(repo_url:str):     #expects a stirng

    #converting github url into api url
    repo_name = repo_url.split("github.com/") [-1] #might have an error
    if not repo_name:
        raise HTTPException(status_code = 400, detail = "invalid GitHub Repo URL")
    
    api_url = f"https://api.github.com/repos/{repo_name}"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}    #whats going on in these 2
    response = requests.get(api_url, headers)

    
    if response.status_code != 200:
        raise HTTPException(status_code = 404, detail = "repo not found") 
    
    return response.json()


def list_repo_files(repo_name: str): 
    "lists Python and javascript files from github repo"

    api_url = f"https://api.github.com/repos/{repo_name}/contents/"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"} 
    response = requests.get(api_url, headers = headers) 

    if response.status_code != 200:
        raise HTTPException(status_code=404, detail = "could not fetch repo contents")
    
    files = response.json()
    for file in files: 
        if file["path"].endswith((".py", ".js")):
            return file["path"]
        
def read_file_contents(repo_name: str, file_path: str): 
    api_url = f"https://api.github.com/repos/{repo_name}/contents/{file_path}"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    response = requests.get(api_url, headers=headers) 

    if response.status_code != 200:
        return None
    
    return response.json().get("content", "")