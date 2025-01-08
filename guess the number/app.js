const inputValue = document.getElementById("input");
const form = document.getElementById("form");
const submitBtn = document.getElementById("submit");
const startGame = document.getElementById("startGame");
const output = document.getElementById("output");
const guessDisplay = document.getElementById("guessDisplay");
let randomNmber = Math.floor(Math.random() * 101);
console.log(randomNmber);
let previousGuesses = [];
inputValue.focus();

function guessNumber(event) {
  event.preventDefault();
  inputValue.focus();
  let userGuess = inputValue.valueAsNumber;
  previousGuesses.push(userGuess);

  if (userGuess > randomNmber) {
    output.textContent = "Too high!";
    guessDisplay.textContent = `Your Guesses: ${previousGuesses.join(", ")},`;
  } else if (userGuess < randomNmber) {
    output.textContent = "Too Low!";
    guessDisplay.textContent = `Your Guesses: ${previousGuesses.join(", ")}`;
  } else {
    output.textContent = "You Guessed it right!";
    guessDisplay.textContent = `Your Guesses: ${previousGuesses.join(", ")} `;
    startGame.disabled = false;
    submitBtn.disabled = true;
  }

  inputValue.value = "";
}

function restartGame() {
  output.textContent = "";
  guessDisplay.textContent = ``;
  startGame.disabled = true;
  submitBtn.disabled = false;
  randomNmber = Math.floor(Math.random() * 101);
  previousGuesses = [];
  console.log(randomNmber);
  inputValue.focus();
}

form.addEventListener("submit", guessNumber);
submitBtn.addEventListener("click", guessNumber);
startGame.addEventListener("click", restartGame);
