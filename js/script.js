// =====================================================
// MINEGUARD MAIN JAVASCRIPT
// Smart Environmental Monitoring System
// =====================================================


// =====================================================
// IMAGE HELPER
// Compress image before storing in localStorage
// =====================================================

function readImageAsBase64(file) {

    return new Promise((resolve, reject) => {

        if (!file) {
            resolve("");
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {

            const img = new Image();

            img.onload = function () {

                const MAX_WIDTH = 1000;
                const MAX_HEIGHT = 1000;

                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH || height > MAX_HEIGHT) {

                    const ratio = Math.min(
                        MAX_WIDTH / width,
                        MAX_HEIGHT / height
                    );

                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                const canvas =
                    document.createElement("canvas");

                canvas.width = width;
                canvas.height = height;

                const ctx =
                    canvas.getContext("2d");

                ctx.drawImage(
                    img,
                    0,
                    0,
                    width,
                    height
                );

                const compressedImage =
                    canvas.toDataURL(
                        "image/jpeg",
                        0.75
                    );

                resolve(compressedImage);
            };

            img.onerror = function () {
                reject(new Error("Unable to process image."));
            };

            img.src = reader.result;
        };

        reader.onerror = function () {
            reject(reader.error);
        };

        reader.readAsDataURL(file);
    });
}



// =====================================================
// MAIN DOM READY
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log("MineGuard JavaScript started");



        // =================================================
        // CITIZEN COMPLAINT ACCESS CONTROL
        // =================================================

        const complaintSection =
            document.getElementById("complaint");

        const complaintForm =
            document.getElementById("complaintForm");


        function isCitizenLoggedIn() {

            return (
                localStorage.getItem(
                    "citizenLoggedIn"
                ) === "true"
            );

        }


        function showComplaintSection() {

            if (!complaintSection) return;

            complaintSection.style.display =
                "block";

            setTimeout(function () {

                complaintSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 200);

        }


        function hideComplaintSection() {

            if (!complaintSection) return;

            complaintSection.style.display =
                "none";

        }



        // =================================================
        // CITIZEN COMPLAINT TRACKING ACCESS
        // =================================================

        const trackingSection =
            document.getElementById(
                "trackComplaint"
            );

        const trackingNav =
            document.getElementById(
                "trackComplaintNav"
            );


        function updateTrackingAccess() {

            const loggedIn =
                localStorage.getItem(
                    "citizenLoggedIn"
                ) === "true";


            if (trackingSection) {

                trackingSection.style.display =
                    loggedIn
                        ? "block"
                        : "none";

            }


            if (trackingNav) {

                trackingNav.style.display =
                    loggedIn
                        ? "inline-block"
                        : "none";

            }

        }


        updateTrackingAccess();


        window.addEventListener(
            "storage",
            function (event) {

                if (
                    event.key ===
                    "citizenLoggedIn"
                ) {

                    updateTrackingAccess();

                }

            }
        );



        // =================================================
        // CHECK COMPLAINT ACCESS
        // =================================================

        function checkComplaintAccess() {

            const hash =
                window.location.hash;


            if (hash === "#complaint") {

                if (!isCitizenLoggedIn()) {

                    hideComplaintSection();

                    window.location.href =
                        "citizen-login.html?redirect=complaint";

                    return;

                }

                showComplaintSection();

                return;
            }


            hideComplaintSection();

        }


        checkComplaintAccess();


        window.addEventListener(
            "hashchange",
            function () {

                checkComplaintAccess();

            }
        );



        // =================================================
        // REPORT ISSUE BUTTON
        // =================================================

        const reportButtons =
            document.querySelectorAll(
                'a[href="#complaint"], a[href="index.html#complaint"]'
            );


        reportButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        if (isCitizenLoggedIn()) {

                            window.location.href =
                                "index.html#complaint";

                        }

                        else {

                            window.location.href =
                                "citizen-login.html?redirect=complaint";

                        }

                    }
                );

            }
        );



        // =================================================
        // DEMO SENSOR DATA
        // =================================================

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



        // =================================================
        // HELPER FUNCTION
        // =================================================

        function updateElement(id, value) {

            const element =
                document.getElementById(id);

            if (element) {

                element.textContent =
                    value;

            }

        }



        // =================================================
        // UPDATE DASHBOARD
        // =================================================

        function updateDashboard(data) {


            // AQI

            updateElement(
                "aqiValue",
                data.aqi
            );

            updateElement(
                "overviewAQI",
                data.aqi
            );


            // POLLUTANTS

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


            // ENVIRONMENT

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


            // LOCATION

            updateElement(
                "location",
                data.location
            );


            // LAST UPDATED

            updateElement(
                "lastUpdated",
                "Last updated: " +
                new Date().toLocaleTimeString()
            );


            // AQI STATUS

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


            // DUST RISK

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


            // VISIBILITY RISK

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


            // SENSOR STATUS

            updateElement(
                "sensorStatus",
                "Sensor Connected"
            );


            // RECOMMENDATIONS

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



        // =================================================
        // CHECK CURRENT AQI BUTTON
        // =================================================

        const checkAQI =
            document.getElementById(
                "checkAQI"
            );


        if (checkAQI) {

            checkAQI.addEventListener(
                "click",
                function () {

                    updateDashboard(
                        sensorData
                    );


                    const dashboard =
                        document.getElementById(
                            "dashboard"
                        );


                    if (dashboard) {

                        dashboard.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }



        // =================================================
        // INITIAL DASHBOARD
        // =================================================

        updateDashboard(
            sensorData
        );



        // =================================================
        // COMPLAINT FORM
        // =================================================

        if (complaintForm) {

            complaintForm.addEventListener(
                "submit",
                async function (e) {

                    e.preventDefault();


                    // SECURITY CHECK

                    if (!isCitizenLoggedIn()) {

                        alert(
                            "Please login as a citizen before submitting a complaint."
                        );

                        window.location.href =
                            "citizen-login.html?redirect=complaint";

                        return;

                    }


                    const message =
                        document.getElementById(
                            "complaintMessage"
                        );


                    // GET IMAGE

                    const imageInput =
                        document.getElementById(
                            "complaintImage"
                        );

                    const imageFile =
                        imageInput
                            ? imageInput.files[0]
                            : null;


                    let imageData = "";


                    // Show submitting state

                    const submitButton =
                        complaintForm.querySelector(
                            'button[type="submit"], input[type="submit"]'
                        );


                    const originalButtonText =
                        submitButton
                            ? submitButton.textContent
                            : "";


                    if (submitButton) {

                        submitButton.disabled =
                            true;

                        if (
                            submitButton.tagName ===
                            "BUTTON"
                        ) {

                            submitButton.textContent =
                                "Submitting...";

                        }

                    }


                    try {

                        // PROCESS IMAGE

                        if (imageFile) {

                            imageData =
                                await readImageAsBase64(
                                    imageFile
                                );

                        }


                        // GET FORM VALUES

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


                        // VALIDATION

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


                        // GENERATE ID

                        const complaintId =
                            "MG-" +
                            Date.now()
                                .toString()
                                .slice(-6);


                        // CREATE COMPLAINT

                        const complaint = {

                            id: complaintId,

                            name: name,

                            email: email,

                            location: location,

                            type: type,

                            description: description,

                            date:
                                new Date().toLocaleString(
                                    "en-IN"
                                ),

                            status:
                                "Pending",

                            image:
                                imageData

                        };


                        // GET EXISTING COMPLAINTS

                        let existingComplaints = [];


                        try {

                            existingComplaints =
                                JSON.parse(
                                    localStorage.getItem(
                                        "airguardComplaints"
                                    ) || "[]"
                                );

                            if (
                                !Array.isArray(
                                    existingComplaints
                                )
                            ) {

                                existingComplaints =
                                    [];

                            }

                        }

                        catch (storageReadError) {

                            console.error(
                                "Unable to read complaints:",
                                storageReadError
                            );

                            existingComplaints =
                                [];

                        }


                        // SAVE COMPLAINT

                        existingComplaints.push(
                            complaint
                        );


                        try {

                            localStorage.setItem(
                                "airguardComplaints",
                                JSON.stringify(
                                    existingComplaints
                                )
                            );


                            localStorage.setItem(
                                "lastComplaint",
                                JSON.stringify(
                                    complaint
                                )
                            );

                        }

                        catch (storageError) {

                            console.error(
                                "Complaint storage error:",
                                storageError
                            );


                            // Try once without image

                            try {

                                const complaintWithoutImage =
                                    {
                                        ...complaint,
                                        image: ""
                                    };


                                existingComplaints[
                                    existingComplaints.length - 1
                                ] =
                                    complaintWithoutImage;


                                localStorage.setItem(
                                    "airguardComplaints",
                                    JSON.stringify(
                                        existingComplaints
                                    )
                                );


                                localStorage.setItem(
                                    "lastComplaint",
                                    JSON.stringify(
                                        complaintWithoutImage
                                    )
                                );


                                alert(
                                    "The complaint was saved, but the uploaded image could not be stored. Please try again without the image."
                                );


                            }

                            catch (finalStorageError) {

                                alert(
                                    "The complaint could not be saved. Please try again."
                                );

                                return;

                            }

                        }


                        // SUCCESS MESSAGE

                        if (message) {

                            message.textContent =
                                "Complaint submitted successfully. Complaint ID: " +
                                complaintId;

                            message.style.color =
                                "#1f9d69";

                        }


                        // CLEAR FORM

                        complaintForm.reset();


                        // UPDATE STATISTICS

                        if (
                            typeof updateCitizenComplaintStats ===
                            "function"
                        ) {

                            updateCitizenComplaintStats();

                        }

                    }

                    catch (error) {

                        console.error(
                            "Complaint submission error:",
                            error
                        );


                        alert(
                            "The complaint could not be saved. Please try again without the image."
                        );

                    }

                    finally {

                        if (submitButton) {

                            submitButton.disabled =
                                false;


                            if (
                                submitButton.tagName ===
                                "BUTTON"
                            ) {

                                submitButton.textContent =
                                    originalButtonText ||
                                    "Submit Complaint";

                            }

                        }

                    }

                }
            );

        }



        // =================================================
        // POLLUTION TREND GRAPH
        // =================================================

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

                                    label:
                                        "PM2.5",

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

                            maintainAspectRatio:
                                false,

                            interaction: {

                                intersect:
                                    false,

                                mode:
                                    "index"

                            },


                            plugins: {

                                legend: {

                                    display:
                                        true,

                                    position:
                                        "top"

                                }

                            },


                            scales: {

                                y: {

                                    beginAtZero:
                                        true,

                                    suggestedMax:
                                        80,

                                    ticks: {

                                        stepSize:
                                            10

                                    }

                                }

                            }

                        }

                    }
                );


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


                        if (
                            selected ===
                            "pm25"
                        ) {

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

                        else if (
                            selected ===
                            "pm10"
                        ) {

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



        // =================================================
        // ZONE DETAILS MODAL
        // =================================================

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
                        event.target ===
                        zoneModal
                    ) {

                        zoneModal.style.display =
                            "none";

                    }

                }
            );

        }



        // =================================================
        // MINEGUARD LOCATION + GPS MAP
        // =================================================

        const mapElement =
            document.getElementById(
                "MineGuardMap"
            );


        if (
            mapElement &&
            typeof L !== "undefined"
        ) {


            // =================================================
            // CREATE ONLY ONE MAP
            // =================================================

            const map =
                L.map(
                    mapElement
                ).setView(
                    [20.2961, 85.8245],
                    6
                );


            // =================================================
            // OPEN STREET MAP
            // =================================================

            L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {

                    maxZoom: 19,

                    attribution:
                        "&copy; OpenStreetMap contributors"

                }
            ).addTo(map);



            // =================================================
            // CURRENT LOCATION MARKER
            // =================================================

            let currentMarker =
                null;



            // =================================================
            // MONITORING ZONE DATA
            // =================================================
            // IMPORTANT:
            // These AQI values remain the same.
            // Their LOCATION is changed dynamically
            // whenever the user searches a new place.
            // =================================================

            const zoneData = [

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



            // =================================================
            // MAP ZONE LAYERS
            // =================================================

            let zoneLayers = [];



            // =================================================
            // AQI STATUS
            // =================================================

            function getAQIStatus(aqi) {

                if (aqi <= 50) {

                    return {

                        level: "LOW",

                        color: "#22b573",

                        background: "#e8f8f0"

                    };

                }


                if (aqi <= 100) {

                    return {

                        level: "MODERATE",

                        color: "#e6b800",

                        background: "#fff9d9"

                    };

                }


                if (aqi <= 200) {

                    return {

                        level: "HIGH",

                        color: "#f28c28",

                        background: "#fff0df"

                    };

                }


                return {

                    level: "CRITICAL",

                    color: "#e74c4c",

                    background: "#ffe5e5"

                };

            }



            // =================================================
            // REMOVE OLD ZONES
            // =================================================

            function clearMonitoringZones() {

                zoneLayers.forEach(
                    function (layer) {

                        if (map.hasLayer(layer)) {

                            map.removeLayer(layer);

                        }

                    }
                );


                zoneLayers = [];

            }



            // =================================================
            // CREATE MONITORING ZONES
            // =================================================
            // The four zones are placed around the
            // currently selected location.
            // =================================================

            function createMonitoringZones(
                centerLat,
                centerLng
            ) {


                clearMonitoringZones();


                // Positions around selected location

                const positions = [

                    {

                        lat:
                            centerLat + 0.020,

                        lng:
                            centerLng - 0.020

                    },

                    {

                        lat:
                            centerLat,

                        lng:
                            centerLng

                    },

                    {

                        lat:
                            centerLat + 0.020,

                        lng:
                            centerLng + 0.025

                    },

                    {

                        lat:
                            centerLat - 0.025,

                        lng:
                            centerLng + 0.015

                    }

                ];



                zoneData.forEach(
                    function (zone, index) {


                        const position =
                            positions[index];


                        const status =
                            getAQIStatus(
                                zone.aqi
                            );



                        // =================================================
                        // COLOURED AREA
                        // =================================================

                        const area =
                            L.circle(
                                [
                                    position.lat,
                                    position.lng
                                ],
                                {

                                    radius:
                                        1200,

                                    color:
                                        status.color,

                                    fillColor:
                                        status.color,

                                    fillOpacity:
                                        0.20,

                                    weight:
                                        2

                                }
                            ).addTo(map);


                        zoneLayers.push(
                            area
                        );



                        // =================================================
                        // COLOURED MARKER
                        // =================================================

                        const zoneMarker =
                            L.circleMarker(
                                [
                                    position.lat,
                                    position.lng
                                ],
                                {

                                    radius:
                                        12,

                                    color:
                                        "#ffffff",

                                    weight:
                                        3,

                                    fillColor:
                                        status.color,

                                    fillOpacity:
                                        0.95

                                }
                            ).addTo(map);


                        zoneLayers.push(
                            zoneMarker
                        );



                        // =================================================
                        // POPUP
                        // =================================================

                        zoneMarker.bindPopup(`

                            <div style="
                                min-width:220px;
                                font-family:Arial,sans-serif;
                            ">

                                <h3 style="
                                    margin:0 0 10px;
                                    color:#123d42;
                                ">
                                    ${zone.name}
                                </h3>


                                <div style="
                                    display:inline-block;
                                    padding:5px 10px;
                                    border-radius:20px;
                                    background:${status.background};
                                    color:${status.color};
                                    font-weight:700;
                                    font-size:12px;
                                    margin-bottom:12px;
                                ">
                                    ${status.level}
                                </div>


                                <p>
                                    <strong>AQI:</strong>
                                    ${zone.aqi}
                                </p>


                                <p>
                                    <strong>PM2.5:</strong>
                                    ${zone.pm25} µg/m³
                                </p>


                                <p>
                                    <strong>PM10:</strong>
                                    ${zone.pm10} µg/m³
                                </p>


                                <p style="
                                    margin-top:10px;
                                    padding:8px;
                                    border-radius:8px;
                                    background:${status.background};
                                    color:${status.color};
                                    font-weight:700;
                                ">
                                    Environmental Risk:
                                    ${status.level}
                                </p>

                            </div>

                        `);



                        // =================================================
                        // TOOLTIP
                        // =================================================

                        zoneMarker.bindTooltip(
                            `${zone.name} — ${status.level}`,
                            {

                                direction:
                                    "top",

                                offset:
                                    [0, -10]

                            }
                        );



                        // =================================================
                        // OPTIONAL ZONE DETAILS UPDATE
                        // =================================================

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
                                    status.level
                                );

                            }
                        );

                    }
                );

            }



            // =================================================
            // INITIAL ZONES
            // =================================================

            createMonitoringZones(
                20.2961,
                85.8245
            );



            // =================================================
            // MAP LEGEND
            // =================================================

            const legend =
                L.control({
                    position:
                        "bottomright"
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



            // =================================================
            // LOCATION SEARCH ELEMENTS
            // =================================================

            const locationButton =
                document.getElementById(
                    "useMyLocationBtn"
                );


            const locationStatus =
                document.getElementById(
                    "locationStatus"
                );


            const searchInput =
                document.getElementById(
                    "locationSearch"
                );


            const searchButton =
                document.getElementById(
                    "searchLocationBtn"
                );



            // =================================================
            // SHOW RISK INFORMATION
            // =================================================

            function getRiskMessage() {

                const criticalZones =
                    zoneData.filter(
                        function (zone) {

                            return zone.aqi > 200;

                        }
                    );


                const highRiskZones =
                    zoneData.filter(
                        function (zone) {

                            return (
                                zone.aqi > 100 &&
                                zone.aqi <= 200
                            );

                        }
                    );


                let message =
                    "";


                if (
                    criticalZones.length >
                    0
                ) {

                    message +=
                        " 🔴 Critical: " +
                        criticalZones
                            .map(
                                zone =>
                                    zone.name
                            )
                            .join(", ");

                }


                if (
                    highRiskZones.length >
                    0
                ) {

                    message +=
                        " 🟠 High: " +
                        highRiskZones
                            .map(
                                zone =>
                                    zone.name
                            )
                            .join(", ");

                }


                return message;

            }



            // =================================================
            // GPS — USE CURRENT LOCATION
            // =================================================

            if (locationButton) {

                locationButton.addEventListener(
                    "click",
                    function () {


                        if (
                            !navigator.geolocation
                        ) {

                            if (
                                locationStatus
                            ) {

                                locationStatus.textContent =
                                    "❌ GPS is not supported by this browser.";

                            }

                            return;

                        }


                        if (
                            locationStatus
                        ) {

                            locationStatus.textContent =
                                "📡 Getting your current location...";

                        }


                        navigator.geolocation.getCurrentPosition(

                            function (position) {


                                const latitude =
                                    position.coords.latitude;


                                const longitude =
                                    position.coords.longitude;



                                // Move map

                                map.setView(
                                    [
                                        latitude,
                                        longitude
                                    ],
                                    13
                                );



                                // Remove old marker

                                if (
                                    currentMarker
                                ) {

                                    map.removeLayer(
                                        currentMarker
                                    );

                                }



                                // Create GPS marker

                                currentMarker =
                                    L.marker(
                                        [
                                            latitude,
                                            longitude
                                        ]
                                    ).addTo(map);



                                currentMarker
                                    .bindPopup(`

                                        <div>

                                            <strong>
                                                📍 Your Current Location
                                            </strong>

                                            <br><br>

                                            Latitude:
                                            ${latitude.toFixed(6)}

                                            <br>

                                            Longitude:
                                            ${longitude.toFixed(6)}

                                        </div>

                                    `)
                                    .openPopup();



                                // =================================================
                                // MOVE COLOURED ZONES TO GPS LOCATION
                                // =================================================

                                createMonitoringZones(
                                    latitude,
                                    longitude
                                );



                                // Status

                                if (
                                    locationStatus
                                ) {

                                    locationStatus.textContent =
                                        "📍 Your current location is shown on the map." +
                                        getRiskMessage();

                                }

                            },


                            function (error) {

                                if (
                                    !locationStatus
                                ) {
                                    return;
                                }


                                if (
                                    error.code === 1
                                ) {

                                    locationStatus.textContent =
                                        "❌ Location permission was denied.";

                                }

                                else if (
                                    error.code === 2
                                ) {

                                    locationStatus.textContent =
                                        "❌ Your location could not be determined.";

                                }

                                else if (
                                    error.code === 3
                                ) {

                                    locationStatus.textContent =
                                        "❌ Location request timed out.";

                                }

                                else {

                                    locationStatus.textContent =
                                        "❌ Unable to get your location.";

                                }

                            },


                            {

                                enableHighAccuracy:
                                    true,

                                timeout:
                                    10000,

                                maximumAge:
                                    0

                            }

                        );

                    }
                );

            }



            // =================================================
            // SEARCH LOCATION
            // =================================================

            async function searchLocation() {


                if (!searchInput) {

                    return;

                }


                const query =
                    searchInput.value.trim();


                if (!query) {

                    if (
                        locationStatus
                    ) {

                        locationStatus.textContent =
                            "⚠️ Please enter a city or location.";

                    }

                    return;

                }


                if (
                    locationStatus
                ) {

                    locationStatus.textContent =
                        "🔎 Searching for location...";

                }


                try {


                    const response =
                        await fetch(
                            "https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=" +
                            encodeURIComponent(
                                query
                            ),
                            {

                                headers: {

                                    "Accept":
                                        "application/json"

                                }

                            }
                        );


                    if (
                        !response.ok
                    ) {

                        throw new Error(
                            "Location search failed."
                        );

                    }


                    const results =
                        await response.json();


                    if (
                        !results ||
                        results.length === 0
                    ) {

                        if (
                            locationStatus
                        ) {

                            locationStatus.textContent =
                                "❌ Location not found. Try another name.";

                        }

                        return;

                    }


                    const location =
                        results[0];


                    const latitude =
                        parseFloat(
                            location.lat
                        );


                    const longitude =
                        parseFloat(
                            location.lon
                        );


                    if (
                        !Number.isFinite(
                            latitude
                        ) ||
                        !Number.isFinite(
                            longitude
                        )
                    ) {

                        throw new Error(
                            "Invalid location coordinates."
                        );

                    }



                    // =================================================
                    // MOVE MAP TO SEARCHED LOCATION
                    // =================================================

                    map.setView(
                        [
                            latitude,
                            longitude
                        ],
                        13
                    );



                    // =================================================
                    // REMOVE PREVIOUS SEARCH/GPS MARKER
                    // =================================================

                    if (
                        currentMarker
                    ) {

                        map.removeLayer(
                            currentMarker
                        );

                    }



                    // =================================================
                    // CREATE SEARCH MARKER
                    // =================================================

                    currentMarker =
                        L.marker(
                            [
                                latitude,
                                longitude
                            ]
                        ).addTo(map);



                    currentMarker
                        .bindPopup(`

                            <div>

                                <strong>
                                    📍 Selected Location
                                </strong>

                                <br><br>

                                ${location.display_name}

                            </div>

                        `)
                        .openPopup();



                    // =================================================
                    // MOST IMPORTANT FIX
                    // MOVE ALL COLOURED ZONES
                    // TO THE SEARCHED LOCATION
                    // =================================================

                    createMonitoringZones(
                        latitude,
                        longitude
                    );



                    // =================================================
                    // STATUS MESSAGE
                    // =================================================

                    if (
                        locationStatus
                    ) {

                        locationStatus.textContent =
                            "📍 Showing: " +
                            location.display_name +
                            getRiskMessage();

                    }

                }

                catch (error) {

                    console.error(
                        "Location search error:",
                        error
                    );


                    if (
                        locationStatus
                    ) {

                        locationStatus.textContent =
                            "❌ Unable to search for this location. Please try again.";

                    }

                }

            }



            // =================================================
            // SEARCH BUTTON
            // =================================================

            if (searchButton) {

                searchButton.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        searchLocation();

                    }
                );

            }



            // =================================================
            // ENTER KEY SEARCH
            // =================================================

            if (searchInput) {

                searchInput.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key ===
                            "Enter"
                        ) {

                            event.preventDefault();

                            searchLocation();

                        }

                    }
                );

            }



            // =================================================
            // FIX LEAFLET SIZE
            // =================================================

            setTimeout(
                function () {

                    map.invalidateSize();

                },
                500
            );

        }


        // =================================================
        // FINAL
        // =================================================

        console.log(
            "MineGuard JavaScript loaded successfully."
        );

    }
);



