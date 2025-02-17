# state.py
class AppState:
    def __init__(self):
        self.summary = {}
        self.quiz = None  # Stores quiz data and answers

app_state = AppState()