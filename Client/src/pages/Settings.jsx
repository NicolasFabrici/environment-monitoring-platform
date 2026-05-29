import Layout from "../components/Layout";

import {
    User,
    Shield,
    Bell,
    Server
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import socket from "../services/socket";

function Settings() {

    const { user } = useAuth();

    return (

        <Layout>

            <div className="p-8">

                <h1 className="text-4xl font-bold text-white mb-8">

                    Settings

                </h1>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <div className="flex items-center gap-3 mb-6">

                            <User className="text-green-400" />

                            <h2 className="text-2xl font-bold text-white">

                                Profile

                            </h2>

                        </div>

                        <div className="space-y-4">

                            <div>

                                <p className="text-slate-400 mb-1">
                                    Username
                                </p>

                                <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white">

                                    {user?.username}

                                </div>

                            </div>

                            <div>

                                <p className="text-slate-400 mb-1">
                                    Role
                                </p>

                                <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white">

                                    {user?.role}

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <div className="flex items-center gap-3 mb-6">

                            <Shield className="text-blue-400" />

                            <h2 className="text-2xl font-bold text-white">

                                Security

                            </h2>

                        </div>

                        <div className="space-y-4">

                            <input
                                type="password"
                                placeholder="New Password"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
                            />

                            <button
                                className="bg-blue-500 hover:bg-blue-400 transition px-5 py-3 rounded-lg font-semibold"
                            >

                                Change Password

                            </button>

                        </div>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <div className="flex items-center gap-3 mb-6">

                            <Bell className="text-yellow-400" />

                            <h2 className="text-2xl font-bold text-white">

                                Notifications

                            </h2>

                        </div>

                        <div className="space-y-4">

                            <label className="flex items-center justify-between">

                                <span className="text-white">

                                    Realtime Alerts

                                </span>

                                <input type="checkbox" defaultChecked />

                            </label>

                            <label className="flex items-center justify-between">

                                <span className="text-white">

                                    Sound Notifications

                                </span>

                                <input type="checkbox" />

                            </label>

                            <label className="flex items-center justify-between">

                                <span className="text-white">

                                    Email Notifications

                                </span>

                                <input type="checkbox" />

                            </label>

                        </div>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                        <div className="flex items-center gap-3 mb-6">

                            <Server className="text-red-400" />

                            <h2 className="text-2xl font-bold text-white">

                                System Status

                            </h2>

                        </div>

                        <div className="space-y-4">

                            <div className="flex items-center justify-between">

                                <span className="text-slate-300">

                                    Backend API

                                </span>

                                <span className="text-green-400 font-semibold">

                                    Online

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-slate-300">

                                    Socket.io

                                </span>

                                <span className="text-green-400 font-semibold">

                                    {
                                        socket.connected
                                            ? "Connected"
                                            : "Disconnected"
                                    }

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-slate-300">

                                    Database

                                </span>

                                <span className="text-green-400 font-semibold">

                                    Connected

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-slate-300">

                                    Version

                                </span>

                                <span className="text-slate-400">

                                    v1.0.0

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Settings;