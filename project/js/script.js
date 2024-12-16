
const current = document.querySelector("#current");
// const blackberryContainer = document.querySelector("#blackberry-bush");

let newX = 0, newY = 0, startX = 0, startY = 0;
let count = 0;
let mousedownActive = false;

current.addEventListener('mousedown', mouseDown);

const bgVideo = document.getElementById('background-video');
bgVideo.playbackRate = 0.2;

springVideo = document.getElementById('spring-video')


function mouseDown(e) {
    e.preventDefault();
    mousedownActive = true;


    startX = e.clientX;
    startY = e.clientY;
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    console.log("mousedown");
}

function mouseMove(e) { 
    e.preventDefault();
    newX = startX- e.clientX;
    newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    current.style.top = startY + 'px';
    current.style.left = startX + 'px';
}

function mouseUp(e) {
    e.preventDefault();

    if (!mousedownActive) return;

    document.removeEventListener('mousemove', mouseMove);
    mousedownActive = false;
    
    switch (count) {
        case 0:
        case 3:
        case 4:
        case 5:
            setdownPhrase(current.innerText);
            makeNewPhrase();
            count += 1;
            break;
        case 1:
            const phraseOne = makePhraseOne();
            setdownPhrase(phraseOne);
            makeNewPhrase();
            count += 1;
            break;

        case 2:
            setdownPhrase(current.innerText);
            makeNewPhrase();
            count += 1;
            break;
        case 6:
            setdownPhrase(current.innerText);
            makeNewPhrase();
            count += 1;
            break;
        case 7:
            setdownPhrase(current.innerText);

            makeNewPhrase();
            count += 1;
            break;
        case 8:
            springVideo.style.display = "block";
            setdownPhrase(current.innerText);
            makeNewPhrase();
            count += 1;
                break;
        case 9:
            beetleContainer.style.display = "flex";
            setdownPhrase(current.innerText);
            makeNewPhrase();
            count += 1;
            break;
        case 10: 
            setdownPhrase(current.innerText);
            // makeNewPhrase();
            // count += 1;
            current.removeEventListener('mousedown', mouseDown);
            break;
        default:
            console.log("No matching case for count:", count);
    }
    
}

function makeNewPhrase() {
    current.innerText = stanza1[count];
    current.style.zIndex = "2";
}

// Set the current phrase to a new elem, and fix that to the current mouse position
function setdownPhrase(innerText) {
    const newPhrase = document.createElement("p");
    newPhrase.style.position = "absolute";
    newPhrase.style.top = current.style.top; 
    newPhrase.style.left = current.style.left;

    // handling diff cases of clickable phrases vs string phrases
    if (typeof innerText === 'string') {
        const textNode = document.createTextNode(innerText);
        newPhrase.appendChild(textNode);
    } else {
        newPhrase.appendChild(innerText);
    }

    document.body.appendChild(newPhrase);
    newPhrase.style.zIndex = "1";

    newPhrase.id = `phrase-${count}`;

    if (newPhrase.id === 'phrase-10') {
        const aElement = document.createElement('a');
        aElement.href = "stanza2.html";
        aElement.innerText = "ENTER";

        // newPhrase.innerText = "<";
        newPhrase.appendChild(aElement);

        const moreText = document.createElement('p');
        moreText.innerText= " "
        newPhrase.appendChild(moreText);
    }
    console.log("setPhrase id and internal words: ", newPhrase.id, newPhrase.innerText)
}

function makePhraseOne() {
    const container = document.createElement("span");

    const textBeforeLink = document.createTextNode('through the ');
    container.appendChild(textBeforeLink);

    // Creating clickable text
    const clickableText = document.createElement("a");
    clickableText.innerText = "blackberry bushes";
    clickableText.className = 'clickable-text';
    clickableText.addEventListener('click', function () {
        const blackberryBush = document.getElementById('blackberry-bush');
        blackberryBush.style.display = 'block';

        clickableText.classList.add('clickable-text-clicked');
    });
    container.appendChild(clickableText);

    return container;
}

function makePhraseEight() {
    const container = document.createElement("span");

    // Creating clickable text
    const clickableText = document.createElement("a");
    clickableText.innerText = "pebbles";
    clickableText.addEventListener('click', function () {
        const blackberryBush = document.getElementById('springs-video');
        blackberryBush.style.display = 'block';
    });
    container.appendChild(clickableText);

    const textAfterLink = document.createTextNode('are springs under our feet');
    container.appendChild(textAfterLink);

    return container;
}