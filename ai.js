document.addEventListener("DOMContentLoaded", function () {

    let aqi = 75;

    const button = document.getElementById("generateBtn");
    const result = document.getElementById("aiResult");

    button.addEventListener("click", function () {

        let level;
        let message;

        if (aqi <= 50) {

            level = "Low";

            message =
                "Air quality is currently good in the monitored mining area. Pollution levels are relatively low. Continue regular monitoring.";

        } else if (aqi <= 100) {

            level = "Moderate";

            message =
                "Air quality is acceptable, but some pollution is present. Continuous monitoring of the mining area is recommended.";

        } else if (aqi <= 150) {

            level = "High";

            message =
                "Pollution levels are elevated in the monitored mining area. Continuous monitoring and closer observation are recommended.";

        } else if (aqi <= 200) {

            level = "High";

            message =
                "Pollution levels are high in the monitored mining area. Increased monitoring and appropriate precautions are recommended.";

        } else {

            level = "Very High";

            message =
                "Pollution levels are very high. The monitored area requires immediate attention and close environmental monitoring.";
        }

        result.innerHTML = `
            <div class="ai-icon">🤖</div>

            <div>
                <h3>Pollution Level: ${level}</h3>

                <p>${message}</p>
            </div>
        `;

    });

});