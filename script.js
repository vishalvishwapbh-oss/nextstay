// ==========================================
// NextStay - Client Script & Search Engine
// ==========================================

let allPGs = [];
let currentCategory = "all";
let currentGender = "all";
let currentBudget = "all";
let currentSort = "featured";
let currentSearch = "";

// Fallback image in case an image fails to load
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80";

// DOM Elements
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchBtn");
const pgContainer = document.getElementById("pgContainer");
const favoritesContainer = document.getElementById("favoritesContainer");
const noResults = document.getElementById("noResults");
const noFavorites = document.getElementById("noFavorites");
const resultsCount = document.getElementById("resultsCount");
const navFavCount = document.getElementById("navFavCount");
const categoryFilterGroup = document.getElementById("categoryFilterGroup");
const genderFilter = document.getElementById("genderFilter");
const budgetFilter = document.getElementById("budgetFilter");
const sortFilter = document.getElementById("sortFilter");
const resetAllFilters = document.getElementById("resetAllFilters");

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", async function() {
    await loadInitialData();
    setupEventListeners();
    updateFavoritesBadge();
});

async function loadInitialData() {
    if (pgContainer) {
        pgContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">
            <p style="font-size: 18px;">⏳ Loading verified PG listings...</p>
        </div>`;
    }

    try {
        allPGs = await DataStore.getAllPGs();
    } catch (e) {
        console.error("Error loading PGs:", e);
        allPGs = [];
    }

    applyFiltersAndRender();
    renderFavorites();
}

function updateFavoritesBadge() {
    const favs = DataStore.getFavorites();
    if (navFavCount) {
        navFavCount.textContent = favs.length;
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function setupEventListeners() {
    // Search Button Click
    if (searchButton && locationInput) {
        searchButton.addEventListener("click", () => {
            currentSearch = locationInput.value.trim().toLowerCase();
            applyFiltersAndRender();
            if (currentSearch) {
                document.querySelector(".pg-section")?.scrollIntoView({ behavior: "smooth" });
            }
        });

        // Search on Enter Key
        locationInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                currentSearch = locationInput.value.trim().toLowerCase();
                applyFiltersAndRender();
                document.querySelector(".pg-section")?.scrollIntoView({ behavior: "smooth" });
            }
        });

        // Search Live Debounced / on clearing
        locationInput.addEventListener("input", (e) => {
            if (e.target.value === "") {
                currentSearch = "";
                applyFiltersAndRender();
            }
        });
    }

    // Category Buttons
    if (categoryFilterGroup) {
        categoryFilterGroup.addEventListener("click", (e) => {
            const btn = e.target.closest(".filter-btn");
            if (!btn) return;

            categoryFilterGroup.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentCategory = btn.dataset.category || "all";
            applyFiltersAndRender();
        });
    }

    // Dropdown Filters
    genderFilter?.addEventListener("change", (e) => {
        currentGender = e.target.value;
        applyFiltersAndRender();
    });

    budgetFilter?.addEventListener("change", (e) => {
        currentBudget = e.target.value;
        applyFiltersAndRender();
    });

    sortFilter?.addEventListener("change", (e) => {
        currentSort = e.target.value;
        applyFiltersAndRender();
    });

    // Reset Filters Button
    resetAllFilters?.addEventListener("click", resetFilters);

    // Card Clicks (Event Delegation for Favorites & Details)
    pgContainer?.addEventListener("click", handleCardClick);
    favoritesContainer?.addEventListener("click", handleCardClick);
}

// Card Click Handler
function handleCardClick(event) {
    const card = event.target.closest(".pg-card");
    if (!card) return;
    const pgId = card.dataset.pgId;

    // Toggle Favorite Click
    if (event.target.closest(".favorite-btn")) {
        event.stopPropagation();
        const isNowFav = DataStore.toggleFavorite(pgId);
        showToast(
            isNowFav ? "Added to your favorites ❤️" : "Removed from favorites",
            isNowFav ? "success" : "info"
        );
        updateFavoritesBadge();
        applyFiltersAndRender();
        renderFavorites();
        return;
    }

    // View Details Click
    if (event.target.classList.contains("details-btn")) {
        event.stopPropagation();
        window.location.href = `pg-details.html?id=${pgId}`;
    }
}

// ==========================================
// FILTER & RENDER ENGINE
// ==========================================

function applyFiltersAndRender() {
    let filtered = [...allPGs];

    // 1. Text Search Filter (name, location, or facilities)
    if (currentSearch) {
        filtered = filtered.filter(pg => {
            const nameMatch = pg.name?.toLowerCase().includes(currentSearch);
            const locMatch = pg.location?.toLowerCase().includes(currentSearch);
            const facMatch = Array.isArray(pg.facilities) && pg.facilities.some(f => f.toLowerCase().includes(currentSearch));
            return nameMatch || locMatch || facMatch;
        });
    }

    // 2. Category Filter
    if (currentCategory !== "all") {
        filtered = filtered.filter(pg => {
            const cat = (pg.category || "").toLowerCase();
            return cat.includes(currentCategory.toLowerCase());
        });
    }

    // 3. Gender Filter
    if (currentGender !== "all") {
        filtered = filtered.filter(pg => {
            const g = (pg.gender || "Unisex").toLowerCase();
            return g === currentGender.toLowerCase();
        });
    }

    // 4. Budget Filter
    if (currentBudget !== "all") {
        const maxBudget = Number(currentBudget);
        filtered = filtered.filter(pg => Number(pg.rent) <= maxBudget);
    }

    // 5. Sorting
    if (currentSort === "price-asc") {
        filtered.sort((a, b) => Number(a.rent) - Number(b.rent));
    } else if (currentSort === "price-desc") {
        filtered.sort((a, b) => Number(b.rent) - Number(a.rent));
    } else if (currentSort === "rating") {
        filtered.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    }

    renderPGCards(filtered);
}

function renderPGCards(list) {
    if (!pgContainer) return;
    pgContainer.innerHTML = "";

    if (resultsCount) {
        resultsCount.textContent = list.length;
    }

    if (list.length === 0) {
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";

    list.forEach(pg => {
        const isFav = DataStore.isFavorite(pg.id);
        const card = createPGCardElement(pg, isFav);
        pgContainer.appendChild(card);
    });
}

function createPGCardElement(pg, isFavorite) {
    const card = document.createElement("div");
    card.className = "pg-card";
    card.dataset.pgId = pg.id;

    const genderBadgeClass = 
        pg.gender === "Boys" ? "badge-gender-boys" :
        pg.gender === "Girls" ? "badge-gender-girls" : "badge-gender-unisex";

    const genderIcon = 
        pg.gender === "Boys" ? "👦 Boys" :
        pg.gender === "Girls" ? "👧 Girls" : "👫 Unisex";

    const categoryText = 
        pg.category === "college" ? "🎓 College Nearby" :
        pg.category === "metro" ? "🚇 Metro Nearby" :
        pg.category === "market" ? "🛍️ Near Market" :
        pg.category === "bus" ? "🚌 Bus Terminal" : "📍 Convenient";

    const rating = pg.rating || "4.5";
    const imageUrl = pg.image_url || FALLBACK_IMAGE;

    card.innerHTML = `
        <div class="pg-image" style="background-image: url('${imageUrl}');">
            <div class="badge-stack">
                <span class="badge ${genderBadgeClass}">${genderIcon}</span>
                <span class="badge badge-category">${categoryText}</span>
            </div>

            <button class="favorite-btn ${isFavorite ? 'liked active' : ''}" title="${isFavorite ? 'Remove Favorite' : 'Save to Favorites'}">
                ${isFavorite ? '❤️' : '🤍'}
            </button>

            <div class="pg-image-meta">
                <span class="rating-pill">⭐ ${rating}</span>
                <span>${pg.sharing || 'Student Living'}</span>
            </div>
        </div>

        <div class="pg-info">
            <div class="pg-title">
                <h3>${pg.name}</h3>
            </div>

            <p class="location-text">📍 ${pg.location}</p>

            <div class="facilities">
                ${(pg.facilities || ["Wi-Fi", "Food", "AC"]).slice(0, 4).map(f => `<span>${f}</span>`).join("")}
                ${(pg.facilities && pg.facilities.length > 4) ? `<span>+${pg.facilities.length - 4} more</span>` : ''}
            </div>

            <div class="pg-bottom">
                <p>
                    <strong>₹${Number(pg.rent).toLocaleString("en-IN")}</strong>
                    <small>/ month</small>
                </p>
                <button class="details-btn">View Details →</button>
            </div>
        </div>
    `;

    return card;
}

// ==========================================
// FAVORITES SECTION RENDERER
// ==========================================

function renderFavorites() {
    if (!favoritesContainer || !noFavorites) return;

    favoritesContainer.innerHTML = "";
    const favIds = DataStore.getFavorites();

    const favoritePGs = allPGs.filter(pg => favIds.includes(String(pg.id)));

    if (favoritePGs.length === 0) {
        noFavorites.style.display = "block";
        return;
    }

    noFavorites.style.display = "none";

    favoritePGs.forEach(pg => {
        const card = createPGCardElement(pg, true);
        favoritesContainer.appendChild(card);
    });
}

// ==========================================
// RESET FILTERS HELPER
// ==========================================

function resetFilters() {
    currentCategory = "all";
    currentGender = "all";
    currentBudget = "all";
    currentSort = "featured";
    currentSearch = "";

    if (locationInput) locationInput.value = "";
    if (genderFilter) genderFilter.value = "all";
    if (budgetFilter) budgetFilter.value = "all";
    if (sortFilter) sortFilter.value = "featured";

    if (categoryFilterGroup) {
        categoryFilterGroup.querySelectorAll(".filter-btn").forEach(b => {
            b.classList.toggle("active", b.dataset.category === "all");
        });
    }

    applyFiltersAndRender();
    showToast("Filters reset to default", "info");
}

window.resetFilters = resetFilters;
