// ==========================================
// NextStay - User Authentication Handler
// ==========================================

let isSignUpMode = false;

const authHeading = document.getElementById("authHeading");
const authSub = document.getElementById("authSub");
const nameGroup = document.getElementById("nameGroup");
const userNameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("userEmail");
const userPasswordInput = document.getElementById("userPassword");
const userAuthBtn = document.getElementById("userAuthBtn");
const toggleAuthLink = document.getElementById("toggleAuthLink");
const toggleAuthText = document.getElementById("toggleAuthText");
const quickDemoUserBtn = document.getElementById("quickDemoUserBtn");

document.addEventListener("DOMContentLoaded", () => {
    // Mode toggle
    toggleAuthLink.addEventListener("click", (e) => {
        e.preventDefault();
        isSignUpMode = !isSignUpMode;

        if (isSignUpMode) {
            authHeading.textContent = "Create Student Account";
            authSub.textContent = "Sign up to explore and bookmark favorite PGs.";
            nameGroup.style.display = "block";
            userAuthBtn.textContent = "Create Account";
            toggleAuthText.innerHTML = `Already have an account? <a href="#" id="toggleAuthLink" style="color: var(--primary); font-weight: 700;">Login</a>`;
        } else {
            authHeading.textContent = "Student Login";
            authSub.textContent = "Sign in to manage your favorites and bookings.";
            nameGroup.style.display = "none";
            userAuthBtn.textContent = "Login to NextStay";
            toggleAuthText.innerHTML = `Don't have an account? <a href="#" id="toggleAuthLink" style="color: var(--primary); font-weight: 700;">Create Account</a>`;
        }

        // Re-attach listener to dynamic link
        document.getElementById("toggleAuthLink").addEventListener("click", (ev) => {
            ev.preventDefault();
            toggleAuthLink.click();
        });
    });

    // Quick Demo Login Button
    quickDemoUserBtn.addEventListener("click", () => {
        const demoUser = {
            id: "demo-user-123",
            email: "student.demo@nextstay.com",
            name: "Rahul Verma (Student)",
            phone: "9876543210",
            role: "student"
        };
        DataStore.setCurrentUser(demoUser);
        showToast("Logged in as Demo Student!", "success");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 800);
    });

    // Form Submission
    document.getElementById("authForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = userEmailInput.value.trim();
        const password = userPasswordInput.value;
        const name = userNameInput.value.trim();

        if (!email || !password) {
            showToast("Please enter email and password.", "error");
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters.", "error");
            return;
        }

        userAuthBtn.disabled = true;
        userAuthBtn.textContent = isSignUpMode ? "Creating Account..." : "Logging in...";

        // Try Supabase auth if client is active
        if (supabaseClient) {
            try {
                if (isSignUpMode) {
                    const { data, error } = await supabaseClient.auth.signUp({
                        email: email,
                        password: password,
                        options: { data: { full_name: name || "Student User" } }
                    });

                    if (error) throw error;

                    const userObj = {
                        id: data.user?.id || Date.now(),
                        email: email,
                        name: name || email.split("@")[0],
                        role: "student"
                    };
                    DataStore.setCurrentUser(userObj);
                    showToast("Account created successfully!", "success");
                    setTimeout(() => window.location.href = "index.html", 1000);
                    return;
                } else {
                    const { data, error } = await supabaseClient.auth.signInWithPassword({
                        email: email,
                        password: password
                    });

                    if (error) throw error;

                    const userObj = {
                        id: data.user.id,
                        email: data.user.email,
                        name: data.user.user_metadata?.full_name || email.split("@")[0],
                        role: "student"
                    };
                    DataStore.setCurrentUser(userObj);
                    showToast("Login successful!", "success");
                    setTimeout(() => window.location.href = "index.html", 1000);
                    return;
                }
            } catch (err) {
                console.warn("Supabase auth error, falling back to local session:", err.message);
                // Graceful fallback: Let user test locally
                const fallbackUser = {
                    id: Date.now(),
                    email: email,
                    name: name || email.split("@")[0],
                    role: "student"
                };
                DataStore.setCurrentUser(fallbackUser);
                showToast(`Logged in as ${fallbackUser.name}!`, "success");
                setTimeout(() => window.location.href = "index.html", 1000);
                return;
            } finally {
                userAuthBtn.disabled = false;
                userAuthBtn.textContent = isSignUpMode ? "Create Account" : "Login to NextStay";
            }
        } else {
            // Local fallback
            const localUser = {
                id: Date.now(),
                email: email,
                name: name || email.split("@")[0],
                role: "student"
            };
            DataStore.setCurrentUser(localUser);
            showToast(`Welcome ${localUser.name}!`, "success");
            setTimeout(() => window.location.href = "index.html", 1000);
        }
    });
});
