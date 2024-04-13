export default class Room {
    constructor({ xIndex, yIndex, xPos, yPos, length, name, type, prompt }) {
        // All the room types, just to know
        // const types = ["entry", "empty", "full", "end"];
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.xPos = xPos;
        this.yPos = yPos;
        this.length = length;
        this.name = name;
        this.type = type;
        this.prompt = prompt;
        this.timesVisited = 0;
    }

    draw(p5) {
        if (this.type == "empty") {
            p5.fill("grey");
        }
        else if (this.type == "full" || this.type == "end") {
            p5.fill("white");
        }
        else if (this.type == "entry") {
            p5.fill("rgb(143, 255, 143)");

        }

        p5.square(this.xPos, this.yPos, this.length, 20);

        p5.noStroke();

        p5.fill("black");
        p5.text(this.name, this.xPos, this.yPos, this.length);
    }
}