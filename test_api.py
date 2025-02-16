import requests

# Define the repository URL you want to analyze
repo_url = "https://github.com/username/repo_name"  # Replace with your repo URL

# Send a POST request to the FastAPI server
response = requests.post(
    "http://127.0.0.1:8000/analyze",
    json={"repo_url": repo_url}
)

# Check the response
if response.status_code == 200:
    print("Analysis successful!")
    print(response.json())  # Print the JSON response
else:
    print(f"Error: {response.status_code}")
    print(response.text)  # Print the error message