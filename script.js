var jokeList = $("#ul");
var Button = $("#button");
var modalButton = $("#aboutUs");
var saveButton = $("#saveBtn");
var saveButton2 = $("#saveBtn2");
const savedContent = $("#savedFavorites");

// var savedJokesArray = localStorage.getItem("jokes1 save")
//   ? localStorage.getItem("jokes1 save")
//   : [];

//click on save btn
// saved to local storage
//and display multiple saves to our favorites category.
//make saved favorites clickable items on the page for display later.

jokeOftheDay();
getSavedValue();
geekJokeofTheday();

function geekJokeofTheday() {
  const requestUrl = "https://geek-jokes.sameerkumar.website/api?format=json";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $("#geekJokeofDay").text(data.joke);
    });
}

function jokeOftheDay() {
  const requestUrl =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $("#jokeOfDay").text(data.joke);
    });
}

saveButton.on("click", function (e) {
  var new_joke = $("#jokeOfDay").text();
  // if there is nothing at the start then save a empty array
  if (localStorage.getItem("joke1 save") == null) {
    localStorage.setItem("joke1 save", "[]");
  }
  //get old joke and put it to the new data
  var old_joke = JSON.parse(localStorage.getItem("joke1 save"));
  old_joke.push(new_joke);
  // save the old + new joke to the local Storage.
  localStorage.setItem("joke1 save", JSON.stringify(old_joke));
  getSavedValue();
});

saveButton2.on("click", function (e) {
  var new_joke = $("#geekJokeofDay").text();
  // if there is nothing at the start then save a empty array
  if (localStorage.getItem("joke1 save") == null) {
    localStorage.setItem("joke1 save", "[]");
  }
  //get old joke and put it to the new data
  var old_joke = JSON.parse(localStorage.getItem("joke1 save"));
  old_joke.push(new_joke);
  // save the old + new joke to the local Storage.
  localStorage.setItem("joke1 save", JSON.stringify(old_joke));
  getSavedValue();
});

//get the saved value function - return the value of "v" from localStorage.
function getSavedValue(event) {
  var joke1 = JSON.parse(localStorage.getItem("joke1 save" || "[]"));
  if (localStorage.getItem("joke1 save") === null) {
    return;
  }
  joke1.forEach(function (saved) {
    savedContent.append($(`<li class="deleteSaves">${saved.slice(0, -4)}<br></br></li>`));
  });
}

modalButton.on("click", function (event) {
  $("#aboutUsModal").addClass("is-active");
});

$(".modal-close").on("click", function (e) {
  $("#aboutUsModal").removeClass("is-active");
});

$(".modal-background").on("click", function (e) {
  $("#aboutUsModal").removeClass("is-active");
});

var dropdown = document.querySelector(".dropdown");

//addEventListener - attaches an event handler to the specified element.

dropdown.addEventListener("click", function (event) {
  //event.stopPropagation() - it stops the bubbling of an event to parent elements, by preventing parent event handlers from being executed

  event.stopPropagation();

  //classList.toggle - it toggles between adding and removing a class name from an element
  dropdown.classList.toggle("is-active");
  var category = event.target.text;

  fetch(
    `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=10`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //itirate through joeks array creating li's and appending to jokesMain, with the joke text in li.
      data.jokes.forEach((e) => {
        $("#jokesMain").append(
          $(
            `<li class="jokeTextarea">${e.joke}<button class="jokeSaver">Save</button></li>`
          )
        );
      });
      $(".jokeSaver").on("click", function () {
        // new joke is being displayed  on parent ul as a li.
        var new_joke = $(this).parent().text();
        // if null then save a empty array
        if (localStorage.getItem("joke1 save") == null) {
          localStorage.setItem("joke1 save", "[]");
        }
        var old_joke = JSON.parse(localStorage.getItem("joke1 save"));
        old_joke.push(new_joke);
        localStorage.setItem("joke1 save", JSON.stringify(old_joke));

        getSavedValue();
      });
    });
});

saveButton.click(function () {
  saveButton.hide();
});
saveButton2.click(function () {
  saveButton2.hide();
});

$("#jokesMain").on("click", ".jokeSaver,.jokeTextarea", function () {
  $(this).hide();
});

