const GameBoard = require('./gameboard.js');
import './ship.js';

// add a ship to the game board
it('should add a ship to the game board when valid coordinates and length are provided', () => {
    const gameBoard = new GameBoard();
    gameBoard.addShip(0, 0, 3, 'horizontal');
    expect(gameBoard.ships.length).toBe(1);
});

// receive an attack and check if it was a hit
it('should return true when receiving an attack that hits a ship', () => {
    const gameBoard = new GameBoard();
    gameBoard.addShip(0, 0, 3, 'horizontal');
    const result = gameBoard.receiveAttack(1, 0);
    expect(result).toBe(true);
});

// receive an attack and check if it was a miss
it('should return false when receiving an attack that misses all ships', () => {
    const gameBoard = new GameBoard();
    gameBoard.addShip(0, 0, 3, 'horizontal');
    const result = gameBoard.receiveAttack(3, 0);
    expect(result).toBe(false);
});

// receive an attack on an empty game board
it('should return false when receiving an attack on an empty game board', () => {
    const gameBoard = new GameBoard();
    const result = gameBoard.receiveAttack(0, 0);
    expect(result).toBe(false);
});