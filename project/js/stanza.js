const current = document.querySelector("#current");

let newX = 0, newY = 0, startX = 0, startY = 0;
let count = 0;
let mousedownActive = false;

current.addEventListener('mousedown', mouseDown);

const backgroundVideo = document.getElementById('background-video');
backgroundVideo.playbackRate = 0.02;

springVideo = document.getElementById('spring-video');

window.addEventListener("mousedown", function (e) {
    e.preventDefault();
    const music = document.getElementById("background-music");
    music.play().catch((error) => {
        console.error("Audio playback failed:", error);
    });
    music.loop = true;
    music.playbackRate = 0.2;
});

// code referencing:  https://www.youtube.com/watch?v=ymDjvycjgUM 
function mouseDown(e) {
    e.preventDefault(); 
    mousedownActive = true;

    startX = e.clientX;
    startY = e.clientY;
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}

function mouseMove(e) { 
    e.preventDefault(); 
    newX = startX - e.clientX;
    newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    current.style.top = startY + 'px';
    current.style.left = startX + 'px';
}

function handlePhrase(phrase) {
    setdownPhrase(phrase);
    makeNewPhrase();
    count += 1;
}

function mouseUp(e) {
    e.preventDefault(); 

    if (!mousedownActive) return;

    document.removeEventListener('mousemove', mouseMove);
    mousedownActive = false;
    
    switch (count) {
        case 1:
            handlePhrase(makePhraseOne());
            break;
        case 0:
        case 2:
        case 5:
        case 6:
        case 7:
        case 10:
        case 11:
            handlePhrase(stanzaAfter[count]);
            break;
        case 3:
            const blackberryContainer= document.getElementById('blackberry');
            blackberryContainer.style.display="flex";
            
            handlePhrase(stanzaAfter[count]);
            break;
        case 4:
            handlePhrase(makePhraseFour());
            break;
        case 6:
            handlePhrase(stanzaAfter[count]);
            break;
        case 8:
            springVideo.style.display = "block";
            handlePhrase(stanzaAfter[count]);
            break;
        case 9:
            beetleContainer.style.display = "flex";
            handlePhrase(stanzaAfter[count]);
            break;
        case 12: 
            setdownPhrase(makePhraseTwelve());
            current.removeEventListener('mousedown', mouseDown);
            break;
        default:
            console.log("No matching case for count:", count);
    }
}

function makeNewPhrase() {
    current.innerText = stanzaBefore[count];
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
}

function makePhraseOne() {
    const container = document.createElement("span");

    const textBeforeLink = document.createTextNode('through the ');
    container.appendChild(textBeforeLink);

    // Creating clickable text
    const clickableText = document.createElement("a");
    clickableText.innerText = "blackberry bushes";
    clickableText.className = 'clickable-text';
    clickableText.addEventListener('click', function (e) {
        e.preventDefault(); 
        const blackberryBush = document.getElementById('blackberry-bush');

        // Positioning container above the clickable-text
        const rect = clickableText.getBoundingClientRect();
        blackberryBush.style.left = `${rect.left}px`;
        blackberryBush.style.top = `${rect.top - blackberryBush.offsetHeight}px`;

        blackberryBush.style.display = "block";
        clickableText.classList.add('clickable-text-clicked');
    });
    container.appendChild(clickableText);

    return container;
}

function makePhraseFour() {
    const clickableText = document.createElement("a");
    clickableText.innerText = "Dye our feet purple.";
    clickableText.className = 'clickable-text';
    clickableText.addEventListener('click', function (e) {
        e.preventDefault(); 
        const blackberryImages = document.querySelectorAll('#blackberry img');

        blackberryImages.forEach(function (img) {
            img.src = './assets/images/smushedBlackberry.png'; 
            img.alt = 'ASCII art of a smushed blackberry in purple'; 
        });

        clickableText.classList.add('clickable-text-clicked');
    });
    return clickableText;
}

function makePhraseTwelve() {
    const clickableText = document.createElement("a");
    clickableText.href = "finis.html";
    clickableText.innerText = "..........";
    clickableText.className = "clickable-text";

    clickableText.addEventListener("click", function (e) {
        e.preventDefault(); 
        window.location.href = "finis.html";
    });

    return clickableText; 
}

const beetleContainer = document.querySelector("#beetle-container");
const beetleImgContainer = document.querySelector("#beetle-img-container");
const moveText = document.querySelector("#move-beetle-text");

document.addEventListener("DOMContentLoaded", () => {
    moveText.addEventListener("click", (e) => {
        e.preventDefault(); 
        const newBeetle = document.createElement("img");
        newBeetle.src = "./assets/images/beetle10.png";
        newBeetle.alt = "A beetle";
        beetleImgContainer.appendChild(newBeetle);

        newBeetle.classList.add("beetle-img");
    });
});

