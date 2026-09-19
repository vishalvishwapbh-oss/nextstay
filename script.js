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
        location: "Ghaziabad",
        rent: 7000,
        category: "college"
    },
    {
        name: "Student Home PG",
        location: "Noida",
        rent: 6500,
        category:"metro"
    },
    {
        name: "Green View PG",
        location: "Delhi",
        rent: 8000,
        category:"market"
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
// =========================
// POPULAR LOCATION FILTER
// =========================

function filterLocation(type) {
    const noResults = document.getElementById("noResults");

    pgCards.forEach(function(card, index) {

        const pg = pgData[index];

        if (pg.category === type) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
        if (type === "bus") {
    noResults.style.display = "block";
} else {
    noResults.style.display = "none";
}

    });

}
// =========================
// VIEW DETAILS
// =========================

const detailButtons = document.querySelectorAll(".details-btn");

detailButtons.forEach(function(button, index) {

    button.addEventListener("click", function() {

        const pg = pgData[index];

        document.getElementById("detailName").textContent = pg.name;
        document.getElementById("detailLocation").textContent = "📍 " + pg.location;
        document.getElementById("detailRent").textContent = "₹" + pg.rent + " / month";

        document.getElementById("detailFacilities").textContent =
            "Wi-Fi • Food • Laundry";

        document.getElementById("pgDetails").style.display = "block";

        document.getElementById("pgDetails").scrollIntoView({
            behavior: "smooth"
        });

    });

});
// =========================
// CLOSE PG DETAILS
// =========================

const closeDetails = document.getElementById("closeDetails");

closeDetails.addEventListener("click", function() {

    document.getElementById("pgDetails").style.display = "none";

});