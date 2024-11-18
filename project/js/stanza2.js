
var stanza2 = [
    "The dirt is alive",
    "it grows like the sky",
    "and if we run fast enough",
    "pebbles are springs under our feet",    
    "and beetles move the heavy earth"
]

const beetleImgContainer = document.querySelector("#beetle-img-container");
const addButton = document.querySelector("#add-beetle-button");

addButton.addEventListener("click", () => {
    const newBeetle = document.createElement("img");
    newBeetle.src = "./assets/images/blackberryBushes.svg";
    newBeetle.alt = "A beetle";
    newBeetle.style.width = "50px"; // Match the original beetle size
    newBeetle.style.height = "auto";
    beetleImgContainer.appendChild(newBeetle); // Add to the beetle-img div
    console.log("beetle added");
});