// =====================================================
// CITIZEN COMPLAINT STATUS & STATISTICS
// =====================================================

function getAirGuardComplaints() {

    try {

        const complaints =
            JSON.parse(
                localStorage.getItem(
                    "airguardComplaints"
                ) || "[]"
            );


        return Array.isArray(
            complaints
        )
            ? complaints
            : [];

    }

    catch (error) {

        console.error(
            "Unable to read complaints:",
            error
        );

        return [];

    }

}



// =====================================================
// UPDATE CITIZEN COMPLAINT STATISTICS
// =====================================================

function updateCitizenComplaintStats() {

    const complaints =
        getAirGuardComplaints();


    let pending = 0;

    let inProgress = 0;

    let resolved = 0;


    complaints.forEach(
        function (complaint) {

            const status =
                complaint.status ||
                "Pending";


            if (
                status ===
                "Resolved"
            ) {

                resolved++;

            }

            else if (
                status ===
                "In Progress"
            ) {

                inProgress++;

            }

            else {

                pending++;

            }

        }
    );


    const totalElement =
        document.getElementById(
            "citizenTotalComplaints"
        );


    if (totalElement) {

        totalElement.textContent =
            complaints.length;

    }


    const pendingElement =
        document.getElementById(
            "citizenPendingComplaints"
        );


    if (pendingElement) {

        pendingElement.textContent =
            pending;

    }


    const progressElement =
        document.getElementById(
            "citizenProgressComplaints"
        );


    if (progressElement) {

        progressElement.textContent =
            inProgress;

    }


    const resolvedElement =
        document.getElementById(
            "citizenResolvedComplaints"
        );


    if (resolvedElement) {

        resolvedElement.textContent =
            resolved;

    }

}



