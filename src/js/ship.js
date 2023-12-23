class Ship {
    constructor(type) {
        this.type = type;
        this.size = Ship.getShipSize(type);
        this.hits = Array(this.size).fill(false);
        this.x = null;
        this.y = null;
        this.orientation = null;
    }

    static getShipSize(type) {
        const shipSizes = {
            'Carrier': 5,
            'Battleship': 4,
            'Destroyer': 3,
            'Submarine': 3,
            'Patrol Boat': 2
        };

        return shipSizes[type] || 0;
    }

    place(x, y, orientation) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }

    isHit(x, y) {
        if (this.orientation === 'horizontal') {
            return y === this.y && x >= this.x && x < this.x + this.size;
        } else if (this.orientation === 'vertical') {
            return x === this.x && y >= this.y && y < this.y + this.size;
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

    isOccupied(x, y) {
        if (this.orientation === 'horizontal') {
            return y === this.y && x >= this.x && x < this.x + this.size;
        } else if (this.orientation === 'vertical') {
            return x === this.x && y >= this.y && y < this.y + this.size;
        }
        return false;
    }
}

module.exports = Ship;
