import { useEffect, useState } from "react";
import socket from "../services/socket";
import { Activity } from "lucide-react";

function ActivityFeed() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        socket.on("activity-feed", (event) => {
            setActivities((prev) => [
                event,
                ...prev.slice(0, 9)
            ]);
        });

        return () => {
            socket.off("activity-feed");
        };

    }, []);

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <Activity className="text-green-400" />
                <h2 className="text-2xl font-bold text-white">
                    Realtime Activity Feed
                </h2>
            </div>

            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div
                        key={index}
                        className="bg-slate-800 rounded-xl p-4 border border-slate-700"
                    >
                        <p className="text-white">
                            {activity.message}
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                            {activity.time}
                        </p>
                    </div>
                ))}

                {activities.length === 0 && (
                    <p className="text-slate-400">
                        Waiting for realtime events...
                    </p>
                )}
            </div>
        </div>
    );
}

export default ActivityFeed;