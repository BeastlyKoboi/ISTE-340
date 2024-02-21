let takenNames = {};

const validateUniqueName = (name) => {
    if (takenNames[name]) {
        takenNames[name]++;
    } else {
        takenNames[name] = 1;
    }
    return `${name}${takenNames[name]}`;
};

const createChoiceRadio = ({ name, flavor, question, roomOptions, callback }) => {

    const choiceDiv = document.createElement('div');

    const flavorText = document.createElement('p');
    flavorText.innerText = flavor;
    choiceDiv.appendChild(flavorText);

    const h3 = document.createElement('p');
    // h3.nodeValue = question;
    h3.innerText = question;
    choiceDiv.appendChild(h3);

    const inputName = validateUniqueName(name);

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

        label.innerText = roomOptions[i].name;
        label.prepend(radioBtn);

        choiceDiv.appendChild(label);

        // add onclick stuff
    }
    return choiceDiv;

    //  <p>Which did you choose?<br>
    //      <label for="r"><input type="radio" value="red" id="r" name="color"> Red</label><br>
    //      <label for="g"><input type="radio" value="green" id="g" name="color"> Green</label><br>
    //      <label for="b"><input type="radio" value="blue" id="b" name="color"> Blue</label><br>
    //      <input type="button" value="Color choice" onclick="choose()">
    //  </p>

};

export {
    createChoiceRadio,

}