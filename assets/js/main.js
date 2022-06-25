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

// regax
// /^[a-zA-Z0-9]+$/ Name
// /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ Email
// /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ Phone
// /^[1-9][0-9]?$|^100$/ Age
// /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ PassWord

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
// Cards function

function showCards(data) {
    let htmlString = "";

    for (const movie of data) {
        htmlString += `<div class="col-md-4">
                            <div class="cardStyle">
                                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="w-100 h-100" alt="">
                                <div class="cardData d-flex justify-content-center align-items-center">
                                    <div class=" text-center fw-bold p-3">
                                        <h2 class="fs-2 fw-bolder">${movie.original_title}</h2>
                                        <p class="text-secondary">${movie.overview}</p>
                                        <p class="fw-bold">Rate: <span class="fw-normal">${movie.vote_average}</span></p>
                                        <p class="fw-bold">Release Date : <span class="fw-normal">${movie.release_date}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>`
    }
    $('#cards #Content').html(htmlString);
};

$(document).ready(function () {
    fetchMovieData();
    $('aside').css('left', -$('#SideNavData').outerWidth());
    $('#navs a').hide();

    $('#navs a').not('#gg').click(function () {
        if (this.id == 'Nowplaying') {
            fetchMovieData(apiOpject.nowPlaying);
        } else if (this.id == 'Popular') {
            fetchMovieData(apiOpject.popular);
        } else if (this.id == 'TopRated') {
            fetchMovieData(apiOpject.topRated);
        } else if (this.id == 'Upcoming') {
            fetchMovieData(apiOpject.upcoming);
        } else if (this.id == 'Trending') {
            fetchMovieData(apiOpject.trending);
        }
    });


    $('#MenuBTN').click(function () {
        console.log(Number($('aside').offset().left).toFixed(0) != Number(-$('#SideNavData').outerWidth()).toFixed(0));
        if (Number($('aside').offset().left).toFixed(0) == Number(-$('#SideNavData').outerWidth()).toFixed(0)) {
            $('aside').animate({ left: 0 },1000, function () {
                $('#navs a').slideDown(1000);
                $('#MenuBTN').addClass('fa-times');
            })

        } else if (Number($('aside').offset().left).toFixed(0) != Number(-$('#SideNavData').outerWidth()).toFixed(0)) {
            $('aside').animate({ left: -$('#SideNavData').outerWidth() },1000, function () {
                $('#navs a').fadeOut();
                $('#MenuBTN').removeClass('fa-times');
            })
        }
    }
    );

    $('input.contactInput').keyup(function () {
        checkValues(this);
    });

    $('#searchHere').keyup(function () {
        let filteredMovies = [];
        for (const movie of allMovies) {
            if (String(movie.original_title).toLowerCase().includes(document.getElementById('searchHere').value.toLowerCase())) {
                filteredMovies.push(movie);
            }
        }
        showCards(filteredMovies);
    });

    $('#searchApi').keyup(function(){
        let search= `https://api.themoviedb.org/3/search/movie?api_key=2b0a688d1997764c4ce0bd9a2f2911c1&language=en-US&query=${this.value}&page=1&include_adult=false`;
        if (this.value != "") {
            fetchMovieData(search);
        }else{
            fetchMovieData();
        }
    });
});

let rejax = {
    name: /^[a-zA-Z0-9]+$/,
    Email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    Age: /^[1-9][0-9]?$|^100$/,
    Phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    PassWord: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    Checked: {
        name: false,
        Email: false,
        Age: false,
        Phone: false,
        PassWord: false,
        rePassWord:false
    }
}
function checkValues(input) {
    if (input.id == "Name") {
        if (rejax.name.test(input.value)) {
            rejax.Checked.name = true;
            $('#alertName').addClass('d-none');
        }else{
            rejax.Checked.name = false;
            $('#alertName').removeClass('d-none');
        }
    } else if (input.id == "Email") {
        if (rejax.Email.test(input.value)) {
            rejax.Checked.Email = true;
            $('#alertEmail').addClass('d-none');
        }else{
            rejax.Checked.Email = false;
            $('#alertEmail').removeClass('d-none');
        }
    } else if (input.id == "Phone") {
        if (rejax.Phone.test(input.value)) {
            rejax.Checked.Phone = true;
            $('#alertPhone').addClass('d-none');
        }else{
            rejax.Checked.Phone = false;
            $('#alertPhone').removeClass('d-none');
        }
    } else if (input.id == "Age") {
        if (rejax.Age.test(input.value)) {
            rejax.Checked.Age = true;
            $('#alertAge').addClass('d-none');
        }else{
            rejax.Checked.Age = false;
            $('#alertAge').removeClass('d-none');
        }
    } else if (input.id == "Password") {
        if (rejax.PassWord.test(input.value)) {
            rejax.Checked.PassWord = true;
            $('#alertPassword').addClass('d-none');
        }else{
            rejax.Checked.PassWord = false;
            $('#alertPassword').removeClass('d-none');
        }
    } else if (input.id == "PasswordConferm") {
        if (document.getElementById('Password').value == input.value) {
            rejax.Checked.rePassWord = true;
            $('#alertrePassword').addClass('d-none');
        }else{
            rejax.Checked.rePassWord = false;
            $('#alertrePassword').removeClass('d-none');
        }
    }
    if (rejax.Checked.name == true && rejax.Checked.Email == true && rejax.Checked.Age == true && rejax.Checked.Phone == true && rejax.Checked.PassWord == true && rejax.Checked.rePassWord == true) {
        $('#submit').removeAttr('disabled');
    }
}