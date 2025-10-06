export default class Bullet {
    constructor(x, y, angle, context) {
        this.x = x;
        this.y = y;
        this.context = context;
        this.speed = 5;
        this.angle = angle;

        this.image = new Image();
        this.image.src = "./img/tank-bullet.png";
        this.width = 8;
        this.height = 12;
    }

    update() {
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }

    draw() {
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate(this.angle);
        this.context.drawImage(
            this.image,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        this.context.restore();
    }

    isOffScreen(canvasWidth, canvasHeight) {
        return (
            this.x < 0 ||
            this.x > canvasWidth ||
            this.y < 0 ||
            this.y > canvasHeight
        );
    }
}
