
const current = document.querySelector("#current");
const blackberryContainer = document.querySelector("#blackberry-bush");

let newX = 0, newY = 0, startX = 0, startY = 0;
let phrase = 0;

current.addEventListener('mousedown', mouseDown);


function mouseDown(e) {
    e.preventDefault();
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
    document.removeEventListener('mousemove', mouseMove);
    
    switch (phrase) {
        case 0:
        case 1:
        case 2:
        case 3:
        // case 7:
        case 8:
            setdownPhrase();
    
            current.innerText = stanza1[phrase];
            current.style.zIndex = "2"; // Overlay it on top
            phrase += 1;
            console.log("phrase: ", phrase);
            break;
    
        case 4:
            // stanza1 finished
            // current.removeEventListener('mousedown', mouseDown);
            console.log("mouseup phrase num", phrase);
            phrase += 1;
            break;
    
        case 5:
            phrase += 1;
            document.addEventListener('click', clearPage);
            break;
    
        case 6:
            document.removeEventListener('click', clearPage);
            

            // Make it visible again
            current.style.opacity = "1";
            current.style.pointerEvents = "auto";

            // Reattach the mouseDown event listener
            current.removeEventListener('mousedown', mouseDown); // Avoid duplicate listeners
            current.addEventListener('mousedown', mouseDown);

            setdownPhrase();
    
            current.innerText = stanza1[phrase];
            current.style.zIndex = "2"; // Overlay it on top
            phrase += 1;
            console.log("phrase: ", phrase);
            break;

        case 7:
            setdownPhrase();
            current.innerText = stanza1[phrase];
            current.style.zIndex = "2"; // Overlay it on top
        
        
            phrase += 1;
            console.log("phrase: ", phrase);
            break;
            
        case 9:
            beetleContainer.style.display = "flex";
            break;
    
        default:
            console.log("No matching case for phrase:", phrase);
    }
    
}

function clearPage() {
    const body = document.body;
    const elements = Array.from(body.children); // Get all child elements in body

    elements.forEach((child) => {
        if (child.id !== "#current") {
            body.removeChild(child); 
        }
    });

    if (current) {
        // Use opacity to hide while preserving event listeners
        current.style.opacity = "0";
        current.style.pointerEvents = "none"; // Prevent user interaction
    } else {
        console.error('Element with id "current" not found.');
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
    // console.log(`ID IS : ${newPhrase.id}`);
    // console.log(`ID IS : ${newPhrase.innerText}`);
}
