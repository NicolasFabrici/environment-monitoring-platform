function Navbar() {
    return (
        <div className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

            <div>
                <h2 className="text-2xl font-bold">
                    Environmental Dashboard
                </h2>

                <p className="text-slate-400 text-sm">
                    Real-time monitoring system
                </p>
            </div>

            <div className="flex items-center gap-4">

                <div className="text-right">
                    <p className="font-semibold">Admin</p>
                    <p className="text-sm text-slate-400">
                        System Operator
                    </p>
                </div>

                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center font-bold">
                    A
                </div>

            </div>
        </div>
    );
}

export default Navbar;