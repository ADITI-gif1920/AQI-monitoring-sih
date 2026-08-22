// =========================================================
// AIRGUARD - MAIN JAVASCRIPT
// Smart Environmental Monitoring System
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("AirGuard JavaScript started");


    // =====================================================
    // CITIZEN COMPLAINT ACCESS CONTROL
    // =====================================================

    const complaintSection =
        document.getElementById("complaint");

    const complaintForm =
        document.getElementById("complaintForm");


    function isCitizenLoggedIn() {
        return localStorage.getItem("citizenLoggedIn") === "true";
    }


    function showComplaintSection() {

        if (!complaintSection) return;

        complaintSection.style.display = "block";

        setTimeout(function () {

            complaintSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 200);
    }


    function hideComplaintSection() {

        if (!complaintSection) return;

        complaintSection.style.display = "none";
    }
// =====================================================
// CITIZEN COMPLAINT TRACKING ACCESS
// =====================================================

const trackingSection =
    document.getElementById("trackComplaint");

const trackingNav =
    document.getElementById("trackComplaintNav");


function updateTrackingAccess() {

    const loggedIn =
        localStorage.getItem("citizenLoggedIn") === "true";


    // Show/hide tracking section
    if (trackingSection) {

        trackingSection.style.display =
            loggedIn ? "block" : "none";

    }


    // Show/hide navbar link
    if (trackingNav) {

        trackingNav.style.display =
            loggedIn ? "inline-block" : "none";

    }

}


// Check when page loads
updateTrackingAccess();


// Check when login state changes
window.addEventListener("storage", function (event) {

    if (event.key === "citizenLoggedIn") {

        updateTrackingAccess();

    }

});

    // =====================================================
    // CHECK COMPLAINT ACCESS
    // =====================================================

    function checkComplaintAccess() {

        const hash = window.location.hash;


        // User is trying to open complaint section
        if (hash === "#complaint") {

            // Citizen NOT logged in
            if (!isCitizenLoggedIn()) {

                hideComplaintSection();

                window.location.href =
                    "citizen-login.html?redirect=complaint";

                return;
            }


            // Citizen logged in
            showComplaintSection();

            return;
        }


        // Normal public homepage
        hideComplaintSection();
    }


    checkComplaintAccess();


    window.addEventListener(
        "hashchange",
        function () {

            checkComplaintAccess();

        }
    );


    // =====================================================
    // REPORT ISSUE BUTTON
    // =====================================================

    const reportButtons =
        document.querySelectorAll(
            'a[href="#complaint"], a[href="index.html#complaint"]'
        );


    reportButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                // Already logged in
                if (isCitizenLoggedIn()) {

                    window.location.href =
                        "index.html#complaint";

                }

                // Not logged in
                else {

                    window.location.href =
                        "citizen-login.html?redirect=complaint";

                }

            }
        );

    });


    // =====================================================
    // DEMO SENSOR DATA
    // =====================================================

    const sensorData = {

        aqi: 142,

        pm25: 72,

        pm10: 180,

        co: 1.8,

        no2: 42,

        so2: 18,

        temperature: 28,

        humidity: 74,

        windSpeed: 12,

        windDirection: "NE",

        location: "Bhubaneswar, India"

    };


    // =====================================================
    // HELPER FUNCTION
    // =====================================================

    function updateElement(id, value) {

        const element =
            document.getElementById(id);

        if (element) {

            element.textContent = value;

        }
    }


    // =====================================================
    // UPDATE DASHBOARD
    // =====================================================

    function updateDashboard(data) {


        // =================================================
        // AQI
        // =================================================

        updateElement(
            "aqiValue",
            data.aqi
        );

        updateElement(
            "overviewAQI",
            data.aqi
        );


        // =================================================
        // POLLUTANTS
        // =================================================

        updateElement(
            "pm25",
            data.pm25
        );

        updateElement(
            "pm10",
            data.pm10
        );

        updateElement(
            "co",
            data.co
        );

        updateElement(
            "no2",
            data.no2
        );

        updateElement(
            "so2",
            data.so2
        );


        // =================================================
        // ENVIRONMENTAL CONDITIONS
        // =================================================

        updateElement(
            "temperature",
            data.temperature
        );

        updateElement(
            "humidity",
            data.humidity
        );

        updateElement(
            "windSpeed",
            data.windSpeed
        );

        updateElement(
            "windDirection",
            data.windDirection
        );


        // =================================================
        // LOCATION
        // =================================================

        updateElement(
            "location",
            data.location
        );


        // =================================================
        // LAST UPDATED
        // =================================================

        updateElement(
            "lastUpdated",
            "Last updated: " +
            new Date().toLocaleTimeString()
        );


        // =================================================
        // AQI STATUS
        // =================================================

        let status = "Good";


        if (data.aqi <= 50) {

            status = "Good";

        }

        else if (data.aqi <= 100) {

            status = "Moderate";

        }

        else if (data.aqi <= 200) {

            status = "Poor";

        }

        else if (data.aqi <= 300) {

            status = "Very Poor";

        }

        else {

            status = "Severe";

        }


        updateElement(
            "aqiStatus",
            status
        );

        updateElement(
            "overviewAQIStatus",
            status
        );


        // =================================================
        // DUST RISK
        // =================================================

        let dustRisk = "LOW";


        if (data.pm10 > 100) {

            dustRisk = "HIGH";

        }

        else if (data.pm10 > 50) {

            dustRisk = "MODERATE";

        }


        updateElement(
            "dustRisk",
            dustRisk
        );

        updateElement(
            "dashboardDustRisk",
            dustRisk
        );


        // =================================================
        // VISIBILITY RISK
        // =================================================

        let visibilityRisk = "LOW";


        if (data.pm25 > 75) {

            visibilityRisk = "HIGH";

        }

        else if (data.pm25 > 35) {

            visibilityRisk = "MODERATE";

        }


        updateElement(
            "visibilityRisk",
            visibilityRisk
        );

        updateElement(
            "dashboardVisibilityRisk",
            visibilityRisk
        );


        // =================================================
        // SENSOR STATUS
        // =================================================

        updateElement(
            "sensorStatus",
            "Sensor Connected"
        );


        // =================================================
        // RECOMMENDATIONS
        // =================================================

        const recommendationTitle =
            document.getElementById(
                "recommendationTitle"
            );

        const recommendationText =
            document.getElementById(
                "recommendationText"
            );


        if (
            recommendationTitle &&
            recommendationText
        ) {


            if (data.aqi <= 50) {

                recommendationTitle.textContent =
                    "Air quality is good";

                recommendationText.textContent =
                    "Environmental conditions are currently favorable. Continue regular monitoring.";

            }


            else if (data.aqi <= 100) {

                recommendationTitle.textContent =
                    "Air quality is moderate";

                recommendationText.textContent =
                    "Sensitive individuals should consider limiting prolonged outdoor exposure.";

            }


            else {

                recommendationTitle.textContent =
                    "Air quality requires attention";

                recommendationText.textContent =
                    "Increase monitoring and consider appropriate pollution-control measures in affected areas.";

            }

        }

    }


    // =====================================================
    // CHECK CURRENT AQI BUTTON
    // =====================================================

    const checkAQI =
        document.getElementById("checkAQI");


    if (checkAQI) {

        checkAQI.addEventListener(
            "click",
            function () {

                updateDashboard(sensorData);


                const dashboard =
                    document.getElementById("dashboard");


                if (dashboard) {

                    dashboard.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    // =====================================================
    // INITIAL DASHBOARD DATA
    // =====================================================

    updateDashboard(sensorData);


    // =====================================================
    // COMPLAINT FORM
    // =====================================================

    if (complaintForm) {

        complaintForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                // -------------------------------------------------
                // SECURITY CHECK
                // -------------------------------------------------

                if (!isCitizenLoggedIn()) {

                    alert(
                        "Please login as a citizen before submitting a complaint."
                    );

                    window.location.href =
                        "citizen-login.html?redirect=complaint";

                    return;

                }


                // -------------------------------------------------
                // GET FORM VALUES
                // -------------------------------------------------

                const nameElement =
                    document.getElementById(
                        "complaintName"
                    );

                const emailElement =
                    document.getElementById(
                        "complaintEmail"
                    );

                const locationElement =
                    document.getElementById(
                        "complaintLocation"
                    );

                const typeElement =
                    document.getElementById(
                        "complaintType"
                    );

                const descriptionElement =
                    document.getElementById(
                        "complaintDescription"
                    );

                const message =
                    document.getElementById(
                        "complaintMessage"
                    );


                const name =
                    nameElement
                        ? nameElement.value.trim()
                        : "";


                const email =
                    emailElement
                        ? emailElement.value.trim()
                        : "";


                const location =
                    locationElement
                        ? locationElement.value.trim()
                        : "";


                const type =
                    typeElement
                        ? typeElement.value
                        : "";


                const description =
                    descriptionElement
                        ? descriptionElement.value.trim()
                        : "";


                // -------------------------------------------------
                // VALIDATION
                // -------------------------------------------------

                if (
                    name === "" ||
                    email === "" ||
                    location === "" ||
                    type === "" ||
                    description === ""
                ) {

                    if (message) {

                        message.textContent =
                            "Please fill in all required fields.";

                        message.style.color =
                            "#d9534f";

                    }

                    return;
                }


                // -------------------------------------------------
                // GENERATE COMPLAINT ID
                // -------------------------------------------------

                const complaintId =
                    "AG-" +
                    Date.now()
                        .toString()
                        .slice(-6);


                // -------------------------------------------------
                // CREATE ONE COMPLAINT OBJECT
                // -------------------------------------------------

                const complaint = {

                    id: complaintId,

                    name: name,

                    email: email,

                    location: location,

                    type: type,

                    description: description,

                    date:
                        new Date().toLocaleString("en-IN"),

                    status: "Pending"

                };


                // -------------------------------------------------
                // SAVE COMPLAINTS
                // -------------------------------------------------

                const existingComplaints =
                    JSON.parse(
                        localStorage.getItem(
                            "airguardComplaints"
                        ) || "[]"
                    );


                existingComplaints.push(
                    complaint
                );


                localStorage.setItem(
                    "airguardComplaints",
                    JSON.stringify(
                        existingComplaints
                    )
                );


                // Also save latest complaint
                localStorage.setItem(
                    "lastComplaint",
                    JSON.stringify(
                        complaint
                    )
                );


                // -------------------------------------------------
                // SUCCESS MESSAGE
                // -------------------------------------------------

                if (message) {

                    message.textContent =
                        "Complaint submitted successfully. Complaint ID: " +
                        complaintId;

                    message.style.color =
                        "#1f9d69";

                }


                // -------------------------------------------------
                // CLEAR FORM
                // -------------------------------------------------

                complaintForm.reset();

            }
        );

    }


    // =====================================================
    // POLLUTION TREND GRAPH
    // =====================================================

    const chartCanvas =
        document.getElementById(
            "pollutionChart"
        );


    if (
        chartCanvas &&
        typeof Chart !== "undefined"
    ) {


        const ctx =
            chartCanvas.getContext("2d");


        // -------------------------------------------------
        // OLD STYLE GRAPH
        // -------------------------------------------------

        const pollutionChart =
            new Chart(
                ctx,
                {

                    type: "line",


                    data: {

                        labels: [
                            "6 AM",
                            "9 AM",
                            "12 PM",
                            "3 PM",
                            "6 PM",
                            "9 PM",
                            "Now"
                        ],


                        datasets: [

                            {

                                label: "PM2.5",


                                data: [
                                    48,
                                    55,
                                    62,
                                    58,
                                    66,
                                    70,
                                    67
                                ],


                                borderWidth: 3,


                                pointRadius: 4,


                                pointHoverRadius: 6,


                                tension: 0.4,


                                fill: true,


                                backgroundColor:
                                    "rgba(74, 180, 230, 0.35)",


                                borderColor:
                                    "#4aaee6"

                            }

                        ]

                    },


                    options: {

                        responsive: true,


                        maintainAspectRatio: false,


                        interaction: {

                            intersect: false,

                            mode: "index"

                        },


                        plugins: {

                            legend: {

                                display: true,

                                position: "top"

                            }

                        },


                        scales: {

                            y: {

                                beginAtZero: true,

                                suggestedMax: 80,

                                ticks: {

                                    stepSize: 10

                                }

                            }

                        }

                    }

                }
            );


        // -------------------------------------------------
        // POLLUTANT DROPDOWN
        // -------------------------------------------------

        const pollutantSelect =
            document.getElementById(
                "pollutantSelect"
            );


        if (pollutantSelect) {

            pollutantSelect.addEventListener(
                "change",
                function () {

                    const selected =
                        pollutantSelect.value;


                    // PM2.5
                    if (selected === "pm25") {

                        pollutionChart
                            .data
                            .datasets[0]
                            .label =
                            "PM2.5";


                        pollutionChart
                            .data
                            .datasets[0]
                            .data =
                            [
                                48,
                                55,
                                62,
                                58,
                                66,
                                70,
                                67
                            ];

                    }


                    // PM10
                    else if (selected === "pm10") {

                        pollutionChart
                            .data
                            .datasets[0]
                            .label =
                            "PM10";


                        pollutionChart
                            .data
                            .datasets[0]
                            .data =
                            [
                                100,
                                120,
                                140,
                                130,
                                150,
                                160,
                                155
                            ];

                    }


                    // AQI
                    else {

                        pollutionChart
                            .data
                            .datasets[0]
                            .label =
                            "AQI";


                        pollutionChart
                            .data
                            .datasets[0]
                            .data =
                            [
                                90,
                                105,
                                120,
                                110,
                                135,
                                142,
                                138
                            ];

                    }


                    pollutionChart.update();

                }
            );

        }

    }


    // =====================================================
    // ZONE DETAILS MODAL
    // =====================================================

    const zoneButton =
        document.getElementById(
            "zoneDetailsButton"
        );


    const zoneModal =
        document.getElementById(
            "zoneDetailsModal"
        );


    const closeZoneModal =
        document.getElementById(
            "closeZoneModal"
        );


    if (
        zoneButton &&
        zoneModal
    ) {

        zoneButton.addEventListener(
            "click",
            function () {

                zoneModal.style.display =
                    "flex";

            }
        );

    }


    if (
        closeZoneModal &&
        zoneModal
    ) {

        closeZoneModal.addEventListener(
            "click",
            function () {

                zoneModal.style.display =
                    "none";

            }
        );

    }


    if (zoneModal) {

        zoneModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === zoneModal
                ) {

                    zoneModal.style.display =
                        "none";

                }

            }
        );

    }


    // =====================================================
    // LEAFLET POLLUTION MAP
    // =====================================================

    const mapElement =
        document.getElementById(
            "airGuardMap"
        );


    if (
        mapElement &&
        typeof L !== "undefined"
    ) {


        const map =
            L.map(
                "airGuardMap"
            ).setView(
                [20.2961, 85.8245],
                12
            );


        // -------------------------------------------------
        // OPEN STREET MAP
        // -------------------------------------------------

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {

                attribution:
                    "&copy; OpenStreetMap contributors"

            }
        ).addTo(map);


        // =================================================
        // MONITORING ZONES
        // =================================================

        const zones = [

            {

                name: "Zone A",

                lat: 20.30,

                lng: 85.81,

                aqi: 75,

                pm25: 42,

                pm10: 110,

                risk: "MODERATE"

            },


            {

                name: "Zone B",

                lat: 20.28,

                lng: 85.84,

                aqi: 142,

                pm25: 72,

                pm10: 180,

                risk: "HIGH"

            },


            {

                name: "Zone C",

                lat: 20.32,

                lng: 85.85,

                aqi: 105,

                pm25: 58,

                pm10: 145,

                risk: "MODERATE"

            },


            {

                name: "Zone D",

                lat: 20.27,

                lng: 85.80,

                aqi: 210,

                pm25: 96,

                pm10: 220,

                risk: "CRITICAL"

            }

        ];


        // =================================================
        // AQI COLOUR
        // =================================================

        function getZoneColor(aqi) {

            if (aqi <= 50) {

                return "#2ecc71";

            }

            if (aqi <= 100) {

                return "#f1c40f";

            }

            if (aqi <= 200) {

                return "#e67e22";

            }

            return "#e74c3c";

        }


        // =================================================
        // CREATE MAP ZONES
        // =================================================

        zones.forEach(
            function (zone) {


                const zoneColor =
                    getZoneColor(
                        zone.aqi
                    );


                // -------------------------------------------------
                // COLOURED AREA
                // -------------------------------------------------

                L.circle(
                    [
                        zone.lat,
                        zone.lng
                    ],
                    {

                        radius: 1200,

                        color: zoneColor,

                        fillColor: zoneColor,

                        fillOpacity: 0.28,

                        weight: 2

                    }
                ).addTo(map);


                // -------------------------------------------------
                // MAIN COLOURED MARKER
                // -------------------------------------------------

                L.circleMarker(
                    [
                        zone.lat,
                        zone.lng
                    ],
                    {

                        radius: 9,

                        color: "#ffffff",

                        weight: 2,

                        fillColor: zoneColor,

                        fillOpacity: 1

                    }
                )
                .addTo(map)
                .bindPopup(
                    "<strong>" +
                    zone.name +
                    "</strong><br>" +
                    "AQI: " +
                    zone.aqi +
                    "<br>" +
                    "PM2.5: " +
                    zone.pm25 +
                    "<br>" +
                    "PM10: " +
                    zone.pm10 +
                    "<br>" +
                    "Risk: " +
                    zone.risk
                );


                // -------------------------------------------------
                // ZONE CLICK MARKER
                // -------------------------------------------------

                const zoneMarker =
                    L.circleMarker(
                        [
                            zone.lat,
                            zone.lng
                        ],
                        {

                            radius: 5,

                            color: zoneColor,

                            fillColor: zoneColor,

                            fillOpacity: 0.9,

                            weight: 1

                        }
                    );


                zoneMarker.on(
                    "click",
                    function () {


                        updateElement(
                            "zoneName",
                            zone.name
                        );


                        updateElement(
                            "zoneAQI",
                            zone.aqi
                        );


                        updateElement(
                            "zonePM25",
                            zone.pm25
                        );


                        updateElement(
                            "zonePM10",
                            zone.pm10
                        );


                        updateElement(
                            "zoneRisk",
                            zone.risk
                        );

                    }
                );


                zoneMarker.addTo(map);

            }
        );


        // =================================================
        // MAP LEGEND
        // =================================================

        const legend =
            L.control({
                position: "bottomright"
            });


        legend.onAdd =
            function () {


                const div =
                    L.DomUtil.create(
                        "div",
                        "airguard-map-legend"
                    );


                div.innerHTML = `

                    <div style="
                        background:white;
                        padding:12px 15px;
                        border-radius:8px;
                        box-shadow:0 2px 8px rgba(0,0,0,0.25);
                        font-size:12px;
                        line-height:1.8;
                    ">

                        <strong>
                            Air Quality
                        </strong>

                        <br>

                        <span style="
                            display:inline-block;
                            width:12px;
                            height:12px;
                            background:#2ecc71;
                            border-radius:50%;
                            margin-right:5px;
                        "></span>

                        Good (0-50)

                        <br>

                        <span style="
                            display:inline-block;
                            width:12px;
                            height:12px;
                            background:#f1c40f;
                            border-radius:50%;
                            margin-right:5px;
                        "></span>

                        Moderate (51-100)

                        <br>

                        <span style="
                            display:inline-block;
                            width:12px;
                            height:12px;
                            background:#e67e22;
                            border-radius:50%;
                            margin-right:5px;
                        "></span>

                        Poor (101-200)

                        <br>

                        <span style="
                            display:inline-block;
                            width:12px;
                            height:12px;
                            background:#e74c3c;
                            border-radius:50%;
                            margin-right:5px;
                        "></span>

                        Very Poor (201+)

                    </div>

                `;


                return div;

            };


        legend.addTo(map);


        // -------------------------------------------------
        // FIX MAP SIZE
        // -------------------------------------------------

        setTimeout(
            function () {

                map.invalidateSize();

            },
            500
        );

    }


    // =====================================================
    // FINAL
    // =====================================================

    console.log(
        "AirGuard JavaScript loaded successfully."
    );

});
// =====================================================
// CITIZEN COMPLAINT STATUS & STATISTICS
// =====================================================

