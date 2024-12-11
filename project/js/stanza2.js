const beetleContainer = document.querySelector("#beetle-container");
const beetleImgContainer = document.querySelector("#beetle-img-container");
const moveText = document.querySelector("#move-beetle-text");

document.addEventListener("DOMContentLoaded", () => {
    moveText.addEventListener("click", () => {
        const newBeetle = document.createElement("img");
        newBeetle.src = "./assets/images/beetle10.png";
        newBeetle.alt = "A beetle";
        beetleImgContainer.appendChild(newBeetle);

        newBeetle.classList.add("beetle-img");
        console.log("beetle added");
    });
});