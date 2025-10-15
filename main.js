import Player from './js/player.js';
import Enemy from './js/enemy.js';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let player, enemy;

startGame();

function startGame() {
    init();
    animate();
}

function init() {
    player = new Player(canvas.width, canvas.height, context);
    enemy = new Enemy(canvas.width, canvas.height, context);
}


function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
}
