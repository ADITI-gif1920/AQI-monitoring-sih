// =====================================================
// AIRGUARD - OFFICER LOGIN
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Officer login JavaScript loaded");

    const loginForm =
        document.getElementById("officerLoginForm");

    const officerIdInput =
        document.getElementById("officerId");

    const passwordInput =
        document.getElementById("officerPassword");

    const message =
        document.getElementById("loginMessage");

    const showPassword =
        document.getElementById("showPassword");


    // =====================================================
    // CHECK FORM
    // =====================================================

    if (!loginForm) {

        console.error(
            "ERROR: officerLoginForm not found!"
        );

        return;
    }


    console.log("Officer login form found");


    // =====================================================
    // SHOW / HIDE PASSWORD
    // =====================================================

    if (showPassword) {

        showPassword.addEventListener("click", function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                showPassword.textContent = "Hide";

            } else {

                passwordInput.type = "password";

                showPassword.textContent = "Show";

            }

        });

    }


    // =====================================================
    // LOGIN
    // =====================================================

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        console.log("Officer login button clicked");


        const officerId =
            officerIdInput.value.trim();

        const password =
            passwordInput.value.trim();


        console.log(
            "Entered Officer ID:",
            officerId
        );


        // =================================================
        // DEMO OFFICER CREDENTIALS
        // =================================================

        const validOfficerId =
            "officer@airguard.gov.in";

        const validPassword =
            "officer123";


        // =================================================
        // EMPTY FIELD CHECK
        // =================================================

        if (
            officerId === "" ||
            password === ""
        ) {

            if (message) {

                message.textContent =
                    "Please enter Officer ID and Password.";

                message.style.color =
                    "#d9534f";

            }

            return;
        }


        // =================================================
        // VALID LOGIN
        // =================================================

        if (
            officerId === validOfficerId &&
            password === validPassword
        ) {

            console.log(
                "Officer credentials correct"
            );


            // Save login session
            localStorage.setItem(
                "officerLoggedIn",
                "true"
            );

            localStorage.setItem(
                "officerId",
                officerId
            );


            if (message) {

                message.textContent =
                    "Login successful. Opening Officer Dashboard...";

                message.style.color =
                    "#1f9d69";

            }


            // =================================================
            // REDIRECT TO OFFICER DASHBOARD
            // =================================================

            setTimeout(function () {

                window.location.href =
                    "officer.html";

            }, 500);

        }

        else {

            console.log(
                "Invalid officer credentials"
            );


            if (message) {

                message.textContent =
                    "Invalid Officer ID or Password.";

                message.style.color =
                    "#d9534f";

            }

        }

    });

});