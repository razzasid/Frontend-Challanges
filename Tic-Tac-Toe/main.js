const cells = document.querySelectorAll(".cell");
let player = "x";

function checkWinner(){
    
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {

    if (player == "x") {
      cell.textContent = "X";
      player = "o";
    } else {
      cell.textContent = "O";
      player = "x";
    }


  });
});
