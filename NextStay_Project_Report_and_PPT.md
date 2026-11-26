# 🎓 NextStay - College Mini Project Submission Kit
**Project Name:** NextStay - Student PG & Hostel Discovery Portal  
**Domain:** Web Development & Cloud Database  
**Team Size:** 3 Members  

---

## 📑 TABLE OF CONTENTS
1. [12-Slide PowerPoint (PPT) Presentation Outline](#1-12-slide-powerpoint-presentation-outline)
2. [Formal Project Report / Documentation Content](#2-formal-project-report--documentation)
3. [System Architecture & Database Schema](#3-system-architecture--database-schema)
4. [3-Member Role Card & Viva Quick-Answers](#4-3-member-role-card--viva-quick-answers)

---

## 1. 12-Slide PowerPoint Presentation Outline
*(Isko seedha PowerPoint ya Google Slides mein copy-paste karke slides bana lijiye)*

### Slide 1: Title Slide
* **Title:** NextStay – Student PG & Hostel Discovery Portal
* **Subtitle:** A Responsive Accommodation Search, Booking & Host Management Web Application
* **Department:** Department of Computer Science & Engineering / Information Technology
* **Team Members:**
  - Member 1: [Aapka Naam] (Roll No: _____) - *Team Lead & Backend/Auth*
  - Member 2: [Dost 1 ka Naam] (Roll No: _____) - *Frontend & UI/UX*
  - Member 3: [Dost 2 ka Naam] (Roll No: _____) - *Booking Engine & Admin Panel*
* **Project Guide / Supervisor:** Prof. [Teacher ka Naam]

### Slide 2: Problem Statement
* College students shifting to new cities face severe accommodation hurdles:
  - **High Brokerage Fees:** Middlemen charge 15-30 days of rent as unearned commission.
  - **Fake Listings & Hidden Costs:** Unverified photos, surprise electricity/maintenance bills.
  - **Safety & Curfew Ambiguity:** Lack of clear information on warden availability and curfew timings.
  - **No Easy Visit Scheduling:** Relying on endless phone calls rather than organized appointment slots.

### Slide 3: Proposed Solution - NextStay
* A dedicated portal tailored specifically for university students and interns:
  - **Zero Brokerage:** Direct link between students and verified property owners.
  - **Location-Centric Search:** Smart filters based on proximity to Colleges, Metro stations, and Markets.
  - **Transparent Information:** Upfront display of security deposit, occupancy rules, curfew, and amenities.
  - **1-Click Visit Scheduling:** Free on-site property visit booking with immediate host notification.

### Slide 4: System Architecture & Workflow
* **Frontend Layer:** HTML5, CSS3, ES6 JavaScript (Search, Filters, Booking Modal).
* **Controller Layer:** `data-store.js` manages state and sync between UI and storage.
* **Database Layer:** Supabase Cloud (PostgreSQL DB with Auth).
* **Resilience Layer:** Browser LocalStorage fallback for offline stability during presentations.
* **Host Layer:** Protected Admin Portal for property updates and lead approvals.

### Slide 5: Tech Stack & Tools
* **Frontend:**
  - Semantic HTML5 (Clean SEO-friendly DOM structure)
  - CSS3 (Custom Responsive Flexbox/Grid, Glassmorphism, CSS Variables)
  - Vanilla JavaScript (ES6+ Asynchronous Fetch, Event Delegation, DOM manipulation)
* **Backend & Database:**
  - **Supabase Cloud (PostgreSQL):** Relational schema, RESTful APIs, and Realtime sync.
  - **Supabase Auth:** Encrypted password hashing and session tokens.
* **Storage & Caching:**
  - **Browser LocalStorage API:** Client-side favorites and offline disaster recovery.
* **Version Control:**
  - Git & GitHub (`vishalvishwapbh-oss/nextstay`)

### Slide 6: Key Modules & Features
1. **Search & Multi-Filter Engine:**
   - Instant search by college, locality, or city.
   - Proximity pills: Near College, Near Metro, Near Market, Near Bus Terminal.
   - Dynamic sorting: Price (Low to High / High to Low), Top Rated.
2. **Interactive Property Details:**
   - Image gallery, amenities chips, curfew guidelines, security deposit info.
   - Direct Host Contact via WhatsApp and Telephone (`tel:`).
3. **Visit Scheduling System:**
   - Form with input validation (10-digit mobile number, future-date checks, morning/evening slots).
4. **Wishlist / Favorites:**
   - Instant heart toggle saving property references for quick comparison.

### Slide 7: Database Design (Schema)
* **Table 1: `pg_listings`**
  - `id` (Primary Key, Integer/UUID)
  - `name` (VARCHAR)
  - `location` (VARCHAR)
  - `category` (VARCHAR: college, metro, market, bus)
  - `gender` (VARCHAR: Boys, Girls, Unisex)
  - `rent` (NUMERIC)
  - `rating` (FLOAT)
  - `facilities` (TEXT / JSON Array)
  - `image_url` (TEXT)
  - `owner_name`, `owner_phone` (VARCHAR)
* **Table 2: `visit_requests`**
  - `id` (Primary Key, UUID)
  - `pg_id` (Foreign Key referencing `pg_listings.id`)
  - `visitor_name` (VARCHAR)
  - `visitor_phone` (VARCHAR)
  - `visit_date` (DATE)
  - `status` (VARCHAR: pending, approved, rejected)
  - `created_at` (TIMESTAMP)

### Slide 8: Security & Authentication
* **User Authentication:**
  - Secure email-password registration and validation using Supabase Auth.
  - Client-side input sanitization and password length enforcement (min 6 characters).
* **Role-Based Admin Protection:**
  - Dedicated Admin Portal with Master Admin UID validation (`d22e485f-9f3a-4d9d-bcbb-5a7cdca42708`).
  - Unauthorized users attempting dashboard access are automatically signed out and redirected.
* **Disaster Recovery (Dual-Store Pattern):**
  - Seamless fallback to local storage cache if network drops during viva/presentation.

### Slide 9: Admin Dashboard Capabilities
* **Live Analytics:** Real-time counters showing Total Accommodations, Active Inquiries, and Visit Leads.
* **Listings Management:** Full CRUD (Create, Read, Update, Delete) for property records.
* **Visit Request Workflow:**
  - Review student contact info, requested date, and PG name.
  - 1-Click Status Update: Mark visits as **Approved** or **Rejected**.

### Slide 10: Testing & Verification
* **Functional Testing:** Verified search indexing, category filters, and form regex checks.
* **Security Testing:** Verified that non-admin accounts cannot access `/admin-dashboard.html`.
* **Cross-Device Testing:** Tested responsive layouts across mobile viewport (375px), tablet (768px), and desktop (1440px).
* **Offline Resilience:** Tested simulated packet drops — UI seamlessly gracefully retains state.

### Slide 11: Future Scope & Roadmap
* **Online Token Payment:** Integration with Razorpay / Stripe for advance room reservation.
* **Roommate Matching Quiz:** Student compatibility matching based on study habits and preferences.
* **Interactive 360° Virtual Tours:** Immersive room views for outstation students.
* **Geo-Location Integration:** Google Maps API for real-time walking distance calculations.

### Slide 12: Conclusion & Q&A
* **Conclusion:** NextStay eliminates student housing exploitation by combining zero-brokerage listings, multi-filter discovery, and instant appointment booking into one accessible web application.
* **GitHub Repository:** `https://github.com/vishalvishwapbh-oss/nextstay`
* *Thank you! We welcome questions from the evaluation committee.*

---

## 2. Formal Project Report / Documentation

### Abstract
> In academic institutions across urban hubs, outstation students face challenges securing safe, affordable, and proximate accommodations. Traditional avenues rely heavily on commission-driven brokers, fragmented word-of-mouth recommendations, and unverifiable social media posts.  
> 
> **NextStay** is an end-to-end web portal designed to democratize student accommodation discovery. Built with modern web standards (HTML5, CSS3, ES6 JavaScript) and backed by a cloud-native database (Supabase PostgreSQL), the platform enables students to search accommodations by proximity tags, gender rules, and budget brackets. Accompanied by appointment scheduling, verified owner contact channels, and a secured host administration panel, NextStay presents an accessible, transparent, and resilient solution for student accommodation.

---

### Objectives
1. **Eliminate Middlemen:** Direct owner-to-student communication eliminating brokerage overheads.
2. **Proximity-First Discovery:** Categorize housing options by practical student anchors: Universities, Metro Stations, Markets, and Bus Terminals.
3. **Structured Visit Booking:** Streamlined scheduling form capturing contact details and preferred time slots.
4. **Host Control Panel:** Dedicated dashboard for accommodation owners to update pricing, add rooms, and manage booking pipelines.
5. **High Availability:** Implement a dual-layer data architecture ensuring the application functions flawlessly across poor campus Wi-Fi networks.

---

## 3. 3-Member Role Card & Viva Quick-Answers

### 👤 Member 1 (Team Lead - Backend, Auth & Architecture)
* **What you say:**
  > *"Maine NextStay ka architectural foundation, Supabase database integration aur secure Authentication build kiya hai. Maine do relational tables `pg_listings` aur `visit_requests` design ki hain aur `data-store.js` ke zariye dual-layer sync lagaya hai taaki cloud database unreachable hone par bhi local state intact rahe."*
* **Examiner cross-question you might get:**
  - *Q: "Password security kaise ensure hoti hai?"*  
    **Ans:** *"Supabase Auth internally industry-standard bcrypt hashing use karta hai, jisse database administrator bhi raw password nahi dekh sakta."*
  - *Q: "Admin page ko normal user se kaise protect kiya hai?"*  
    **Ans:** *"Admin portal par Role-Based Access Control (RBAC) hai jo logged-in user ke unique identifier ko hamare verified Master Admin UID se match karta hai; match na hone par user immediately redirect ho jata hai."*

---

### 👤 Member 2 (Frontend, Search Engine & User Experience)
* **What you say:**
  > *"Maine NextStay ka responsive User Interface, multi-tier search engine aur Favorites Wishlist system design kiya hai. Students location tags jaise Near College, Near Metro, Gender (Boys/Girls/Unisex) aur budget dropdowns se instant live search kar sakte hain bina page reload kiye."*
* **Examiner cross-question you might get:**
  - *Q: "Search filter bina server call kiye itna fast kaise chalte hain?"*  
    **Ans:** *"Hum JavaScript array filtering (`Array.prototype.filter`) client-side DOM par apply karte hain, jisse har filter click par server roundtrip ka delay nahi hota aur instant response milta hai."*
  - *Q: "Favorites page reload ke baad kaise bache rehte hain?"*  
    **Ans:** *"HTML5 LocalStorage API ka use karke property IDs store hoti hain, jo browser band hone par bhi persist karti hain."*

---

### 👤 Member 3 (PG Details, Booking Engine & Host Dashboard)
* **What you say:**
  > *"Maine detailed Accommodation view, interactive Visit Booking modal aur Host Administration Dashboard implement kiya hai. Student jab visit request form submit karta hai, toh validation ke baad request seedha database mein chali jaati hai aur Admin dashboard par live dikhti hai jahan host use Approve ya Reject kar sakta hai."*
* **Examiner cross-question you might get:**
  - *Q: "Form validation mein kya-kya checks lagaye hain?"*  
    **Ans:** *"Teen key validations hain: (1) 10-digit Indian mobile number regex check (`^[6-9]\d{9}$`), (2) Date validation jo past dates ko reject karti hai, aur (3) Mandatory field completion check."*
  - *Q: "Admin dashboard mein visit status kaise change hota hai?"*  
    **Ans:** *"Admin jab 'Approve' button dabata hai, toh record ka status field 'approved' update hota hai aur UI table asynchronously bina page refresh ke re-render ho jaati hai."*
