const inputValue = document.getElementById("input");
const form = document.getElementById("form");
const submitBtn = document.getElementById("submit");
const playAgain = document.getElementById("playAgain");
const output = document.getElementById("output");
const guessDisplay = document.getElementById("guessDisplay");
let randomNmber = Math.floor(Math.random() * 101);
// console.log(randomNmber);
let previousGuesses = [];
inputValue.focus();

function onplayAgain(event) {
  event.preventDefault();
  inputValue.focus();
  let userGuess = inputValue.valueAsNumber;
  previousGuesses.push(userGuess);
  guessDisplay.textContent = `Your Guesses: ${previousGuesses.join(", ")} `;

  if (userGuess > randomNmber) {
    output.textContent = "Too high!";
  } else if (userGuess < randomNmber) {
    output.textContent = "Too Low!";
  } else {
    output.textContent = "You Guessed it right!";
    playAgain.disabled = false;
    submitBtn.disabled = true;
    playAgain.focus();
  }
  if (previousGuesses.length >= 10) {
    output.textContent = "You lost! The number was " + randomNmber;
    inputValue.disabled = true;
    submitBtn.disabled = true;
    playAgain.disabled = false;
    playAgain.focus();
  }
  inputValue.value = "";
}

function replayAgain() {
  output.textContent = "";
  guessDisplay.textContent = ``;
  playAgain.disabled = true;
  submitBtn.disabled = false;
  inputValue.disabled = false;
  randomNmber = Math.floor(Math.random() * 101);
  previousGuesses = [];
  //   console.log(randomNmber);
  inputValue.focus();
}

form.addEventListener("submit", onplayAgain);
playAgain.addEventListener("click", replayAgain);
