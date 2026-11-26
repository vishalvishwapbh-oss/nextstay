// ==========================================
// NextStay - User Authentication Handler
// STRICT SUPABASE AUTHENTICATION
// ==========================================

let isSignUpMode = false;

const authHeading = document.getElementById("authHeading");
const authSub = document.getElementById("authSub");
const nameGroup = document.getElementById("nameGroup");
const userNameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("userEmail");
const userPasswordInput = document.getElementById("userPassword");
const userAuthBtn = document.getElementById("userAuthBtn");
const toggleAuthText = document.getElementById("toggleAuthText");

document.addEventListener("DOMContentLoaded", () => {
    // Mode toggle between Login and Sign Up
    function attachToggleListener() {
        const link = document.getElementById("toggleAuthLink");
        if (!link) return;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            isSignUpMode = !isSignUpMode;

            if (isSignUpMode) {
                authHeading.textContent = "Create Student Account";
                authSub.textContent = "Sign up with your email to explore and bookmark favorite PGs.";
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

            attachToggleListener();
        });
    }

    attachToggleListener();

    // Form Submission
    document.getElementById("authForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = userEmailInput.value.trim();
        const password = userPasswordInput.value;
        const name = userNameInput ? userNameInput.value.trim() : "";

        if (!email || !password) {
            showToast("Please enter email and password.", "error");
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters.", "error");
            return;
        }

        if (!supabaseClient) {
            showToast("Authentication service unavailable. Please check your internet connection.", "error");
            return;
        }

        userAuthBtn.disabled = true;
        userAuthBtn.textContent = isSignUpMode ? "Creating Account..." : "Logging in...";

        try {
            if (isSignUpMode) {
                // ==============================
                // REAL SUPABASE SIGN UP
                // ==============================
                const { data, error } = await supabaseClient.auth.signUp({
                    email: email,
                    password: password,
                    options: {
                        data: {
                            full_name: name || email.split("@")[0]
                        }
                    }
                });

                if (error) {
                    showToast("Sign up failed: " + error.message, "error");
                    userAuthBtn.disabled = false;
                    userAuthBtn.textContent = "Create Account";
                    return;
                }

                // If user is auto-confirmed or session is present
                if (data?.session) {
                    const userObj = {
                        id: data.user.id,
                        email: data.user.email,
                        name: name || data.user.user_metadata?.full_name || email.split("@")[0],
                        role: "student"
                    };
                    DataStore.setCurrentUser(userObj);
                    showToast("Account created successfully! Welcome to NextStay.", "success");
                    setTimeout(() => window.location.href = "index.html", 1000);
                } else {
                    showToast("Account created successfully! You can now log in.", "success", 4000);
                    // Switch to login view
                    isSignUpMode = false;
                    authHeading.textContent = "Student Login";
                    authSub.textContent = "Sign in with your newly created credentials.";
                    nameGroup.style.display = "none";
                    userAuthBtn.textContent = "Login to NextStay";
                    toggleAuthText.innerHTML = `Don't have an account? <a href="#" id="toggleAuthLink" style="color: var(--primary); font-weight: 700;">Create Account</a>`;
                    attachToggleListener();
                    userAuthBtn.disabled = false;
                }

            } else {
                // ==============================
                // REAL SUPABASE LOGIN
                // ==============================
                const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

                if (error) {
                    // Strict validation: stop on error
                    showToast("Login failed: " + error.message, "error");
                    userAuthBtn.disabled = false;
                    userAuthBtn.textContent = "Login to NextStay";
                    return;
                }

                if (!data?.user) {
                    showToast("Login failed. User account not found.", "error");
                    userAuthBtn.disabled = false;
                    userAuthBtn.textContent = "Login to NextStay";
                    return;
                }

                const userObj = {
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user.user_metadata?.full_name || email.split("@")[0],
                    role: "student"
                };
                DataStore.setCurrentUser(userObj);
                showToast("Login successful! Welcome back, " + userObj.name, "success");
                setTimeout(() => window.location.href = "index.html", 900);
            }

        } catch (err) {
            showToast("Authentication error: " + (err.message || "Failed to authenticate"), "error");
            userAuthBtn.disabled = false;
            userAuthBtn.textContent = isSignUpMode ? "Create Account" : "Login to NextStay";
        }
    });
});
