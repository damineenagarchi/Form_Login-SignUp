document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const userEmailDisplay = document.getElementById("userEmail");

    // Signup Form
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let contact = document.getElementById("contact").value;

            // Password validation
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
            if (!passwordRegex.test(password)) {
                alert("Password must be 8-16 characters, with uppercase, lowercase, number & special character.");
                return;
            }

            // Email validation
            let users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.some(user => user.email === email)) {
                alert("Email already exists!");
                return;
            }

            users.push({ email, password, contact });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! Please login.");
            window.location.href = "login.html";
        });
    }

    // Login Form
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let email = document.getElementById("loginEmail").value;
            let password = document.getElementById("loginPassword").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let validUser = users.find(user => user.email === email && user.password === password);

            if (validUser) {
                localStorage.setItem("loggedInUser", email);
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid credentials!");
            }
        });
    }

    // Dashboard
    if (userEmailDisplay) {
        let loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            window.location.href = "login.html";
        } else {
            userEmailDisplay.textContent = loggedInUser;
        }
    }
});

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
