import './gameboard'

class Player {
    constructor(name = 'human') {
        this.name = name;
        this.previousMoves = new Set(); // To track previous moves and avoid shooting the same coordinate twice
        this.allMoves = new Set(); // To store all possible moves
    }

    attack(GameBoard, coordinates) {
        if (this.isLegalMove(coordinates)) {
            GameBoard.receiveAttack(coordinates);
            this.previousMoves.add(coordinates);
        } else {
            // Handle illegal move by throwing an error with a descriptive message
            throw new Error(`Illegal move by ${this.name} at coordinates ${coordinates}`);
        }
    }

    takeTurn(GameBoard) {
        let randomMove = this.getRandomElement(Array.from(this.allMoves));

        while (!this.isLegalMove(randomMove)) {
            randomMove = this.getRandomElement(Array.from(this.allMoves));
        }

        this.attack(GameBoard, randomMove);
    }

    isLegalMove(coordinates) {
        // Check if the move is legal (not previously attacked)
        return !this.previousMoves.has(JSON.stringify(coordinates));
    }

    getLegalMoves(GameBoard) {
        // Filter out coordinates that have been previously attacked
        return Array.from(this.allMoves).filter((move) => !this.previousMoves.has(JSON.stringify(move)));
    }

    getRandomElement(array) {
        // Helper function to get a random element from an array
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}

module.exports = Player;