function getAirGuardComplaints() {
    try {
        return JSON.parse(
            localStorage.getItem("airguardComplaints") || "[]"
        );
    } catch (error) {
        console.error("Unable to read complaints:", error);
        return [];
    }
}


// =====================================================
// UPDATE CITIZEN COMPLAINT STATISTICS
// =====================================================

function updateCitizenComplaintStats() {

    const complaints = getAirGuardComplaints();

    let pending = 0;
    let inProgress = 0;
    let resolved = 0;

    complaints.forEach(function (complaint) {

        const status = complaint.status || "Pending";

        if (status === "Resolved") {
            resolved++;
        }
        else if (status === "In Progress") {
            inProgress++;
        }
        else {
            pending++;
        }
    });


    const totalElement =
        document.getElementById("citizenTotalComplaints");

    if (totalElement) {
        totalElement.textContent = complaints.length;
    }


    const pendingElement =
        document.getElementById("citizenPendingComplaints");

    if (pendingElement) {
        pendingElement.textContent = pending;
    }


    const progressElement =
        document.getElementById("citizenProgressComplaints");

    if (progressElement) {
        progressElement.textContent = inProgress;
    }


    const resolvedElement =
        document.getElementById("citizenResolvedComplaints");

    if (resolvedElement) {
        resolvedElement.textContent = resolved;
    }
}


