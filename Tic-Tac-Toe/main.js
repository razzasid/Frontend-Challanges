const cells = document.querySelectorAll(".cell");
const reset = document.getElementById("reset");
let player = "x";
let grid = ["", "", "", "", "", "", "", "", ""];
let output = document.getElementById("output");
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

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!cell.textContent) {
      // Update cell and grid
      cell.textContent = player === "x" ? "X" : "O";
      grid[index] = player;

      // Check for a winner
      const winner = checkWinner();
      if (winner) {
        output.textContent = `${winner.toUpperCase()} Wins!`;
        cells.forEach((cell) => (cell.disabled = true)); // Disable further moves
      }
      // Check for a draw
      else if (!grid.includes("")) {
        output.textContent = "It's a Draw!";
      }

      // Switch player
      player = player === "x" ? "o" : "x";
    }
  });
});

reset.addEventListener("click", () => {
  grid = ["", "", "", "", "", "", "", "", ""];
  player = "x";
  output.textContent = "";
  cells.forEach((cell) => {
    cell.disabled = false;
    cell.textContent = "";
  });
});
