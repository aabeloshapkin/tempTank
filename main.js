import Player from './js/player.js';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let player;

startGame();

function startGame() {
    init();
    animate();
}

function init() {
    player = new Player(canvas.width/2, canvas.height/2, context);
}


function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
}
