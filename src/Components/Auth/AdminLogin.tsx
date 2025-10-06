import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import loginpicture from "../../assets/Image/loginpicture.jpg";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";

export default function AdminLogin() {
    const dispatch = useDispatch()
    const [login, { isLoading, isError }] = useLoginMutation()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

 try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res)); // includes user, access, refresh
      alert("Login successful!");
      console.log("User info:", res.user);
    } catch (err) {
      console.error("Login failed:", err);
    }

      //   try {
      //       const response = await fetch(
      //           "https://lisa-nondisposable-judgingly.ngrok-free.app/api/v1/users/login/",
      //           {
      //               method: "POST",
      //               headers: {
      //                   "Content-Type": "application/json",
      //               },
      //               body: JSON.stringify({
      //                   email,
      //                   password,
      //               }),
      //           }
      //       );
      //       console.log();

      //       const data = await response.json();

      //       if (!response.ok) {
      //           throw new Error(data.message || "Login failed");
      //       }

      //       // Save token to local storage (optional)
      //       localStorage.setItem("token", JSON.stringify(data));
      //       console.log("Token:", data.refresh);

      //       alert("Login successful!");
      //       navigate("/");
      //   } catch (err: any) {
      //       setError(err.message);
      //   } finally {
      //       setLoading(false);
      //   }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 md:px-16 bg-white">
                <div className="flex items-center self-end space-x-2 mb-8">
                    <div className="p-6">
                        <img
                            src={assets.logo}
                            alt="CleanUp Pro Logo"
                            className="w-[140px] mx-auto"
                        />
                    </div>
                </div>

                <h1 className="text-2xl font-semibold mb-6 self-start">
                    Admin Login
                </h1>
                <p className="text-[#313131] self-start pb-2">
                    Login to access your travelwise account
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-full space-y-5"
                >
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email / Username
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="admin@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative w-full">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type={show ? "text" : "password"}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShow(!show)}
                            className="absolute right-3 top-11 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {show ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span>Remember me</span>
                        </label>
                        <Link
                            to="/forgetpassword"
                            className="text-blue-500 hover:underline"
                        >
                            Forgot Password
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-md transition ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Sign up link */}
                <p className="text-sm text-gray-600 mt-6">
                    Don’t have an account?
                    <span className="text-[#FF8682] hover:underline">
                        {" "}
                        <Link to="/signup">Sign up</Link>
                    </span>
                </p>

                {/* Social login */}
                <div className="flex items-center my-6 w-full max-w-sm">
                    <div className="flex-grow border-t border-gray-300" />
                    <span className="mx-4 text-gray-500 text-sm">
                        Or login with
                    </span>
                    <div className="flex-grow border-t border-gray-300" />
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        className="flex items-center justify-center border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50"
                    >
                        <FaFacebook className="text-blue-600 mr-2" />
                        Facebook
                    </button>
                    <button
                        type="button"
                        className="flex items-center justify-center border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50"
                    >
                        <FcGoogle className="mr-2" />
                        Google
                    </button>
                </div>
            </div>

            {/* Right Panel */}
            <div className="hidden md:block w-1/2">
                <img
                    src={loginpicture}
                    alt="Cleaning"
                    className="w-full max-h-screen object-cover"
                />
            </div>
        </div>
    );
}
