let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-game');
let endGameContainer = document.querySelector('.end-game-container');
let message = document.querySelector('.msg-container');

let turnO = true;
let count = 0; // To track draw

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];  

boxes.forEach(box => {
  box.addEventListener("click", () => {
    count++;
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#e16162"; // Terracotta Red
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#004643"; // Dark Teal
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});
const checkWinner = () => {
    for (let patterns of winPatterns){
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;
        
        if( pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){
            if( pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return; // Exit function since we have a winner
            }
        }
    }
    // Check for draw after checking all win patterns
    if (count === 9) {
        showDraw();
    }
};
const showWinner = (Winner) => {
  message.innerHTML = `Congratulations, Winner is ${Winner} 🏆`;
  endGameContainer.classList.remove("hide");
  resetBtn.classList.add("hide");
  disableBoxes();
};

const showDraw = () => {
  message.innerText = `Game was a Draw. 🤝`;
  endGameContainer.classList.remove("hide");
  resetBtn.classList.add("hide");
  disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  endGameContainer.classList.add("hide");
  resetBtn.classList.remove("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
