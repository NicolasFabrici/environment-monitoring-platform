import { useEffect, useState } from "react";
import api from "../services/api";
import { AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";
import socket from "../services/socket";

function AlertsPanel() {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        fetchAlerts();
        socket.on("new-alert", () => {
            toast.error(
                "New critical alert detected"
            );
            fetchAlerts();
        });
        return () => {
            socket.off("new-alert");
        };
    }, []);

    const fetchAlerts = async () => {

        try {

            const response = await api.get("/alerts");

            setAlerts(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

            <div className="flex items-center justify-between mb-5">

                <h2 className="text-xl font-bold">
                    System Alerts
                </h2>

                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    {alerts.length}
                </div>

            </div>

            <div className="space-y-4">

                {alerts.map((alert, index) => (

                    <div
                        key={index}
                        className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-4"
                    >

                        <AlertTriangle className="text-red-400" />

                        <div>

                            <p className="font-semibold">
                                {alert.message}
                            </p>

                            <p className="text-sm text-slate-400">
                                {alert.value}
                            </p>

                        </div>

                    </div>

                ))}

                {alerts.length === 0 && (

                    <p className="text-slate-400">
                        No active alerts
                    </p>

                )}

            </div>

        </div>

    );
}

export default AlertsPanel;