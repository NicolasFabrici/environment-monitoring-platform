import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import TemperatureChart from "../components/charts/TemperatureChart";
import HumidityChart from "../components/charts/HumidityChart";
import AlertsPanel from "../components/AlertsPanel";
import SensorsTable from "../components/SensorsTable";
import socket from "../services/socket";
import ActivityFeed from "../components/ActivityFeed";

function Dashboard() {

    const [stats, setStats] = useState({

        temperature: 0,
        humidity: 0,
        air_quality: 0,
        active_sensors: 0

    });

    const [temperatureHistory, setTemperatureHistory] = useState([]);
    const [humidityHistory, setHumidityHistory] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {

        socket.on("environment-update", (data) => {

            const time = new Date().toLocaleTimeString();

            setStats(data);

            setTemperatureHistory((prev) => [

                ...prev.slice(-9),
                data.temperature

            ]);

            setHumidityHistory((prev) => [

                ...prev.slice(-9),
                data.humidity

            ]);

            setLabels((prev) => [

                ...prev.slice(-9),
                time

            ]);

        });

        return () => {

            socket.off("environment-update");
        };

    }, []);

    return (

        <Layout>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">

                <DashboardCard
                    title="Temperature"
                    value={stats.temperature}
                    unit="°C"
                />

                <DashboardCard
                    title="Humidity"
                    value={stats.humidity}
                    unit="%"
                />

                <DashboardCard
                    title="Air Quality"
                    value={stats.air_quality}
                    unit="AQI"
                />

                <DashboardCard
                    title="Active Sensors"
                    value={stats.active_sensors}
                />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

                <TemperatureChart
                    labels={labels}
                    dataValues={temperatureHistory}
                />

                <HumidityChart
                    labels={labels}
                    dataValues={humidityHistory}
                />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

                <AlertsPanel />

                <ActivityFeed />

            </div>

            <SensorsTable />

        </Layout>

    );

}

export default Dashboard;