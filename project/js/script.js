const current = document.querySelector("#current");
const blackberryContainer = document.querySelector("#blackberry-bush");

let newX = 0, newY = 0, startX = 0, startY = 0;
let phrase = 0;


var stanza1 = [
    "through the blackberry bushes",
    "but the thorns are just handlebars",
    "and the berries-----",
    "the berries dye our feet purple."    
]

current.addEventListener('mousedown', mouseDown);

function mouseOver() {
    console.log("hover");
    current.style.color = "blue";
    current.addEventListener('mouseout', mouseOut);
}

function mouseOut() {
    current.style.color = "black";
}

function click() {
    console.log("clicked");
    setdownPhrase();
    // Update current's text to the next stanza
    current.innerText = stanza1[phrase];
    phrase += 1; // Increment the phrase for the next stanza

    console.log("phrase: ", phrase);

    // Move current to appear below the new setPhrase
    const newTop = parseInt(setPhrase.style.top) + 50; // Adjust spacing below setPhrase
    current.style.top = `${newTop}px`; 

    current.removeEventListener('click', click);
    current.addEventListener('mousedown', mouseDown);
}


function mouseDown(e) {
    e.preventDefault(); // Prevent text selection
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

    // console.log(newX, newY);
    // console.log(startX, startY);
}

function mouseUp(e) {
    e.preventDefault();
    document.removeEventListener('mousemove', mouseMove);
    if (phrase < stanza1.length ) {
        setdownPhrase();

        current.innerText = stanza1[phrase];
        current.style.zIndex = "2"; //overlay it on top
        phrase +=1;
        console.log("phrase: ", phrase);
    } else if (phrase === stanza1.length ) {
        // stanza1 finished
        current.removeEventListener('mousedown', mouseDown);
        phrase +=1;
    }
    else if (phrase === stanza1.length + 1) {
        document.addEventListener('click', clearPage);
    }
}

function clearPage() {
    console.log("Page Clear");
    for (let i = 0; i <= stanza1.length + 1; i++) {
        const phraseClear = document.querySelector(`#phrase-${i}`);
        console.log(`${phraseClear.innerText}`)
        phraseClear.style.display = "none";
    }
}

// Set the current phrase to a new elem, set it to the current mouse position
function setdownPhrase() {
    const newPhrase = document.createElement("p");
    newPhrase.style.position = "absolute";
    newPhrase.style.top = current.style.top; 
    newPhrase.style.left = current.style.left;
    newPhrase.innerText = current.innerText;
    document.body.appendChild(newPhrase);
    newPhrase.style.zIndex = "1";

    // Assign a unique ID using counter
    newPhrase.id = `phrase-${phrase}`;
    console.log(`ID IS : ${newPhrase.id}`);
    console.log(`ID IS : ${newPhrase.innerText}`);
}

        // current.appendChild(blackberryContainer);
        //     blackberryImg = document.createElement("img");
        //     blackberryImg.src = "./assets/images/blackberryBushes.svg";
        //     blackberryContainer.appendChild(blackberryImg);