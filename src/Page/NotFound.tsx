import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 border w-full max-w-md">
                <div className="flex flex-col items-center mb-4">
                    <Home size={48} className="text-blue-500 mb-2" />
                    <h1 className="text-3xl font-bold mb-2">
                        404 - Page Not Found
                    </h1>
                    <p className="text-gray-500 mb-6">
                        Sorry, the page you are looking for does not exist.
                    </p>
                </div>
                <Link
                    to="/"
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition font-semibold"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
