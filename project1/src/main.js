

import Banner from "./Banner.js";
import Player from "./Player.js";
import Room from "./Room.js";
import * as form from "./form.js";

let data = await fetch("data/story1.json").then((response) => {
    return response.json();
});
let sketch;
let canvasWidth = 400;
let canvasHeight = 600;
const formDiv = document.getElementById('dynamic-form');
let timePassed = 0;
let roomData = data.map;
let roomsMap = [];
let roomSize = 60;
let player;
let banner;

// "map": [
//     ["", "", "", ""],
//     ["", "", "", ""],
//     ["", "", "", ""],
//     ["", "", "", ""]
// ],

const init = () => {
    let mapWidth = roomData[0].length * roomSize;
    let mapHeight = roomData.length * roomSize;

    let widthOffset = canvasWidth / 2 - mapWidth / 2 + roomSize / 2;
    let heightOffset = canvasHeight / 2 - mapHeight / 2 + roomSize / 2;

    for (let y = 0; y < roomData.length; y++) {
        let roomRow = [];
        for (let x = 0; x < roomData[y].length; x++) {
            let roomJSON = data.rooms[roomData[y][x]]

            roomRow.push(new Room(x * roomSize + widthOffset, y * roomSize + heightOffset, roomSize, roomJSON));
        }
        roomsMap.push(roomRow);
    }

    player = new Player({
        x: canvasWidth / 2,
        y: 25,
        radius: 15,
        blinkSpeed: 1,
    });

    formDiv.appendChild(form.createChoiceRadio({
        name: "initial",
        question: data['initial'].prompt.question,
        options: data['initial'].prompt.options,
        callback: onChoice,
    }));

    banner = new Banner({
        text: 'Mission Accepted',
        moveSpeed: 1000,
        colorSpeed: 50,
        pausedDur: 1.5,
        startColor: { h: 51, s: 100, l: 100 },
        endColor: { h: 51, s: 100, l: 50 },
    });
};


const onChoice = (e) => {
    //
    console.log('I was clicked', e.target);
    // while (this.parentNode != this.parentNode.lastChild) kill last child;

    // first check for nodes after this choice, 
    // if they exist, kill them

    //

}

sketch = new p5((p5) => {

    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.rectMode(p5.CENTER)
    }

    p5.draw = () => {
        // timePassed += p5.deltaTime;

        // if (timePassed < 1) return;

        // timePassed -= 1;

        p5.background(0, 0, 0);

        for (let y = 0; y < roomsMap.length; y++) {
            for (let x = 0; x < roomsMap[y].length; x++) {
                roomsMap[y][x].draw(p5);
            }
        }

        player.draw(p5);
    }
});

init();