
const current = document.querySelector("#current");
const blackberryContainer = document.querySelector("#blackberry-bush");

let newX = 0, newY = 0, startX = 0, startY = 0;
let phrase = 0;
let mousedownActive = false;

current.addEventListener('mousedown', mouseDown);


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
    if (!mousedownActive) return;
    e.preventDefault();

    document.removeEventListener('mousemove', mouseMove);
    mousedownActive  = false;
    
    switch (phrase) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            setdownPhrase();
            makeNewPhrase();
            phrase += 1;
            break;
        case 9:
            beetleContainer.style.display = "flex";
            setdownPhrase();
            makeNewPhrase();
            phrase += 1;
            break;
        case 10: 
            setdownPhrase();
            // makeNewPhrase();
            // phrase += 1;
            current.removeEventListener('mousedown', mouseDown);
            break;
        default:
            console.log("No matching case for phrase:", phrase);
    }
    
}


// Set the current phrase to a new elem and set to the current mouse position
function setdownPhrase() {
    const newPhrase = document.createElement("p");
    newPhrase.style.position = "absolute";
    newPhrase.style.top = current.style.top; 
    newPhrase.style.left = current.style.left;
    newPhrase.innerText = current.innerText;
    document.body.appendChild(newPhrase);
    newPhrase.style.zIndex = "1";

    newPhrase.id = `phrase-${phrase}`;

    if (newPhrase.id === 'phrase-10') {
        const aElement = document.createElement('a');
        aElement.href = "stanza2.html";
        aElement.innerText = "ENTER";

        // newPhrase.innerText = "<";
        newPhrase.appendChild(aElement);

        const moreText = document.createElement('p');
        moreText.innerText= "some more elems"
        newPhrase.appendChild(moreText);
    }
    console.log("setPhrase id and internal words: ", newPhrase.id, newPhrase.innerText)
}

function makeNewPhrase() {
    current.innerText = stanza1[phrase];
    current.style.zIndex = "2"; // Overlay it on top
}