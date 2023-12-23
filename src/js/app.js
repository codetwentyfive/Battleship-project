import Ship from './ship';
import GameBoard from './gameboard';
import Player from './player';

const gameBoardElement = document.getElementById('game-board');
const currentPlayerElement = document.getElementById('current-player');
const statusElement = document.getElementById('status');

const player1 = new Player('Player 1');
const player2 = new Player('Player 2');

let currentPlayer = player1;
let opponentPlayer = player2;


const player1Board = new GameBoard();
const player2Board = new GameBoard();

let currentPlayerBoard = player1Board;
let opponentPlayerBoard = player2Board;


initializeGame();
