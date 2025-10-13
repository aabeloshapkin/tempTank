import Bullet from './bullet.js';
import MuzzleFlash from './muzzleFlash.js';

export default class Player {
    constructor(canvasWidth, canvasHeight, context) {
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        this.context = context;
        this.velocity = 1//0.5;
        this.move = false;
        this.moveBack = false;
        

        this.rotationAngle = 0; // Current rotation angle in radians
        this.rotationAngleBarell = 0;
        this.rotationDirectionBarell = 0; // -1 for left, 1 for right, 0 for no rotation
        this.rotationSpeed = 0.01; // Rotation speed per frame
        this.rotationDirection = 0; // -1 for left, 1 for right, 0 for no rotation

        this.image = new Image();
        this.image.src = "./img/tank-body.png";
        this.imageWidth = 40;
        this.imageHeight = 50;

        this.image2 = new Image();
        this.image2.src = "./img/tank-barell.png";
        // this.imageWidth = 40;
        // this.imageHeight = 50;

        this.bullets = [];
        this.muzzleFlashes = [];

        // Keyboard event listeners for rotation control
        //! Переделать под case!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        document.addEventListener("keydown", event => {
            if (event.code === "ArrowLeft") {
                this.rotationDirection = -1;
            } else if (event.code === "ArrowRight") {
                this.rotationDirection = 1;
            } else if (event.code === "ArrowUp") {
                this.move = true;
                this.moveBack = false;
            } else if (event.code === "ArrowDown") {
                this.move = false;
                this.moveBack = true;
            } else if (event.code === "Space") {
                this.createBullet();
            } else if (event.code === "KeyA") {
                this.rotationDirectionBarell = -1;
            } else if (event.code === "KeyD") {
                this.rotationDirectionBarell = 1;
            }
            // console.log(event.code)
            
        });

        document.addEventListener("keyup", event => {
            if (event.code === "ArrowLeft" && this.rotationDirection === -1) {
                this.rotationDirection = 0;
            } else if (event.code === "ArrowRight" && this.rotationDirection === 1) {
                this.rotationDirection = 0;
            }else if (event.code === "ArrowUp") {
                this.move = false;
            }else if (event.code === "ArrowDown") {
                this.moveBack = false;
            } else if (event.code === "KeyA" && this.rotationDirectionBarell === -1) {
                this.rotationDirectionBarell = 0;
            } else if (event.code === "KeyD" && this.rotationDirectionBarell === 1) {
                this.rotationDirectionBarell = 0;
            }
            
        });
    }

    drawImgTank() {
        this.context.drawImage(
            this.image,
            this.x - this.imageWidth / 2,
            this.y - this.imageHeight / 2,
            this.imageWidth,
            this.imageHeight
        );
    }

    drawImgBarell() {
        this.context.drawImage(
            this.image2,
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

        this.drawImgTank();

        // Update rotation angle based on rotation direction and speed
        this.rotationAngleBarell += this.rotationDirectionBarell * this.rotationSpeed;

        this.context.translate(this.x, this.y);
        this.context.rotate(this.rotationAngleBarell);
        this.context.translate(-this.x, -this.y);

        this.drawImgBarell();

        this.context.restore();
    }

    drawBarell() {
        //! сделать проверку на 0, есл
        this.context.save();

        // Update rotation angle based on rotation direction and speed
        this.rotationAngleBarell += this.rotationDirectionBarell * this.rotationSpeed;

        this.context.translate(this.x, this.y);
        this.context.rotate(this.rotationAngleBarell);
        this.context.translate(-this.x, -this.y);

        // this.drawImg();
        this.drawImgBarell();
        this.context.restore();
    }

    update() {
        this.draw();
        // this.drawBarell();
        this.updatePosition();
    }

    updatePosition() {
        if (this.move) {
            this.x += this.velocity * Math.sin(this.rotationAngle);
            this.y -= this.velocity * Math.cos(this.rotationAngle);
        }
        if (this.moveBack) {
            this.x -= this.velocity * Math.sin(this.rotationAngle);
            this.y += this.velocity * Math.cos(this.rotationAngle);
        }
        // Check boundaries to prevent tank from moving outside the canvas
        if (this.x < this.imageWidth / 2) {
            this.x = this.imageWidth / 2;
        } else if (this.x > this.canvasWidth - this.imageWidth / 2) {
            this.x = this.canvasWidth - this.imageWidth / 2;
        }

        if (this.y < this.imageHeight / 2) {
            this.y = this.imageHeight / 2;
            // this.move = false;
            // this.moveBack = false;
        } else if (this.y > this.canvasHeight - this.imageHeight / 2) {
            this.y = this.canvasHeight - this.imageHeight / 2;
            // this.move = false;
            // this.moveBack = false;
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
