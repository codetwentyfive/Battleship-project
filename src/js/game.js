import Ship from './ship';
import Gameboard from './gameboard';
import Player from './player';


const Game = () => {
    const random = new Gameboard();
    random.placeShipsRandomly();


}

export default Game;