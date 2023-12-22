import './ship.js';


class GameBoard {
    constructor() {
        this.ships = [];
        this.missedAttacks = new Set();
    }

    /**
     * Add a ship to the game board.
     * @param {number} x - The x-coordinate of the ship's starting position.
     * @param {number} y - The y-coordinate of the ship's starting position.
     * @param {number} length - The length of the ship.
     * @param {string} orientation - The orientation of the ship ('horizontal' or 'vertical').
     */
    addShip(x, y, length, orientation) {
        const ship = new Ship(length);
        ship.place(x, y, orientation);
        this.ships.push(ship);
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
     * Check if the specified coordinates have already been attacked.
     * @param {number} x - The x-coordinate to check.
     * @param {number} y - The y-coordinate to check.
     * @returns {boolean} - True if the coordinates have already been attacked, false otherwise.
     */
    hasAlreadyAttacked(x, y) {
        return this.missedAttacks.has(JSON.stringify({ x, y }));
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

class Ship {
    constructor(length) {
        this.length = length;
        this.hits = Array(length).fill(false);
    }

    place(x, y, orientation) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }

    isHit(x, y) {
        if (this.orientation === 'horizontal') {
            return y === this.y && x >= this.x && x < this.x + this.length;
        } else if (this.orientation === 'vertical') {
            return x === this.x && y >= this.y && y < this.y + this.length;
        }
        return false;
    }

    hit() {
        const hitIndex = this.getHitIndex();
        if (hitIndex !== -1) {
            this.hits[hitIndex] = true;
        }
    }

    isSunk() {
        return this.hits.every((hit) => hit);
    }

    getHitIndex() {
        return this.hits.findIndex((hit) => !hit);
    }
}


module.exports = GameBoard;