import Gameboard from './gameboard';
import Player from './player';

// Function to render a game board
function renderGameboard(board, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = board[i][j] ? 'X' : '';
      cell.dataset.row = i;
      cell.dataset.column = j;
      container.appendChild(cell);
    }
  }
}

// Function to take user input for attacking
function takeUserAttack(player, enemyBoard) {
  const container = document.getElementById('status');
  container.innerHTML = `${player.name}'s turn. Click on an enemy coordinate to attack.`;

  const enemyBoardContainer = document.getElementById('game-board-enemy');

  const handleClick = (event) => {
    const cell = event.target;
    const row = cell.dataset.row;
    const column = cell.dataset.column;

    if (row !== undefined && column !== undefined) {
      player.attack(parseInt(row), parseInt(column), enemyBoard);

      renderGameboard(playerBoard.board, 'game-board-player');
      renderGameboard(computerBoard.board, 'game-board-enemy');

      if (enemyBoard.isGameOver()) {
        container.innerHTML = `${player.name} wins! Game over.`;
        enemyBoardContainer.removeEventListener('click', handleClick);
      } else {
        container.innerHTML = '';
        switchTurns(player, computer, takeComputerAttack);
      }
    }
  };

  enemyBoardContainer.addEventListener('click', handleClick);
}

// Function to take computer attack
function takeComputerAttack(computer, playerBoard) {
  computer.randomAttack(playerBoard);

  renderGameboard(playerBoard.board, 'game-board-player');

  if (playerBoard.isGameOver()) {
    document.getElementById('status').innerHTML = `${computer.name} wins! Game over.`;
  } else {
    switchTurns(computer, player, takeUserAttack);
  }
}

// Function to switch turns between players
function switchTurns(currentPlayer, nextPlayer, nextPlayerFunction) {
  const container = document.getElementById('status');
  container.innerHTML = `${nextPlayer.name}'s turn.`;

  setTimeout(() => {
    container.innerHTML = '';
    nextPlayerFunction(nextPlayer, currentPlayer.board);
  }, 1000); // Optional delay to make turns more visible
}

// Create gameboards for both players
const playerBoard = new Gameboard();
const computerBoard = new Gameboard();

// Place ships randomly on both gameboards
playerBoard.placeShipsRandomly();
computerBoard.placeShipsRandomly();

// Render the initial game boards
renderGameboard(playerBoard.board, 'game-board-player');
renderGameboard(computerBoard.board, 'game-board-enemy');

// Create players
const player = new Player('Player');
const computer = new Player('Computer');

// Assume player1 starts the game
takeUserAttack(player, computerBoard);
