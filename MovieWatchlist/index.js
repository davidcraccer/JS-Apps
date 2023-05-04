const baseURL = "http://www.omdbapi.com/?apikey=a80cae51"
const searchInput = document.querySelector('#search-input')

searchInput.addEventListener('keyup', async () => {
    renderMovies()
})


async function renderMovies(){
    document.querySelector('.hero').innerHTML = ''

    let endpointURL = `&s=${searchInput.value}`
    const data = await getData(endpointURL)
    data.Search.forEach(async movie => {

        endpointURL = `&i=${movie.imdbID}`
        const newData = await getData(endpointURL)

        const { Title, Runtime, Genre, Poster, Plot, Ratings } = newData
        const Rating = Ratings[0].Value.split("/")[0]
      
        document.querySelector('.hero').innerHTML +=`
        <div class="movie">
            <img class="poster" src="${Poster}" alt="Movie Poster">
            <div>
                <div class="top-movie">
                    <p class="title">${Title}</p>
                    <img src="/images/star.png" alt="Star">
                    <p class="small-headings">${Rating}</p>
                </div>
                <div class="middle-movie">
                    <p class="small-headings">${Runtime}</p>
                    <p class="small-headings">${Genre}</p>
                    <div class="add-btn" onclick="addToWatchList()">
                        <img src="/images/plus-icon.png" alt="Add Button">
                        <p class="small-headings">Watchlist</p>
                    </div>
                </div>
                <p class="description">${renderShortDescription(Plot)}</p>
            </div>
        </div>
        `
    })
}
async function getData(endpointURL){
    const res = await fetch(baseURL + endpointURL)
    const data = await res.json()
    return data
}

function renderShortDescription(Plot){
    const maxDescriptionLength = 70
        let truncatedDescription = Plot.slice(0, maxDescriptionLength)
        if (Plot.length > maxDescriptionLength) {
            truncatedDescription += `<span class='full-description' style='display: none;' data-full-description='${Plot}'></span>`
            truncatedDescription += "... <span class='read-more' onclick='renderFullDescription(this)'>Read more</span>"
        }
    return truncatedDescription
}

function renderFullDescription(element) {
    const descriptionElement = element.previousElementSibling
    const fullDescription = descriptionElement.dataset.fullDescription
    const pElement = element.closest('p')
    pElement.textContent = fullDescription;
    element.style.display = 'none'
}


/** 
 * http://www.omdbapi.com/?apikey=a80cae51&i=tt0083658
 * 
 * 
(3) [{…}, {…}, {…}]
Released
: 

 */