// =====================================================
// TRACK CITIZEN COMPLAINT
// =====================================================

function trackCitizenComplaint() {

    const input =
        document.getElementById(
            "trackComplaintId"
        );


    const result =
        document.getElementById(
            "complaintTrackingResult"
        );


    if (!input || !result) {

        return;

    }


    const enteredId =
        input.value.trim();


    if (!enteredId) {

        result.style.display =
            "block";


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
        complaints.find(
            function (item) {

                return (
                    String(item.id)
                        .toLowerCase() ===
                    enteredId.toLowerCase()
                );

            }
        );


    if (!complaint) {

        result.style.display =
            "block";


        result.innerHTML = `

            <div class="tracking-error">

                <strong>
                    Complaint not found
                </strong>

                <p>
                    Please check your Complaint ID
                    and try again.
                </p>

            </div>

        `;

        return;

    }


    const status =
        complaint.status ||
        "Pending";


    let statusClass =
        "pending";


    let statusMessage =
        "Your complaint is awaiting review.";


    if (
        status ===
        "In Progress"
    ) {

        statusClass =
            "progress";


        statusMessage =
            "Your complaint is currently being investigated.";

    }


    if (
        status ===
        "Resolved"
    ) {

        statusClass =
            "resolved";


        statusMessage =
            "Your complaint has been successfully resolved.";

    }


    result.style.display =
        "block";


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

                    <small>
                        Location
                    </small>

                    <strong>
                        ${complaint.location || "--"}
                    </strong>

                </div>


                <div>

                    <small>
                        Complaint Type
                    </small>

                    <strong>
                        ${complaint.type || "--"}
                    </strong>

                </div>


                <div>

                    <small>
                        Date Submitted
                    </small>

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

document.addEventListener(
    "DOMContentLoaded",
    function () {


        console.log(
            "Citizen tracking initialized"
        );


        updateCitizenComplaintStats();


        const trackButton =
            document.getElementById(
                "trackComplaintBtn"
            );


        const trackInput =
            document.getElementById(
                "trackComplaintId"
            );


        if (!trackButton) {

            console.error(
                "Track Complaint button not found!"
            );

            return;

        }


        if (!trackInput) {

            console.error(
                "Complaint ID input not found!"
            );

            return;

        }


        // TRACK BUTTON

        trackButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                console.log(
                    "Track button clicked:",
                    trackInput.value
                );


                trackCitizenComplaint();

            }
        );


        // ENTER KEY

        trackInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    event.preventDefault();

                    trackCitizenComplaint();

                }

            }
        );

    }
);



// =====================================================
// REFRESH WHEN OFFICER CHANGES COMPLAINT STATUS
// =====================================================

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key ===
            "airguardComplaints"
        ) {

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