import Bullet from './bullet.js';
import MuzzleFlash from './muzzleFlash.js';

export default class Player {
    constructor(x, y, context) {
        this.x = x;
        this.y = y;
        this.context = context;
        this.velocity = 0.5;
        this.move = false;

        this.rotationAngle = 0; // Current rotation angle in radians
        this.rotationSpeed = 0.01; // Rotation speed per frame
        this.rotationDirection = 0; // -1 for left, 1 for right, 0 for no rotation

        this.image = new Image();
        this.image.src = "./img/tank.png";
        this.imageWidth = 40;
        this.imageHeight = 50;

        this.bullets = [];
        this.muzzleFlashes = [];

        // Keyboard event listeners for rotation control
        document.addEventListener("keydown", event => {
            if (event.code === "ArrowLeft") {
                this.rotationDirection = -1;
            } else if (event.code === "ArrowRight") {
                this.rotationDirection = 1;
            } else if (event.code === "ArrowUp") {
                this.move = true;
            } else if (event.code === "Space") {
                this.createBullet();
            }
            
        });

        document.addEventListener("keyup", event => {
            if (event.code === "ArrowLeft" && this.rotationDirection === -1) {
                this.rotationDirection = 0;
            } else if (event.code === "ArrowRight" && this.rotationDirection === 1) {
                this.rotationDirection = 0;
            }else if (event.code === "ArrowUp") {
                this.move = false;
            }
        });
    }

    drawImg() {
        this.context.drawImage(
            this.image,
            this.x - this.imageWidth / 2,
            this.y - this.imageHeight / 2,
            this.imageWidth,
            this.imageHeight
        );
    }

    draw() {
        //! сделать проверку на 0, есл
        this.context.save();

        // Update rotation angle based on rotation direction and speed
        this.rotationAngle += this.rotationDirection * this.rotationSpeed;

        this.context.translate(this.x, this.y);
        this.context.rotate(this.rotationAngle);
        this.context.translate(-this.x, -this.y);

        this.drawImg();
        this.context.restore();
    }

    update() {
        this.draw();
        this.updatePosition();
    }

    updatePosition() {
        if (this.move) {
            this.x += this.velocity * Math.sin(this.rotationAngle);
            this.y -= this.velocity * Math.cos(this.rotationAngle);
        }
        //! ПРОВЕРКА НА ВЫПУЩЕНА ЛИ ПУЛЯ
        for (let i = this.bullets.length - 1; i >= 0; i--) {
        this.bullets[i].update();
        this.bullets[i].draw();

        // Remove this.bullets that go off screen
        if (this.bullets[i].isOffScreen(this.context.width, this.context.height)) {
            this.bullets.splice(i, 1);
        }
    }

        // Update and draw muzzle flashes
        for (let i = this.muzzleFlashes.length - 1; i >= 0; i--) {
            this.muzzleFlashes[i].update();
            this.muzzleFlashes[i].draw();

            if (this.muzzleFlashes[i].isExpired()) {
                this.muzzleFlashes.splice(i, 1);
            }
        }
    }

    createBullet(event) {
        const bullet = new Bullet(this.x, this.y, this.rotationAngle, this.context);
        this.bullets.push(bullet);
    
        // Calculate muzzle flash position at the tank's barrel
        const barrelLength = 25; // approximate distance from tank center to barrel end
        const flashX = this.x + barrelLength * Math.sin(this.rotationAngle);
        const flashY = this.y - barrelLength * Math.cos(this.rotationAngle);
    
        const muzzleFlash = new MuzzleFlash(flashX, flashY, this.rotationAngle, this.context);
        this.muzzleFlashes.push(muzzleFlash);
    }

}
