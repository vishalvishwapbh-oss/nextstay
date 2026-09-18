const locationInput = document.getElementById("location");
const searchButton = document.getElementById("searchBtn");

searchButton.addEventListener("click", function() {

    const location = locationInput.value;

    if (location === "") {
        alert("Please enter your location.");
        return;
    }

  

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

// =========================
// PG DATA FOR SEARCH
// =========================

const pgData = [
    {
        name: "Sunrise PG",
        location: "Near College",
        rent: 7000
    },
    {
        name: "Student Home PG",
        location: "City Center",
        rent: 6500
    },
    {
        name: "Green View PG",
        location: "Near Metro",
        rent: 8000
    }
];
// =========================
// PG CARDS
// =========================

const pgCards = document.querySelectorAll(".pg-card");


// =========================
// SEARCH INPUT
// =========================

const searchLocation = document.getElementById("location");

console.log(searchLocation.value);
searchButton.addEventListener("click", function() {

    const location = searchLocation.value.trim();
    if (location === "") {
    alert("Please enter a location.");
    return;
}
const results = pgData.filter(function(pg) {

    return pg.name.toLowerCase().includes(location.toLowerCase()) ||
       pg.location.toLowerCase().includes(location.toLowerCase());
});
pgCards.forEach(function(card, index) {

    const pg = pgData[index];

    const match =
        pg.name.toLowerCase().includes(location.toLowerCase()) ||
        pg.location.toLowerCase().includes(location.toLowerCase());

    if (match) {
        card.style.display = "block";
    } else {
        card.style.display = "none";
    }

});
if (results.length > 0) {

    document.querySelector(".pg-section").scrollIntoView({
        behavior: "smooth"
    });

}
if (results.length === 0) {
    alert("No PG found. Try another search.");
}
});