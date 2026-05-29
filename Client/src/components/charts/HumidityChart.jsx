import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function HumidityChart({ labels, dataValues }) {

    const data = {

        labels,

        datasets: [
            {
                label: "Humidity %",
                data: dataValues,
                backgroundColor: "#3b82f6"
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
                Live Humidity Analytics
            </h2>

            <Bar data={data} options={options} />

        </div>

    );
}

export default HumidityChart;