// Link The JQ File in the main JS File 
import * as jQuary from "./../librarys/jq/jquery-3.6.0.min.js"
// Link The BS File in the main JS File 
import * as bootStrap from "./../librarys/bootstrap/js/bootstrap.bundle.min.js"

// my Api 
//  to get all the movies (Now Playing) 
//https://api.themoviedb.org/3/movie/now_playing?api_key=2b0a688d1997764c4ce0bd9a2f2911c1&language=en-US&page=1
//  to get all the movies (popular) 
//https://api.themoviedb.org/3/movie/popular?api_key=2b0a688d1997764c4ce0bd9a2f2911c1&language=en-US&page=1
//  to get all the movies (top_rated) 
//https://api.themoviedb.org/3/movie/top_rated?api_key=2b0a688d1997764c4ce0bd9a2f2911c1&language=en-US&page=1
// to get all the movies (upcoming) 
//https://api.themoviedb.org/3/movie/upcoming?api_key=2b0a688d1997764c4ce0bd9a2f2911c1&language=en-US&page=1
//   to get all the movies (trending) 
//https://api.themoviedb.org/3/trending/movie/week?api_key=2b0a688d1997764c4ce0bd9a2f2911c1

// API Fitching
let apiOpject = {
    nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing?api_key=2b0a688d1997764c4ce0bd9a2f2911c1&language=en-US&page=1',
    popular: 'https://api.themoviedb.org/3/movie/popular?api_key=2b0a688d1997764c4ce0bd9a2f2911c1&language=en-US&page=1',
    topRated: 'https://api.themoviedb.org/3/movie/top_rated?api_key=2b0a688d1997764c4ce0bd9a2f2911c1&language=en-US&page=1',
    upcoming: 'https://api.themoviedb.org/3/movie/upcoming?api_key=2b0a688d1997764c4ce0bd9a2f2911c1&language=en-US&page=1',
    trending: 'https://api.themoviedb.org/3/trending/movie/week?api_key=2b0a688d1997764c4ce0bd9a2f2911c1'
}

var allMovies;

async function fetchMovieData(filter = apiOpject.nowPlaying) {
    let tempApi = await fetch(filter);
    let tempApijson = await tempApi.json();
    allMovies = tempApijson.results;
    showCards(allMovies);
}

$(document).ready(function(){
    fetchMovieData();

    $('aside').css('left',-$('#SideNavData').outerWidth());
    $('#navs a').fadeOut()
    $('#MenuBTN').click(function() {
        console.log(Number($('aside').offset().left).toFixed(3) + "     "  + -$('#SideNavData').outerWidth()  );
        if (Number($('aside').offset().left).toFixed(3) == -$('#SideNavData').outerWidth()) {
            $('aside').css('left',0);
        } else if (Number($('aside').offset().left).toFixed(3) != '0'){
            $('aside').css('left',-$('#SideNavData').outerWidth());
        }
    }
    )

    $('#navs a').not('#ContactUs').click(function() {
        if (this.id == 'Nowplaying'){
            fetchMovieData(apiOpject.nowPlaying);
        } else if (this.id == 'Popular') {
            fetchMovieData(apiOpject.popular);
        }else if (this.id == 'TopRated') {
            fetchMovieData(apiOpject.topRated);
        }else if (this.id == 'Upcoming') {
            fetchMovieData(apiOpject.upcoming);
        }else if (this.id == 'Trending') {
            fetchMovieData(apiOpject.trending);
        }
    })
});

// Cards function

function showCards(data) {
    let htmlString = "";

    for (const movie of data) {
        htmlString +=`<div class="col-md-4"><div class="cardStyle"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="w-100 h-100 img-fluid" alt=""><div class=""></div></div></div>`
    } 
    $('#cards #Content').html(htmlString);
}

/* <div class="col-md-4">
        <div class="cardStyle">
            <img src="" class="w-100 h-100 img-fluid" alt="">
                <div class="">
                </div>
        </div>
    </div> */
