export default class Player {
    constructor(x, y, context) {
        this.x = x;
        this.y = y;
        this.context = context;

        this.rotationAngle = 0; // Current rotation angle in radians
        this.rotationSpeed = 0.01; // Rotation speed per frame
        this.rotationDirection = 0; // -1 for left, 1 for right, 0 for no rotation

        this.image = new Image();
        this.image.src = "./img/tank.png";
        this.imageWidth = 40;
        this.imageHeight = 50;

        // Keyboard event listeners for rotation control
        document.addEventListener("keydown", event => {
            if (event.code === "ArrowLeft") {
                this.rotationDirection = -1;
            } else if (event.code === "ArrowRight") {
                this.rotationDirection = 1;
            }
        });

        document.addEventListener("keyup", event => {
            if (event.code === "ArrowLeft" && this.rotationDirection === -1) {
                this.rotationDirection = 0;
            } else if (event.code === "ArrowRight" && this.rotationDirection === 1) {
                this.rotationDirection = 0;
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
        this.context.save();

        // Update rotation angle based on rotation direction and speed
        this.rotationAngle += this.rotationDirection * this.rotationSpeed;

        this.context.translate(this.x, this.y);
        this.context.rotate(this.rotationAngle);
        this.context.translate(-this.x, -this.y);

        this.drawImg();
        this.context.restore();
    }
}
