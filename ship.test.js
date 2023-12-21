// ship.test.js

const ShipLogic = require('./ship');

it('should return true when the number of hits is equal to the length of the ship', () => {
    const ship = new ShipLogic(3);
    for (let i = 0; i < 3; i++) {
        ship.hit();
    }
    expect(ship.isSunken()).toBe(true);
});

// Returns false if the number of hits is less than the length of the ship.
it('should return false when the number of hits is less than the length of the ship', () => {
    const ship = new ShipLogic(5);
    ship.hits = 3;
    expect(ship.isSunken()).toBe(false);
});

// Updates the state of the ship to 'sunken' if the number of hits is equal to the length of the ship.
it('should update the state of the ship to sunken when the number of hits is equal to the length of the ship', () => {
    const ship = new ShipLogic(4);
    ship.hits = 4;
    ship.isSunken();
    expect(ship.state).toBe('sunken');
});