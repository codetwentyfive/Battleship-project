import Ship from "../src/js/ship";

// Ship object can be created with a given length
it('should create a ship object with the given length', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.hits).toEqual([]);
});

// Ship object can be hit at a specific position
it('should hit the ship at the specified position', () => {
    const ship = new Ship(3);
    ship.hit(1);
    expect(ship.hits).toEqual([1]);
});

// Ship object can be checked if it is sunk
it('should return true if the ship is sunk', () => {
    const ship = new Ship(3);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBe(true);
});

// Ship object cannot be hit at a negative position
it('should not hit the ship at a negative position', () => {
    const ship = new Ship(3);
    ship.hit(-1);
    expect(ship.hits).toEqual([]);
});

// Ship object can be created with a length of 0
it('should create a ship object with a length of 0', () => {
    const ship = new Ship(0);
    expect(ship.length).toBe(0);
    expect(ship.hits).toEqual([]);
});