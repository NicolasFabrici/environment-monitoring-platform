import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

function SensorDetails() {

    const { id } = useParams();
    const [sensor, setSensor] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {

        fetchSensor();

    }, []);

    const fetchSensor = async () => {

        try {

            const response = await api.get(
                `/sensor-details/${id}`
            );

            setSensor(response.data.sensor);

            const formattedHistory =
                response.data.history
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

    if (!sensor) {

        return (
            <Layout>
                <div className="p-8">
                    Loading...
                </div>
            </Layout>
        );

    }

    return (

        <Layout>

            <div className="p-8 space-y-8">

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        {sensor.name}

                    </h1>

                    <p className="text-slate-400 mt-2">

                        {sensor.location}

                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <h2 className="text-slate-400 mb-2">
                            Status
                        </h2>

                        <p className="text-2xl font-bold text-white">
                            {sensor.status}
                        </p>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <h2 className="text-slate-400 mb-2">
                            Records
                        </h2>

                        <p className="text-2xl font-bold text-white">
                            {history.length}
                        </p>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <h2 className="text-slate-400 mb-2">
                            Avg Temperature
                        </h2>

                        <p className="text-2xl font-bold text-white">

                            {
                                history.length > 0
                                    ? (
                                        history.reduce(
                                            (acc, item) =>
                                                acc + item.temperature,
                                            0
                                        ) / history.length
                                    ).toFixed(1)
                                    : 0
                            }°C

                        </p>

                    </div>

                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                    <h2 className="text-2xl font-bold text-white mb-6">
                        Temperature History
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

            </div>

        </Layout>

    );

}

export default SensorDetails;