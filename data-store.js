// ==========================================
// NextStay - Central Data Store & Supabase Sync
// ==========================================

const SUPABASE_URL = "https://oiczndyhuzcsrpzoaunk.supabase.co";
const SUPABASE_KEY = "sb_publishable_zwImJd2xLY8y4E-m59JLGw_s4nEctEi";
const ADMIN_UID = "d22e485f-9f3a-4d9d-bcbb-5a7cdca42708";

let supabaseClient = null;
if (window.supabase && typeof window.supabase.createClient === "function") {
    try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } catch (e) {
        console.warn("Supabase initialization error:", e);
    }
}

// Initial Demo PG Data (Rich, realistic, high-quality images)
const INITIAL_PGS = [
    {
        id: 1,
        name: "Stanza Living - Cambridge House",
        location: "North Campus, Delhi",
        category: "college",
        gender: "Boys",
        rent: 9500,
        rating: 4.8,
        reviews_count: 24,
        sharing: "Single / Twin Sharing",
        deposit: "₹10,000",
        facilities: ["High-speed Wi-Fi", "3 Meals Included", "AC", "Laundry", "Daily Cleaning", "Biometric Security", "Gym"],
        image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
        owner_name: "Ramesh Sharma",
        owner_phone: "+91 98112 34567",
        description: "Premium student accommodation located just 5 minutes walk from Delhi University North Campus and Vishwavidyalaya Metro Station. Healthy home-cooked meals 3 times a day."
    },
    {
        id: 2,
        name: "Zolo Elite Luxury Residency",
        location: "Koramangala 5th Block, Bangalore",
        category: "college",
        gender: "Girls",
        rent: 11000,
        rating: 4.9,
        reviews_count: 38,
        sharing: "Single / Double Sharing",
        deposit: "₹15,000",
        facilities: ["High-speed Wi-Fi", "Air Conditioned", "Attached Washroom", "Food Included", "CCTV 24/7", "Power Backup", "Geyser"],
        image_url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
        owner_name: "Pooja Hegde",
        owner_phone: "+91 98450 12345",
        description: "Safe, secure, and luxury PG exclusively for girls near leading educational institutes and IT hubs. 24x7 security warden and biometric entry."
    },
    {
        id: 3,
        name: "Metro View Executive Stay",
        location: "Sector 62, Noida (Near Metro)",
        category: "metro",
        gender: "Unisex",
        rent: 7500,
        rating: 4.5,
        reviews_count: 19,
        sharing: "Double / Triple Sharing",
        deposit: "₹8,000",
        facilities: ["Wi-Fi", "AC", "RO Water", "Power Backup", "Refrigerator", "Housekeeping", "Balcony"],
        image_url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        owner_name: "Amit Verma",
        owner_phone: "+91 99100 88776",
        description: "Situated right next to the Blue Line Metro Station. Ideal for college students and working interns with modern amenities and quick transport."
    },
    {
        id: 4,
        name: "Green Valley Scholar PG",
        location: "Kothrud, Pune (Near MIT)",
        category: "college",
        gender: "Boys",
        rent: 6500,
        rating: 4.6,
        reviews_count: 15,
        sharing: "Twin / Triple Sharing",
        deposit: "₹7,000",
        facilities: ["Wi-Fi", "Pure Veg Meals", "Study Tables", "Hot Water", "Bike Parking", "Water Purifier"],
        image_url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        owner_name: "Sanjay Patil",
        owner_phone: "+91 94220 54321",
        description: "Quiet and disciplined student PG just 300 meters from MIT World Peace University. Individual study desks and ergonomic study chairs provided."
    },
    {
        id: 5,
        name: "City Central Market Stay",
        location: "Connaught Place, Central Market, Delhi",
        category: "market",
        gender: "Unisex",
        rent: 13500,
        rating: 4.7,
        reviews_count: 31,
        sharing: "Single Private Room",
        deposit: "₹15,000",
        facilities: ["High-speed Wi-Fi", "AC", "Gym Access", "Laundry", "Kitchen Access", "Smart TV", "Elevator"],
        image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        owner_name: "Vikas Mehra",
        owner_phone: "+91 98711 22334",
        description: "Live right where the action is! 2 minutes from markets, multi-cuisine cafes, bookstores, and central transport hubs."
    },
    {
        id: 6,
        name: "Central Bus Stand Residency",
        location: "Majestic, Gandhinagar, Bangalore",
        category: "bus",
        gender: "Boys",
        rent: 5500,
        rating: 4.3,
        reviews_count: 12,
        sharing: "Triple / Quad Sharing",
        deposit: "₹5,000",
        facilities: ["Wi-Fi", "24/7 Water", "Security", "Individual Lockers", "Mess Facility"],
        image_url: "https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=800&q=80",
        owner_name: "Naveen Kumar",
        owner_phone: "+91 97312 34987",
        description: "Budget-friendly accommodation located adjacent to the inter-state bus terminus and rail station. Pocket-friendly option for students."
    },
    {
        id: 7,
        name: "Sai Lotus Girls Haven",
        location: "Viman Nagar, Pune (Near Symbiosis)",
        category: "college",
        gender: "Girls",
        rent: 8500,
        rating: 4.8,
        reviews_count: 27,
        sharing: "Twin Sharing",
        deposit: "₹9,000",
        facilities: ["Wi-Fi", "Delicious Homestyle Food", "AC", "Washing Machine", "Security Guard", "CCTV", "Study Lounge"],
        image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        owner_name: "Sunita Deshmukh",
        owner_phone: "+91 98230 45678",
        description: "A warm and homely environment for female college students. Nutritious food served 3 times daily and caring resident warden."
    },
    {
        id: 8,
        name: "Royal Co-Living & Metro Suites",
        location: "Sector 29, Gurgaon (Near Metro)",
        category: "metro",
        gender: "Unisex",
        rent: 14000,
        rating: 4.9,
        reviews_count: 45,
        sharing: "Single / Twin Sharing",
        deposit: "₹18,000",
        facilities: ["Ultra-fast Wi-Fi", "Fully Furnished", "AC", "Power Backup 24/7", "Gaming Area", "Housekeeping", "Terrace Garden"],
        image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        owner_name: "Rajiv Kapoor",
        owner_phone: "+91 99990 11223",
        description: "Designer co-living residence with rooftop lounge, co-working desks, and high-speed fiber internet. 3 minutes from Huda City Centre metro."
    }
];

