export default class Player {
    constructor(x, y, context) {
        this.x = x;
        this.y = y;
        this.context = context;
        this.cursorPosition = {
            x: 0,
            y: 0
        }

        document.addEventListener("mousemove", event => {
            this.cursorPosition.x =event.clientX;
            this.cursorPosition.y =event.clientY;
        });

        this.image = new Image();
        this.image.src = "./img/tank.png";
        this.imageWidth = 40;
        this.imageHeight = 50;
    }

    drawImg() {
        this.context.drawImage(
            this.image,
            // 0,
            // 0,
            // this.imageWidth,
            // this.imageHeight,
            this.x - this.imageWidth/2,
            this.y - this.imageHeight/2,
            this.imageWidth,
            this.imageHeight
        );
    }

    draw() {
        this.context.save();
        let angle = Math.atan2(this.cursorPosition.y - this.y, this.cursorPosition.x - this.x);
        this.context.translate(this.x, this.y);
        this.context.rotate(angle + Math.PI/2);
        this.context.translate(- this.x, -this.y);
        this.drawImg();
        this.context.restore();
    }
}