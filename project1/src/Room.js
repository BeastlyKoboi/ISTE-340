export default class Room {
    constructor(x, y, length, { name, type, prompt }) {
        const types = ["entry", "empty", "full"];
        this.x = x;
        this.y = y;
        this.length = length;
        this.name = name;
        this.type = type;
        this.prompt = prompt;

    }

    draw(p5) {
        if (this.type == "empty") {
            p5.fill("grey");
        }
        else if (this.type == "entry") {
            p5.fill("white");

        }
        p5.stroke("black");
        p5.square(this.x, this.y, this.length, 10);

        p5.noStroke();
        p5.rect(this.x, this.y, this.length + 2, 10);
        p5.rect(this.x, this.y, 10, this.length + 2);

        p5.fill("black");
        p5.text(this.name, this.x, this.y, this.length);
    }
}