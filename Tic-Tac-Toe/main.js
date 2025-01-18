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
output.textContent = "Your turn!";

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
    output.textContent = `You Win!`;
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
  } else {
    // Update turn feedback
    output.textContent = userTurn ? "Your turn!" : "Bot is thinking...";
  }
}

function findWinningMove(marker) {
  const emptySpots = grid
    .map((cell, index) => (cell === "" ? index : null))
    .filter((cell) => cell !== null);

  //Try each empty spots
  for (const spot of emptySpots) {
    //make temporary Move
    grid[spot] = marker;
    //check if this move wins
    if (checkWinner() === marker) {
      //remove test move
      grid[spot] = "";
      return spot; //returning winning position
    }
    //remove test move
    grid[spot] = "";
  }

  return null; //no winning move found
}

function strategicMove() {
  const corners = [0, 2, 6, 8]; //Corners move
  const sides = [1, 3, 5, 7]; //Sides Move

  //Arrays of Empty Sides
  const emptySides = sides.filter((side) => grid[side] === "");
  //Arrays of Empty Corners
  const emptyCorners = corners.filter((corner) => grid[corner] === "");
  // All Empty spots
  const emptySpots = grid
    .map((cell, index) => (cell === "" ? index : null))
    .filter((cell) => cell !== null);

  // if middle index is empty
  if (grid[4] === "") {
    //prefer Center
    cells[4].textContent = "O";
    grid[4] = "o";
  } else if (emptyCorners.length > 0) {
    // Prefer corners
    const randomCorner =
      emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    cells[randomCorner].textContent = "O";
    grid[randomCorner] = "o";
  } else if (emptySides.length > 0) {
    // Prefer sides
    const randomSide =
      emptySides[Math.floor(Math.random() * emptySides.length)];
    cells[randomSide].textContent = "O";
    grid[randomSide] = "o";
  } else if (emptySpots.length > 0) {
    // Fallback to any empty spot
    const randomSpot =
      emptySpots[Math.floor(Math.random() * emptySpots.length)];
    cells[randomSpot].textContent = "O";
    grid[randomSpot] = "o";
  }
}

function botMove() {
  if (gameIsOn) {
    setTimeout(() => {
      const winningMove = findWinningMove("o");
      const blockingMove = findWinningMove("x");

      if (winningMove !== null) {
        // Make winning move
        cells[winningMove].textContent = "O";
        grid[winningMove] = "o";
      } else if (blockingMove !== null) {
        // Make blocking move
        cells[blockingMove].textContent = "O";
        grid[blockingMove] = "o";
      } else {
        // Make strategic or random move
        strategicMove();
      }

      userTurn = true;
      andTheWinnerIs();
    }, 800);
  }
}

function resetGame() {
  grid = ["", "", "", "", "", "", "", "", ""];
  output.textContent = "Your turn!";
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
      output.textContent = "Bot is thinking...";
      andTheWinnerIs();

      // Start bot's turn if game isn't over
      if (gameIsOn) {
        botMove();
      }
    }
  });
});

reset.addEventListener("click", resetGame);
