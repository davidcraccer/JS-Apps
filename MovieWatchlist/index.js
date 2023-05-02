const baseURL = "http://www.omdbapi.com/?apikey=a80cae51"
const searchInput = document.querySelector('#search-input')

searchInput.addEventListener('keyup', async () => {
    // let endpointURL = `&i=tt0083658`
    // const data = await getData(endpointURL)
    renderMovies()
})


async function renderMovies(){
    const endpointURL = `&s=${searchInput.value}`
    const data = await getData(endpointURL)


    data.Search.forEach(movie => {
        const poster = movie.Poster
        const imdbID = movie.imdbID
        
    })


}

async function getData(endpointURL){
    const res = await fetch(baseURL + endpointURL)
    const data = await res.json()
    return data
}

/**
 * 0: 
Poster: 
"https://m.media-amazon.com/images/M/MV5BZjA0OWVhOTAtYWQxNi00YzNhLWI4ZjYtNjFjZTEyYjJlNDVlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"

imdbID: 
"tt0073486" */

/** 
 * http://www.omdbapi.com/?apikey=a80cae51&i=tt0083658
 */


