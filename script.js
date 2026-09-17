const locationInput = document.getElementById("location");
const searchButton = document.getElementById("searchBtn");

searchButton.addEventListener("click", function() {

    const location = locationInput.value;

    if (location === "") {
        alert("Please enter your location.");
        return;
    }

    alert("Searching PGs in " + location);

});
// =========================
// FAVORITES
// =========================
// =========================
// FAVORITES WITH LOCALSTORAGE
// =========================

const favoriteButtons = document.querySelectorAll(".favorite-btn");

favoriteButtons.forEach(function(button, index) {

    const savedFavorite = localStorage.getItem("favorite-" + index);

    if (savedFavorite === "true") {
        button.textContent = "♥";
    }

    button.addEventListener("click", function() {

        if (button.textContent.trim() === "♡") {

            button.textContent = "♥";

            localStorage.setItem("favorite-" + index, "true");

        } else {

            button.textContent = "♡";

            localStorage.setItem("favorite-" + index, "false");

        }

    });

});


