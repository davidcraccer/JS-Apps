//https://www.omdbapi.com/

const baseURL = "http://www.omdbapi.com/?apikey=a80cae51";

if (window.location.pathname === "/index.html") {
  document.getElementById("search-btn").addEventListener("click", () => {
    const inputValue = document.getElementById("inputId").value;
    //if input is empty, no search
    if (!inputValue) {
      return;
    }

    const url = baseURL + `&s=${inputValue}`
    //getting the data aka the id of the movies
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const movies = data.Search;
        //blank the body
        document.getElementById("movies").innerHTML = "";

        //gettin id and render
        if(movies) {
          movies.forEach((movie) => {
            //gettin data from each film ID
            const endPoint = `&i=${movie.imdbID}`;
            renderMovies(endPoint);
          });
        } 
        //if nothin found
        else {
          document.getElementById("movies").innerHTML = `
            <div class="no-search">
                <h2>
                    Unable to find what you're looking for. Please try another search.
                </h2>
            </div> `;
        }
      });
  });
}

function renderMovies(endPoint) {
  fetch(baseURL + endPoint)
    .then((res) => res.json())
    .then((data) => {
      const { Poster, Title, imdbRating, Runtime, Genre, Plot } = data;

      document.getElementById("movies").innerHTML =
        `
            <div class="hero">
            <img src="${Poster}" class="poster" alt="movie poster">
            <div class="text-holder">
            <div class="title-rating">
            <h3 class="title">${Title}</h3>
            <img src="/images/star.png" alt="">
            <h5 class="rating">${imdbRating}</h5>
            </div>
            <div class="time-genre">
            <h5 class="time">${Runtime}</h5>
            <h5 class="genre">${Genre}</h5>
            <div class="add-watchlist">
            <img src="/images/plus-icon.png" alt="add-icon">
            <h5 >Watchlist</h5>
            </div>
            </div>
            <p>${Plot}
            </p>
            </div>
            </div>
            ` + document.getElementById("movies").innerHTML;
      addRemove();
    });
}

if (location.pathname === "/watchlist.html") {
  const movies = Object.entries(localStorage);
  if (movies.length > 0) {
    document.getElementById("movies2").innerHTML = ``;

    //each movie looped
    for (const [key, value] of movies) {
        //JSON string to an Object through parse()
        const movie = JSON.parse(value);
      const { Poster, Title, imdbRating, Runtime, Genre, Plot } = movie;
      document.getElementById("movies2").innerHTML += `
            <div class="hero">
            <img src="${Poster}" class="poster" alt="movie poster">
            <div class="text-holder">
            <div class="title-rating">
            <h3 class="title">${Title}</h3>
            <img src="/images/star.png" alt="">
            <h5 class="rating">${imdbRating}</h5>
            </div>
            <div class="time-genre">
            <h5 class="time">${Runtime}</h5>
            <h5 class="genre">${Genre}</h5>
            <div class="remove-watchlist">
            <img src="/images/minus-icon.png" alt="add-icon">
            <h5>Remove</h5>
            </div>
            </div>
            <p>${Plot}
            </p>
            </div>
            </div>
            `;
    }
    addRemove();
  }
  
}

function addRemove() {
  document.querySelectorAll(".hero").forEach((hero) => {
    //access current data of each div
    const currentMovieData = {
      Poster: hero.querySelector(".poster").src,
      Title: hero.querySelector(".title").innerText,
      imdbRating: hero.querySelector(".rating").innerText,
      Runtime: hero.querySelector(".time").innerText,
      Genre: hero.querySelector(".genre").innerText,
      Plot: hero.querySelector("p").innerText,
    };

    hero.querySelectorAll(".add-watchlist").forEach((addBtn) => {
      addBtn.addEventListener("click", () => {
        //.values() retrieves an array of values in localStorage
        //.some() tests if theres any element
        const alreadySaved = Object.values(localStorage).some((item) => {
            //.parse() turns each item into a JS object
          const savedMovie = JSON.parse(item);
          //checks if the Title matches to the savedMovie, if yes then not saving
          return savedMovie.Title === currentMovieData.Title;
        });
        if (!alreadySaved) {
          localStorage.setItem(
            Date.now().toString(),
            JSON.stringify(currentMovieData)
          );
        }
      });
    });

    hero.querySelectorAll(".remove-watchlist").forEach((removeBtn) => {
      removeBtn.addEventListener("click", () => {
        hero.remove();
        Object.keys(localStorage).forEach((key) => {
          const savedMovie = JSON.parse(localStorage[key]);

          if (savedMovie.Title === currentMovieData.Title) {
            //removing the item with the same Title (between JS obj and LocalStorage)
            localStorage.removeItem(key);
          }
        });
        if(Object.keys(localStorage).length === 0){
            document.getElementById('movies2').innerHTML = `
                <div class="start-exploring">
                <h2>Your watchlist is looking a little empty...</h2>
                <a href="./index.html">
                    <div id="add-movies">
                        <img src="/images/plus-icon.png" alt="add-icon">
                        <h3>Let's add some movies!</h3>
                    </div>
                </a>
            </div>
                `
        }
    });
    });
  });
}

//less than 3 days
//hardship: LocalStorage methods.