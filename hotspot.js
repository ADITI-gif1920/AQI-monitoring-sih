document.addEventListener("DOMContentLoaded", function () {

    const mapElement = document.getElementById("hotspotMap");

    if (!mapElement) {
        console.error("hotspotMap element not found");
        return;
    }

    // ==============================
    // MAP
    // ==============================

    const map = L.map("hotspotMap").setView(
        [22.5, 85.5],
        6
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);


    // ==============================
    // MONITORED MINING SITES
    // ==============================

    const sites = [

        {
            name: "Site A - Angul, Odisha",
            lat: 20.8442,
            lng: 85.1515,
            zone: "Green",
            aqi: 68,
            color: "#16a34a"
        },

        {
            name: "Site B - Dhanbad, Jharkhand",
            lat: 23.7957,
            lng: 86.4304,
            zone: "Yellow",
            aqi: 112,
            color: "#eab308"
        },

        {
            name: "Site C - Talcher, Odisha",
            lat: 20.9500,
            lng: 85.2300,
            zone: "Red",
            aqi: 178,
            color: "#dc2626"
        }

    ];


    // ==============================
    // SHOW MONITORED SITES
    // ==============================

    sites.forEach(function (site) {

        L.circleMarker(
            [site.lat, site.lng],
            {
                radius: 10,
                color: "#ffffff",
                weight: 3,
                fillColor: site.color,
                fillOpacity: 1
            }
        )
        .addTo(map)
        .bindPopup(`
            <strong>${site.name}</strong><br><br>
            Zone: ${site.zone} Zone<br>
            AQI: ${site.aqi}
        `);

    });


    // ==============================
    // ELEMENTS
    // ==============================

    const searchButton =
        document.getElementById("searchAreaBtn");

    const searchInput =
        document.getElementById("areaSearch");

    const locateButton =
        document.getElementById("locateMeBtn");

    const areaStatus =
        document.getElementById("areaStatus");


    // ==============================
    // DISTANCE CALCULATION
    // ==============================

    function calculateDistance(lat1, lng1, lat2, lng2) {

        const earthRadius = 6371;

        const dLat =
            (lat2 - lat1) * Math.PI / 180;

        const dLng =
            (lng2 - lng1) * Math.PI / 180;

        const a =
            Math.sin(dLat / 2) *
            Math.sin(dLat / 2) +

            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *

            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);

        const c =
            2 * Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
            );

        return earthRadius * c;
    }


    // ==============================
    // SHOW LOCATION STATUS
    // ==============================

    function showLocationStatus(lat, lng, locationName) {

        let nearestSite = null;
        let nearestDistance = Infinity;


        sites.forEach(function (site) {

            const distance = calculateDistance(
                lat,
                lng,
                site.lat,
                site.lng
            );

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestSite = site;
            }

        });


        // Monitoring radius = 25 km

        if (nearestSite && nearestDistance <= 25) {

            let statusText = "";

            if (nearestSite.zone === "Green") {
                statusText = "🟢 Good Air Quality";
            }
            else if (nearestSite.zone === "Yellow") {
                statusText = "🟡 Moderate Pollution";
            }
            else {
                statusText = "🔴 High Pollution";
            }


            areaStatus.innerHTML = `

                <div class="location-result">

                    <h3>📍 ${locationName}</h3>

                    <p>
                        <strong>Nearest Monitoring Site:</strong>
                        ${nearestSite.name}
                    </p>

                    <p>
                        <strong>Zone:</strong>
                        ${nearestSite.zone} Zone
                    </p>

                    <p>
                        <strong>AQI:</strong>
                        ${nearestSite.aqi}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${statusText}
                    </p>

                    <p>
                        <strong>Distance from monitoring site:</strong>
                        ${nearestDistance.toFixed(1)} km
                    </p>

                    <p>
                        ✅ Monitoring data available
                    </p>

                </div>
            `;

        }
        else {

            areaStatus.innerHTML = `

                <div class="location-result">

                    <h3>📍 ${locationName}</h3>

                    <p>
                        Location successfully identified.
                    </p>

                    <p>
                        ⚪ <strong>No Monitoring Data Available</strong>
                    </p>

                    <p>
                        This location is currently outside
                        our monitored sensor network.
                    </p>

                    <p>
                        The map can still display the selected location.
                    </p>

                </div>
            `;
        }
    }


    // ==============================
    // SEARCH ANY LOCATION IN INDIA
    // ==============================

    if (searchButton && searchInput) {

        searchButton.addEventListener(
            "click",
            async function () {

                const query =
                    searchInput.value.trim();

                if (!query) {

                    alert(
                        "Please enter a city or area."
                    );

                    return;
                }


                searchButton.textContent =
                    "Searching...";

                searchButton.disabled = true;


                try {

                    const response = await fetch(
                        "https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&limit=1&q=" +
                        encodeURIComponent(query)
                    );


                    const results =
                        await response.json();


                    if (!results.length) {

                        areaStatus.innerHTML = `
                            <div class="location-result">
                                <h3>❌ Location Not Found</h3>
                                <p>
                                    Please check the name and try again.
                                </p>
                            </div>
                        `;

                        return;
                    }


                    const location =
                        results[0];


                    const lat =
                        parseFloat(location.lat);

                    const lng =
                        parseFloat(location.lon);


                    // Move map

                    map.setView(
                        [lat, lng],
                        12
                    );


                    // Add selected location marker

                    L.marker([lat, lng])
                        .addTo(map)
                        .bindPopup(
                            `<strong>📍 ${location.display_name}</strong>`
                        )
                        .openPopup();


                    // Show pollution information

                    showLocationStatus(
                        lat,
                        lng,
                        location.display_name
                    );

                }

                catch (error) {

                    console.error(error);

                    alert(
                        "Unable to search the location. Please try again."
                    );

                }

                finally {

                    searchButton.textContent =
                        "🔍 View on Map";

                    searchButton.disabled = false;

                }

            }
        );

    }


    // ==============================
    // USE MY CURRENT LOCATION
    // ==============================

    if (locateButton) {

        locateButton.addEventListener(
            "click",
            function () {

                if (!navigator.geolocation) {

                    alert(
                        "GPS / location services are not supported by this browser."
                    );

                    return;
                }


                locateButton.textContent =
                    "📍 Finding Location...";

                locateButton.disabled = true;


                navigator.geolocation.getCurrentPosition(

                    async function (position) {

                        const lat =
                            position.coords.latitude;

                        const lng =
                            position.coords.longitude;


                        // Move map to user

                        map.setView(
                            [lat, lng],
                            13
                        );


                        // User location marker

                        L.marker([lat, lng])
                            .addTo(map)
                            .bindPopup(
                                "<strong>📍 You are here</strong>"
                            )
                            .openPopup();


                        let locationName =
                            "Your Current Location";


                        // Reverse geocoding

                        try {

                            const response =
                                await fetch(
                                    "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
                                    lat +
                                    "&lon=" +
                                    lng
                                );


                            const data =
                                await response.json();


                            if (data.display_name) {

                                locationName =
                                    data.display_name;

                            }

                        }

                        catch (error) {

                            console.log(
                                "Could not get location name."
                            );

                        }


                        // Show pollution status

                        showLocationStatus(
                            lat,
                            lng,
                            locationName
                        );


                        locateButton.textContent =
                            "📍 Use My Current Location";

                        locateButton.disabled = false;

                    },


                    function (error) {

                        console.error(error);


                        locateButton.textContent =
                            "📍 Use My Current Location";

                        locateButton.disabled = false;


                        if (error.code === 1) {

                            alert(
                                "Location permission was denied. You can use the Search Monitoring Area option instead."
                            );

                        }

                        else if (error.code === 2) {

                            alert(
                                "Your location could not be detected. Please use the Search Monitoring Area option instead."
                            );

                        }

                        else {

                            alert(
                                "Unable to get your location. Please use the Search Monitoring Area option instead."
                            );

                        }

                    },

                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }

                );

            }
        );

    }


    // ==============================
    // REFRESH
    // ==============================

    const refreshButton =
        document.getElementById("refreshDataBtn");


    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            function () {

                location.reload();

            }
        );

    }


    // Fix Leaflet display

    setTimeout(function () {

        map.invalidateSize();

    }, 500);

});