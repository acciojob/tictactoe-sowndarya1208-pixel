// Global Variables for Game State
let playerOneName = '';
let playerTwoName = '';
let currentPlayer = 'X'; // X starts the game
let gameActive = true;
// Tracks the state of the board, IDs 1-9
let gameState = ["", "", "", "", "", "", "", "", ""]; 

// Winning Combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// DOM Elements
const setupScreen = document.getElementById('setup-screen');
const boardScreen = document.getElementById('board-screen');
const messageArea = document.querySelector('.message');
const submitButton = document.getElementById('submit');
const restartButton = document.getElementById('restart-button');
const cells = document.querySelectorAll('.cell');


// --- Event Listeners ---
submitButton.addEventListener('click', startGame);
restartButton.addEventListener('click', resetGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));


// --- Functions ---

function startGame() {
    playerOneName = document.getElementById('player-1').value || 'Player 1';
    playerTwoName = document.getElementById('player-2').value || 'Player 2';

    // Switch screens
    setupScreen.classList.add('hide');
    boardScreen.classList.remove('hide');

    // Initialize game state display
    currentPlayer = 'X';
    gameActive = true;
    updateMessage(`harsh, you're up!`);
}

function updateMessage(msg) {
    messageArea.textContent = msg;
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellId = parseInt(clickedCell.id); 
    // Adjust ID to 0-indexed for gameState array (ID 1 becomes index 0)
    const clickedCellIndex = clickedCellId - 1;

    // Check if the cell is already played or if the game is over
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // Place the mark and update the display
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    // Optional: Add class for styling (color)
    clickedCell.classList.add(currentPlayer.toLowerCase());


    // Check for win or draw
    handleResultValidation();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        const winnerName = (currentPlayer === 'X') ? playerOneName : playerTwoName;
        updateMessage(`jaindiv, congratulations you won!`);
        gameActive = false;
        restartButton.classList.remove('hide');
        return;
    }

    // Check for Draw (if no empty cells remain)
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        updateMessage("It's a draw!");
        gameActive = false;
        restartButton.classList.remove('hide');
        return;
    }

    // If game is still active, switch turns
    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    const currentName = (currentPlayer === 'X') ? playerOneName : playerTwoName;
    updateMessage(`jaindiv, you're up!`);
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    updateMessage(`${playerOneName}, you're up!`);
    restartButton.classList.add('hide');

    // Clear the board visually
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('x', 'o');
    });
}
