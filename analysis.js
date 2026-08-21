const ctx = document.getElementById("aqiChart");

new Chart(ctx, {
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
                data: [72, 85, 96, 110, 125, 118],

                borderWidth: 3,
                tension: 0.4,

                fill: true,

                backgroundColor: "rgba(57,198,189,0.25)",
                borderColor: "#03232d",

                pointRadius: 5,
                pointHoverRadius: 8,

                pointBackgroundColor: "#39c6bd",
                pointBorderColor: "#03232d",
                pointRadius:5,
                pointHoverRadius:7
            }
        ]
    },

    options: {
        responsive: true,

        plugins: {
            legend: {
                labels: {
                    color: "#0f172a",
                    font: {
                        size: 14,
                        weight: "bold"
                    }
                }
            },

            tooltip: {
                callbacks: {
                    label: function(context) {
                        return " AQI: " + context.parsed.y;
                    }
                }
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 200,

                ticks: {
                    color: "#0f172a",
                    font: {
                        size: 13,
                        weight: "bold"
                    }
                },

                title: {
                    display: true,
                    text: "AQI Level",
                    color: "#0f172a",
                    font: {
                        size: 15,
                        weight: "bold"
                    }
                }
            },

            x: {
                ticks: {
                    color: "#0f172a",
                    font: {
                        size: 13,
                        weight: "bold"
                    }
                },

                title: {
                    display: true,
                    text: "Time",
                    color: "#0f172a",
                    font: {
                        size: 15,
                        weight: "bold"
                    }
                }
            }
        }
    }
});
const pm25Ctx = document.getElementById("pm25Chart");

new Chart(pm25Ctx, {
    type: "bar",

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
    label: "PM2.5 (µg/m³)",
    data: [32, 38, 45, 52, 61, 55],

    backgroundColor: "rgba(57, 198, 189, 0.70)",
    borderColor: "#03232d",
    borderWidth: 2,
    borderRadius: 8
}
        ]
    },

    options: {
        responsive: true,

        plugins: {
            legend: {
                labels: {
                    color: "#0f172a",
                    font: {
                        size: 14,
                        weight: "bold"
                    }
                }
            },

            tooltip: {
                callbacks: {
                    label: function(context) {
                        return " PM2.5: " + context.parsed.y + " µg/m³";
                    }
                }
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 80,

                ticks: {
                    color: "#0f172a",
                    font: {
                        size: 13,
                        weight: "bold"
                    }
                },

                title: {
                    display: true,
                    text: "PM2.5 (µg/m³)",
                    color: "#0f172a",
                    font: {
                        size: 15,
                        weight: "bold"
                    }
                }
            },

            x: {
                ticks: {
                    color: "#0f172a",
                    font: {
                        size: 13,
                        weight: "bold"
                    }
                },

                title: {
                    display: true,
                    text: "Time",
                    color: "#0f172a",
                    font: {
                        size: 15,
                        weight: "bold"
                    }
                }
            }
        }
    }
});
const pm10Ctx = document.getElementById("pm10Chart");

new Chart(pm10Ctx, {
    type: "bar",

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
    label: "PM10 (µg/m³)",
    data: [55, 62, 70, 82, 91, 86],

    backgroundColor: "rgba(57, 198, 189, 0.70)",
    borderColor: "#03232d",
    borderWidth: 2,
    borderRadius: 8
}
        ]
    },

    options: {
        responsive: true,

        plugins: {
            legend: {
                labels: {
                    color: "#0f172a",
                    font: {
                        size: 14,
                        weight: "bold"
                    }
                }
            },

            tooltip: {
                callbacks: {
                    label: function(context) {
                        return " PM10: " + context.parsed.y + " µg/m³";
                    }
                }
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 110,

                ticks: {
                    color: "#0f172a",
                    font: {
                        size: 13,
                        weight: "bold"
                    }
                },

                title: {
                    display: true,
                    text: "PM10 (µg/m³)",
                    color: "#0f172a",
                    font: {
                        size: 15,
                        weight: "bold"
                    }
                }
            },

            x: {
                ticks: {
                    color: "#0f172a",
                    font: {
                        size: 13,
                        weight: "bold"
                    }
                },

                title: {
                    display: true,
                    text: "Time",
                    color: "#0f172a",
                    font: {
                        size: 15,
                        weight: "bold"
                    }
                }
            }
        }
    }
});


const gasCtx = document.getElementById("gasChart");

new Chart(gasCtx, {
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
                label: "Gas Level",

                data: [18, 22, 27, 35, 42, 38],

                borderWidth: 3,
                tension: 0.4,

                fill: true,

                backgroundColor: "rgba(57,198,189,0.25)",
                borderColor: "#03232d",

                pointBackgroundColor: "#39c6bd",
                pointBorderColor: "#03232d",
                pointBorderWidth: 2,

                pointRadius: 5,
                pointHoverRadius: 8
            }
        ]
    },

    options: {
        responsive: true,

        plugins: {
            legend: {
                labels: {
                    color: "#0f172a",
                    font: {
                        size: 14,
                        weight: "bold"
                    }
                }
            },

            tooltip: {
                callbacks: {
                    label: function(context) {
                        return " Gas Level: " + context.parsed.y;
                    }
                }
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 50,

                ticks: {
                    color: "#0f172a",
                    font: {
                        size: 13,
                        weight: "bold"
                    }
                },

                title: {
                    display: true,
                    text: "Gas Concentration",
                    color: "#0f172a",
                    font: {
                        size: 15,
                        weight: "bold"
                    }
                }
            },

            x: {
                ticks: {
                    color: "#0f172a",
                    font: {
                        size: 13,
                        weight: "bold"
                    }
                },

                title: {
                    display: true,
                    text: "Time",
                    color: "#0f172a",
                    font: {
                        size: 15,
                        weight: "bold"
                    }
                }
            }
        }
    }
});
const historicalCtx = document.getElementById("historicalChart");

new Chart(historicalCtx, {
    type: "line",

    data: {
        labels: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],

        datasets: [
            {
    label: "Average AQI",
    data: [82, 91, 76, 105, 118, 97, 88],

    borderWidth: 3,
    tension: 0.4,

    fill: true,

    backgroundColor: "rgba(57, 198, 189, 0.25)",
    borderColor: "#03232d",

    pointBackgroundColor: "#39c6bd",
    pointBorderColor: "#03232d",
    pointRadius: 5,
    pointHoverRadius: 7
}
        ]
    },

    options: {
        responsive: true,

        plugins: {
            legend: {
                labels: {
                    color: "#0f172a",
                    font: {
                        size: 14,
                        weight: "bold"
                    }
                }
            },

            tooltip: {
                callbacks: {
                    label: function(context) {
                        return " Average AQI: " + context.parsed.y;
                    }
                }
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 130,

                ticks: {
                    color: "#0f172a",
                    font: {
                        size: 13,
                        weight: "bold"
                    }
                },

                title: {
                    display: true,
                    text: "AQI Level",
                    color: "#0f172a",
                    font: {
                        size: 15,
                        weight: "bold"
                    }
                }
            },

            x: {
                ticks: {
                    color: "#0f172a",
                    font: {
                        size: 13,
                        weight: "bold"
                    }
                },

                title: {
                    display: true,
                    text: "Day",
                    color: "#0f172a",
                    font: {
                        size: 15,
                        weight: "bold"
                    }
                }
            }
        }
    }
});