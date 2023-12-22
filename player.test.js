import Player from './player';
import GameBoard from './gameboard';


// Player can be instantiated with a name parameter
it('should instantiate Player with a name parameter', () => {
    const player = new Player('John');
    expect(player.name).toBe('John');
});

it('should attack gameboard at legal coordinates', () => {
    const player = new Player();
    const gameboard = new GameBoard();
    const coordinates = [1, 2];

    // Spy on the receiveAttack method
    const receiveAttackSpy = jest.spyOn(gameboard, 'receiveAttack');

    // Call the attack method
    player.attack(gameboard, coordinates);

    // Use toHaveBeenCalledWith on the spy
    expect(receiveAttackSpy).toHaveBeenCalledWith(coordinates);

    // Cleanup the spy
    receiveAttackSpy.mockRestore();

});

// Player can take a turn and attack a gameboard with a legal move
it('should take a turn and attack gameboard with a legal move', () => {
    const player = new Player();
    const gameboard = new GameBoard();
    player.allMoves.add([1, 2]);
    player.attack = jest.fn();
    player.takeTurn(gameboard);
    expect(player.attack).toHaveBeenCalledWith(gameboard, [1, 2]);
});


// Player throws an error when attacking an illegal coordinate
it('should throw an error when attacking an illegal coordinate', () => {
    const player = new Player();
    const gameboard = new GameBoard();
    const coordinates = [1, 2];
    player.isLegalMove = jest.fn().mockReturnValue(false);
    expect(() => player.attack(gameboard, coordinates)).toThrowError(`Illegal move by ${player.name} at coordinates ${coordinates}`);
});

