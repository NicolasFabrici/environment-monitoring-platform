import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import {
    FileDown,
    Thermometer,
    Droplets,
    Wind,
    AlertTriangle
} from "lucide-react";

function Reports() {

    const [stats, setStats] = useState({
        avg_temperature: 0,
        avg_humidity: 0,
        max_temperature: 0,
        worst_air_quality: 0
    });

    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {

            const response = await api.get("/reports");
            setStats(response.data.stats);
            const formattedHistory = response.data.history
                .reverse()
                .map((item) => ({
                    ...item,
                    time: new Date(
                        item.recorded_at
                    ).toLocaleTimeString()
                }));
            setHistory(formattedHistory);

        } catch (error) {
            console.error(error);
        }
    };

    const exportCSV = () => {

        const headers = [
            "Time",
            "Temperature",
            "Humidity",
            "Air Quality"
        ];

        const rows = history.map((item) => [

            item.time,
            item.temperature,
            item.humidity,
            item.air_quality

        ]);

        const csvContent = [

            headers.join(","),

            ...rows.map((row) => row.join(","))

        ].join("\n");

        const blob = new Blob(
            [csvContent],
            { type: "text/csv;charset=utf-8;" }
        );

        const link = document.createElement("a");

        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);

        link.setAttribute(
            "download",
            "environment_report.csv"
        );

        link.click();

    };

    return (

        <Layout>

            <div className="space-y-8">

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold text-white">
                            Environmental Reports
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Historical environmental analytics
                            and monitoring reports.
                        </p>

                    </div>

                    <button
                        onClick={exportCSV}
                        className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-xl flex items-center gap-2 text-white font-medium"
                    >

                        <FileDown size={18} />

                        Export CSV

                    </button>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <div className="flex items-center justify-between mb-4">

                            <Thermometer className="text-orange-400" />

                            <span className="text-slate-400 text-sm">
                                Average
                            </span>

                        </div>

                        <h2 className="text-3xl font-bold text-white">

                            {stats.avg_temperature}°C

                        </h2>

                        <p className="text-slate-400 mt-2">
                            Average Temperature
                        </p>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <div className="flex items-center justify-between mb-4">

                            <Droplets className="text-blue-400" />

                            <span className="text-slate-400 text-sm">
                                Average
                            </span>

                        </div>

                        <h2 className="text-3xl font-bold text-white">

                            {stats.avg_humidity}%

                        </h2>

                        <p className="text-slate-400 mt-2">
                            Average Humidity
                        </p>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <div className="flex items-center justify-between mb-4">

                            <Thermometer className="text-red-400" />

                            <span className="text-slate-400 text-sm">
                                Peak
                            </span>

                        </div>

                        <h2 className="text-3xl font-bold text-white">

                            {stats.max_temperature}°C

                        </h2>

                        <p className="text-slate-400 mt-2">
                            Maximum Temperature
                        </p>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <div className="flex items-center justify-between mb-4">

                            <AlertTriangle className="text-yellow-400" />

                            <span className="text-slate-400 text-sm">
                                Critical
                            </span>

                        </div>

                        <h2 className="text-3xl font-bold text-white">

                            AQI {stats.worst_air_quality}

                        </h2>

                        <p className="text-slate-400 mt-2">
                            Worst Air Quality
                        </p>

                    </div>

                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                    <h2 className="text-2xl font-bold text-white mb-6">
                        Historical Temperature Analytics
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >

                        <LineChart data={history}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="time" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="temperature"
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-auto">

                    <h2 className="text-2xl font-bold text-white mb-6">
                        Historical Sensor Data
                    </h2>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-slate-800 text-slate-400">

                                <th className="text-left py-3">
                                    Time
                                </th>

                                <th className="text-left py-3">
                                    Temperature
                                </th>

                                <th className="text-left py-3">
                                    Humidity
                                </th>

                                <th className="text-left py-3">
                                    Air Quality
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {history.map((item, index) => (

                                <tr
                                    key={index}
                                    className="border-b border-slate-800"
                                >

                                    <td className="py-4 text-slate-300">
                                        {item.time}
                                    </td>

                                    <td className="text-white">
                                        {item.temperature}°C
                                    </td>

                                    <td className="text-white">
                                        {item.humidity}%
                                    </td>

                                    <td className="text-white">
                                        AQI {item.air_quality}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>

    );

}

export default Reports;