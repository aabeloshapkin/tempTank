import Player from './js/player.js';
import Bullet from './js/bullet.js';
import MuzzleFlash from './js/muzzleFlash.js';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let player;
let bullets = [];
let muzzleFlashes = [];

startGame();

function startGame() {
    init();
    animate();
}

function init() {
    player = new Player(canvas.width/2, canvas.height/2, context);
    addEventListener("click", createBullet);
}

function createBullet(event) {
    const bullet = player.shoot();
    bullets.push(bullet);

    // Calculate muzzle flash position at the tank's barrel
    const barrelLength = 25; // approximate distance from tank center to barrel end
    const flashX = player.x + barrelLength * Math.sin(player.rotationAngle);
    const flashY = player.y - barrelLength * Math.cos(player.rotationAngle);

    const muzzleFlash = new MuzzleFlash(flashX, flashY, player.rotationAngle, context);
    muzzleFlashes.push(muzzleFlash);
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();

    // Update and draw bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].update();
        bullets[i].draw();

        // Remove bullets that go off screen
        if (bullets[i].isOffScreen(canvas.width, canvas.height)) {
            bullets.splice(i, 1);
        }
    }

    // Update and draw muzzle flashes
    for (let i = muzzleFlashes.length - 1; i >= 0; i--) {
        muzzleFlashes[i].update();
        muzzleFlashes[i].draw();

        if (muzzleFlashes[i].isExpired()) {
            muzzleFlashes.splice(i, 1);
        }
    }
}
