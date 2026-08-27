// =====================================================
// AIRGUARD - OFFICER DASHBOARD
// Complaint Management + Environmental Alerts
// =====================================================


// =====================================================
// OFFICER ACCESS CONTROL
// =====================================================

const officerLoggedIn =
    localStorage.getItem("officerLoggedIn") === "true";

if (!officerLoggedIn) {

    alert("Please login as an authorized officer.");

    window.location.href =
        "officer-login.html";
}


// =====================================================
// MAIN OFFICER DASHBOARD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "AirGuard Officer Dashboard started"
        );


        // =================================================
        // GET COMPLAINTS
        // =================================================

        function getComplaints() {

            try {

                return JSON.parse(
                    localStorage.getItem(
                        "airguardComplaints"
                    ) || "[]"
                );

            } catch (error) {

                console.error(
                    "Unable to read complaints:",
                    error
                );

                return [];
            }
        }


        // =================================================
        // SAVE COMPLAINTS
        // =================================================

        function saveComplaints(complaints) {

            localStorage.setItem(
                "airguardComplaints",
                JSON.stringify(complaints)
            );
        }


        // =================================================
        // STATUS CLASS
        // =================================================

        function getStatusClass(status) {

            if (status === "Resolved") {

                return "status-resolved";
            }

            if (status === "In Progress") {

                return "status-progress";
            }

            return "status-pending";
        }


        // =================================================
        // UPDATE SUMMARY
        // =================================================

        function updateSummary() {

            const complaints =
                getComplaints();

            let pending = 0;
            let resolved = 0;


            complaints.forEach(
                function (complaint) {

                    const status =
                        complaint.status ||
                        "Pending";


                    if (status === "Resolved") {

                        resolved++;

                    } else {

                        pending++;
                    }

                }
            );


            const total =
                document.getElementById(
                    "totalComplaints"
                );


            const pendingElement =
                document.getElementById(
                    "pendingComplaints"
                );


            const resolvedElement =
                document.getElementById(
                    "resolvedComplaints"
                );


            const sidebarCount =
                document.getElementById(
                    "sidebarComplaintCount"
                );


            if (total) {

                total.textContent =
                    complaints.length;
            }


            if (pendingElement) {

                pendingElement.textContent =
                    pending;
            }


            if (resolvedElement) {

                resolvedElement.textContent =
                    resolved;
            }


            if (sidebarCount) {

                sidebarCount.textContent =
                    complaints.length;
            }

        }


        // =================================================
        // ESCAPE HTML
        // =================================================

        function escapeHTML(value) {

            const div =
                document.createElement("div");

            div.textContent =
                String(value ?? "");

            return div.innerHTML;
        }


        // =================================================
        // DISPLAY COMPLAINTS
        // =================================================

        function displayComplaints() {

            const complaints =
                getComplaints();


            const table =
                document.getElementById(
                    "complaintsTable"
                );


            const empty =
                document.getElementById(
                    "noComplaints"
                );


            const count =
                document.getElementById(
                    "complaintCount"
                );


            if (!table) {

                return;
            }


            table.innerHTML = "";


            if (count) {

                count.textContent =
                    complaints.length +
                    (
                        complaints.length === 1
                            ? " Record"
                            : " Records"
                    );
            }


            if (complaints.length === 0) {

                if (empty) {

                    empty.style.display =
                        "flex";
                }

                return;
            }


            if (empty) {

                empty.style.display =
                    "none";
            }


            complaints
                .slice()
                .reverse()
                .forEach(
                    function (complaint) {

                        const row =
                            document.createElement(
                                "tr"
                            );


                        const status =
                            complaint.status ||
                            "Pending";


                        row.innerHTML = `

                            <td>
                                <strong>
                                    ${escapeHTML(
                                        complaint.id ||
                                        "--"
                                    )}
                                </strong>
                            </td>

                            <td>
                                ${escapeHTML(
                                    complaint.location ||
                                    "--"
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    complaint.type ||
                                    "--"
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    complaint.date ||
                                    "--"
                                )}
                            </td>

                            <td>

                                <span class="status-badge ${getStatusClass(status)}">

                                    ${escapeHTML(
                                        status
                                    )}

                                </span>

                            </td>

                            <td>

                                <button
                                    class="view-btn"
                                    data-id="${escapeHTML(
                                        complaint.id ||
                                        ""
                                    )}"
                                >
                                    View
                                </button>

                            </td>

                        `;


                        table.appendChild(row);

                    }
                );


            // =============================================
            // VIEW BUTTONS
            // =============================================

            document
                .querySelectorAll(".view-btn")
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                openComplaint(
                                    button.dataset.id
                                );

                            }
                        );

                    }
                );

        }


        // =================================================
        // MODAL ELEMENTS
        // =================================================

        const modal =
            document.getElementById(
                "complaintModal"
            );


        const closeModal =
            document.getElementById(
                "closeModal"
            );


        const saveStatus =
            document.getElementById(
                "saveStatus"
            );


        let selectedComplaintId = null;


        // =================================================
        // OPEN COMPLAINT
        // =================================================

        function openComplaint(id) {

            const complaints =
                getComplaints();


            const complaint =
                complaints.find(
                    function (item) {

                        return String(item.id) ===
                            String(id);

                    }
                );


            if (!complaint) {

                alert(
                    "Complaint record could not be found."
                );

                return;
            }


            selectedComplaintId =
                complaint.id;


            const modalComplaintId =
                document.getElementById(
                    "modalComplaintId"
                );


            const modalName =
                document.getElementById(
                    "modalName"
                );


            const modalEmail =
                document.getElementById(
                    "modalEmail"
                );


            const modalLocation =
                document.getElementById(
                    "modalLocation"
                );


            const modalType =
                document.getElementById(
                    "modalType"
                );


            const modalDescription =
                document.getElementById(
                    "modalDescription"
                );


            const modalStatus =
                document.getElementById(
                    "modalStatus"
                );


            const statusMessage =
                document.getElementById(
                    "statusMessage"
                );


            if (modalComplaintId) {

                modalComplaintId.textContent =
                    complaint.id || "--";
            }


            if (modalName) {

                modalName.textContent =
                    complaint.name || "--";
            }


            if (modalEmail) {

                modalEmail.textContent =
                    complaint.email || "--";
            }


            if (modalLocation) {

                modalLocation.textContent =
                    complaint.location || "--";
            }


            if (modalType) {

                modalType.textContent =
                    complaint.type || "--";
            }


            // Display uploaded complaint photo

            const complaintPhoto =
                document.getElementById(
                    "modalComplaintPhoto"
                );

            const noComplaintPhoto =
                document.getElementById(
                    "noComplaintPhoto"
                );


            const photo =
                complaint.photo ||
                complaint.image ||
                complaint.imageUrl ||
                complaint.photoUrl ||
                complaint.uploadedPhoto;


            if (photo) {

                complaintPhoto.src = photo;
                complaintPhoto.style.display = "block";

                noComplaintPhoto.style.display = "none";

            } else {

                complaintPhoto.src = "";
                complaintPhoto.style.display = "none";

                noComplaintPhoto.style.display = "block";

            }


            if (modalDescription) {

                modalDescription.textContent =
                    complaint.description ||
                    "--";
            }


            if (modalStatus) {

                modalStatus.value =
                    complaint.status ||
                    "Pending";
            }


            if (statusMessage) {

                statusMessage.textContent =
                    "";
            }


            if (modal) {

                modal.style.display =
                    "flex";
            }

        }


        // =================================================
        // CLOSE MODAL
        // =================================================

        if (closeModal) {

            closeModal.addEventListener(
                "click",
                function () {

                    if (modal) {

                        modal.style.display =
                            "none";
                    }

                }
            );
        }


        // =================================================
        // CLOSE MODAL OUTSIDE
        // =================================================

        if (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target === modal
                    ) {

                        modal.style.display =
                            "none";
                    }

                }
            );
        }


        // =================================================
        // SAVE COMPLAINT STATUS
        // =================================================

        if (saveStatus) {

            saveStatus.addEventListener(
                "click",
                function () {

                    if (!selectedComplaintId) {

                        return;
                    }


                    const complaints =
                        getComplaints();


                    const modalStatus =
                        document.getElementById(
                            "modalStatus"
                        );


                    const newStatus =
                        modalStatus
                            ? modalStatus.value
                            : "Pending";


                    const complaint =
                        complaints.find(
                            function (item) {

                                return String(
                                    item.id
                                ) === String(
                                    selectedComplaintId
                                );

                            }
                        );


                    if (!complaint) {

                        alert(
                            "Complaint could not be found."
                        );

                        return;
                    }


                    complaint.status =
                        newStatus;


                    saveComplaints(
                        complaints
                    );


                    const message =
                        document.getElementById(
                            "statusMessage"
                        );


                    if (message) {

                        message.textContent =
                            "Complaint status updated successfully.";

                        message.style.color =
                            "#397a5a";
                    }


                    displayComplaints();

                    updateSummary();


                    setTimeout(
                        function () {

                            if (modal) {

                                modal.style.display =
                                    "none";
                            }

                        },
                        700
                    );

                }
            );
        }


        // =================================================
        // AQI
        // =================================================

        const currentAQI =
            document.getElementById(
                "currentAQI"
            );


        const dashboardAQI =
            document.getElementById(
                "dashboardAQI"
            );


        if (currentAQI) {

            currentAQI.textContent =
                "142";
        }


        if (dashboardAQI) {

            dashboardAQI.textContent =
                "142";
        }


        // =================================================
        // LOGOUT
        // =================================================

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                function () {

                    localStorage.removeItem(
                        "officerLoggedIn"
                    );

                    window.location.href =
                        "index.html";

                }
            );
        }


        // =================================================
        // ENVIRONMENTAL ALERT SYSTEM
        // =================================================

        function generateEnvironmentalAlerts() {

            // =============================================
            // CHECK IF ENVIRONMENTAL ALERTS ARE ENABLED
            // =============================================

            const alertsEnabled =
                localStorage.getItem(
                    "environmentalAlertsEnabled"
                ) !== "false";


            const alertsContainer =
                document.getElementById(
                    "environmentAlerts"
                );


            const noAlerts =
                document.getElementById(
                    "noAlerts"
                );


            if (!alertsEnabled) {

                if (alertsContainer) {

                    alertsContainer.innerHTML = "";

                }


                if (noAlerts) {

                    noAlerts.style.display =
                        "flex";


                    const message =
                        noAlerts.querySelector(
                            "span"
                        );


                    if (message) {

                        message.textContent =
                            "Environmental alerts are currently disabled.";

                    }

                }


                return;
            }


            // =============================================
            // MONITORING ZONES
            // =============================================

            const zones = [

                {
                    name: "Zone A",
                    aqi: 75,
                    pm25: 42,
                    pm10: 110
                },

                {
                    name: "Zone B",
                    aqi: 142,
                    pm25: 72,
                    pm10: 180
                },

                {
                    name: "Zone C",
                    aqi: 105,
                    pm25: 58,
                    pm10: 145
                },

                {
                    name: "Zone D",
                    aqi: 210,
                    pm25: 96,
                    pm10: 220
                }

            ];


            if (alertsContainer) {

                alertsContainer.innerHTML =
                    "";

            }


            let alertCount = 0;


            // =============================================
            // GENERATE EACH ALERT
            // =============================================

            zones.forEach(
                function (zone) {

                    let level = "";

                    let title = "";

                    let icon = "";

                    let action = "";


                    // -------------------------------------
                    // CRITICAL
                    // -------------------------------------

                    if (zone.aqi > 200) {

                        level =
                            "alert-critical";

                        title =
                            "CRITICAL POLLUTION LEVEL";

                        icon =
                            "🔴";

                        action =
                            "Immediate field inspection recommended. Increase pollution monitoring and identify possible pollution sources.";

                    }


                    // -------------------------------------
                    // HIGH
                    // -------------------------------------

                    else if (zone.aqi > 100) {

                        level =
                            "alert-high";

                        title =
                            "HIGH POLLUTION LEVEL";

                        icon =
                            "🟠";

                        action =
                            "Increase monitoring frequency and inspect nearby pollution sources.";

                    }


                    // -------------------------------------
                    // MODERATE
                    // -------------------------------------

                    else if (zone.aqi > 50) {

                        level =
                            "alert-moderate";

                        title =
                            "MODERATE POLLUTION LEVEL";

                        icon =
                            "🟡";

                        action =
                            "Continue environmental monitoring and observe pollution trends.";

                    }


                    // -------------------------------------
                    // GOOD
                    // -------------------------------------

                    else {

                        return;
                    }


                    alertCount++;


                    // =====================================
                    // CREATE ALERT CARD
                    // =====================================

                    const alertCard =
                        document.createElement(
                            "div"
                        );


                    alertCard.className =
                        "environment-alert " +
                        level;


                    alertCard.innerHTML =

                        '<div class="alert-icon">' +

                            icon +

                        '</div>' +

                        '<div class="alert-content">' +

                            '<h3>' +

                                title +

                            '</h3>' +

                            '<span class="alert-location">' +

                                '📍 ' +
                                zone.name +

                            '</span>' +

                            '<div class="alert-values">' +

                                '<span>' +

                                    'AQI: ' +

                                    '<strong>' +

                                        zone.aqi +

                                    '</strong>' +

                                '</span>' +

                                '<span>' +

                                    'PM2.5: ' +

                                    '<strong>' +

                                        zone.pm25 +
                                        ' µg/m³' +

                                    '</strong>' +

                                '</span>' +

                                '<span>' +

                                    'PM10: ' +

                                    '<strong>' +

                                        zone.pm10 +
                                        ' µg/m³' +

                                    '</strong>' +

                                '</span>' +

                            '</div>' +

                            '<div class="alert-action">' +

                                '<strong>' +

                                    'Recommended Action: ' +

                                '</strong>' +

                                action +

                            '</div>' +

                        '</div>';


                    if (alertsContainer) {

                        alertsContainer.appendChild(
                            alertCard
                        );

                    }

                }
            );


            // =============================================
            // EMPTY ALERT MESSAGE
            // =============================================

            if (noAlerts) {

                if (alertCount === 0) {

                    noAlerts.style.display =
                        "flex";

                } else {

                    noAlerts.style.display =
                        "none";
                }

            }


            console.log(
                "AirGuard alerts generated:",
                alertCount
            );

        }


        // =================================================
        // LISTEN FOR ENVIRONMENTAL ALERT SETTING CHANGES
        // =================================================

        window.addEventListener(
            "environmentalAlertsChanged",
            function () {

                console.log(
                    "Environmental Alerts setting changed."
                );

                generateEnvironmentalAlerts();

            }
        );


        // =================================================
        // INITIALIZE ALERT SYSTEM
        // =================================================

        generateEnvironmentalAlerts();


        // =================================================
        // INITIAL LOAD
        // =================================================

        displayComplaints();

        updateSummary();


        // =================================================
        // STORAGE LISTENER
        // =================================================

        window.addEventListener(
            "storage",
            function (event) {

                if (
                    event.key ===
                    "airguardComplaints"
                ) {

                    displayComplaints();

                    updateSummary();

                }

            }
        );


        // =================================================
        // FINAL
        // =================================================

        console.log(
            "AirGuard Officer Dashboard loaded successfully."
        );

    }
);


