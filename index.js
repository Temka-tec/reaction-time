const mainMenu = document.querySelector(".main-menu");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message")

let timer;
let greenDisplayed;
let timeNow;
let waitingForStart;
let waitingForGreen;

const init = () => {
    greenDisplayed = false;
    waitingForStart = false;
    waitingForGreen = false;
};

init();

const setGreenColor = () => {
    clickableArea.style.backgroundColor ="#32cd32";
    message.innerHTML = "click";
    greenDisplayed = true;
    timeNow = Date.now();
};

const startGame = () => {
    clickableArea.style.backgroundColor = "#c1121f";
    message.innerHTML = "Wait for green";
    message.style.color = "white";
    let randomNumber = Math.floor(Math.random() * 4000 + 3000);
    timer = setTimeout(setGreenColor, randomNumber);

    waitingForStart = false;

    console.log("Random Number: ", randomNumber);
};

mainMenu.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    startGame();
});



const displayReactionTime = (rt) => {
    clickableArea.style.backgroundColor = "blue";

    if (rt <= 250) {
        message.innerHTML = `
            <div class='reaction-time-text'>${rt} ms</div>
            Hurdan bain👏🔥
        `;
    } else {
        message.innerHTML = `
            <div class='reaction-time-text'>${rt} ms</div>
            Udaan baina.🫵😆
        `;
    }

    greenDisplayed = false;
    waitingForStart = true;
};


clickableArea.addEventListener("click", () => {
    if (greenDisplayed){
        let clickTime = Date.now();
        let reactionTime = clickTime - timeNow;
        displayReactionTime(reactionTime);
        return;
    }

    if (waitingForStart){
        startGame();
        return;
    }
});
const boxes = document.querySelectorAll(".box");
let board = Array(9).fill(""); // 9 хоосон нүд
let currentPlayer = "X";

const winningCombinations = [
  [0, 1, 2], // мөр 1
  [3, 4, 5], // мөр 2
  [6, 7, 8], // мөр 3
  [0, 3, 6], // багана 1
  [1, 4, 7], // багана 2
  [2, 5, 8], // багана 3
  [0, 4, 8], // диагональ 1
  [2, 4, 6], // диагональ 2
];

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (board[index] === "") {
      board[index] = currentPlayer;
      box.textContent = currentPlayer;
      if (checkWinner()) {
        alert(`${currentPlayer} хожлоо!`);
        resetGame();
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  });
});

function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

function resetGame() {
  board = Array(9).fill("");
  boxes.forEach(box => box.textContent = "");
  currentPlayer = "X";
}
