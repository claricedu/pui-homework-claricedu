let contentDisplayed = false;

document.addEventListener("DOMContentLoaded", () => {
    const credits = document.querySelector('#credits');
    const enter = document.querySelector('#enter-text');

    // Single click listener for the entire document
    document.addEventListener("click", () => {
        if (!contentDisplayed) {
            credits.style.display = "block";
            contentDisplayed = true;
        } else {
            window.location.href = "stanza.html";
        }
    });
});
