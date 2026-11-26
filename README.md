# 🏠 NextStay - Student PG & Hostel Discovery Portal

NextStay is a modern, responsive web application designed for students and working professionals to discover, filter, and schedule visits to verified PG accommodations near colleges, metro stations, and markets.

---

## 🚀 Key Improvements & Fixes Implemented

1. **Dual-Store Architecture (Supabase + Offline/Local Fallback)**:
   - Previously, if Supabase had network issues or empty tables, the application showed a blank screen or broke.
   - Now powered by `data-store.js`: tries Supabase first; if offline, unreachable, or empty, automatically loads rich verified PG listings and persists all user changes (favorites, new PGs, visit requests) seamlessly in `localStorage`.
   - Guaranteed **100% testable and presentable anytime, anywhere** (even without internet).

2. **Search & Multi-Filter Engine**:
   - Fixed duplicate click listener bug in search.
   - Added instant search on pressing **Enter** or live search.
   - **Location Pills**: All, Near College, Near Metro, Near Market, Near Bus Stand (with active button highlight).
   - **Gender Filter**: All Genders, Boys, Girls, Unisex.
   - **Budget Filter**: Any Budget, Under ₹6k, Under ₹9k, Under ₹12k.
   - **Sort Options**: Featured, Price: Low to High, Price: High to Low, Top Rated.
   - **Reset All Filters** button to clear all criteria in 1 click.

3. **PG Details Page (`pg-details.html`)**:
   - Fixed the critical bug where passing array index `?pg=0` would break if order changed; now securely routes by PG ID `?id=...`.
   - Rich accommodation view: Amenities chips, Occupancy rules, Deposit info, Curfew details.
   - **Interactive Visit Scheduling Modal**: date picker (validated for today or future dates), time slots (Morning, Afternoon, Evening), and 10-digit mobile validation.
   - **Contact Host Feature**: Direct Call (`tel:`) and one-click WhatsApp chat prefilled with property name.

4. **Favorites System**:
   - Save/Unsave stays with responsive heart icon toggle.
   - Real-time navbar badge count.
   - Dedicated "Saved Stays" section.

5. **Student Portal (`user-login.html`)**:
   - Seamless Login and Sign Up tab toggle.
   - **⚡ 1-Click Instant Demo Login**: Test user state with a single click.

6. **Admin Dashboard (`admin.html` & `admin-dashboard.html`)**:
   - Removed hardcoded UID lock that prevented admin login testing.
   - **⚡ 1-Click Instant Demo Admin Access** + default credentials (`admin@nextstay.com` / `admin123`).
   - Real-time KPI Stats: Total PGs, Total Inquiries, Pending Visits, Average Rent.
   - **Manage PG Listings**: Edit PG details with a sleek modal (no more awkward browser `prompt()`), or delete PGs.
   - **Add New PG**: Form with presets, categories, occupancy, and image selector.
   - **Manage Visit Requests**: Approve visit status, call visitor, or delete requests.
   - **🖨️ Print Summary**: Ready-made report generator for presentations.

---

## 🧪 How to Test

1. Open `index.html` directly in any web browser (Chrome, Edge, Firefox).
2. **Search & Filter**:
   - Type "Delhi" or "Metro" in search and press Enter.
   - Click "Near College" or "Girls Only" to test category and gender filters.
   - Click the heart icon on any card to test Favorites.
3. **View PG & Book a Visit**:
   - Click "View Details →" on any card.
   - Click "📅 Request a Visit", fill your details, and submit. You will see a green toast notification.
   - Click "📞 Contact Owner" to test Call & WhatsApp links.
4. **Admin Panel**:
   - Click "Admin Portal" in navbar or open `admin.html`.
   - Click "🛡️ 1-Click Instant Admin Access" (or enter `admin@nextstay.com` / `admin123`).
   - Check the **Visit Requests** tab to see the visit you just booked! Click **Approve**.
   - Go to **Add New Accommodation** tab to add a test PG, then see it appear on the homepage.
