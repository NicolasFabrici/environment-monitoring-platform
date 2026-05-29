import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                username,
                password
            });

            login(
                response.data.user,
                response.data.token
            );

            navigate("/");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 w-full max-w-md">

                <h1 className="text-4xl font-bold text-white mb-2">

                    EnviroMonitor

                </h1>

                <p className="text-slate-400 mb-8">

                    Environmental Monitoring Platform

                </p>

                <form
                    onSubmit={handleLogin}
                    className="space-y-6"
                >

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
                    />

                    {error && (

                        <p className="text-red-400">
                            {error}
                        </p>

                    )}

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-400 transition rounded-xl py-3 text-black font-bold"
                    >

                        Login

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;