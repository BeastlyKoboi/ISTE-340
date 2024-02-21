

import Banner from "./Banner.js";
import Player from "./Player.js";
import Room from "./Room.js";
import * as form from "./form.js";

let sources = ['story1.json']
let parsedData = {};
let storySelect = document.getElementById('storySelect');

for (const filename of sources) {
    parsedData[filename] = await fetch(`data/${filename}`).then((response) => {
        return response.json();
    });
    let newOption = document.createElement('option');
    newOption.value = filename;
    newOption.innerText = parsedData[filename]['Title'];
    storySelect.appendChild(newOption);
}

let chosenData;
let canvasWidth = 400;
let canvasHeight = 600;
const formDiv = document.getElementById('dynamic-form');
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

const onStorySelect = (e) => {
    if (e.target.value)
        chosenData = parsedData[e.target.value];
}
storySelect.addEventListener('change', onStorySelect);

const onChoice = (e) => {
    //
    console.log('I was clicked', e.target);
    // while (this.parentNode != this.parentNode.lastChild) kill last child;

    // first check for nodes after this choice, 
    // if they exist, kill them

    //

}

const init = (e) => {
    if (!storySelect.value) {
        return;
    }

    // Remove every child after the title of the story 
    while (e.target.parentNode.lastElementChild.nodeName != 'H1'){
        e.target.parentNode.removeChild(e.target.parentNode.lastElementChild);
    }

    // reset map
    roomsMap = [];
    let mapWidth = chosenData.map[0].length * roomSize;
    let mapHeight = chosenData.map.length * roomSize;

    let widthOffset = canvasWidth / 2 - mapWidth / 2 + roomSize / 2;
    let heightOffset = canvasHeight / 2 - mapHeight / 2 + roomSize / 2;

    for (let y = 0; y < chosenData.map.length; y++) {
        let roomRow = [];
        for (let x = 0; x < chosenData.map[y].length; x++) {
            let roomJSON = chosenData.rooms[chosenData.map[y][x]]

            roomRow.push(new Room({
                xIndex: x,
                yIndex: y,
                xPos: x * roomSize + widthOffset,
                yPos: y * roomSize + heightOffset,
                length: roomSize,
                name: roomJSON.name,
                type: roomJSON.type,
                prompt: roomJSON.prompt,
            }));
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
        flavor: chosenData['initial'].prompt.flavor,
        question: chosenData['initial'].prompt.question,
        options: chosenData['initial'].prompt.options,
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

document.getElementById('accept-btn').addEventListener('click', init);

let sketch = new p5((p5) => {

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

        if (player)
            player.draw(p5);
    }
});

// init();