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
const complaintPhoto = document.getElementById("modalComplaintPhoto");
const noComplaintPhoto = document.getElementById("noComplaintPhoto");

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

            const alertsContainer =
                document.getElementById(
                    "environmentAlerts"
                );


            const noAlerts =
                document.getElementById(
                    "noAlerts"
                );


            if (!alertsContainer) {

                console.error(
                    "environmentAlerts element not found."
                );

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


            alertsContainer.innerHTML =
                "";


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


                    alertsContainer.appendChild(
                        alertCard
                    );

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