export default class Player {
    constructor(x, y, context) {
        this.x = x;
        this.y = y;
        this.context = context;

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
        )
        console.log(this.x, this.y)
    }
}