/* =====================================================
   MINEGUARD SETTINGS
   LIGHT / DARK MODE + COMPLETE LANGUAGE SWITCHING
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const lightModeBtn =
        document.getElementById("lightModeBtn");

    const darkModeBtn =
        document.getElementById("darkModeBtn");

    const languageSelect =
        document.getElementById("languageSelect");


    /* =====================================================
       THEME
    ===================================================== */

    function applyTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add("dark-mode");

        } else {

            document.body.classList.remove("dark-mode");

        }

        if (lightModeBtn) {

            lightModeBtn.classList.toggle(
                "active",
                theme === "light"
            );

        }

        if (darkModeBtn) {

            darkModeBtn.classList.toggle(
                "active",
                theme === "dark"
            );

        }

        localStorage.setItem(
            "mineguardTheme",
            theme
        );
    }


    const savedTheme =
        localStorage.getItem("mineguardTheme") || "light";

    applyTheme(savedTheme);


    if (lightModeBtn) {

        lightModeBtn.addEventListener(
            "click",
            function () {

                applyTheme("light");

            }
        );

    }


    if (darkModeBtn) {

        darkModeBtn.addEventListener(
            "click",
            function () {

                applyTheme("dark");

            }
        );

    }


    /* =====================================================
       TRANSLATION DICTIONARY
    ===================================================== */

    const translations = {

        hi: {

            "GOVERNMENT ENVIRONMENTAL MONITORING PORTAL":
                "सरकारी पर्यावरण निगरानी पोर्टल",

            "Environmental Protection & Pollution Control Authority":
                "पर्यावरण संरक्षण एवं प्रदूषण नियंत्रण प्राधिकरण",

            "OFFICIAL PORTAL":
                "आधिकारिक पोर्टल",

            "Secure Access":
                "सुरक्षित प्रवेश",

            "Smart Environmental Monitoring System":
                "स्मार्ट पर्यावरण निगरानी प्रणाली",

            "Environmental Officer":
                "पर्यावरण अधिकारी",

            "Officer ID: admin":
                "अधिकारी आईडी: admin",

            "Admin Dashboard":
                "एडमिन डैशबोर्ड",

            "MAIN MENU":
                "मुख्य मेनू",

            "Dashboard":
                "डैशबोर्ड",

            "Complaints":
                "शिकायतें",

            "Environmental Monitoring":
                "पर्यावरण निगरानी",

            "Analytics & Reports":
                "विश्लेषण एवं रिपोर्ट",

            "ADMINISTRATION":
                "प्रशासन",

            "Alerts":
                "अलर्ट",

            "Settings":
                "सेटिंग्स",

            "System Operational":
                "सिस्टम चालू है",

            "All monitoring stations online":
                "सभी निगरानी स्टेशन ऑनलाइन हैं",

            "Logout":
                "लॉग आउट",

            "HOME / OFFICER PORTAL":
                "होम / अधिकारी पोर्टल",

            "Officer Dashboard":
                "अधिकारी डैशबोर्ड",

            "Monitor environmental conditions, review citizen complaints and coordinate pollution-control actions.":
                "पर्यावरणीय परिस्थितियों की निगरानी करें, नागरिक शिकायतों की समीक्षा करें और प्रदूषण नियंत्रण कार्यों का समन्वय करें।",

            "LIVE MONITORING":
                "लाइव निगरानी",

            "Loading...":
                "लोड हो रहा है...",

            "CURRENT AQI":
                "वर्तमान AQI",

            "POOR AIR QUALITY":
                "खराब वायु गुणवत्ता",

            "TOTAL COMPLAINTS":
                "कुल शिकायतें",

            "Citizen environmental reports":
                "नागरिक पर्यावरणीय रिपोर्ट",

            "View complaints →":
                "शिकायतें देखें →",

            "PENDING":
                "लंबित",

            "Reports requiring attention":
                "ध्यान देने योग्य रिपोर्ट",

            "Requires action":
                "कार्रवाई आवश्यक",

            "RESOLVED":
                "समाधान किया गया",

            "Successfully completed cases":
                "सफलतापूर्वक पूर्ण मामले",

            "Response efficiency":
                "प्रतिक्रिया दक्षता",

            "ENVIRONMENTAL MONITORING":
                "पर्यावरण निगरानी",

            "Air Quality Status":
                "वायु गुणवत्ता स्थिति",

            "SENSOR ONLINE":
                "सेंसर ऑनलाइन",

            "Poor Air Quality":
                "खराब वायु गुणवत्ता",

            "Current environmental conditions require monitoring and preventive action.":
                "वर्तमान पर्यावरणीय परिस्थितियों में निगरानी और निवारक कार्रवाई आवश्यक है।",

            "LIVE CONDITIONS":
                "लाइव परिस्थितियाँ",

            "Environmental Data":
                "पर्यावरणीय डेटा",

            "Temperature":
                "तापमान",

            "Humidity":
                "आर्द्रता",

            "Wind Speed":
                "हवा की गति",

            "Dust Risk":
                "धूल का जोखिम",

            "Moderate":
                "मध्यम",

            "OFFICER SERVICES":
                "अधिकारी सेवाएँ",

            "Quick Actions":
                "त्वरित कार्य",

            "Manage Complaints":
                "शिकायतें प्रबंधित करें",

            "Review citizen reports":
                "नागरिक रिपोर्ट की समीक्षा करें",

            "Monitor Pollution":
                "प्रदूषण की निगरानी करें",

            "View sensor conditions":
                "सेंसर की स्थिति देखें",

            "View Reports":
                "रिपोर्ट देखें",

            "Environmental analytics":
                "पर्यावरणीय विश्लेषण",

            "Check Alerts":
                "अलर्ट देखें",

            "Review important warnings":
                "महत्वपूर्ण चेतावनियों की समीक्षा करें",

            "ENVIRONMENTAL ALERT SYSTEM":
                "पर्यावरणीय अलर्ट प्रणाली",

            "Active Pollution Alerts":
                "सक्रिय प्रदूषण अलर्ट",

            "Automated alerts generated from environmental monitoring data.":
                "पर्यावरण निगरानी डेटा से स्वचालित रूप से अलर्ट तैयार किए जाते हैं।",

            "LIVE ALERTS":
                "लाइव अलर्ट",

            "No Active Environmental Alerts":
                "कोई सक्रिय पर्यावरणीय अलर्ट नहीं",

            "Current environmental conditions are within acceptable monitoring limits.":
                "वर्तमान पर्यावरणीय परिस्थितियाँ स्वीकार्य निगरानी सीमा के भीतर हैं।",

            "CITIZEN SERVICES":
                "नागरिक सेवाएँ",

            "Environmental Complaints":
                "पर्यावरणीय शिकायतें",

            "Complaint ID":
                "शिकायत आईडी",

            "Location":
                "स्थान",

            "Issue Type":
                "समस्या का प्रकार",

            "Date":
                "दिनांक",

            "Status":
                "स्थिति",

            "Action":
                "कार्रवाई",

            "No complaints available":
                "कोई शिकायत उपलब्ध नहीं है",

            "Citizen complaints submitted through the AirGuard public portal will appear here.":
                "AirGuard सार्वजनिक पोर्टल के माध्यम से भेजी गई नागरिक शिकायतें यहाँ दिखाई देंगी।",

            "COMPLAINT DETAILS":
                "शिकायत विवरण",

            "Environmental Complaint":
                "पर्यावरणीय शिकायत",

            "Citizen Name":
                "नागरिक का नाम",

            "Email":
                "ईमेल",

            "Uploaded Environmental Photo":
                "अपलोड की गई पर्यावरणीय फोटो",

            "No photo uploaded":
                "कोई फोटो अपलोड नहीं की गई",

            "Complaint Description":
                "शिकायत का विवरण",

            "Update Complaint Status":
                "शिकायत की स्थिति अपडेट करें",

            "Pending":
                "लंबित",

            "In Progress":
                "प्रगति पर",

            "Resolved":
                "समाधान किया गया",

            "Save Status":
                "स्थिति सहेजें",

            "Government Environmental Monitoring Portal":
                "सरकारी पर्यावरण निगरानी पोर्टल",

            /* SETTINGS */

            "Appearance":
                "दिखावट",

            "Choose how the MineGuard dashboard looks.":
                "MineGuard डैशबोर्ड का स्वरूप चुनें।",

            "Light Mode":
                "लाइट मोड",

            "Use the normal bright dashboard":
                "सामान्य उज्ज्वल डैशबोर्ड का उपयोग करें",

            "Dark Mode":
                "डार्क मोड",

            "Use a darker dashboard appearance":
                "गहरे डैशबोर्ड स्वरूप का उपयोग करें",

            "Language":
                "भाषा",

            "Select your preferred dashboard language.":
                "अपनी पसंदीदा डैशबोर्ड भाषा चुनें।",

            "Dashboard Language":
                "डैशबोर्ड भाषा",

            "System Preferences":
                "सिस्टम प्राथमिकताएँ",

            "Current MineGuard monitoring configuration.":
                "वर्तमान MineGuard निगरानी कॉन्फ़िगरेशन।",

            "ACTIVE":
                "सक्रिय",

            "ENABLED":
                "सक्षम",

            "Officer Account":
                "अधिकारी खाता",

            "Record":
                "रिकॉर्ड",

            "Records":
                "रिकॉर्ड",

            "View":
                "देखें",

            "Zone A":
                "क्षेत्र A",

            "Zone B":
                "क्षेत्र B",

            "Zone C":
                "क्षेत्र C",

            "Zone D":
                "क्षेत्र D",

            "CRITICAL POLLUTION LEVEL":
                "गंभीर प्रदूषण स्तर",

            "HIGH POLLUTION LEVEL":
                "उच्च प्रदूषण स्तर",

            "MODERATE POLLUTION LEVEL":
                "मध्यम प्रदूषण स्तर",

            "Recommended Action:":
                "अनुशंसित कार्रवाई:",

            "Immediate field inspection recommended. Increase pollution monitoring and identify possible pollution sources.":
                "तत्काल क्षेत्र निरीक्षण की सिफारिश की जाती है। प्रदूषण निगरानी बढ़ाएँ और संभावित प्रदूषण स्रोतों की पहचान करें।",

            "Increase monitoring frequency and inspect nearby pollution sources.":
                "निगरानी की आवृत्ति बढ़ाएँ और आसपास के प्रदूषण स्रोतों का निरीक्षण करें।",

            "Continue environmental monitoring and observe pollution trends.":
                "पर्यावरणीय निगरानी जारी रखें और प्रदूषण के रुझानों पर नज़र रखें।",

            "Complaint record could not be found.":
                "शिकायत रिकॉर्ड नहीं मिला।",

            "Complaint could not be found.":
                "शिकायत नहीं मिली।",

            "Complaint status updated successfully.":
                "शिकायत की स्थिति सफलतापूर्वक अपडेट की गई।"

        },


        bn: {

            "GOVERNMENT ENVIRONMENTAL MONITORING PORTAL":
                "সরকারি পরিবেশ পর্যবেক্ষণ পোর্টাল",

            "Environmental Protection & Pollution Control Authority":
                "পরিবেশ সুরক্ষা ও দূষণ নিয়ন্ত্রণ কর্তৃপক্ষ",

            "OFFICIAL PORTAL":
                "অফিসিয়াল পোর্টাল",

            "Secure Access":
                "নিরাপদ প্রবেশ",

            "Smart Environmental Monitoring System":
                "স্মার্ট পরিবেশ পর্যবেক্ষণ ব্যবস্থা",

            "Environmental Officer":
                "পরিবেশ কর্মকর্তা",

            "Officer ID: admin":
                "কর্মকর্তা আইডি: admin",

            "Admin Dashboard":
                "অ্যাডমিন ড্যাশবোর্ড",

            "MAIN MENU":
                "প্রধান মেনু",

            "Dashboard":
                "ড্যাশবোর্ড",

            "Complaints":
                "অভিযোগ",

            "Environmental Monitoring":
                "পরিবেশ পর্যবেক্ষণ",

            "Analytics & Reports":
                "বিশ্লেষণ ও রিপোর্ট",

            "ADMINISTRATION":
                "প্রশাসন",

            "Alerts":
                "সতর্কতা",

            "Settings":
                "সেটিংস",

            "System Operational":
                "সিস্টেম সচল",

            "All monitoring stations online":
                "সমস্ত পর্যবেক্ষণ স্টেশন অনলাইনে আছে",

            "Logout":
                "লগ আউট",

            "HOME / OFFICER PORTAL":
                "হোম / কর্মকর্তা পোর্টাল",

            "Officer Dashboard":
                "কর্মকর্তা ড্যাশবোর্ড",

            "Monitor environmental conditions, review citizen complaints and coordinate pollution-control actions.":
                "পরিবেশগত পরিস্থিতি পর্যবেক্ষণ করুন, নাগরিক অভিযোগ পর্যালোচনা করুন এবং দূষণ নিয়ন্ত্রণ কার্যক্রমের সমন্বয় করুন।",

            "LIVE MONITORING":
                "লাইভ পর্যবেক্ষণ",

            "Loading...":
                "লোড হচ্ছে...",

            "CURRENT AQI":
                "বর্তমান AQI",

            "POOR AIR QUALITY":
                "খারাপ বায়ুর গুণমান",

            "TOTAL COMPLAINTS":
                "মোট অভিযোগ",

            "Citizen environmental reports":
                "নাগরিক পরিবেশগত রিপোর্ট",

            "View complaints →":
                "অভিযোগ দেখুন →",

            "PENDING":
                "অমীমাংসিত",

            "Reports requiring attention":
                "মনোযোগ প্রয়োজন এমন রিপোর্ট",

            "Requires action":
                "পদক্ষেপ প্রয়োজন",

            "RESOLVED":
                "সমাধান হয়েছে",

            "Successfully completed cases":
                "সফলভাবে সম্পন্ন মামলা",

            "Response efficiency":
                "প্রতিক্রিয়া দক্ষতা",

            "ENVIRONMENTAL MONITORING":
                "পরিবেশ পর্যবেক্ষণ",

            "Air Quality Status":
                "বায়ুর গুণমানের অবস্থা",

            "SENSOR ONLINE":
                "সেন্সর অনলাইন",

            "Poor Air Quality":
                "খারাপ বায়ুর গুণমান",

            "Current environmental conditions require monitoring and preventive action.":
                "বর্তমান পরিবেশগত পরিস্থিতির জন্য পর্যবেক্ষণ ও প্রতিরোধমূলক ব্যবস্থা প্রয়োজন।",

            "LIVE CONDITIONS":
                "লাইভ পরিস্থিতি",

            "Environmental Data":
                "পরিবেশগত তথ্য",

            "Temperature":
                "তাপমাত্রা",

            "Humidity":
                "আর্দ্রতা",

            "Wind Speed":
                "বাতাসের গতি",

            "Dust Risk":
                "ধুলোর ঝুঁকি",

            "Moderate":
                "মাঝারি",

            "OFFICER SERVICES":
                "কর্মকর্তা পরিষেবা",

            "Quick Actions":
                "দ্রুত কার্যক্রম",

            "Manage Complaints":
                "অভিযোগ পরিচালনা করুন",

            "Review citizen reports":
                "নাগরিক রিপোর্ট পর্যালোচনা করুন",

            "Monitor Pollution":
                "দূষণ পর্যবেক্ষণ করুন",

            "View sensor conditions":
                "সেন্সরের অবস্থা দেখুন",

            "View Reports":
                "রিপোর্ট দেখুন",

            "Environmental analytics":
                "পরিবেশগত বিশ্লেষণ",

            "Check Alerts":
                "সতর্কতা দেখুন",

            "Review important warnings":
                "গুরুত্বপূর্ণ সতর্কতা পর্যালোচনা করুন",

            "ENVIRONMENTAL ALERT SYSTEM":
                "পরিবেশগত সতর্কতা ব্যবস্থা",

            "Active Pollution Alerts":
                "সক্রিয় দূষণ সতর্কতা",

            "Automated alerts generated from environmental monitoring data.":
                "পরিবেশ পর্যবেক্ষণ তথ্য থেকে স্বয়ংক্রিয় সতর্কতা তৈরি হয়।",

            "LIVE ALERTS":
                "লাইভ সতর্কতা",

            "No Active Environmental Alerts":
                "কোনও সক্রিয় পরিবেশগত সতর্কতা নেই",

            "Current environmental conditions are within acceptable monitoring limits.":
                "বর্তমান পরিবেশগত পরিস্থিতি গ্রহণযোগ্য পর্যবেক্ষণ সীমার মধ্যে রয়েছে।",

            "CITIZEN SERVICES":
                "নাগরিক পরিষেবা",

            "Environmental Complaints":
                "পরিবেশগত অভিযোগ",

            "Complaint ID":
                "অভিযোগ আইডি",

            "Location":
                "স্থান",

            "Issue Type":
                "সমস্যার ধরন",

            "Date":
                "তারিখ",

            "Status":
                "অবস্থা",

            "Action":
                "কার্যক্রম",

            "No complaints available":
                "কোনও অভিযোগ পাওয়া যায়নি",

            "Citizen complaints submitted through the AirGuard public portal will appear here.":
                "AirGuard পাবলিক পোর্টালের মাধ্যমে জমা দেওয়া নাগরিক অভিযোগ এখানে দেখা যাবে।",

            "COMPLAINT DETAILS":
                "অভিযোগের বিবরণ",

            "Environmental Complaint":
                "পরিবেশগত অভিযোগ",

            "Citizen Name":
                "নাগরিকের নাম",

            "Email":
                "ইমেল",

            "Uploaded Environmental Photo":
                "আপলোড করা পরিবেশগত ছবি",

            "No photo uploaded":
                "কোনও ছবি আপলোড করা হয়নি",

            "Complaint Description":
                "অভিযোগের বিবরণ",

            "Update Complaint Status":
                "অভিযোগের অবস্থা আপডেট করুন",

            "Pending":
                "অমীমাংসিত",

            "In Progress":
                "চলমান",

            "Resolved":
                "সমাধান হয়েছে",

            "Save Status":
                "অবস্থা সংরক্ষণ করুন",

            "Government Environmental Monitoring Portal":
                "সরকারি পরিবেশ পর্যবেক্ষণ পোর্টাল",

            /* SETTINGS */

            "Appearance":
                "চেহারা",

            "Choose how the MineGuard dashboard looks.":
                "MineGuard ড্যাশবোর্ডের চেহারা নির্বাচন করুন।",

            "Light Mode":
                "লাইট মোড",

            "Use the normal bright dashboard":
                "সাধারণ উজ্জ্বল ড্যাশবোর্ড ব্যবহার করুন",

            "Dark Mode":
                "ডার্ক মোড",

            "Use a darker dashboard appearance":
                "গাঢ় ড্যাশবোর্ড ব্যবহার করুন",

            "Language":
                "ভাষা",

            "Select your preferred dashboard language.":
                "আপনার পছন্দের ড্যাশবোর্ড ভাষা নির্বাচন করুন।",

            "Dashboard Language":
                "ড্যাশবোর্ড ভাষা",

            "System Preferences":
                "সিস্টেম পছন্দ",

            "Current MineGuard monitoring configuration.":
                "বর্তমান MineGuard পর্যবেক্ষণ কনফিগারেশন।",

            "ACTIVE":
                "সক্রিয়",

            "ENABLED":
                "সক্রিয়",

            "Officer Account":
                "কর্মকর্তা অ্যাকাউন্ট",

            "Record":
                "রেকর্ড",

            "Records":
                "রেকর্ড",

            "View":
                "দেখুন",

            "Zone A":
                "অঞ্চল A",

            "Zone B":
                "অঞ্চল B",

            "Zone C":
                "অঞ্চল C",

            "Zone D":
                "অঞ্চল D",

            "CRITICAL POLLUTION LEVEL":
                "গুরুতর দূষণ স্তর",

            "HIGH POLLUTION LEVEL":
                "উচ্চ দূষণ স্তর",

            "MODERATE POLLUTION LEVEL":
                "মাঝারি দূষণ স্তর",

            "Recommended Action:":
                "প্রস্তাবিত পদক্ষেপ:",

            "Immediate field inspection recommended. Increase pollution monitoring and identify possible pollution sources.":
                "অবিলম্বে মাঠ পর্যায়ে পরিদর্শনের সুপারিশ করা হচ্ছে। দূষণ পর্যবেক্ষণ বাড়ান এবং সম্ভাব্য দূষণের উৎস চিহ্নিত করুন।",

            "Increase monitoring frequency and inspect nearby pollution sources.":
                "পর্যবেক্ষণের হার বাড়ান এবং কাছাকাছি দূষণের উৎস পরিদর্শন করুন।",

            "Continue environmental monitoring and observe pollution trends.":
                "পরিবেশ পর্যবেক্ষণ চালিয়ে যান এবং দূষণের প্রবণতা লক্ষ্য করুন।",

            "Complaint record could not be found.":
                "অভিযোগের রেকর্ড পাওয়া যায়নি।",

            "Complaint could not be found.":
                "অভিযোগ পাওয়া যায়নি।",

            "Complaint status updated successfully.":
                "অভিযোগের অবস্থা সফলভাবে আপডেট হয়েছে।"

        }

    };


    /* =====================================================
       TRANSLATE TEXT
    ===================================================== */

    function translatePage(language) {

        const dictionary =
            translations[language] || {};

        const walker =
            document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT
            );

        const textNodes = [];

        let node;

        while (
            node = walker.nextNode()
        ) {

            if (
                node.parentElement &&
                (
                    node.parentElement.tagName === "SCRIPT" ||
                    node.parentElement.tagName === "STYLE"
                )
            ) {
                continue;
            }

            textNodes.push(node);
        }


        textNodes.forEach(function (textNode) {

            /*
             * Save original English text only once.
             */

            if (
                !textNode._mineguardOriginal
            ) {

                textNode._mineguardOriginal =
                    textNode.nodeValue;

            }


            const original =
                textNode._mineguardOriginal;


            const cleanText =
                original
                    .replace(/\s+/g, " ")
                    .trim();


            if (!cleanText) {
                return;
            }


            /*
             * English = restore original text.
             */

            if (language === "en") {

                textNode.nodeValue =
                    original;

                return;

            }


            /*
             * Normal dictionary translation.
             */

            if (dictionary[cleanText]) {

                const leading =
                    original.match(/^\s*/)?.[0] || "";

                const trailing =
                    original.match(/\s*$/)?.[0] || "";

                textNode.nodeValue =
                    leading +
                    dictionary[cleanText] +
                    trailing;

                return;
            }


            /*
             * Dynamic Record / Records text.
             */

            const recordMatch =
                cleanText.match(
                    /^(\d+)\s+(Record|Records)$/
                );


            if (recordMatch) {

                const number =
                    recordMatch[1];


                if (language === "hi") {

                    textNode.nodeValue =
                        `${number} रिकॉर्ड`;

                }

                else if (language === "bn") {

                    textNode.nodeValue =
                        `${number} রেকর্ড`;

                }

                return;
            }

        });


        /* =================================================
           PLACEHOLDERS
        ================================================= */

        document
            .querySelectorAll(
                "input[placeholder], textarea[placeholder]"
            )
            .forEach(function (element) {

                if (
                    !element.dataset.originalPlaceholder
                ) {

                    element.dataset.originalPlaceholder =
                        element.getAttribute(
                            "placeholder"
                        );

                }


                const original =
                    element.dataset.originalPlaceholder;


                if (
                    language !== "en" &&
                    dictionary[original]
                ) {

                    element.setAttribute(
                        "placeholder",
                        dictionary[original]
                    );

                }

                else if (language === "en") {

                    element.setAttribute(
                        "placeholder",
                        original
                    );

                }

            });


        /* =================================================
           IMAGE ALT TEXT
        ================================================= */

        document
            .querySelectorAll("img[alt]")
            .forEach(function (image) {

                if (
                    !image.dataset.originalAlt
                ) {

                    image.dataset.originalAlt =
                        image.getAttribute("alt");

                }


                const original =
                    image.dataset.originalAlt;


                if (
                    language !== "en" &&
                    dictionary[original]
                ) {

                    image.setAttribute(
                        "alt",
                        dictionary[original]
                    );

                }

                else if (language === "en") {

                    image.setAttribute(
                        "alt",
                        original
                    );

                }

            });


        /* =================================================
           HTML LANGUAGE ATTRIBUTE
        ================================================= */

        document.documentElement.lang =
            language;


        /* =================================================
           SAVE LANGUAGE
        ================================================= */

        localStorage.setItem(
            "mineguardLanguage",
            language
        );

    }


    /* =====================================================
       LANGUAGE SELECT
    ===================================================== */

    if (languageSelect) {

        const savedLanguage =
            localStorage.getItem(
                "mineguardLanguage"
            ) || "en";


        languageSelect.value =
            savedLanguage;


        languageSelect.addEventListener(
            "change",
            function () {

                const selectedLanguage =
                    languageSelect.value;


                /*
                 * THIS IS THE IMPORTANT PART.
                 * Actually translate the page.
                 */

                translatePage(
                    selectedLanguage
                );

            }
        );


        /*
         * Apply saved language immediately
         * when dashboard opens.
         */

        translatePage(
            savedLanguage
        );

    }


    /* =====================================================
       TRANSLATE NEWLY GENERATED CONTENT
       Alerts and complaints are created dynamically
    ===================================================== */

    const observer =
        new MutationObserver(
            function () {

                const currentLanguage =
                    localStorage.getItem(
                        "mineguardLanguage"
                    ) || "en";


                if (
                    currentLanguage !== "en"
                ) {

                    translatePage(
                        currentLanguage
                    );

                }

            }
        );


    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );

});


