import Bullet from './bullet.js';
import MuzzleFlash from './muzzleFlash.js';

export default class Enemy {
    constructor(canvasWidth, canvasHeight, context) {
        this.x = canvasWidth - 600;
        this.y = 700;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.context = context;
        this.velocity = 0.5;
        this.move = false;
        this.moveBack = false;

        this.rotationAngle = 0; // Current rotation angle in radians
        this.rotationAngleBarell = 0;
        this.rotationDirectionBarell = 0; // -1 for left, 1 for right, 0 for no rotation
        this.rotationSpeed = 0.01; // Rotation speed per frame
        this.rotationDirection = 0; // -1 for left, 1 for right, 0 for no rotation

        this.image = new Image();
        this.image.src = "./img/tank-enemy.png";
        this.imageWidth = 40;
        this.imageHeight = 50;

        // this.image2 = new Image();
        // this.image2.src = "./img/tank-barell.png";

        this.bullets = [];
        this.muzzleFlashes = [];

        // Random movement variables
        this.moveTimer = 0;
        this.moveDuration = Math.random() * 200 + 100; // Random duration between 100-300 frames
        this.idleTimer = 0;
        this.idleDuration = Math.random() * 100 + 50; // Random idle time between 50-150 frames
        this.isMoving = true;
    }

    drawImgEnemyTank() {
        this.context.drawImage(
            this.image,
            this.x - this.imageWidth / 2,
            this.y - this.imageHeight / 2,
            this.imageWidth,
            this.imageHeight
        );
    }

    // drawImgBarell() {
    //     this.context.drawImage(
    //         this.image2,
    //         this.x - this.imageWidth / 2,
    //         this.y - this.imageHeight / 2,
    //         this.imageWidth,
    //         this.imageHeight
    //     );
    // }

    draw() {
        //! сделать проверку на 0, есл
        this.context.save();

        // Update rotation angle based on rotation direction and speed
        this.rotationAngle += this.rotationDirection * this.rotationSpeed;

        this.context.translate(this.x, this.y);
        this.context.rotate(this.rotationAngle);
        this.context.translate(-this.x, -this.y);

        this.drawImgEnemyTank();

        // Update rotation angle based on rotation direction and speed
        // this.rotationAngleBarell += this.rotationDirectionBarell * this.rotationSpeed;

        // this.context.translate(this.x, this.y);
        // this.context.rotate(this.rotationAngleBarell);
        // this.context.translate(-this.x, -this.y);

        // this.drawImgBarell();

        this.context.restore();
    }

    // drawBarell() {
    //     //! сделать проверку на 0, есл
    //     this.context.save();

    //     // Update rotation angle based on rotation direction and speed
    //     this.rotationAngleBarell += this.rotationDirectionBarell * this.rotationSpeed;

    //     this.context.translate(this.x, this.y);
    //     this.context.rotate(this.rotationAngleBarell);
    //     this.context.translate(-this.x, -this.y);

    //     // this.drawImg();
    //     this.drawImgBarell();
    //     this.context.restore();
    // }

    update() {
        this.draw();
        // this.drawBarell();
        this.updatePosition();
    }

    updatePosition() {
        // Random movement logic
        // if (this.isMoving) {
            this.moveTimer++;
            if (this.moveTimer >= this.moveDuration) {
                const action = Math.floor(Math.random() * 3);
                if (action === 0) {
                    this.move = true;
                    this.moveBack = false;
                    this.rotationDirection = 0;
                } else if (action === 1) {
                    this.move = false;
                    this.moveBack = true;
                    this.rotationDirection = 0;
                } else {
                    this.move = false;
                    this.moveBack = false;
                    this.rotationDirection = Math.random() > 0.5 ? 1 : -1; // Random rotation direction
                }
                this.moveTimer=0
                // this.isMoving = false;
                // this.move = false;
                // this.moveBack = false;
                // this.rotationDirection = 0;
                // this.idleTimer = 0;
                // this.idleDuration = Math.random() * 100 + 50; // New random idle time
            } else {
                this.move = true;
                // Continue moving in current direction
                if (this.move) {
                    this.x += this.velocity * Math.sin(this.rotationAngle);
                    this.y -= this.velocity * Math.cos(this.rotationAngle);
                }
                if (this.moveBack) {
                    this.x -= this.velocity * Math.sin(this.rotationAngle);
                    this.y += this.velocity * Math.cos(this.rotationAngle);
                }
            }
        // } else {
        //     this.idleTimer++;
        //     if (this.idleTimer >= this.idleDuration) {
        //         this.isMoving = true;
        //         this.moveTimer = 0;
        //         this.moveDuration = Math.random() * 200 + 100; // New random move duration

        //         // Choose random action: move forward, backward, or rotate
                // const action = Math.floor(Math.random() * 3);
                // if (action === 0) {
                //     this.move = true;
                //     this.moveBack = false;
                //     this.rotationDirection = 0;
                // } else if (action === 1) {
                //     this.move = false;
                //     this.moveBack = true;
                //     this.rotationDirection = 0;
                // } else {
                //     this.move = false;
                //     this.moveBack = false;
                //     this.rotationDirection = Math.random() > 0.5 ? 1 : -1; // Random rotation direction
                // }
        //     }
        // }

        // Check boundaries to prevent tank from moving outside the canvas
        if (this.x < this.imageWidth / 2) {
            this.x = this.imageWidth / 2;
            this.move = false;
            this.moveBack = false;
            this.rotationDirection = 0;
            this.isMoving = false;
            this.idleTimer = 0;
        } else if (this.x > this.canvasWidth - this.imageWidth / 2) {
            this.x = this.canvasWidth - this.imageWidth / 2;
            this.move = false;
            this.moveBack = false;
            this.rotationDirection = 0;
            this.isMoving = false;
            this.idleTimer = 0;
        }

        if (this.y < this.imageHeight / 2) {
            this.y = this.imageHeight / 2;
            this.move = false;
            this.moveBack = false;
            this.rotationDirection = 0;
            this.isMoving = false;
            this.idleTimer = 0;
        } else if (this.y > this.canvasHeight - this.imageHeight / 2) {
            this.y = this.canvasHeight - this.imageHeight / 2;
            this.move = false;
            this.moveBack = false;
            this.rotationDirection = 0;
            this.isMoving = false;
            this.idleTimer = 0;
        }

        //! ПРОВЕРКА НА ВЫПУЩЕНА ЛИ ПУЛЯ
        if (this.bullets.length != 0) {
            for (let i = this.bullets.length - 1; i >= 0; i--) {
                this.bullets[i].update();
                this.bullets[i].draw();

                //! удаляем пулю за пределами канваса
                if (this.bullets[i].isOffScreen(this.canvasWidth, this.canvasHeight)) {
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
    }

    createBullet(event) {
        if (this.bullets.length == 0) {
            const bullet = new Bullet(this.x, this.y, this.rotationAngleBarell + this.rotationAngle, this.context);
            this.bullets.push(bullet);
        
            // Calculate muzzle flash position at the tank's barrel
            const barrelLength = 25; // approximate distance from tank center to barrel end
            const flashX = this.x + barrelLength * Math.sin(this.rotationAngleBarell + this.rotationAngle);
            const flashY = this.y - barrelLength * Math.cos(this.rotationAngleBarell + this.rotationAngle);
        
            const muzzleFlash = new MuzzleFlash(flashX, flashY, this.rotationAngleBarell + this.rotationAngle, this.context);
            this.muzzleFlashes.push(muzzleFlash);
        }
    }

}
