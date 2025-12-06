// Configuración de Chart.js
// Colores consistentes con el diseño
const chartColors = {
    primary: '#a8d5e2',
    primaryLight: '#c8e6f0',
    primaryDark: '#7ab8cc',
    secondary: '#b8d4c8',
    secondaryLight: '#d4e8dc',
    accent: '#f4d4ba',
    accentLight: '#fae8d8',
    success: '#b8dfc8',
    warning: '#f9e4b7',
    alert: '#f4b8b8',
    info: '#c8d9f4',
    neutral: '#e4e7eb'
};

// Configuración global de Chart.js
Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
Chart.defaults.font.size = 13;
Chart.defaults.color = '#6b7280';
Chart.defaults.plugins.legend.labels.padding = 15;
Chart.defaults.plugins.legend.labels.usePointStyle = true;

// Función para crear opciones comunes de gráficos
function getCommonOptions(title) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 15,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(31, 41, 55, 0.9)',
                padding: 12,
                cornerRadius: 8,
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + '%';
                        }
                        return label;
                    }
                }
            }
        }
    };
}

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {

    // 1. Gráfico de Percepción sobre Información
    const ctxPercepcion = document.getElementById('chartPercepcion');
    if (ctxPercepcion) {
        new Chart(ctxPercepcion, {
            type: 'doughnut',
            data: {
                labels: ['Podría mejorar la difusión', 'Suficiente información'],
                datasets: [{
                    data: [93.1, 6.9],
                    backgroundColor: [
                        chartColors.alert,
                        chartColors.success
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                ...getCommonOptions(),
                plugins: {
                    ...getCommonOptions().plugins,
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 13
                            }
                        }
                    }
                }
            }
        });
    }

    // 2. Gráfico de Experiencia de Licenciados
    const ctxExperiencia = document.getElementById('chartExperiencia');
    if (ctxExperiencia) {
        new Chart(ctxExperiencia, {
            type: 'bar',
            data: {
                labels: ['Menos de 5 años', '5 a 10 años', 'Más de 10 años'],
                datasets: [{
                    label: 'Porcentaje de Licenciados',
                    data: [36.7, 16.7, 46.7],
                    backgroundColor: [
                        chartColors.info,
                        chartColors.primary,
                        chartColors.primaryDark
                    ],
                    borderColor: [
                        chartColors.info,
                        chartColors.primary,
                        chartColors.primaryDark
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                ...getCommonOptions(),
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50,
                        ticks: {
                            callback: function (value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: chartColors.neutral,
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        ...getCommonOptions().plugins.tooltip
                    }
                }
            }
        });
    }

    // 3. Gráfico de Capacitación en ACV
    const ctxCapacitacion = document.getElementById('chartCapacitacion');
    if (ctxCapacitacion) {
        new Chart(ctxCapacitacion, {
            type: 'pie',
            data: {
                labels: ['No recibió capacitación', 'Sí recibió capacitación', 'No está seguro'],
                datasets: [{
                    data: [66.7, 23.3, 10],
                    backgroundColor: [
                        chartColors.alert,
                        chartColors.success,
                        chartColors.warning
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                ...getCommonOptions(),
                plugins: {
                    ...getCommonOptions().plugins,
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }

    // 4. Gráfico de Disponibilidad de Guardia Neurológica
    const ctxGuardia = document.getElementById('chartGuardia');
    if (ctxGuardia) {
        new Chart(ctxGuardia, {
            type: 'bar',
            data: {
                labels: [
                    'No hay guardia',
                    'Guardia 24/7',
                    'Guardia parcial',
                    'No sabe'
                ],
                datasets: [{
                    label: 'Porcentaje de Instituciones',
                    data: [36.7, 33.3, 16.7, 13.3],
                    backgroundColor: [
                        chartColors.alert,
                        chartColors.success,
                        chartColors.warning,
                        chartColors.neutral
                    ],
                    borderColor: [
                        chartColors.alert,
                        chartColors.success,
                        chartColors.warning,
                        chartColors.neutral
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                ...getCommonOptions(),
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 40,
                        ticks: {
                            callback: function (value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: chartColors.neutral,
                            drawBorder: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        ...getCommonOptions().plugins.tooltip
                    }
                }
            }
        });
    }
});

// Animación de entrada para los gráficos
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const chartObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';

            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            chartObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todas las tarjetas de gráficos
document.addEventListener('DOMContentLoaded', function () {
    const chartCards = document.querySelectorAll('.chart-card');
    chartCards.forEach(card => {
        chartObserver.observe(card);
    });
});
