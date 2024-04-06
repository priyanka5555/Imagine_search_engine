const accessKey = "zn3lRnCtDDBHFtnOgKQEIt5BIhv5Yx0Wh85euOcqRGI"

const searchForm = document.getElementById("search-form");
const searchImageBox = document.getElementById("searchImageBox")
const searchResults = document.getElementById("search-results")
const showMoreBtn = document.getElementById("showMore-btn")


let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchImageBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    // Get the response in our browser of any search

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResults.innerHTML = ""
    }

    const results = data.results;

    results.map((result) =>{
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResults.appendChild(imageLink);
    })

    showMoreBtn.style.display="block";

   // console.log(data);
}  //this function get call when we write something on search box and hit enter - so for that now we will use event listener

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", ()=>{
    page++;  
    searchImages();
  //  console.log(page);
});