const button = document.getElementById("clickMe") as HTMLButtonElement;
const message = document.getElementById("message") as HTMLParagraphElement;

button.addEventListener("click", () => {
    message.textContent = "Hello, TypeScript!";
});