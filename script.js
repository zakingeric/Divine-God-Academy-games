let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let vsComputer = false;

function setMode(mode) {
    vsComputer = mode;
    resetGame();
}

function play(index) {

    if (board[index] === "" && !gameOver) {

        board[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].innerText = currentPlayer;

        if (checkWinner()) {
            document.getElementById("status").innerText = "Player " + currentPlayer + " Wins!";
            
            let sound = document.getElementById("winSound");
            if (sound) {
                sound.play().catch(() => {});
            }

            gameOver = true;
            return;
        }

        if (board.every(cell => cell !== "")) {
            document.getElementById("status").innerText = "It's a Draw!";
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.getElementById("status").innerText = "Player " + currentPlayer + "'s turn";

        if (vsComputer && currentPlayer === "O" && !gameOver) {
            setTimeout(computerMove, 500);
        }
    }
}

function computerMove() {

    let emptyIndexes = [];

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            emptyIndexes.push(i);
        }
    }

    if (emptyIndexes.length > 0) {
        let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        play(randomIndex);
    }
}

function checkWinner() {

    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let i = 0; i < wins.length; i++) {

        let combo = wins[i];

        if (board[combo[0]] &&
            board[combo[0]] === board[combo[1]] &&
            board[combo[1]] === board[combo[2]]) {

            highlightWinner(combo);
            return true;
        }
    }

    return false;
}

function highlightWinner(combo) {

    let cells = document.getElementsByClassName("cell");

    for (let i = 0; i < combo.length; i++) {
        cells[combo[i]].style.backgroundColor = "#90ee90";
    }
}

function resetGame() {

    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;

    document.getElementById("status").innerText = "Player X's turn";

    let cells = document.getElementsByClassName("cell");

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].style.backgroundColor = "white";
    }
}
