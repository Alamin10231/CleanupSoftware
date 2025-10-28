import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginpicture from "../../assets/Image/loginpicture.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import logo from "/src/assets/logo/logo.svg";
import { Button } from "../ui/button";

export default function Login() {
  const dispatch = useDispatch();
  const [login, { isLoading, isError }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Login successful!");
      navigate("/");
    } catch (err: any) {
      const message = err.data?.message || "An error occurred";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 md:px-16 bg-white">
        <div className="flex items-center self-end space-x-2 mb-8">
          <div className="p-6">
            <img src={logo} alt="CleanUp Pro Logo" className="mx-auto" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-6 self-start">Login</h1>
        <p className="text-[#313131] self-start pb-2">
          Login to access your account
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-full space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
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
              to="/forget-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-md transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Sign up link */}
        <p className="text-sm text-gray-600 mt-6">
          Don’t have an account?
          <span className="text-[#FF8682] hover:underline">
            {" "}
            <Link to="/signup">Sign up</Link>
          </span>
        </p>
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
