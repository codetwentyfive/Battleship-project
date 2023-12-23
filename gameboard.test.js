const GameBoard = require('./gameboard.js');
import './ship.js';


// Should return an array of length 100 when called on a new instance of GameBoard.
it('should return an array of length 100 when called on a new instance of GameBoard', () => {
    const gameBoard = new GameBoard();
    const result = gameBoard.getAllCoordinates();
    expect(result).toHaveLength(100);
});

// Should return an array of objects with x and y properties.
it('should return an array of objects with x and y properties', () => {
    const gameBoard = new GameBoard();
    const result = gameBoard.getAllCoordinates();
    expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) })
    ]));
});


// Should return an array of objects with x and y properties ranging from 0 to 9.
it('should return an array of objects with x and y properties ranging from 0 to 9', () => {
    const gameBoard = new GameBoard();
    const result = gameBoard.getAllCoordinates();
    for (const coordinate of result) {
        expect(coordinate).toEqual(expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) }));
        expect(coordinate.x).toBeGreaterThanOrEqual(0);
        expect(coordinate.x).toBeLessThanOrEqual(9);
        expect(coordinate.y).toBeGreaterThanOrEqual(0);
        expect(coordinate.y).toBeLessThanOrEqual(9);
    }
});

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


