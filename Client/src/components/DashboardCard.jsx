function DashboardCard({ title, value, unit }) {
    return (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

            <h3 className="text-slate-400 text-sm mb-2">
                {title}
            </h3>

            <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">
                    {value}
                </span>

                <span className="text-slate-400 mb-1">
                    {unit}
                </span>
            </div>

        </div>
    );
}

export default DashboardCard;