/* =========================================
   SYSTEM PREFERENCES
========================================= */

// Get saved settings

let sensorMonitoringEnabled =
    localStorage.getItem("sensorMonitoringEnabled");

let environmentalAlertsEnabled =
    localStorage.getItem("environmentalAlertsEnabled");


// Default values

if (sensorMonitoringEnabled === null) {

    sensorMonitoringEnabled = "true";

    localStorage.setItem(
        "sensorMonitoringEnabled",
        "true"
    );
}


if (environmentalAlertsEnabled === null) {

    environmentalAlertsEnabled = "true";

    localStorage.setItem(
        "environmentalAlertsEnabled",
        "true"
    );
}


// =========================================
// UPDATE SETTINGS DISPLAY
// =========================================

function updateSystemPreferences() {

    const sensorButton =
        document.getElementById("sensorMonitoringToggle");

    const alertsButton =
        document.getElementById("environmentalAlertsToggle");


    // =========================================
    // READ CURRENT VALUES DIRECTLY
    // =========================================

    const currentSensorMonitoring =
        localStorage.getItem("sensorMonitoringEnabled") !== "false";

    const currentEnvironmentalAlerts =
        localStorage.getItem("environmentalAlertsEnabled") !== "false";


    // =========================================
    // SENSOR MONITORING
    // =========================================

    if (sensorButton) {

        if (currentSensorMonitoring) {

            sensorButton.textContent = "ACTIVE";

            sensorButton.classList.add("enabled");
            sensorButton.classList.remove("disabled");

        } else {

            sensorButton.textContent = "DISABLED";

            sensorButton.classList.add("disabled");
            sensorButton.classList.remove("enabled");
        }
    }


    // =========================================
    // ENVIRONMENTAL ALERTS
    // =========================================

    if (alertsButton) {

        if (currentEnvironmentalAlerts) {

            alertsButton.textContent = "ENABLED";

            alertsButton.classList.add("enabled");
            alertsButton.classList.remove("disabled");

        } else {

            alertsButton.textContent = "DISABLED";

            alertsButton.classList.add("disabled");
            alertsButton.classList.remove("enabled");
        }
    }
}


