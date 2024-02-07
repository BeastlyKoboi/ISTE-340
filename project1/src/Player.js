export default class Player {
    constructor({ x, y, radius, blinkSpeed, }) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.blinkSpeed = blinkSpeed;
        this.alpha = 0;
    }

    draw(p5) {
        this.alpha += this.blinkSpeed * p5.deltaTime;

        if (this.alpha > 255) {
            this.alpha = 255;
            this.blinkSpeed = -this.blinkSpeed;
        }
        else if (this.alpha < 0) {
            this.alpha = 0;
            this.blinkSpeed = -this.blinkSpeed;
        }

        p5.fill(p5.color(255, 0, 0, this.alpha));
        p5.circle(this.x, this.y, this.radius);

    }
}