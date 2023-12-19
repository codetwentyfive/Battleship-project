// Define the size of the game board
const boardSize = 8;

// Initialize the game board with empty spaces
let gameBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(' '));

// Function to place ships on the board
function placeShips(numShips) {
    for (let i = 0; i < numShips; i++) {
        let shipSize = Math.floor(Math.random() * 3) + 2; // Ship size between 2 and 4
        let orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        let x, y;

        if (orientation === 'horizontal') {
            x = Math.floor(Math.random() * boardSize);
            y = Math.floor(Math.random() * (boardSize - shipSize + 1));
        } else {
            x = Math.floor(Math.random() * (boardSize - shipSize + 1));
            y = Math.floor(Math.random() * boardSize);
        }

        // Check if the chosen coordinates are valid
        let validPlacement = true;
        for (let j = 0; j < shipSize; j++) {
            if (orientation === 'horizontal' && gameBoard[x][y + j] !== ' ') {
                validPlacement = false;
                break;
            } else if (orientation === 'vertical' && gameBoard[x + j][y] !== ' ') {
                validPlacement = false;
                break;
            }
        }

        if (validPlacement) {
            for (let j = 0; j < shipSize; j++) {
                if (orientation === 'horizontal') {
                    gameBoard[x][y + j] = 'S';
                } else {
                    gameBoard[x + j][y] = 'S';
                }
            }
        } else {
            i--; // Retry placing the ship
        }
    }
}

// Function to print the game board to the console
function printBoard() {
    for (let row of gameBoard) {
        console.log(row.join(' '));
    }
}

// Example usage
placeShips(5);
printBoard();
