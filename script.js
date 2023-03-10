let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 


var list_movies = {};
var inp = document.getElementById("searchbox");
var searchfunc = (searchtext)=>{

fetch(`https://www.omdbapi.com/?apikey=9f61efad&s=${searchtext}&page=1`).then(response =>{
    return response.json();
}).then(data =>{
  console.log(data);
    list_movies = data.Search;
   autocomplete(inp,list_movies); 
})
}

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].Title.substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].Title.substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i].Title + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
              });
          a.appendChild(b);
        }
      }
  );
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}


function movieinfo () {
    var title = inp.value;
 fetch(`https://www.omdbapi.com/?apikey=9f61efad&t=${title}`).then(response =>{
    return response.json();
}).then(data =>{
    console.log(data);
    document.getElementsByClassName("movieinfo")[0].style.display = 'flex';
    movierender(data);
})  
}


var movierender = (data) =>{
    document.getElementsByClassName("movie-title")[0].innerText = `${data.Title}`;
    document.getElementsByClassName("plot")[0].innerText = `${data.Plot}`;
    document.getElementsByClassName("rating")[0].innerText = `Rating:${data.imdbRating}`;
    document.getElementsByClassName("poster")[0].src = `${data.Poster}`
    document.getElementsByClassName("bookmarkicon")[0].style.display = '';

}
var back = () =>{
    document.getElementsByClassName("movieinfo")[0].style.display = 'none';
    document.getElementsByClassName("favourites")[0].style.display = 'none';
}

var buffer = JSON.parse(localStorage.getItem(favouriteslist));
if(buffer==null){
  var favouriteslist = [];
}
else{
  var favouriteslist = buffer;
}
var favourites = () =>{
  
   var title =  document.getElementsByClassName("movie-title")[0].innerText;
   var plot = document.getElementsByClassName("plot")[0].innerText;
   var poster =   document.getElementsByClassName("poster")[0].src

 
  var movie = {
    title: title,
    plot: plot,
    poster: poster
  }

  favouriteslist.push(movie);
  localStorage.setItem('favouriteslist',favouriteslist);
   console.log(favouriteslist);
   document.getElementsByClassName("bookmarkicon")[0].style.display = 'none';
   alert("movie added");
}

var renderfavourite = () =>{
  var elem = document.getElementsByClassName("favourites")[0];
  elem.style.display = "flex";
  for(var i=0;i<favouriteslist.length;i++)
  {
   var element = document.getElementsByClassName("moviecontainer")[0];
   element.innerHTML += 
    `
     <div class="movie">
                <img src="${favouriteslist[i].poster}" alt="" class="poster">
                <p class="title">${favouriteslist[i].title}</p>
                <i class="fa-solid fa-x" onclick="deleteitem(this)"></i>
            </div>

    `

  }
}
const deleteitem = (elem) =>{
  
  elem.parentElement.className= "hidden";
  const title = elem.parentElement.getElementsByClassName('title')[0].innerText;
  console.log(title);
  favouriteslist = favouriteslist.filter(function(item) {
    return item.title !== title;
})
}




