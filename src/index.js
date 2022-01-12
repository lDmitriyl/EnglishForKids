import Game from './Game.js';
import cards from './assets/infoCards';
const mode = 'train';

new Game(cards, mode).init().generateLayout();