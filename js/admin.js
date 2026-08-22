// =====================================================
// ADMIN ACCESS CONTROL
// =====================================================

const officerLoggedIn =
    localStorage.getItem("officerLoggedIn") === "true";

if (!officerLoggedIn) {

    alert("Please login as an authorized officer.");

    window.location.href = "officer-login.html";

}// =========================================================

// AIRGUARD - ADMIN DASHBOARD
// Government Complaint Management Portal
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("AirGuard Admin Dashboard started");


    // =====================================================
    // GET COMPLAINTS
    // =====================================================

    function getComplaints() {

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
    // SAVE COMPLAINTS
    // =====================================================

    function saveComplaints(complaints) {

        localStorage.setItem(
            "airguardComplaints",
            JSON.stringify(complaints)
        );
    }


    // =====================================================
    // STATUS CLASS
    // =====================================================

    function getStatusClass(status) {

        if (status === "Resolved") {
            return "status-resolved";
        }

        if (status === "In Progress") {
            return "status-progress";
        }

        return "status-pending";
    }


    // =====================================================
    // UPDATE STATISTICS
    // =====================================================

    function updateStatistics() {

        const complaints = getComplaints();

        let pending = 0;
        let progress = 0;
        let resolved = 0;


        complaints.forEach(function (complaint) {

            const status =
                complaint.status || "Pending";


            if (status === "Resolved") {

                resolved++;

            } else if (status === "In Progress") {

                progress++;

            } else {

                pending++;
            }

        });


        const totalElement =
            document.getElementById(
                "adminTotalComplaints"
            );

        const pendingElement =
            document.getElementById(
                "adminPendingComplaints"
            );

        const progressElement =
            document.getElementById(
                "adminProgressComplaints"
            );

        const resolvedElement =
            document.getElementById(
                "adminResolvedComplaints"
            );


        if (totalElement) {
            totalElement.textContent =
                complaints.length;
        }

        if (pendingElement) {
            pendingElement.textContent =
                pending;
        }

        if (progressElement) {
            progressElement.textContent =
                progress;
        }

        if (resolvedElement) {
            resolvedElement.textContent =
                resolved;
        }
    }


    // =====================================================
    // ESCAPE HTML
    // =====================================================

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent =
            String(value ?? "");

        return div.innerHTML;
    }


    // =====================================================
    // DISPLAY COMPLAINTS
    // =====================================================

    function displayComplaints() {

        const tableBody =
            document.getElementById(
                "complaintsTableBody"
            );

        const noComplaints =
            document.getElementById(
                "noComplaints"
            );


        if (!tableBody) {
            return;
        }


        const complaints =
            getComplaints();


        const searchInput =
            document.getElementById(
                "adminSearch"
            );

        const statusFilter =
            document.getElementById(
                "adminStatusFilter"
            );


        const searchText =
            searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";


        const selectedStatus =
            statusFilter
                ? statusFilter.value
                : "all";


        const filteredComplaints =
            complaints.filter(function (complaint) {

                const id =
                    String(complaint.id || "")
                        .toLowerCase();

                const name =
                    String(complaint.name || "")
                        .toLowerCase();

                const location =
                    String(complaint.location || "")
                        .toLowerCase();

                const type =
                    String(complaint.type || "")
                        .toLowerCase();


                const matchesSearch =
                    id.includes(searchText) ||
                    name.includes(searchText) ||
                    location.includes(searchText) ||
                    type.includes(searchText);


                const status =
                    complaint.status || "Pending";


                const matchesStatus =
                    selectedStatus === "all" ||
                    status === selectedStatus;


                return matchesSearch &&
                    matchesStatus;

            });


        tableBody.innerHTML = "";


        if (filteredComplaints.length === 0) {

            if (noComplaints) {
                noComplaints.style.display =
                    "block";
            }

            return;
        }


        if (noComplaints) {
            noComplaints.style.display =
                "none";
        }


        filteredComplaints
            .slice()
            .reverse()
            .forEach(function (complaint) {

                const row =
                    document.createElement("tr");


                const status =
                    complaint.status || "Pending";


                row.innerHTML = `

                    <td>
                        <strong>
                            ${escapeHTML(
                                complaint.id || "--"
                            )}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(
                            complaint.name || "--"
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            complaint.location || "--"
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            complaint.type || "--"
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            complaint.date || "--"
                        )}
                    </td>

                    <td>

                        <span class="status-badge ${getStatusClass(status)}">

                            ${escapeHTML(status)}

                        </span>

                    </td>

                    <td>

                        <button
                            class="view-btn"
                            data-id="${escapeHTML(
                                complaint.id || ""
                            )}"
                        >
                            View
                        </button>

                    </td>

                `;


                tableBody.appendChild(row);

            });


        // =================================================
        // VIEW BUTTONS
        // =================================================

        document
            .querySelectorAll(".view-btn")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openComplaint(
                            button.dataset.id
                        );

                    }
                );

            });

    }


    // =====================================================
    // MODAL ELEMENTS
    // =====================================================

    const modal =
        document.getElementById(
            "complaintModal"
        );

    const closeModal =
        document.getElementById(
            "closeComplaintModal"
        );

    const updateStatusBtn =
        document.getElementById(
            "updateStatusBtn"
        );

    const modalStatus =
        document.getElementById(
            "modalStatus"
        );


    let selectedComplaintId = null;


    // =====================================================
    // OPEN COMPLAINT
    // =====================================================

    function openComplaint(id) {

        const complaints =
            getComplaints();


        const complaint =
            complaints.find(function (item) {

                return String(item.id) ===
                    String(id);

            });


        if (!complaint) {

            alert(
                "Complaint record could not be found."
            );

            return;
        }


        selectedComplaintId =
            complaint.id;


        document.getElementById(
            "modalComplaintId"
        ).textContent =
            complaint.id || "--";


        document.getElementById(
            "modalCitizenName"
        ).textContent =
            complaint.name || "--";


        document.getElementById(
            "modalCitizenEmail"
        ).textContent =
            complaint.email || "--";


        document.getElementById(
            "modalLocation"
        ).textContent =
            complaint.location || "--";


        document.getElementById(
            "modalComplaintType"
        ).textContent =
            complaint.type || "--";


        document.getElementById(
            "modalComplaintDate"
        ).textContent =
            complaint.date || "--";


        document.getElementById(
            "modalDescription"
        ).textContent =
            complaint.description || "--";


        if (modalStatus) {

            modalStatus.value =
                complaint.status || "Pending";

        }


        if (modal) {

            modal.style.display =
                "flex";

        }

    }


    // =====================================================
    // CLOSE MODAL
    // =====================================================

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


    // =====================================================
    // CLOSE MODAL BY CLICKING OUTSIDE
    // =====================================================

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {

                    modal.style.display =
                        "none";

                }

            }
        );

    }


    // =====================================================
    // UPDATE STATUS
    // =====================================================

    if (updateStatusBtn) {

        updateStatusBtn.addEventListener(
            "click",
            function () {

                if (!selectedComplaintId) {

                    return;

                }


                const complaints =
                    getComplaints();


                const complaint =
                    complaints.find(function (item) {

                        return String(item.id) ===
                            String(selectedComplaintId);

                    });


                if (!complaint) {

                    alert(
                        "Complaint could not be found."
                    );

                    return;

                }


                const newStatus =
                    modalStatus
                        ? modalStatus.value
                        : "Pending";


                complaint.status =
                    newStatus;


                saveComplaints(
                    complaints
                );


                // Refresh dashboard

                updateStatistics();

                displayComplaints();


                alert(
                    "Complaint status updated to " +
                    newStatus
                );


                if (modal) {

                    modal.style.display =
                        "none";

                }

            }
        );

    }


    // =====================================================
    // SEARCH
    // =====================================================

    const searchInput =
        document.getElementById(
            "adminSearch"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                displayComplaints();

            }
        );

    }


    // =====================================================
    // STATUS FILTER
    // =====================================================

    const statusFilter =
        document.getElementById(
            "adminStatusFilter"
        );


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            function () {

                displayComplaints();

            }
        );

    }


    // =====================================================
    // REFRESH BUTTON
    // =====================================================

    const refreshButton =
        document.getElementById(
            "refreshComplaintsBtn"
        );


    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            function () {

                updateStatistics();

                displayComplaints();

            }
        );

    }


    // =====================================================
    // LOGOUT
    // =====================================================

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "index.html";

            }
        );

    }


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    updateStatistics();

    displayComplaints();


    // =====================================================
    // LISTEN FOR DATA CHANGES
    // =====================================================

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                "airguardComplaints"
            ) {

                updateStatistics();

                displayComplaints();

            }

        }
    );


    console.log(
        "AirGuard Admin Dashboard loaded successfully."
    );

});