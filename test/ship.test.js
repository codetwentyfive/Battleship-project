const Ship = require('../src/js/ship');

it('should return true when the number of hits is equal to the length of the ship', () => {
    const ship = new Ship(3);
    for (let i = 0; i < 3; i++) {
        ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
});

// should return true when all segments of the ship are hit
it('should return true when all segments of the ship are hit', () => {
    const ship = new Ship(3);
    ship.hits = [true, true, true];
    expect(ship.isSunk()).toBe(true);
});


// should return false when not all segments of the ship are hit
it('should return false when not all segments of the ship are hit', () => {
    const ship = new Ship(5);
    ship.hits = [true, false, true, false, false];
    expect(ship.isSunk()).toBe(false);
});

// should return true when the ship has length 1 and is hit
it('should return true when the ship has length 1 and is hit', () => {
    const ship = new Ship(1);
    ship.hits = [true];
    expect(ship.isSunk()).toBe(true);
});

// should return true when the ship has length 0 and is not hit
it('should return true when the ship has length 0 and is not hit', () => {
    const ship = new Ship(0);
    ship.hits = [];
    expect(ship.isSunk()).toBe(true);
});