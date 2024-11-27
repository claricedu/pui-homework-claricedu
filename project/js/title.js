document.addEventListener("DOMContentLoaded", () => {
    // const title = document.querySelector("#title");
    const authors = document.querySelector('#authors');
    // const current = document.querySelector("#current");
    const enter = document.querySelector('#enter-text');

    // let count = 0;

    // current.style.display = "none";
    authors.style.display="none";
    enter.style.display="none";


    document.addEventListener("click", () => {
            authors.style.display="block";
            enter.style.display="block";
    });
});
