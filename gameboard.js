// Define the size of the game board
const boardSize = 8;

// Initialize the game board with empty spaces
let gameBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(' '));

/**
 * Randomly places ships on a game board.
 * @param {number} numShips - The number of ships to be placed on the game board.
 * @param {array} gameBoard - The game board to place the ships on.
 */
function placeShips(numShips, gameBoard) {
    for (let i = 0; i < numShips; i++) {
        let { shipSize, orientation, x, y } = getRandomShipProperties(gameBoard.length);

        let validPlacement = isValidPlacement(x, y, shipSize, orientation, gameBoard);

        while (!validPlacement) {
            ({ x, y } = getRandomShipProperties(gameBoard.length));
            validPlacement = isValidPlacement(x, y, shipSize, orientation, gameBoard);
        }

        placeShip(x, y, shipSize, orientation, gameBoard);
    }
}

function getRandomShipProperties(boardSize) {
    let shipSize = getRandomShipSize(); // Ship size between 2 and 4
    let orientation = getRandomOrientation();

    let x, y;

    if (orientation === 'horizontal') {
        x = getRandomCoordinate();
        y = getRandomCoordinate(boardSize - shipSize + 1);
    } else {
        x = getRandomCoordinate(boardSize - shipSize + 1);
        y = getRandomCoordinate();
    }

    return { shipSize, orientation, x, y };
}

/**
 * Generates a random ship size between 2 and 4.
 * @returns {number} - Random ship size.
 */
function getRandomShipSize() {
    return Math.floor(Math.random() * 3) + 2;
}

/**
 * Generates a random orientation for the ship.
 * @returns {string} - Random orientation ('horizontal' or 'vertical').
 */
function getRandomOrientation() {
    return Math.random() < 0.5 ? 'horizontal' : 'vertical';
}

/**
 * Generates a random coordinate.
 * @param {number} max - The maximum value for the coordinate.
 * @returns {number} - Random coordinate.
 */
function getRandomCoordinate(max = boardSize) {
    return Math.floor(Math.random() * max);
}

/**
 * Checks if the chosen coordinates are valid for placing a ship.
 * @param {number} x - The x-coordinate.
 * @param {number} y - The y-coordinate.
 * @param {number} shipSize - The size of the ship.
 * @param {string} orientation - The orientation of the ship.
 * @returns {boolean} - True if the placement is valid, false otherwise.
 */
function isValidPlacement(x, y, shipSize, orientation) {
    for (let j = 0; j < shipSize; j++) {
        if (orientation === 'horizontal' && gameBoard[x][y + j] !== ' ') {
            return false;
        } else if (orientation === 'vertical' && gameBoard[x + j][y] !== ' ') {
            return false;
        }
    }
    return true;
}

/**
 * Places the ship on the game board.
 * @param {number} x - The x-coordinate.
 * @param {number} y - The y-coordinate.
 * @param {number} shipSize - The size of the ship.
 * @param {string} orientation - The orientation of the ship.
 */
function placeShip(x, y, shipSize, orientation) {
    for (let j = 0; j < shipSize; j++) {
        if (orientation === 'horizontal') {
            gameBoard[x][y + j] = 'S';
        } else {
            gameBoard[x + j][y] = 'S';
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

module.exports = placeShips;