import React from "react";

const ProgressBar: React.FC = () => {
    const today = new Date();

    // Get year & month
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // 0-indexed, so +1
    const day = today.getDate();

    // Get total days in current month
    const totalDays = new Date(year, month, 0).getDate();

    const elapsed = day;
    const remaining = totalDays - day;
    const unpaid = 0; // static for now

    const percentage = Math.min((elapsed / totalDays) * 100, 100);

    return (
        <div className="mt-5 ">
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">
                            Month Progress ({year}-{month.toString().padStart(2, "0")})
                        </p>
                        <p className="font-semibold text-gray-900 mb-3">
                            Day {elapsed} of {totalDays}
                        </p>
                    </div>
                    <div className="flex gap-8 text-sm text-gray-700">
                        <div className="flex flex-col items-center">
                            <span className="font-medium">Elapsed</span>
                            <span className="text-base font-semibold">{elapsed}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-medium">Remaining</span>
                            <span className="text-base font-semibold">{remaining}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-medium">Unpaid</span>
                            <span className="text-base font-semibold">{unpaid}</span>
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden mb-4">
                    <div
                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-in-out"
                        style={{ width: `${percentage}%` }}
                    />
                </div>


            </div>
        </div>
    );
};

export default ProgressBar;
