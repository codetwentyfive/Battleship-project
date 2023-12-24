import Gameboard from '../src/js/gameboard';
import Ship from '../src/js/ship';


    // can place ships on board
    it('should place ship on board when placement is possible', () => {
        const gameboard = new Gameboard();
        const ship = new Ship(3);
        const row = 0;
        const column = 0;
        const isVertical = true;
  
        const result = gameboard.placeShip(ship, row, column, isVertical);
  
        expect(result).toBe(true);
        expect(gameboard.board[row][column]).toBe(ship);
        expect(gameboard.board[row + 1][column]).toBe(ship);
        expect(gameboard.board[row + 2][column]).toBe(ship);
      });
    // can receive attacks on board
    it('should hit ship when attack is successful', () => {
        const gameboard = new Gameboard();
        const ship = new Ship(3);
        const row = 0;
        const column = 0;
        const isVertical = true;
        gameboard.placeShip(ship, row, column, isVertical);
  
        const result = gameboard.receiveAttack(row, column);
  
        expect(result).toBe(true);
        expect(ship.hits).toEqual([0]);
      });

    // can detect when game is over
    it('should return true when all ships are sunk', () => {
        const gameboard = new Gameboard();
        const ship = new Ship(1);
        const row = 0;
        const column = 0;
        const isVertical = true;
        gameboard.placeShip(ship, row, column, isVertical);
        gameboard.receiveAttack(row, column);
  
        const result = gameboard.isGameOver();
  
        expect(result).toBe(true);
      });

    // can't place ship outside board boundaries
    it('should not place ship on board when placement is outside boundaries', () => {
        const gameboard = new Gameboard();
        const ship = new Ship(3);
        const row = 9;
        const column = 9;
        const isVertical = true;
  
        const result = gameboard.placeShip(ship, row, column, isVertical);
  
        expect(result).toBe(false);
      });

    // can't place ship on top of another ship
    it('should not place ship on board when placement overlaps with another ship', () => {
        const gameboard = new Gameboard();
        const ship1 = new Ship(3);
        const ship2 = new Ship(2);
        const row1 = 0;
        const column1 = 0;
        const isVertical1 = true;
        const row2 = 1;
        const column2 = 0;
        const isVertical2 = false;
        gameboard.placeShip(ship1, row1, column1, isVertical1);
  
        const result = gameboard.placeShip(ship2, row2, column2, isVertical2);
  
        expect(result).toBe(false);
      });

