import {
    LayoutDashboard,
    Thermometer,
    Bell,
    FileText,
    Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {

    const linkClass = ({ isActive }) =>

        `flex items-center gap-3 text-left p-3 rounded-lg transition ${isActive
            ? "bg-slate-800 text-green-400"
            : "hover:bg-slate-800"
        }`;

    return (

        <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 p-5 fixed">

            <h1 className="text-2xl font-bold text-green-400 mb-10">
                EnviroMonitor
            </h1>

            <nav className="flex flex-col gap-4">

                <NavLink
                    to="/"
                    className={linkClass}
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/sensors"
                    className={linkClass}
                >
                    <Thermometer size={20} />
                    Sensors
                </NavLink>

                <NavLink
                    to="/alerts"
                    className={linkClass}
                >
                    <Bell size={20} />
                    Alerts
                </NavLink>

                <NavLink
                    to="/reports"
                    className={linkClass}
                >
                    <FileText size={20} />
                    Reports
                </NavLink>

                <NavLink
                    to="/settings"
                    className={linkClass}
                >
                    <Settings size={20} />
                    Settings
                </NavLink>

            </nav>

        </div>

    );

}

export default Sidebar;