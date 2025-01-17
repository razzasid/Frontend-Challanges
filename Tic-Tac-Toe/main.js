const cells = document.querySelectorAll(".cell");
const reset = document.getElementById("reset");
let grid = ["", "", "", "", "", "", "", "", ""];
let output = document.getElementById("output");
let userTurn = true;
let gameIsOn = true;
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left
  [2, 4, 6], // Diagonal from top-right
];

function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
      return grid[a]; // Return the winner (X or O)
    }
  }
  return null; // No winner yet
}

function andTheWinnerIs() {
  // Check for a winner
  const winner = checkWinner();

  //if User Wins
  if (winner === "x") {
    output.textContent = `You Wins!`;
    cells.forEach((cell) => (cell.disabled = true)); // Disable further moves
    return (gameIsOn = false);
  }

  //if bot Wins
  else if (winner === "o") {
    output.textContent = `You lose bot Wins!`;
    cells.forEach((cell) => (cell.disabled = true)); // Disable further moves
    return (gameIsOn = false);
  }

  // Check for a draw
  else if (!grid.includes("")) {
    output.textContent = "It's a Draw!";
    return (gameIsOn = false);
  }
}

function botMove() {
  if (gameIsOn) {
    setTimeout(() => {
      const emptySpots = grid
        .map((cell, index) => (cell === "" ? index : null))
        .filter((cell) => cell !== null);

      let random = Math.floor(Math.random() * emptySpots.length);
      cells[emptySpots[random]].textContent = "O";
      grid[emptySpots[random]] = "o";
      userTurn = true;
      andTheWinnerIs();
    }, 800);
  }
}

function resetGame() {
  grid = ["", "", "", "", "", "", "", "", ""];
  output.textContent = "";
  userTurn = true;
  gameIsOn = true;
  cells.forEach((cell) => {
    cell.disabled = false;
    cell.textContent = "";
  });
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!cell.textContent && userTurn && gameIsOn) {
      // Update cell and grid

      cell.textContent = "X";
      grid[index] = "x";
      userTurn = false;
      andTheWinnerIs();

      // Start bot's turn if game isn't over
      if (gameIsOn) {
        botMove();
      }
    }
  });
});

reset.addEventListener("click", resetGame);
