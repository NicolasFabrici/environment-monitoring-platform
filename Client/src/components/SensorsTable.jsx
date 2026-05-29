import { useEffect, useState } from "react";
import api from "../services/api";

function SensorsTable() {

    const [sensors, setSensors] = useState([]);

    useEffect(() => {

        fetchSensors();

    }, []);

    const fetchSensors = async () => {

        try {

            const response = await api.get("/sensors");

            setSensors(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

            <h2 className="text-xl font-bold mb-5">
                Active Sensors
            </h2>

            <table className="w-full">

                <thead>

                    <tr className="text-slate-400 border-b border-slate-700">

                        <th className="text-left pb-3">
                            Name
                        </th>

                        <th className="text-left pb-3">
                            Location
                        </th>

                        <th className="text-left pb-3">
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {sensors.map((sensor) => (

                        <tr
                            key={sensor.id}
                            className="border-b border-slate-800"
                        >

                            <td className="py-4">
                                {sensor.name}
                            </td>

                            <td>
                                {sensor.location}
                            </td>

                            <td>

                                <span className={`px-3 py-1 rounded-full text-sm ${sensor.status === "Active"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                    }`}>

                                    {sensor.status}

                                </span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default SensorsTable;