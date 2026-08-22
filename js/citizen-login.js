document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("Citizen login form not found.");
        return;
    }


    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value.trim();

        const message =
            document.getElementById("loginMessage");


        /* ==========================================
           EMPTY FIELD CHECK
        ========================================== */

        if (email === "" || password === "") {

            message.textContent =
                "Please enter your email and password.";

            message.style.color = "#d9534f";

            return;
        }


        /* ==========================================
           DEMO CITIZEN LOGIN
        ========================================== */

        if (
            email === "citizen@airguard.com" &&
            password === "123456"
        ) {


            /* ======================================
               SAVE LOGIN STATUS
            ====================================== */

            localStorage.setItem(
                "citizenLoggedIn",
                "true"
            );


            localStorage.setItem(
                "citizenEmail",
                email
            );


            message.textContent =
                "Citizen login successful!";

            message.style.color = "#1f9d69";


            /* ======================================
               REDIRECT TO COMPLAINT
            ====================================== */

            setTimeout(function () {

                window.location.href =
                    "index.html#complaint";

            }, 500);


        } else {


            /* ======================================
               INVALID LOGIN
            ====================================== */

            message.textContent =
                "Invalid citizen email or password.";

            message.style.color = "#d9534f";

        }

    });

});