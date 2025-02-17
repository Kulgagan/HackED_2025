import os
import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse

router = APIRouter()
load_dotenv()

github_client_id = os.getenv('Client_ID')
github_client_secret = os.getenv('Client_secrets')
redirect_link = "http://localhost:8000/auth/callback"

@router.get("/auth/github")  # Fixed missing slash
def github_login():
    """Redirects user to GitHub's OAuth page."""
    return RedirectResponse(
        f"https://github.com/login/oauth/authorize?client_id={github_client_id}&redirect_uri={redirect_link}&scope=repo"
    )

@router.get("/auth/callback")
async def github_callback(code: str):
    """GitHub callback to exchange code for access token."""
    token_url = "https://github.com/login/oauth/access_token"
    headers = {"Accept": "application/json"}
    data = {
        "client_id": github_client_id,
        "client_secret": github_client_secret,
        "code": code,
        "redirect_uri": redirect_link,
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(token_url, headers=headers, data=data)
        token_data = response.json()  # Fixed function call

    access_token = token_data.get("access_token")  # Fixed typo

    if not access_token:
        raise HTTPException(status_code=400, detail="Failed to authenticate with GitHub.")
    
    return {"access_token": access_token}
