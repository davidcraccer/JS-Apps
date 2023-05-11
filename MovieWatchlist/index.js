const baseURL = "http://www.omdbapi.com/?apikey=a80cae51"
const searchInput = document.querySelector('#search-input')
const searchForm = document.querySelector('#search-form')

async function getData(endpointURL){
    try {
        const res = await fetch(baseURL + endpointURL)
        const data = await res.json()
        return data
    }
    catch (err){
        console.error(err)
    }
}


if(window.location.pathname === "/index.html"){
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        renderMovies()
    })
}

async function renderMovies(){
    document.querySelector('.hero').innerHTML = ''

    let endpointURL = `&s=${searchInput.value}`
    const data = await getData(endpointURL)
    data.Search.forEach(async movie => {
        endpointURL = `&i=${movie.imdbID}`
        const newData = await getData(endpointURL)
        renderMoviesHTML(newData)
    })
    toggleHiddenSearch(data)
}



function renderMoviesHTML(data){
    const { Title, Runtime, Genre, Poster, Plot, Ratings } = data
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
                    <div class="add-btn" onclick="addToWatchList(this)">
                        <img src="/images/plus-icon.png" alt="Add Button">
                        <p class="small-headings">Watchlist</p>
                    </div>
                </div>
                <p class="description">${renderShortDescription(Plot)}</p>
            </div>
        </div>
        `
    
}
renderMyWatchlist()
function renderMyWatchlist(){
    let watchlist = JSON.parse(localStorage.getItem('watchlist'))
    
    watchlist.forEach((movie, index) => {
        const { Poster, Title, Rating, Runtime, Genre, Plot } = movie
        document.querySelector('#hero-watchlist').innerHTML += `
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
                    <div class="remove-btn" onclick="removeFromWatchList(${index})">
                        <img src="/images/minus-icon.png" alt="Remove Button">
                        <p class="small-headings">Watchlist</p>
                    </div>
                </div>
                <p class="description">${renderShortDescription(Plot)}</p>
            </div>
        </div>
        `
    })
    toggleHiddenWatchlist(watchlist)
    
}

function removeFromWatchList(index){
    let watchlist = JSON.parse(localStorage.getItem('watchlist'))
    watchlist.splice(index, 1)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    document.querySelector('#hero-watchlist').innerHTML = ''
    renderMyWatchlist()
}

function addToWatchList(element){
    const movieEl = element.closest('.movie')
    const titleEl = movieEl.querySelector('.title')
    const ratingEl = movieEl.querySelectorAll('.small-headings')[0]
    const runtimeEl = movieEl.querySelectorAll('.small-headings')[1]
    const genreEl = movieEl.querySelectorAll('.small-headings')[2]
    const posterEl = movieEl.querySelector('.poster')
    const plotEl = movieEl.querySelector('.description .full-description')

    const movie = {
        Title: titleEl.textContent,
        Rating: ratingEl.textContent,
        Runtime: runtimeEl.textContent,
        Genre: genreEl.textContent,
        Poster: posterEl.getAttribute('src'),
        Plot: plotEl.dataset.fullDescription,
    }

    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    watchlist.push(movie)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
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


function toggleHiddenSearch(data){
    if(data && data.Search && data.Search.length){
        document.querySelector('#no-searches').classList.add('hidden')
    }else{
        document.querySelector('#no-searches').classList.remove('hidden')
    }
}

function toggleHiddenWatchlist(watchlist){
    if(watchlist && watchlist.length){
        document.querySelector('#no-watchlist').classList.add('hidden')
    }else{
        document.querySelector('#no-watchlist').classList.remove('hidden')
    }
}