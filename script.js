const accessKey = "TRI7AOG3-w8VDcBwh6gmrsOiA5p6TSUciCUhgidgnpc";
const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-btn")

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1){
        searchResults.innerHTML = ""
    }
    results.map((result) => {
        const imageWrap = document.createElement('div');
        imageWrap.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href =result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrap.appendChild(image);
        imageWrap.appendChild(imageLink);
        searchResults.appendChild(imageWrap);
    });
    page++
    if(page>1){
        showMore.style.display = "block"
    }
}
formElement.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1;
    searchImages();
})
showMore.addEventListener("click", () =>{
    searchImages();
})
