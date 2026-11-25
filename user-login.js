// SUPABASE CONNECTION

const SUPABASE_URL = "https://oiczndyhuzcsrpzoaunk.supabase.co";
const SUPABASE_KEY = "sb_publishable_zwImJd2xLY8y4E-m59JLGw_s4nEctEi";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// INPUTS

const emailInput = document.getElementById("userEmail");
const passwordInput = document.getElementById("userPassword");
const message = document.getElementById("userMessage");

const loginBtn = document.getElementById("userLoginBtn");
const signupBtn = document.getElementById("userSignupBtn");

// USER SIGNUP

signupBtn.addEventListener("click", async function() {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        message.textContent = "Please enter email and password.";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        return;
    }

    message.textContent = "Creating account...";

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        message.textContent = error.message;
        return;
    }

    if (data.session) {
        message.textContent = "Account created successfully!";
        window.location.href = "index.html";
    } else {
        message.textContent =
            "Account created! Check your email to verify, then login.";
    }

});

// USER LOGIN

loginBtn.addEventListener("click", async function() {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        message.textContent = "Please enter email and password.";
        return;
    }

    message.textContent = "Logging in...";

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        message.textContent = error.message;
        return;
    }

    message.textContent = "Login successful!";

    window.location.href = "index.html";

});