import { Link, useLocation } from "react-router-dom";

import {
    LayoutDashboard,
    Thermometer,
    Bell,
    FileText,
    Settings,
    Users
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Layout({ children }) {

    const location = useLocation();

    const { user, logout } = useAuth();

    const menuItems = [

        {
            name: "Dashboard",
            path: "/",
            icon: <LayoutDashboard size={20} />
        },

        {
            name: "Sensors",
            path: "/sensors",
            icon: <Thermometer size={20} />
        },

        {
            name: "Alerts",
            path: "/alerts",
            icon: <Bell size={20} />
        },

        {
            name: "Reports",
            path: "/reports",
            icon: <FileText size={20} />
        },

        ...(user?.role === "Admin"
            ? [{
                name: "Users",
                path: "/users",
                icon: <Users size={20} />
            }]
            : []),

        {
            name: "Settings",
            path: "/settings",
            icon: <Settings size={20} />
        }

    ];

    return (

        <div className="flex min-h-screen bg-slate-950 text-white">

            <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5">

                <h1 className="text-4xl font-bold text-green-400 mb-10">

                    EnviroMonitor

                </h1>

                <nav className="space-y-3">

                    {menuItems.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                            
                            ${location.pathname === item.path
                                    ? "bg-slate-800 text-green-400"
                                    : "hover:bg-slate-800"
                                }`}
                        >

                            {item.icon}

                            {item.name}

                        </Link>

                    ))}

                </nav>

            </aside>

            <main className="flex-1">

                <header className="bg-slate-900 border-b border-slate-800 px-10 py-5 flex justify-between items-center">

                    <div>

                        <h1 className="text-4xl font-bold">

                            Environmental Dashboard

                        </h1>

                        <p className="text-slate-400">

                            Real-time monitoring system

                        </p>

                    </div>

                    <div className="flex items-center gap-4">

                        <div className="text-right">

                            <p className="font-bold">

                                {user?.username}

                            </p>

                            <p className="text-slate-400 text-sm">

                                System Operator

                            </p>

                            <button
                                onClick={logout}
                                className="text-red-400 text-sm hover:text-red-300 transition"
                            >

                                Logout

                            </button>

                        </div>

                        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-xl">

                            {user?.username
                                ?.charAt(0)
                                ?.toUpperCase()}

                        </div>

                    </div>

                </header>

                <div className="p-10">

                    {children}

                </div>

            </main>

        </div>

    );

}

export default Layout;