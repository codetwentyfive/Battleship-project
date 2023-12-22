// ship.test.js

const Ship = require('./ship');

it('should return true when the number of hits is equal to the length of the ship', () => {
    const ship = new Ship(3);
    for (let i = 0; i < 3; i++) {
        ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
});

// Returns false if the number of hits is less than the length of the ship.
it('should return false when the number of hits is less than the length of the ship', () => {
    const ship = new Ship(5);
    ship.hits = 3;
    expect(ship.isSunk()).toBe(false);
});

// Updates the state of the ship to 'sunken' if the number of hits is equal to the length of the ship.
it('should update the state of the ship to sunken when the number of hits is equal to the length of the ship', () => {
    const ship = new Ship(4);
    ship.hits = 4;
    ship.isSunk();
    expect(ship.state).toBe('sunken');
});