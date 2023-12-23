class Ship {
    /**
     * Constructs a Ship instance with the specified length.
     * @constructor
     * @param {number} length - The length of the ship.
     */
    constructor(length) {
        /**
         * The length of the ship.
         * @member {number}
         */
        this.length = length;

        /**
         * An array representing hits on the ship.
         * @member {boolean[]}
         */
        this.hits = Array(length).fill(false);

        /**
         * The x-coordinate of the ship's starting position.
         * @member {number}
         */
        this.x = null;

        /**
         * The y-coordinate of the ship's starting position.
         * @member {number}
         */
        this.y = null;

        /**
         * The orientation of the ship ('horizontal' or 'vertical').
         * @member {string}
         */
        this.orientation = null;
    }

    /**
     * Places the ship on the game board at the specified coordinates and orientation.
     * @param {number} x - The x-coordinate of the starting position.
     * @param {number} y - The y-coordinate of the starting position.
     * @param {string} orientation - The orientation of the ship ('horizontal' or 'vertical').
     */
    place(x, y, orientation) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }

    /**
     * Checks if the ship is hit at the specified coordinates.
     * @param {number} x - The x-coordinate of the attack.
     * @param {number} y - The y-coordinate of the attack.
     * @returns {boolean} - True if the ship is hit, false otherwise.
     */
    isHit(x, y) {
        if (this.orientation === 'horizontal') {
            return y === this.y && x >= this.x && x < this.x + this.length;
        } else if (this.orientation === 'vertical') {
            return x === this.x && y >= this.y && y < this.y + this.length;
        }
        return false;
    }

    /**
     * Records a hit on the ship at the specified coordinates.
     */
    hit() {
        const hitIndex = this.getHitIndex();
        if (hitIndex !== -1) {
            this.hits[hitIndex] = true;
        }
    }

    /**
     * Checks if the ship is sunk.
     * @returns {boolean} - True if the ship is sunk, false otherwise.
     */
    isSunk() {
        return this.hits.every((hit) => hit);
    }

    /**
     * Gets the index of the first unhit segment of the ship.
     * @returns {number} - The index of the first unhit segment, or -1 if all segments are hit.
     */
    getHitIndex() {
        return this.hits.findIndex((hit) => !hit);
    }

    /**
     * Checks if the specified space is occupied by the ship.
     * @param {number} x - The x-coordinate of the space.
     * @param {number} y - The y-coordinate of the space.
     * @returns {boolean} - True if the space is occupied, false otherwise.
     */
    isOccupied(x, y) {
        if (this.orientation === 'horizontal') {
            return y === this.y && x >= this.x && x < this.x + this.length;
        } else if (this.orientation === 'vertical') {
            return x === this.x && y >= this.y && y < this.y + this.length;
        }
        return false;
    }
}

module.exports = Ship;
