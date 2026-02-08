// ===========================
// Chart.js Configuration
// ===========================

let sectorChart = null;

function initChart() {
    const ctx = document.getElementById('sectorChart');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (sectorChart) {
        sectorChart.destroy();
    }

    sectorChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: '관심도',
                data: [],
                backgroundColor: createGradient(ctx),
                borderColor: 'rgba(0, 212, 255, 1)',
                borderWidth: 2,
                borderRadius: 8,
                barThickness: 30
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 36, 66, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#a0aec0',
                    borderColor: 'rgba(0, 212, 255, 0.5)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return `관심도: ${context.parsed.x}/100`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#a0aec0',
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#ffffff',
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
                }
            },
            animation: {
                duration: 800,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function createGradient(ctx) {
    const canvas = ctx.canvas;
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgba(0, 212, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 102, 255, 0.8)');
    return gradient;
}

function updateChart(sectors, market = 'us') {
    if (!sectorChart) {
        initChart();
    }

    // Take top 10 sectors
    const topSectors = sectors.slice(0, 10);

    const labels = topSectors.map(s => s.name);
    const data = topSectors.map(s => s.interest);

    // Update gradient based on market
    const ctx = document.getElementById('sectorChart');
    let gradient;

    if (market === 'crypto') {
        gradient = ctx.getContext('2d').createLinearGradient(0, 0, ctx.canvas.width, 0);
        gradient.addColorStop(0, 'rgba(247, 147, 26, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 107, 0, 0.8)');
    } else {
        gradient = createGradient(ctx);
    }

    sectorChart.data.labels = labels;
    sectorChart.data.datasets[0].data = data;
    sectorChart.data.datasets[0].backgroundColor = gradient;
    sectorChart.update();
}

// Trend Line Chart (for future enhancement)
function createTrendChart(containerId, trendData, sectorId) {
    const ctx = document.getElementById(containerId);
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: TREND_DATA.labels,
            datasets: [{
                label: '관심도 추이',
                data: trendData,
                borderColor: 'rgba(0, 212, 255, 1)',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(0, 212, 255, 1)',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 36, 66, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#a0aec0',
                    borderColor: 'rgba(0, 212, 255, 0.5)',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#a0aec0',
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#a0aec0',
                        font: {
                            size: 10
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });
}