// Initial Demo Visit Requests
const INITIAL_VISITS = [
    {
        id: 101,
        pg_id: 1,
        pg_name: "Stanza Living - Cambridge House",
        visitor_name: "Aman Sharma",
        visitor_phone: "9876543210",
        visitor_email: "aman@example.com",
        visit_date: "2026-12-01",
        time_slot: "Morning (10 AM - 1 PM)",
        status: "Pending",
        created_at: new Date().toISOString()
    },
    {
        id: 102,
        pg_id: 2,
        pg_name: "Zolo Elite Luxury Residency",
        visitor_name: "Sneha Patel",
        visitor_phone: "9123456780",
        visitor_email: "sneha@example.com",
        visit_date: "2026-12-02",
        time_slot: "Evening (5 PM - 8 PM)",
        status: "Approved",
        created_at: new Date().toISOString()
    }
];

// LocalStorage Keys
const KEYS = {
    PGS: "nextstay_pg_listings",
    VISITS: "nextstay_visit_requests",
    USER: "nextstay_current_user",
    FAVORITES: "nextstay_favorites"
};

// ==========================================
// DATA STORE METHODS
// ==========================================

const DataStore = {
    // Check if Supabase is active and responding
    isSupabaseAvailable() {
        return Boolean(supabaseClient);
    },

    // Fetch all PGs (Tries Supabase first with fallback)
    async getAllPGs() {
        // First check localStorage
        let localData = null;
        try {
            const raw = localStorage.getItem(KEYS.PGS);
            if (raw) localData = JSON.parse(raw);
        } catch (e) {
            console.error("Local data read error:", e);
        }

        if (!localData || !Array.isArray(localData) || localData.length === 0) {
            localData = INITIAL_PGS;
            localStorage.setItem(KEYS.PGS, JSON.stringify(INITIAL_PGS));
        }

        // Try Supabase in background or if online
        if (supabaseClient) {
            try {
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Supabase timeout")), 3000)
                );
                const fetchPromise = supabaseClient.from("pg_listings").select("*").order("id");

                const result = await Promise.race([fetchPromise, timeoutPromise]);
                if (result && !result.error && result.data && result.data.length > 0) {
                    // Enrich Supabase records with smart defaults
                    const merged = result.data.map((item, idx) => {
                        const fallback = INITIAL_PGS[idx % INITIAL_PGS.length];
                        
                        // Smart Gender Detection
                        let itemGender = item.gender;
                        if (!itemGender) {
                            const nameLower = (item.name || "").toLowerCase();
                            if (nameLower.includes("boy") || nameLower.includes("boys")) {
                                itemGender = "Boys";
                            } else if (nameLower.includes("girl") || nameLower.includes("girls")) {
                                itemGender = "Girls";
                            } else {
                                itemGender = fallback.gender || "Unisex";
                            }
                        }

                        // Smart Clean Facilities
                        let facilitiesList = [];
                        if (Array.isArray(item.facilities)) {
                            facilitiesList = item.facilities;
                        } else if (typeof item.facilities === "string") {
                            facilitiesList = item.facilities.split(",").map(f => f.trim()).filter(Boolean);
                        } else {
                            facilitiesList = fallback.facilities;
                        }
                        // Capitalize facility words (e.g. "food" -> "Food", "wi-fi" -> "Wi-Fi")
                        facilitiesList = facilitiesList.map(f => {
                            if (f.toLowerCase() === "wifi" || f.toLowerCase() === "wi-fi") return "Wi-Fi";
                            if (f.toLowerCase() === "ac") return "AC";
                            return f.charAt(0).toUpperCase() + f.slice(1);
                        });

                        // Smart Realistic Description matching location
                        let itemDesc = item.description;
                        if (!itemDesc || itemDesc === fallback.description) {
                            if (item.location && !item.location.toLowerCase().includes("delhi")) {
                                itemDesc = `Comfortable, fully-furnished and verified student accommodation in ${item.location}. Features high-speed Wi-Fi, clean surroundings, regular housekeeping, and seamless transport connectivity.`;
                            } else {
                                itemDesc = fallback.description;
                            }
                        }

                        // Clean realistic title if "Test"
                        let cleanName = item.name || fallback.name;
                        if (cleanName.toLowerCase().startsWith("test ")) {
                            cleanName = cleanName.replace(/^[Tt]est\s+/, "Premier ");
                        }

                        return {
                            ...fallback,
                            ...item,
                            name: cleanName,
                            gender: itemGender,
                            facilities: facilitiesList,
                            description: itemDesc,
                            rating: item.rating || fallback.rating || 4.6
                        };
                    });
                    localStorage.setItem(KEYS.PGS, JSON.stringify(merged));
                    return merged;
                }
            } catch (err) {
                console.log("Using cached/local PG listings (Supabase offline/timed out).");
            }
        }

        return localData;
    },

    // Get PG by ID
    async getPGById(id) {
        const all = await this.getAllPGs();
        return all.find(p => String(p.id) === String(id)) || null;
    },

    // Add New PG
    async addPG(pg) {
        const all = await this.getAllPGs();
        const newPG = {
            id: Date.now(),
            rating: 4.5,
            reviews_count: 1,
            ...pg
        };

        all.unshift(newPG);
        localStorage.setItem(KEYS.PGS, JSON.stringify(all));

        // Sync with Supabase if possible
        if (supabaseClient) {
            try {
                await supabaseClient.from("pg_listings").insert([{
                    name: newPG.name,
                    location: newPG.location,
                    rent: Number(newPG.rent),
                    category: newPG.category,
                    facilities: newPG.facilities,
                    image_url: newPG.image_url
                }]);
            } catch (e) {
                console.warn("Supabase insert skipped, saved locally.", e);
            }
        }

        return newPG;
    },

    // Update PG
    async updatePG(id, updatedFields) {
        const all = await this.getAllPGs();
        const index = all.findIndex(p => String(p.id) === String(id));
        if (index === -1) return null;

        all[index] = { ...all[index], ...updatedFields };
        localStorage.setItem(KEYS.PGS, JSON.stringify(all));

        if (supabaseClient) {
            try {
                await supabaseClient.from("pg_listings")
                    .update({
                        name: all[index].name,
                        location: all[index].location,
                        rent: Number(all[index].rent),
                        category: all[index].category,
                        facilities: all[index].facilities,
                        image_url: all[index].image_url
                    })
                    .eq("id", id);
            } catch (e) {
                console.warn("Supabase update skipped, updated locally.");
            }
        }

        return all[index];
    },

    // Delete PG
    async deletePG(id) {
        const all = await this.getAllPGs();
        const filtered = all.filter(p => String(p.id) !== String(id));
        localStorage.setItem(KEYS.PGS, JSON.stringify(filtered));

        if (supabaseClient) {
            try {
                await supabaseClient.from("pg_listings").delete().eq("id", id);
            } catch (e) {
                console.warn("Supabase delete skipped, deleted locally.");
            }
        }

        return true;
    },

    // Get Visit Requests
    async getVisitRequests() {
        let localVisits = null;
        try {
            const raw = localStorage.getItem(KEYS.VISITS);
            if (raw) localVisits = JSON.parse(raw);
        } catch (e) {}

        if (!localVisits || !Array.isArray(localVisits)) {
            localVisits = INITIAL_VISITS;
            localStorage.setItem(KEYS.VISITS, JSON.stringify(INITIAL_VISITS));
        }

        let deletedIds = [];
        let statusOverrides = {};
        try {
            deletedIds = JSON.parse(localStorage.getItem("nextstay_deleted_visits") || "[]").map(String);
            statusOverrides = JSON.parse(localStorage.getItem("nextstay_visit_statuses") || "{}");
        } catch (e) {}

        if (supabaseClient) {
            try {
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Supabase timeout")), 3000)
                );
                const fetchPromise = supabaseClient
                    .from("visit_requests")
                    .select("*, pg_listings(name)")
                    .order("created_at", { ascending: false });

                const res = await Promise.race([fetchPromise, timeoutPromise]);
                if (res && !res.error && Array.isArray(res.data)) {
                    const mapped = res.data
                        .filter(item => !deletedIds.includes(String(item.id)))
                        .map(item => ({
                            id: item.id,
                            pg_id: item.pg_id,
                            pg_name: item.pg_listings?.name || "NextStay PG",
                            visitor_name: item.visitor_name,
                            visitor_phone: item.visitor_phone,
                            visit_date: item.visit_date,
                            time_slot: item.time_slot || "",
                            status: statusOverrides[String(item.id)] || item.status || "Pending",
                            created_at: item.created_at,
                            fromSupabase: true
                        }));
                    // Merge only genuine local/demo visits (drop stale cached Supabase rows)
                    const combined = [...mapped];
                    localVisits.forEach(lv => {
                        const numId = Number(lv.id);
                        const isGenuineLocal = !lv.fromSupabase && (numId === 101 || numId === 102 || numId >= 1700000000000);
                        if (isGenuineLocal && !deletedIds.includes(String(lv.id)) && !combined.some(c => String(c.id) === String(lv.id))) {
                            combined.push({
                                ...lv,
                                status: statusOverrides[String(lv.id)] || lv.status || "Pending"
                            });
                        }
                    });
                    localStorage.setItem(KEYS.VISITS, JSON.stringify(combined));
                    return combined;
                }
            } catch (e) {
                console.log("Using local visit requests.");
            }
        }

        return localVisits
            .filter(lv => !deletedIds.includes(String(lv.id)))
            .map(lv => ({
                ...lv,
                status: statusOverrides[String(lv.id)] || lv.status || "Pending"
            }));
    },

    // Add Visit Request
    async addVisitRequest(req) {
        let savedInSupabase = false;
        let supabaseRow = null;

        if (supabaseClient) {
            try {
                const res = await supabaseClient
                    .from("visit_requests")
                    .insert([{
                        pg_id: Number(req.pg_id) || 1,
                        visitor_name: req.visitor_name,
                        visitor_phone: req.visitor_phone,
                        visit_date: req.visit_date
                    }])
                    .select();
                if (res && !res.error) {
                    savedInSupabase = true;
                    if (res.data && res.data[0]) {
                        supabaseRow = res.data[0];
                    }
                }
            } catch (e) {
                console.warn("Supabase visit insert skipped, saving locally.");
            }
        }

        if (savedInSupabase) {
            return supabaseRow || { id: Date.now(), status: "Pending", created_at: new Date().toISOString(), ...req };
        }

        // Offline / fallback: save locally only if Supabase failed
        const visits = await this.getVisitRequests();
        const newReq = {
            id: Date.now(),
            status: "Pending",
            created_at: new Date().toISOString(),
            ...req
        };
        visits.unshift(newReq);
        localStorage.setItem(KEYS.VISITS, JSON.stringify(visits));
        return newReq;
    },

    // Update Visit Request Status
    async updateVisitStatus(id, newStatus) {
        const idStr = String(id);
        try {
            const statusOverrides = JSON.parse(localStorage.getItem("nextstay_visit_statuses") || "{}");
            statusOverrides[idStr] = newStatus;
            localStorage.setItem("nextstay_visit_statuses", JSON.stringify(statusOverrides));
        } catch (e) {}

        try {
            const raw = localStorage.getItem(KEYS.VISITS);
            if (raw) {
                const visits = JSON.parse(raw);
                const item = visits.find(v => String(v.id) === idStr);
                if (item) {
                    item.status = newStatus;
                    localStorage.setItem(KEYS.VISITS, JSON.stringify(visits));
                }
            }
        } catch (e) {}

        if (supabaseClient) {
            try {
                await supabaseClient
                    .from("visit_requests")
                    .update({ status: newStatus })
                    .eq("id", id);
            } catch (e) {
                console.warn("Supabase visit status update skipped, saved locally.");
            }
        }

        return true;
    },

    // Delete Visit Request
    async deleteVisitRequest(id) {
        const idStr = String(id);
        try {
            const deletedIds = JSON.parse(localStorage.getItem("nextstay_deleted_visits") || "[]").map(String);
            if (!deletedIds.includes(idStr)) {
                deletedIds.push(idStr);
                localStorage.setItem("nextstay_deleted_visits", JSON.stringify(deletedIds));
            }
        } catch (e) {}

        try {
            const raw = localStorage.getItem(KEYS.VISITS);
            if (raw) {
                const visits = JSON.parse(raw);
                const filtered = visits.filter(v => String(v.id) !== idStr);
                localStorage.setItem(KEYS.VISITS, JSON.stringify(filtered));
            }
        } catch (e) {}

        if (supabaseClient) {
            try {
                await supabaseClient
                    .from("visit_requests")
                    .delete()
                    .eq("id", id);
            } catch (e) {
                console.warn("Supabase visit delete skipped, deleted locally.");
            }
        }

        return true;
    },

    // Favorites Management
    getFavorites() {
        try {
            const raw = localStorage.getItem(KEYS.FAVORITES);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    },

    isFavorite(pgId) {
        const favs = this.getFavorites();
        return favs.includes(String(pgId));
    },

    toggleFavorite(pgId) {
        let favs = this.getFavorites();
        const idStr = String(pgId);
        if (favs.includes(idStr)) {
            favs = favs.filter(id => id !== idStr);
            localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favs));
            // Keep legacy favorite-ID key in sync for backwards compatibility
            localStorage.setItem("favorite-" + idStr, "false");
            return false;
        } else {
            favs.push(idStr);
            localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favs));
            localStorage.setItem("favorite-" + idStr, "true");
            return true;
        }
    },

    // User Authentication State
    getCurrentUser() {
        try {
            const raw = localStorage.getItem(KEYS.USER);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    },

    setCurrentUser(user) {
        if (!user) {
            localStorage.removeItem(KEYS.USER);
        } else {
            localStorage.setItem(KEYS.USER, JSON.stringify(user));
        }
    },

    logout() {
        localStorage.removeItem(KEYS.USER);
        if (supabaseClient) {
            try {
                supabaseClient.auth.signOut();
            } catch (e) {}
        }
    }
};

