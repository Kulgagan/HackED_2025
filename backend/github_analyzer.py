import os
import httpx
from dotenv import load_dotenv
from fastapi import APIRouter
from fastapi.responses import RedirectResponse, JSONResponse

router = APIRouter()
load_dotenv()

github_client_id = os.getenv('Client_ID')
github_client_secret = os.getenv('Client_secrets')
redirect_link = "http://localhost:8000/auth/callback"

@router.get("/auth/github")
def github_login():
    """
    Redirects user to GitHub OAuth authentication page.
    """
    return RedirectResponse(
        f"https://github.com/login/oauth/authorize"
        f"?client_id={github_client_id}"
        f"&redirect_uri={redirect_link}"
        f"&scope=repo"
    )

@router.get("/auth/callback")
async def github_callback(code: str):
    """
    GitHub callback to exchange the `code` for an access token.
    """
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
        token_data = response.json()

    access_token = token_data.get("access_token") 
    if not access_token:
        return JSONResponse(status_code=400, content={"error": "Failed to authenticate"})

    # For testing, return the token or handle further logic
    return {"access_token": access_token}
