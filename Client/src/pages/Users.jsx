import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import api from "../services/api";

import {
    Trash2,
    Plus
} from "lucide-react";

function Users() {

    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "Viewer"
    });

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const response = await api.get("/users");

            setUsers(response.data);

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

    const createUser = async () => {

        try {

            await api.post("/users", formData);

            fetchUsers();

            setFormData({
                username: "",
                password: "",
                role: "Viewer"
            });

        } catch (error) {

            console.error(error);

        }

    };

    const updateRole = async (id, role) => {

        try {

            await api.put(`/users/${id}`, {
                role
            });

            fetchUsers();

        } catch (error) {

            console.error(error);

        }

    };

    const deleteUser = async (id) => {

        const confirmed = window.confirm(
            "Delete user?"
        );

        if (!confirmed) return;

        try {

            await api.delete(`/users/${id}`);

            fetchUsers();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <Layout>

            <div className="p-8">

                <h1 className="text-4xl font-bold text-white mb-8">

                    User Management

                </h1>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

                    <div className="flex gap-4">

                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 w-full"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 w-full"
                        />

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
                        >

                            <option value="Admin">
                                Admin
                            </option>

                            <option value="Operator">
                                Operator
                            </option>

                            <option value="Viewer">
                                Viewer
                            </option>

                        </select>

                        <button
                            onClick={createUser}
                            className="bg-green-500 hover:bg-green-400 transition rounded-lg px-5 py-3 text-black font-bold flex items-center gap-2"
                        >

                            <Plus size={18} />

                            Create

                        </button>

                    </div>

                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-800">

                            <tr>

                                <th className="text-left p-4">
                                    Username
                                </th>

                                <th className="text-left p-4">
                                    Role
                                </th>

                                <th className="text-left p-4">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr
                                    key={user.id}
                                    className="border-t border-slate-800"
                                >

                                    <td className="p-4">
                                        {user.username}
                                    </td>

                                    <td className="p-4">

                                        <select
                                            value={user.role}
                                            onChange={(e) =>
                                                updateRole(
                                                    user.id,
                                                    e.target.value
                                                )
                                            }
                                            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2"
                                        >

                                            <option value="Admin">
                                                Admin
                                            </option>

                                            <option value="Operator">
                                                Operator
                                            </option>

                                            <option value="Viewer">
                                                Viewer
                                            </option>

                                        </select>

                                    </td>

                                    <td className="p-4">

                                        <button
                                            onClick={() =>
                                                deleteUser(user.id)
                                            }
                                            className="text-red-400 hover:text-red-300"
                                        >

                                            <Trash2 size={18} />

                                        </button>

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

export default Users;