// ==========================================
// GLOBAL TOAST NOTIFICATION UTILITY
// ==========================================

function showToast(message, type = "success", duration = 3500) {
    let container = document.getElementById("nextstay-toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "nextstay-toast-container";
        container.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 99999;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `nextstay-toast toast-${type}`;

    const icon = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";
    const bgColor = type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#4f46e5";

    toast.style.cssText = `
        background: ${bgColor};
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        pointer-events: auto;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    // Fade out and remove
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(15px)";
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ==========================================
// NAVBAR RENDERER & ACTIVE SESSION HELPER
// ==========================================

function updateNavbarSession() {
    const user = DataStore.getCurrentUser();
    const nav = document.querySelector(".navbar nav");
    if (!nav) return;

    const favCount = DataStore.getFavorites().length;

    // Update Favorites link text with badge
    const favLink = nav.querySelector("a[href*='favorites']");
    if (favLink) {
        favLink.innerHTML = `Favorites <span class="nav-fav-badge" id="navFavCount">${favCount}</span>`;
    }

    // Check if user is logged in
    const loginLink = nav.querySelector("a[href*='login.html']");
    const adminLink = nav.querySelector("a[href*='admin.html']");

    if (user) {
        if (loginLink) {
            loginLink.innerHTML = `👤 ${user.role === 'admin' ? 'Admin' : (user.name || user.email.split('@')[0])}`;
            loginLink.href = user.role === 'admin' ? "admin-dashboard.html" : "#profile";
            loginLink.title = user.email;
        }

        // Add or ensure logout button exists
        let logoutBtn = nav.querySelector(".nav-logout-btn");
        if (!logoutBtn) {
            logoutBtn = document.createElement("a");
            logoutBtn.href = "#";
            logoutBtn.className = "nav-logout-btn";
            logoutBtn.textContent = "Logout";
            logoutBtn.onclick = (e) => {
                e.preventDefault();
                DataStore.logout();
                showToast("Logged out successfully!", "info");
                setTimeout(() => window.location.reload(), 600);
            };
            nav.appendChild(logoutBtn);
        }
    }
}

// Auto-run when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    updateNavbarSession();
});

// Expose on window
window.DataStore = DataStore;
window.showToast = showToast;
window.updateNavbarSession = updateNavbarSession;
