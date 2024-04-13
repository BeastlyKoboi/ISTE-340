let takenNames = {};

// Used to ensure labels are not made with intersecting names
const validateUniqueName = (name) => {
    if (takenNames[name]) {
        takenNames[name]++;
    } else {
        takenNames[name] = 1;
    }
    return `${name}${takenNames[name]}`;
};

// Creates a div with a flavor text, a prompt, and radio buttons. 
const createChoiceRadio = ({ name, firstTimeFlavor, roomFlavor, question, roomOptions, callback }) => {

    const choiceDiv = document.createElement('div');
    choiceDiv.classList.add('form-choice')

    // used as an additional option to add text separate from main
    if (firstTimeFlavor) {
        const firstTimeFlavorText = document.createElement('p');
        firstTimeFlavorText.appendChild(document.createTextNode(firstTimeFlavor));
        choiceDiv.appendChild(firstTimeFlavorText);
    }

    const flavorText = document.createElement('p');
    flavorText.appendChild(document.createTextNode(roomFlavor));
    choiceDiv.appendChild(flavorText);

    const h3 = document.createElement('p');
    h3.appendChild(document.createTextNode(question));
    choiceDiv.appendChild(h3);

    const inputName = validateUniqueName(name);

    // Create A radio button for each given room option
    for (let i = 0; i < roomOptions.length; i++) {
        const inputID = `${inputName}-${i}`;

        const label = document.createElement('label');
        const radioBtn = document.createElement('input');

        radioBtn.setAttribute('type', "radio");
        radioBtn.setAttribute('id', inputID);
        radioBtn.setAttribute('name', inputName);
        radioBtn.setAttribute('xIndex', roomOptions[i].xIndex);
        radioBtn.setAttribute('yIndex', roomOptions[i].yIndex);
        radioBtn.onclick = callback;

        label.setAttribute('for', inputID);

        label.appendChild(document.createTextNode(roomOptions[i].name));
        label.prepend(radioBtn);

        choiceDiv.appendChild(label);
    }

    choiceDiv.appendChild(document.createElement('hr'));

    return choiceDiv;
};

export {
    createChoiceRadio,
}