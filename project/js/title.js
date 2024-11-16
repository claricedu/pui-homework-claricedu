//title appears first, then to new page
document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector("#title");
    const authors = document.querySelector('#authors');
    const current = document.querySelector("#current");
    
    let count = 0;

    current.style.display = "none";
    authors.style.display="none";

    document.addEventListener("click", () => {
        if (count === 0) {
            authors.style.display="block";
        }
        else if (count === 1) {
            title.style.display = "none";
            authors.style.display = "none";
            setTimeout(() => {
                current.style.display = "block";
            }, 600); // 500 milliseconds = 0.5 seconds

        }
        count += 1;
    });
});
