document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document
            .getElementById("email")
            .value
            .trim();

        const password = document
            .getElementById("password")
            .value
            .trim();

        const message =
            document.getElementById("loginMessage");


        // Check empty fields
        if (email === "" || password === "") {

            message.textContent =
                "Please enter your email and password.";

            message.style.color = "#d9534f";

            return;
        }


        // DEMO CITIZEN LOGIN
        if (
            email === "demo@airguard.com" &&
            password === "123456"
        ) {

            // Save login
            localStorage.setItem(
                "citizenLoggedIn",
                "true"
            );

            message.textContent =
                "Login successful! Opening Citizen Complaint Portal...";

            message.style.color = "#1f9d69";


            // Check requested destination
            const params =
                new URLSearchParams(window.location.search);

            const redirect =
                params.get("redirect");


            setTimeout(function () {

                if (redirect === "complaint") {

                    window.location.href =
                        "index.html#complaint";

                } else {

                    window.location.href =
                        "index.html";

                }

            }, 800);

        } else {

            message.textContent =
                "Invalid email or password.";

            message.style.color = "#d9534f";

        }

    });

});