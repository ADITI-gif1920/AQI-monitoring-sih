/* =========================================================
   MINEGUARD
   POLLUTION ANALYSIS
   ========================================================= */


/* =========================================================
   COMMON CHART OPTIONS
   ========================================================= */

const commonOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

        legend: {
            display: true
        }

    },

    scales: {

        y: {

            beginAtZero: true

        }

    }

};


/* =========================================================
   AQI TREND
   ========================================================= */

new Chart(
    document.getElementById("aqiChart"),
    {

        type: "line",

        data: {

            labels: [
                "8 AM",
                "9 AM",
                "10 AM",
                "11 AM",
                "12 PM",
                "1 PM"
            ],

            datasets: [

                {

                    label: "AQI",

                    data: [
                        72,
                        84,
                        95,
                        110,
                        125,
                        118
                    ],

                    borderColor: "#087d7e",

                    backgroundColor: "rgba(57,198,189,0.25)",

                    borderWidth: 3,

                    fill: true,

                    tension: 0.35,

                    pointRadius: 5

                }

            ]

        },

        options: commonOptions

    }
);


/* =========================================================
   PM2.5
   ========================================================= */

new Chart(
    document.getElementById("pm25Chart"),
    {

        type: "bar",

        data: {

            labels: [
                "8 AM",
                "10 AM",
                "12 PM",
                "2 PM",
                "4 PM"
            ],

            datasets: [

                {

                    label: "PM2.5",

                    data: [
                        42,
                        50,
                        68,
                        61,
                        55
                    ],

                    backgroundColor: "#0fa9ad",

                    borderRadius: 6

                }

            ]

        },

        options: commonOptions

    }
);


/* =========================================================
   PM10
   ========================================================= */

new Chart(
    document.getElementById("pm10Chart"),
    {

        type: "bar",

        data: {

            labels: [
                "8 AM",
                "10 AM",
                "12 PM",
                "2 PM",
                "4 PM"
            ],

            datasets: [

                {

                    label: "PM10",

                    data: [
                        110,
                        135,
                        180,
                        165,
                        150
                    ],

                    backgroundColor: "#39c6bd",

                    borderRadius: 6

                }

            ]

        },

        options: commonOptions

    }
);


/* =========================================================
   GAS LEVELS
   ========================================================= */

new Chart(
    document.getElementById("gasChart"),
    {

        type: "line",

        data: {

            labels: [
                "8 AM",
                "10 AM",
                "12 PM",
                "2 PM",
                "4 PM"
            ],

            datasets: [

                {

                    label: "CO",

                    data: [
                        35,
                        42,
                        54,
                        49,
                        45
                    ],

                    borderColor: "#087d7e",

                    borderWidth: 3,

                    tension: 0.35

                },

                {

                    label: "SO₂",

                    data: [
                        18,
                        22,
                        30,
                        27,
                        24
                    ],

                    borderColor: "#6da5c0",

                    borderWidth: 3,

                    tension: 0.35

                }

            ]

        },

        options: commonOptions

    }
);


/* =========================================================
   HISTORICAL AIR QUALITY
   ========================================================= */

new Chart(
    document.getElementById("historicalChart"),
    {

        type: "line",

        data: {

            labels: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],

            datasets: [

                {

                    label: "AQI",

                    data: [
                        92,
                        105,
                        98,
                        118,
                        112,
                        125,
                        110
                    ],

                    borderColor: "#0fa9ad",

                    backgroundColor:
                        "rgba(15,159,156,0.18)",

                    fill: true,

                    borderWidth: 3,

                    tension: 0.35,

                    pointRadius: 5

                }

            ]

        },

        options: commonOptions

    }
);