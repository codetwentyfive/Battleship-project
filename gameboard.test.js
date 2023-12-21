require('./gameboard');

// places the correct number of ships on the game board
it('should place the correct number of ships on the game board', () => {
    const numShips = 3;
    const gameBoard = Array.from({ length: 10 }, () => Array(10).fill(' '));

    placeShips(numShips, gameBoard);

    let shipCount = 0;
    gameBoard.forEach(row => {
        row.forEach(cell => {
            if (cell === 'S') {
                shipCount++;
            }
        });
    });

    expect(shipCount).toBeGreaterThanOrEqual(numShips);
});

// places ships in valid positions on the game board
it('should place ships in valid positions on the game board', () => {
    const numShips = 3;
    const gameBoard = Array.from({ length: 10 }, () => Array(10).fill(' '));

    placeShips(numShips, gameBoard);

    let shipCount = 0;
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === 'S') {
                shipCount++;
                if ((i > 0 && gameBoard[i - 1][j] === 'S') ||
                    (i < gameBoard.length - 1 && gameBoard[i + 1][j] === 'S') ||
                    (j > 0 && gameBoard[i][j - 1] === 'S') ||
                    (j < gameBoard[i].length - 1 && gameBoard[i][j + 1] === 'S')) {
                    throw new Error(`Invalid placement at ${i}, ${j}`);
                }
            }
        }
    }

    expect(shipCount).toBe(numShips);
});