// =====================================================
// TRACK CITIZEN COMPLAINT
// =====================================================

function trackCitizenComplaint() {

    const input =
        document.getElementById("trackComplaintId");

    const result =
        document.getElementById("complaintTrackingResult");

    if (!input || !result) {
        return;
    }


    const enteredId =
        input.value.trim();


    if (!enteredId) {

        result.innerHTML = `
            <div class="tracking-error">
                Please enter your Complaint ID.
            </div>
        `;

        return;
    }


    const complaints =
        getAirGuardComplaints();


    const complaint =
        complaints.find(function (item) {

            return String(item.id).toLowerCase() ===
                   enteredId.toLowerCase();

        });


    if (!complaint) {

        result.innerHTML = `
            <div class="tracking-error">

                <strong>Complaint not found</strong>

                <p>
                    Please check your Complaint ID
                    and try again.
                </p>

            </div>
        `;

        return;
    }


    const status =
        complaint.status || "Pending";


    let statusClass = "pending";

    let statusMessage =
        "Your complaint is awaiting review.";


    if (status === "In Progress") {

        statusClass = "progress";

        statusMessage =
            "Your complaint is currently being investigated.";
    }


    if (status === "Resolved") {

        statusClass = "resolved";

        statusMessage =
            "Your complaint has been successfully resolved.";
    }
result.style.display = "block";

    result.innerHTML = `

        <div class="complaint-result">

            <div class="tracking-header">

                <div>

                    <span>
                        COMPLAINT ID
                    </span>

                    <strong>
                        ${complaint.id || "--"}
                    </strong>

                </div>

                <div class="status-badge ${statusClass}">

                    ${status}

                </div>

            </div>


            <div class="tracking-details">

                <div>
                    <small>Location</small>

                    <strong>
                        ${complaint.location || "--"}
                    </strong>
                </div>


                <div>
                    <small>Complaint Type</small>

                    <strong>
                        ${complaint.type || "--"}
                    </strong>
                </div>


                <div>
                    <small>Date Submitted</small>

                    <strong>
                        ${complaint.date || "--"}
                    </strong>
                </div>

            </div>


            <div class="tracking-message">

                ${statusMessage}

            </div>

        </div>

    `;
}


