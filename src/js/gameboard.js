import Ship from './ship';


class GameBoard {
    constructor() {
        this.ships = [];
        this.missedAttacks = new Set();
    }

    addShip(x, y, length, orientation) {
        if (x < 0 || x >= 10 || y < 0 || y >= 10) {
            throw new Error("Invalid coordinates. Coordinates must be within the bounds of the game board.");
        }
        if (length <= 0 || length > 10) {
            throw new Error("Invalid ship length");
        }
        const ship = new Ship(length);
        if (this.isSpaceOccupied(x, y, length, orientation)) {
            throw new Error('Space is already occupied by another ship');
        }
        ship.place = function (x, y, orientation) {
            this.x = x;
            this.y = y;
            this.orientation = orientation;
        }
        ship.place(x, y, orientation);
        this.ships.push(ship);
    }

    /**
     * Check if the specified coordinates have already been attacked.
     * @param {number} x - The x-coordinate to check.
     * @param {number} y - The y-coordinate to check.
     * @returns {boolean} - True if the coordinates have already been attacked, false otherwise.
     */
    hasAlreadyAttacked(x, y) {
        return this.missedAttacks.has(JSON.stringify({ x, y }));
    }

    /**
     * Check if the specified space is already occupied by another ship.
     * @param {number} x - The x-coordinate of the starting position.
     * @param {number} y - The y-coordinate of the starting position.
     * @param {number} length - The length of the ship.
     * @param {string} orientation - The orientation of the ship ('horizontal' or 'vertical').
     * @returns {boolean} - True if the space is occupied, false otherwise.
     */
    isSpaceOccupied(x, y, length, orientation) {
        if (orientation === 'horizontal') {
            for (let i = x; i < x + length; i++) {
                if (this.isOccupied(i, y)) {
                    return true;
                }
            }
        } else if (orientation === 'vertical') {
            for (let i = y; i < y + length; i++) {
                if (this.isOccupied(x, i)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Check if the specified space is occupied by a ship.
     * @param {number} x - The x-coordinate of the space.
     * @param {number} y - The y-coordinate of the space.
     * @returns {boolean} - True if the space is occupied, false otherwise.
     */
    isOccupied(x, y) {
        for (const ship of this.ships) {
            if (ship.isOccupied(x, y)) {  
                return true;
            }
        }
        return false;
    }


    /**
     * Get all coordinates on the game board.
     * @returns {Array} - An array of all coordinates on the board.
     */
    getAllCoordinates() {
        const allCoordinates = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                allCoordinates.push({ x, y });
            }
        }
        return allCoordinates;
    }

    /**
     * Receive an attack at the specified coordinates.
     * @param {number} x - The x-coordinate of the attack.
     * @param {number} y - The y-coordinate of the attack.
     * @returns {boolean} - True if the attack was a hit, false if it was a miss.
     */
    receiveAttack(x, y) {
        if (this.hasAlreadyAttacked(x, y)) {
            return;
        }
        let hit = false;
        for (const ship of this.ships) {
            if (ship.isHit(x, y)) {
                ship.hit();
                hit = true;
                break;
            }
        }
        if (!hit) {
            this.missedAttacks.add({ x, y });
            return false; // Attack was a miss
        }
        return true; // Attack was a hit
    }

    /**
     * Get the missed attacks.
     * @returns {Array} - An array of missed attack coordinates.
     */
    getMissedAttacks() {
        return Array.from(this.missedAttacks);
    }

    /**
     * Check if all ships on the game board are sunk.
     * @returns {boolean} - True if all ships are sunk, false otherwise.
     */
    isGameOver() {
        return this.ships.every((ship) => ship.isSunk());
    }
}
module.exports = GameBoard;