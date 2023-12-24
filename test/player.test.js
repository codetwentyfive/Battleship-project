import Player from '../src/js/player';
import Gameboard from '../src/js/gameboard';

// Player can be instantiated with a name parameter
it('should instantiate Player with a name parameter', () => {
    const player = new Player('John');
    expect(player.name).toBe('John');
});

// should attack gameboard at legal coordinates
it('should attack gameboard at legal coordinates', () => {
    const player = new Player();
    const gameboard = new Gameboard();
    const coordinates = [1, 2];

    // Spy on the receiveAttack method
    const receiveAttackSpy = jest.spyOn(gameboard, 'receiveAttack');

    // Call the attack method
    player.attack(1, 2, gameboard);

    // Use toHaveBeenCalledWith on the spy
    expect(receiveAttackSpy).toHaveBeenCalledWith(1, 2);

    // Cleanup the spy
    receiveAttackSpy.mockRestore();
});

// Player should ignore the second attack on the same coordinate
it('should ignore second attack on the same coordinate', () => {
    // Arrange
    const gameBoard = new Gameboard();
    const player = new Player();

    const x = 2;
    const y = 3;

    // Mock the receiveAttack function
    gameBoard.receiveAttack = jest.fn();

    // Act
    // First attack
    player.attack(x, y, gameBoard);

    // Second attack on the same coordinate
    player.attack(x, y, gameBoard);

    // Assert
    expect(gameBoard.receiveAttack).toHaveBeenCalledTimes(1);
});


