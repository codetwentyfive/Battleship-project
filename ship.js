class Ship {
    /**
     * Represents the logic for a ship in a game.
     * @param {number} length - The length of the ship.
     */
    constructor(length) {
        if (typeof length !== 'number' || length <= 0) {
            throw new Error('Invalid length. Length must be a positive integer.');
        }
        this.length = length;
        this.hits = 0;
        this.state = 'floating';
    }

    /**
     * Increases the hits of the ship by 1 if the ship is not already sunken.
     */
    hit() {
        if (this.state !== 'sunken') {
            this.hits++;
            if (this.isSunk()) {
                this.state = 'sunken';
            }
        }
    }

    /**
     * Checks if the ship is sunken based on the ratio of hits and length.
     * Updates the `state` property to 'sunken' if the ship is sunken.
     * @returns {boolean} - True if the ship is sunken, false otherwise.
     */
    isSunk() {
        if (this.hits >= this.length) {
            this.state = 'sunken';
        }
        return this.hits >= this.length;
    }

    getState() {
        if (this.hits >= this.length) {
            this.state = 'sunken';
        }
        return this.state;
    }

}




module.exports = Ship;




