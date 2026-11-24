// SUPABASE CONNECTION

const SUPABASE_URL = "https://oiczndyhuzcsrpzoaunk.supabase.co ";
const SUPABASE_KEY = "sb_publishable_zwImJd2xLY8y4E-m59JLGw_s4nEctEi";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase connected!");
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
 // FAVORITES WITH LOCALSTORAGE
 // =========================

document.getElementById("pgContainer").addEventListener("click", function(event) {

    if (event.target.classList.contains("favorite-btn")) {

        const button = event.target;
        const card = button.closest(".pg-card");
        const pgId = card.dataset.pgId;

        const savedFavorite = localStorage.getItem("favorite-" + pgId);

        if (savedFavorite === "true") {

            button.textContent = "♡";
            localStorage.setItem("favorite-" + pgId, "false");

        } else {

            button.textContent = "♥";
            localStorage.setItem("favorite-" + pgId, "true");

        }
    }
});

// PG DATA FROM SUPABASE
let pgData = [];

function renderPGCards() {
    const pgContainer = document.getElementById("pgContainer");

    pgContainer.innerHTML = "";

    pgData.forEach(function(pg, index) {
        const card = document.createElement("div");
        card.className = "pg-card";

        card.innerHTML = `
            <div class="pg-image"
                 style="background-image: url('${pg.image_url}');
                        background-size: cover;
                        background-position: center;">
                <button class="favorite-btn">♡</button>
            </div>

            <div class="pg-info">
                <div class="pg-title">
                    <h3>${pg.name}</h3>
                </div>

                <p class="location-text">📍 ${pg.location}</p>

                <div class="facilities">
                    ${pg.facilities.map(function(item) {
                        return `<span>${item}</span>`;
                    }).join("")}
                </div>

                <div class="pg-bottom">
                    <p><strong>₹${pg.rent.toLocaleString("en-IN")}</strong>
                    <small>/ month</small></p>

                    <button class="details-btn">View Details</button>
                </div>
            </div>
        `;
         const savedFavorite = localStorage.getItem("favorite-" + pg.id);

            if (savedFavorite === "true") {
                card.querySelector(".favorite-btn").textContent = "♥";
            }
        card.dataset.pgId = pg.id;
        pgContainer.appendChild(card);
    });
}

async function loadPGData() {
    const { data, error } = await supabaseClient
        .from("pg_listings")
        .select("*")
        .order("id");

    if (error) {
        console.log("PG Loading Error:", error);
        return;
    }

    pgData = data;
    renderPGCards();

    console.log("PG Data Loaded:", pgData);
}

loadPGData();
// =========================
// PG CARDS
// =========================

const pgCards = document.querySelectorAll(".pg-card");


// =========================
 // SEARCH INPUT
 // =========================

const searchLocation = document.getElementById("location");

searchButton.addEventListener("click", function() {

    const location = searchLocation.value.trim().toLowerCase();

    if (location === "") {
        alert("Please enter a location.");
        return;
    }

    const cards = document.querySelectorAll(".pg-card");
    let found = 0;

    cards.forEach(function(card) {

        const pg = pgData.find(function(item) {
            return String(item.id) === card.dataset.pgId;
        });

        const match = pg &&
            (pg.name.toLowerCase().includes(location) ||
             pg.location.toLowerCase().includes(location));

        card.style.display = match ? "block" : "none";

        if (match) found++;
    });

    document.getElementById("noResults").style.display =
        found === 0 ? "block" : "none";

    if (found > 0) {
        document.querySelector(".pg-section").scrollIntoView({
            behavior: "smooth"
        });
    } else {
        alert("No PG found. Try another search.");
    }
});


// =========================
// POPULAR LOCATION FILTER
// =========================

function filterLocation(type) {

    const cards = document.querySelectorAll(".pg-card");
    let found = 0;

    cards.forEach(function(card) {

        const pg = pgData.find(function(item) {
            return String(item.id) === card.dataset.pgId;
        });

        const match = pg && pg.category === type;

        card.style.display = match ? "block" : "none";

        if (match) found++;
    });

    document.getElementById("noResults").style.display =
        found === 0 ? "block" : "none";
}


// =========================
// VIEW DETAILS
// =========================

document.getElementById("pgContainer").addEventListener("click", function(event) {

    if (event.target.classList.contains("details-btn")) {

        const card = event.target.closest(".pg-card");

        const pgIndex = pgData.findIndex(function(pg) {
            return String(pg.id) === card.dataset.pgId;
        });

        if (pgIndex !== -1) {
            window.location.href = "pg-details.html?pg=" + pgIndex;
        }
    }
});
// =========================
// CLOSE PG DETAILS
// =========================

const closeDetails = document.getElementById("closeDetails");

closeDetails.addEventListener("click", function() {

    document.getElementById("pgDetails").style.display = "none";

});