// =========================================
// SENSOR MONITORING TOGGLE
// =========================================

function toggleSensorMonitoring() {

    sensorMonitoringEnabled =
        sensorMonitoringEnabled === "true"
            ? "false"
            : "true";


    localStorage.setItem(
        "sensorMonitoringEnabled",
        sensorMonitoringEnabled
    );


    updateSystemPreferences();

    applySensorMonitoring();
}


// =========================================
// ACTUAL SENSOR MONITORING CONTROL
// =========================================

function applySensorMonitoring() {

    const enabled =
        localStorage.getItem(
            "sensorMonitoringEnabled"
        ) !== "false";


    const liveIndicator =
        document.querySelector(
            ".live-indicator"
        );


    const sensorStatus =
        document.querySelector(
            ".sensor-status"
        );


    if (enabled) {

        console.log(
            "Sensor monitoring is ACTIVE."
        );


        if (liveIndicator) {

            liveIndicator.style.opacity =
                "1";
        }


        if (sensorStatus) {

            sensorStatus.textContent =
                "SENSOR ONLINE";
        }

    } else {

        console.log(
            "Sensor monitoring is DISABLED."
        );


        if (liveIndicator) {

            liveIndicator.style.opacity =
                "0.45";
        }


        if (sensorStatus) {

            sensorStatus.textContent =
                "SENSOR OFFLINE";
        }
    }
}

// =========================================
// ENVIRONMENTAL ALERTS TOGGLE
// =========================================

function toggleEnvironmentalAlerts() {

    // Read the CURRENT value directly
    const current =
        localStorage.getItem("environmentalAlertsEnabled");

    // Reverse the current value
    const newValue =
        current === "true"
            ? "false"
            : "true";


    // Save the new value
    localStorage.setItem(
        "environmentalAlertsEnabled",
        newValue
    );


    // Keep JavaScript variable synchronized
    environmentalAlertsEnabled =
        newValue;


    console.log(
        "Environmental Alerts:",
        newValue
    );


    // =========================================
    // UPDATE BUTTON
    // =========================================

    updateSystemPreferences();


    // =========================================
    // REFRESH ALERTS
    // =========================================

    window.dispatchEvent(
        new Event("environmentalAlertsChanged")
    );
}


// =========================================
// LOAD SAVED SETTINGS
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateSystemPreferences();

        applySensorMonitoring();

    }
);