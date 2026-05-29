import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    Trash2,
    Pencil,
    Plus
} from "lucide-react";

function Sensors() {

    const { user } = useAuth();
    const [sensors, setSensors] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        status: "Active"
    });

    const [editingId, setEditingId] = useState(null);

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

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const editSensor = (sensor) => {

        setEditingId(sensor.id);

        setFormData({
            name: sensor.name,
            location: sensor.location,
            status: sensor.status
        });

    };

    const createSensor = async () => {

        try {

            if (
                !formData.name.trim() ||
                !formData.location.trim()
            ) {
                alert("Please complete all fields");
                return;
            }

            await api.post("/sensors", formData);

            fetchSensors();

            setFormData({
                name: "",
                location: "",
                status: "Active"
            });

        } catch (error) {

            console.error(error);

        }

    };

    const updateSensor = async () => {

        try {

            await api.put(`/sensors/${editingId}`, formData);

            fetchSensors();

            setEditingId(null);

            setFormData({
                name: "",
                location: "",
                status: "Active"
            });

        } catch (error) {

            console.error(error);

        }

    };

    const deleteSensor = async (id) => {

        try {

            await api.delete(`/sensors/${id}`);

            fetchSensors();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <Layout>

            <div className="p-8">

                <div className="flex items-center justify-between mb-8">

                    <h1 className="text-3xl font-bold">
                        Sensors Management
                    </h1>

                </div>


                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
                    {
                        user?.role === "Admin" && (

                            <div className="flex items-center gap-4">

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Sensor Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 w-full"
                                />

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 w-full"
                                />

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
                                >

                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Offline">
                                        Offline
                                    </option>

                                </select>

                                <button
                                    onClick={
                                        editingId
                                            ? updateSensor
                                            : createSensor
                                    }
                                    className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-lg flex items-center gap-2"
                                >

                                    <Plus size={18} />

                                    {
                                        editingId
                                            ? "Update"
                                            : "Add"
                                    }

                                </button>

                                {
                                    editingId && (

                                        <button
                                            onClick={() => {

                                                setEditingId(null);

                                                setFormData({
                                                    name: "",
                                                    location: "",
                                                    status: "Active"
                                                });

                                            }}
                                            className="bg-slate-700 hover:bg-slate-600 transition px-5 py-3 rounded-lg"
                                        >

                                            Cancel

                                        </button>

                                    )
                                }

                            </div>

                        )
                    }

                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                    <input
                        type="text"
                        placeholder="Search sensors..."
                        className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 w-full mb-6"
                    />

                    <table className="w-full">

                        <thead className="bg-slate-800">

                            <tr>

                                <th className="text-left p-4">
                                    Name
                                </th>

                                <th className="text-left p-4">
                                    Location
                                </th>

                                <th className="text-left p-4">
                                    Status
                                </th>

                                {
                                    user?.role === "Admin" && (

                                        <th className="text-left p-4">
                                            Actions
                                        </th>

                                    )
                                }

                            </tr>

                        </thead>

                        <tbody>

                            {sensors.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-10 text-slate-400"
                                    >
                                        No sensors registered
                                    </td>
                                </tr>
                            )}

                            {sensors.map((sensor) => (

                                <tr
                                    key={sensor.id}
                                    className="border-t border-slate-800"
                                >

                                    <td
                                        className="p-4 text-blue-400 cursor-pointer hover:text-blue-300"
                                        onClick={() => navigate(`/sensors/${sensor.id}`)}
                                    >

                                        {sensor.name}

                                    </td>

                                    <td className="p-4">
                                        {sensor.location}
                                    </td>

                                    <td className="p-4">

                                        <span className={`px-3 py-1 rounded-full text-sm ${sensor.status === "Active"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                            }`}>

                                            {sensor.status}

                                        </span>

                                    </td>

                                    {
                                        user?.role === "Admin" && (

                                            <td className="p-4">

                                                <div className="flex items-center gap-4">

                                                    <button
                                                        onClick={() => editSensor(sensor)}
                                                        className="text-blue-400 hover:text-blue-300"
                                                    >

                                                        <Pencil size={18} />

                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            const confirmed = window.confirm(
                                                                `Delete ${sensor.name}?`
                                                            );
                                                            if (confirmed) {
                                                                deleteSensor(sensor.id);
                                                            }
                                                        }}
                                                        className="text-red-400 hover:text-red-300"
                                                    >

                                                        <Trash2 size={18} />

                                                    </button>
                                                </div>
                                            </td>
                                        )
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default Sensors;