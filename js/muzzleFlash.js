export default class MuzzleFlash {
    constructor(x, y, angle, context) {
        this.x = x;
        this.y = y;
        this.context = context;
        this.angle = angle;
        this.lifeTime = 10; // frames
        this.currentFrame = 0;
        this.maxRadius = 15;
    }

    update() {
        this.currentFrame++;
    }

    draw() {
        const progress = this.currentFrame / this.lifeTime;
        const radius = this.maxRadius * (1 - progress);
        const alpha = 1 - progress;

        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate(this.angle);

        this.context.beginPath();
        this.context.arc(0, 0, radius, 0, Math.PI * 2);
        this.context.fillStyle = `rgba(255, 200, 0, ${alpha})`;
        this.context.fill();

        this.context.restore();
    }

    isExpired() {
        return this.currentFrame >= this.lifeTime;
    }
}
