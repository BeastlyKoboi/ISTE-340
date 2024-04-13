import Banner from "./Banner.js";
import Player from "./Player.js";
import Room from "./Room.js";
import * as form from "./form.js";
import { GetCookie, SetCookie } from "./cookies.js"; "./cookies.js";

let sources = ['story1.json']
let parsedData = {};
let storySelect = document.getElementById('storySelect');
let chosenData;

// Reads all the files for each story, only one for now.
for (const filename of sources) {
    parsedData[filename] = await fetch(`data/${filename}`).then((response) => {
        return response.json();
    });
    let newOption = document.createElement('option');
    newOption.value = filename;
    newOption.appendChild(document.createTextNode(parsedData[filename]['Title']));
    storySelect.appendChild(newOption);
}

// Checks to see if a story was selected in a previous session, if so auto choose it
// Will be more useful when more stories exist.
if (GetCookie('lastStoryChoice') || localStorage.getItem('arf7094-lastStoryChoice')) {
    storySelect.value = GetCookie('lastStoryChoice') || localStorage.getItem('arf7094-lastStoryChoice');
    
    chosenData = parsedData[storySelect.value];
}

let canvasWidth = 400;
let canvasHeight = 500;
const formDiv = document.getElementById('dynamic-form');
let roomsMap = []; // 2d map of the created Rooms
let pathQueue = []; // a set of the room movements taken
let roomSize = 75;
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

    // Save choice to cookies or local storage
    let cookieEnabled;

    SetCookie('test', '', 1000, false, false, false, true);
    cookieEnabled = (document.cookie.indexOf("test") != -1) ? cookieEnabled = true : cookieEnabled = false;

    if (cookieEnabled) {
        SetCookie('lastStoryChoice', e.target.value, 1000, false, false, false, true);
    } else {
        localStorage.setItem('arf7094-lastStoryChoice', e.target.value);
    }
}
storySelect.addEventListener('change', onStorySelect);

// Called whenever a choice is selected in a prompt
const onChoice = (e) => {
    //
    let inputEl = e.target;
    let x = parseInt(inputEl.getAttribute('xIndex'));
    let y = parseInt(inputEl.getAttribute('yIndex'));
    let newRoom = roomsMap[y][x];

    // Removes every choice after this one if any are found, then adds to queue
    while (inputEl.parentNode.parentNode != inputEl.parentNode.parentNode.parentNode.lastChild) {
        inputEl.parentNode.parentNode.parentNode.
            removeChild(inputEl.parentNode.parentNode.parentNode.lastChild);
        pathQueue.pop().timesVisited--;
    }
    pathQueue.push(newRoom);
    newRoom.timesVisited++;

    // Move player
    player.x = newRoom.xPos;
    player.y = newRoom.yPos;

    // gives ending is room has one
    if (newRoom.type === 'end') {
        let finalResultEl = document.createElement('p');
        finalResultEl.appendChild(document.createTextNode(newRoom.prompt.firstTimeFlavor));
        formDiv.appendChild(finalResultEl);
        return;
    }

    // Check for and compile existing adjacent rooms
    let adjacentRooms = [];
    // north
    if (roomsMap[y - 1] && roomsMap[y - 1][x]
        && roomsMap[y - 1][x].type !== "empty") {
        adjacentRooms.push(roomsMap[y - 1][x]);
    }
    // south
    if (roomsMap[y + 1] && roomsMap[y + 1][x]
        && roomsMap[y + 1][x].type !== "empty") {
        adjacentRooms.push(roomsMap[y + 1][x]);
    }
    // west
    if (roomsMap[y][x - 1]
        && roomsMap[y][x - 1].type !== "empty") {
        adjacentRooms.push(roomsMap[y][x - 1]);
    }
    // east
    if (roomsMap[y][x + 1]
        && roomsMap[y][x + 1].type !== "empty") {
        adjacentRooms.push(roomsMap[y][x + 1]);
    }

    // Show some flavor text only if it is the first time
    let firstTimeFlavorText;
    if (newRoom.timesVisited === 1)
        firstTimeFlavorText = newRoom.prompt.firstTimeFlavor;
    else
        firstTimeFlavorText = null;

    // Call create choice radio with new values
    formDiv.appendChild(form.createChoiceRadio({
        name: "initial",
        firstTimeFlavor: firstTimeFlavorText,
        roomFlavor: newRoom.prompt.roomFlavor,
        question: newRoom.prompt.question,
        roomOptions: adjacentRooms,
        callback: onChoice,
    }));

}

// Called when mission is accepted
const init = (e) => {
    if (!storySelect.value) {
        return;
    }

    // Remove every child after the title of the story 
    while (e.target.parentNode.lastElementChild.nodeName != 'BUTTON') {
        e.target.parentNode.removeChild(e.target.parentNode.lastElementChild);
    }

    // reset map
    roomsMap = [];
    pathQueue = [];
    let entryRooms = [];
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

            if (roomRow[x].type == 'entry')
                entryRooms.push(roomRow[x]);
        }
        roomsMap.push(roomRow);
    }

    player = new Player({
        x: canvasWidth / 2,
        y: 25,
        radius: 15,
        blinkSpeed: .5,
    });

    // Creates the initial choice from the data
    formDiv.appendChild(form.createChoiceRadio({
        name: "initial",
        firstTimeFlavor: null,
        roomFlavor: chosenData['initial'].prompt.flavor,
        question: chosenData['initial'].prompt.question,
        roomOptions: entryRooms,
        callback: onChoice,
    }));

    // Starts banner animation
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

// Creates p5 canvas 
let sketch = new p5((p5) => {

    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.rectMode(p5.CENTER)
    }

    p5.draw = () => {
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