// =====================================================
// INITIALIZE CITIZEN TRACKING
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Citizen tracking initialized");

    // Update statistics
    updateCitizenComplaintStats();

    const trackButton =
        document.getElementById("trackComplaintBtn");

    const trackInput =
        document.getElementById("trackComplaintId");

    if (!trackButton) {
        console.error("Track Complaint button not found!");
        return;
    }

    if (!trackInput) {
        console.error("Complaint ID input not found!");
        return;
    }

    // Track button
    trackButton.addEventListener("click", function (event) {

        event.preventDefault();

        console.log(
            "Track button clicked:",
            trackInput.value
        );

        trackCitizenComplaint();

    });

    // Press Enter
    trackInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            trackCitizenComplaint();

        }

    });

});


// =====================================================
// REFRESH WHEN OFFICER CHANGES COMPLAINT STATUS
// =====================================================

window.addEventListener(
    "storage",
    function (event) {

        if (event.key === "airguardComplaints") {

            updateCitizenComplaintStats();

            const input =
                document.getElementById(
                    "trackComplaintId"
                );


            if (
                input &&
                input.value.trim() !== ""
            ) {

                trackCitizenComplaint();

            }

        }

    }
);
/* =====================================================
   AI POLLUTION INSIGHTS
   ===================================================== */

