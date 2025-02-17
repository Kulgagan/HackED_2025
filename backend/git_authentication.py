import os 
import httpx
from dotenv import load_dotenv
from fastapi import APIRouter
from fastapi.responses import RedirectResponse


router = APIRouter()
load_dotenv()


github_client_id = os.getenv('Client_ID')
github_client_secret = os.getenv('Client_secrets')
redirect_link = "http://localhost:8000/auth/callback"

@router.get("auth/github") 
def github_login():
    """redirects user to githibs Oauth page(authentication so we can get dat token)"""
    Authentication_page = RedirectResponse(
        f"https://github.com/login/oauth/authorize?client_id={github_client_id}&redirect_uri={redirect_link}&scope=repo")
    return Authentication_page


@router.get("/auth/callback")
async def github_callback(code: str):
    """Github callback to exchange code for access token"""
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
        token_data = response.json
        
    access_token = token_data.get("acces_token")
    if not access_token: 
        return {"Error: Failed to authenticate"}
    else: 
        return {"access_token": access_token}