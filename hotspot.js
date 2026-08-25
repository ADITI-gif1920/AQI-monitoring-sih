/* =========================================================
   MINEGUARD
   POLLUTION HOTSPOT MAP
   ========================================================= */


/* Create map */

const map = L.map("hotspotMap").setView(
    [20.30, 85.82],
    11
);


/* OpenStreetMap */

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,

        attribution:
            '&copy; OpenStreetMap contributors'
    }
).addTo(map);


/* =========================================================
   HOTSPOT DATA
   Replace these values with real sensor/backend data later
   ========================================================= */

const hotspots = [

    {
        name: "Coal Mining Zone A",

        lat: 20.315,

        lng: 85.825,

        aqi: 180,

        level: "Critical",

        color: "#e84d5b"
    },


    {
        name: "Processing Area B",

        lat: 20.295,

        lng: 85.845,

        aqi: 142,

        level: "High",

        color: "#f28c28"
    },


    {
        name: "Transport Corridor",

        lat: 20.285,

        lng: 85.805,

        aqi: 112,

        level: "Moderate",

        color: "#f0c419"
    }

];


/* =========================================================
   ADD HOTSPOTS
   ========================================================= */

hotspots.forEach((spot) => {

    const marker = L.circleMarker(
        [spot.lat, spot.lng],
        {

            radius: 13,

            fillColor: spot.color,

            color: "#ffffff",

            weight: 3,

            fillOpacity: 0.85

        }
    ).addTo(map);


    marker.bindPopup(`

        <div style="min-width:180px">

            <strong>
                ${spot.name}
            </strong>

            <br><br>

            <b>AQI:</b>
            ${spot.aqi}

            <br>

            <b>Status:</b>
            ${spot.level}

        </div>

    `);

});