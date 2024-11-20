//specific functionalities for stanza 1

var stanza1 = [
    "through the blackberry bushes",
    "but the thorns are just handlebars",
    "and the berries-----",
    "the berries dye our feet purple."    
]

const current = document.querySelector("#current");
const blackberryContainer = document.querySelector("#blackberry-bush");

let newX = 0, newY = 0, startX = 0, startY = 0;
let phrase = 0;



current.addEventListener('mousedown', animation);

function animation(e) {
    switch (phrase) {
        case 0:
            return mouseDown(e);
        case 1:
            blackberryContainer.style.display = "block";
            current.appendChild(blackberryContainer);
            blackberryImg = document.createElement("img");
            blackberryImg.src = "./assets/images/blackberryBushes.svg";
            blackberryContainer.appendChild(blackberryImg);
            return mouseDown(e);
        case 2: 
            return mouseDown(e);
        case 3:
            return mouseDown(e);
    }
}