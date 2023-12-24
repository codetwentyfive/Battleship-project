import Ship from './ship';

const SIZE = 10;

class Gameboard {
  constructor() {
    this.board = [];
    this.missedShots = [];
    this.initialize();
  }

  initialize() {
    for (let i = 0; i < SIZE; i++) {
      this.board[i] = [];
      this.missedShots[i] = [];
      for (let j = 0; j < SIZE; j++) {
        this.board[i][j] = null;
        this.missedShots[i][j] = false;
      }
    }
  }

  placeShip(ship, row, column, isVertical) {
    if (!this.isPlacementPossible(ship, row, column, isVertical)) return false;

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][column] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][column + i] = ship;
      }
    }
    return true;
  }

  placeShipsRandomly() {
    if (!this.isEmpty()) return;

    const ships = [];
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const destroyer = new Ship(3);
    const submarine = new Ship(3);
    const patrolBoat = new Ship(2);
    ships.push(carrier, battleship, destroyer, submarine, patrolBoat);

    let successfulPlacements = 0;

    while (successfulPlacements < 5) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;

      if (this.placeShip(ships[successfulPlacements], row, column, isVertical))
        successfulPlacements++;
    }
  }

  /**
   * Checks if it is possible to place a ship on the game board at the specified row and column coordinates, in the specified orientation (vertical or horizontal).
   * 
   * @param {object} ship - The ship to be placed on the game board.
   * @param {number} row - The row coordinate where the ship will be placed.
   * @param {number} column - The column coordinate where the ship will be placed.
   * @param {boolean} isVertical - Specifies whether the ship will be placed vertically or horizontally.
   * @returns {boolean} - True if it is possible to place the ship at the specified coordinates and orientation, false otherwise.
   */
  isPlacementPossible(ship, row, column, isVertical) {
    if (row < 0 || row > SIZE - 1 || column < 0 || column > SIZE - 1) return false;

    if (isVertical) {
      if (row + ship.length > SIZE) return false;
    } else {
      if (column + ship.length > SIZE) return false;
    }

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][column]) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][column + i]) return false;
      }
    }

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (
              row + x + i < 0 ||
              row + x + i >= SIZE ||
              column + y < 0 ||
              column + y >= SIZE
            )
              continue;
            if (this.board[row + x + i][column + y]) return false;
          }
        }
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (
              row + x < 0 ||
              row + x >= SIZE ||
              column + y + i < 0 ||
              column + y + i >= SIZE
            )
              continue;
            if (this.board[row + x][column + y + i]) return false;
          }
        }
      }
    }
    return true;
  }

  /**
 * Receives an attack at the specified row and column coordinates.
 * 
 * @param {number} row - The row coordinate of the attack.
 * @param {number} column - The column coordinate of the attack.
 * @returns {boolean} - Returns true if the attack hits a ship, false otherwise.
 */
  receiveAttack(row, column) {
    if (row < 0 || row >= SIZE || column < 0 || column >= SIZE) {
      return false;
    }

    if (this.board[row][column]) {
      let hitIndex = 0;

      if (column > 0 && this.board[row][column - 1]) {
        let i = 1;
        while (column - i >= 0 && this.board[row][column - i]) {
          hitIndex++;
          i++;
        }
      } else if (row > 0 && this.board[row - 1][column]) {
        let i = 1;
        while (row - i >= 0 && this.board[row - i][column]) {
          hitIndex++;
          i++;
        }
      }
      this.board[row][column].hit(hitIndex);
      return true;
    } else {
      this.missedShots[row][column] = true;
      return false;
    }
  }

  isGameOver() {
    let isBoardEmpty = true;
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (this.board[i][j]) {
          isBoardEmpty = false;
          if (!this.board[i][j].isSunk()) {
            return false;
          }
        }
      }
    }
    return isBoardEmpty ? false : true;
  }

  isEmpty() {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (this.board[i][j] !== null) return false;
      }
    }
    return true;
  }

  getEmptyFieldsAmount() {
    let result = 0;
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (this.board[i][j] === null) result++;
      }
    }
    return result;
  }
}

export default Gameboard;
