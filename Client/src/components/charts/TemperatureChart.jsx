import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function TemperatureChart({ labels, dataValues }) {

    const data = {

        labels,

        datasets: [
            {
                label: "Temperature °C",
                data: dataValues,
                borderColor: "#22c55e",
                backgroundColor: "#22c55e",
                tension: 0.4
            }
        ]
    };

    const options = {

        responsive: true,

        animation: {
            duration: 500
        },

        plugins: {
            legend: {
                labels: {
                    color: "white"
                }
            }
        },

        scales: {

            x: {

                ticks: {
                    color: "white"
                },

                grid: {
                    color: "#1e293b"
                }

            },

            y: {

                ticks: {
                    color: "white"
                },

                grid: {
                    color: "#1e293b"
                }

            }

        }

    };

    return (

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

            <h2 className="text-xl font-bold mb-5">
                Live Temperature Monitoring
            </h2>

            <Line data={data} options={options} />

        </div>

    );
}

export default TemperatureChart;