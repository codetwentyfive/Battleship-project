class Player {
    constructor(name) {
        this.name = name;
        this.hits = 0;
        this.misses = 0;
    }

    makeGuess() {
        const row = prompt("Enter the row (0 to N-1):");
        const col = prompt("Enter the column (0 to N-1):");
        return { row: parseInt(row), col: parseInt(col) };
    }


}