const homeGenerateAI = document.getElementById("homeGenerateAI");

if (homeGenerateAI) {

    homeGenerateAI.addEventListener("click", function () {

        /*
         * Read the existing AQI and PM2.5 values
         * from the homepage.
         */

        const aqiElement = document.getElementById("aqiValue");
        const pm25Element = document.getElementById("pm25");

        const aqi = parseFloat(
            aqiElement?.textContent
        );

        const pm25 = parseFloat(
            pm25Element?.textContent
        );


        const aqiDisplay =
            document.getElementById("homeAI_AQI");

        const pm25Display =
            document.getElementById("homeAI_PM25");

        const riskDisplay =
            document.getElementById("homeAI_Risk");

        const title =
            document.getElementById("homeAI_Title");

        const message =
            document.getElementById("homeAI_Message");


        /* Show values */

        if (!isNaN(aqi)) {
            aqiDisplay.textContent = aqi;
        } else {
            aqiDisplay.textContent = "--";
        }


        if (!isNaN(pm25)) {
            pm25Display.textContent = pm25;
        } else {
            pm25Display.textContent = "--";
        }


        /* AI interpretation */

        if (isNaN(aqi)) {

            riskDisplay.textContent = "--";

            title.textContent =
                "Waiting for sensor data";

            message.textContent =
                "The AI system is waiting for current environmental sensor readings.";

            return;
        }


        if (aqi <= 50) {

            riskDisplay.textContent = "LOW";

            title.textContent =
                "Pollution Level: Good";

            message.textContent =
                "The current air quality is within a relatively safe range. Continue regular environmental monitoring.";

        }
        else if (aqi <= 100) {

            riskDisplay.textContent = "MODERATE";

            title.textContent =
                "Pollution Level: Moderate";

            message.textContent =
                "Air quality is acceptable but pollution levels should continue to be monitored, especially around mining and industrial areas.";

        }
        else if (aqi <= 200) {

            riskDisplay.textContent = "HIGH";

            title.textContent =
                "Pollution Level: Elevated";

            message.textContent =
                "The current AQI indicates elevated pollution. Continuous monitoring is recommended and sensitive areas should be observed closely.";

        }
        else {

            riskDisplay.textContent = "CRITICAL";

            title.textContent =
                "Pollution Level: Critical";

            message.textContent =
                "The AQI indicates a significant pollution concern. Immediate environmental monitoring and appropriate action are recommended.";

        }

    });

}

