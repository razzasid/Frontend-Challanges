const cells = document.querySelectorAll(".cell");
let player = "x";
let grid = [];
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
      // Prevent overwriting
      cell.textContent = player === "x" ? "X" : "O";
      grid[index] = player; // Update the 1D grid array
      player = player === "x" ? "o" : "x"; // Switch player
    }
  });
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!cell.textContent) {
      cell.textContent = player === "x" ? "X" : "O";
      grid[index] = player;
      const winner = checkWinner();
      if (winner) {
        document.getElementById(
          "winner"
        ).textContent = `${winner.toUpperCase()} Wins!`;
        cells.forEach((cell) => (cell.disabled = true)); // Disable further clicks
      } else if (!grid.includes("")) {
        document.getElementById("winner").textContent = "It's a Draw!";
      }
      player = player === "x" ? "o" : "x";
    }
  });
});
