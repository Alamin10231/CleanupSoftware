import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import loginpicture from"../../assets/Image/loginpicture.jpg"
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [show,setShow] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, remember });
    // এখানে API কল বা auth logic দিন
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 md:px-16 bg-white">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-6 h-6 rounded-full bg-blue-500" />
          <span className="font-bold text-lg">CleanUp Pro</span>
          <span className="text-sm text-gray-400">PLATFORM</span>
        </div>

        <h1 className="text-2xl font-semibold mb-6">Admin Login</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-full space-y-5">
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

      {/* Input */}
      <input
        type={show ? "text" : "password"}
        className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Eye Icon */}
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-11 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => alert("Reset password flow")}
            >
              Forgot Password
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="#" className="text-red-500 hover:underline">
            Sign up
          </a>
        </p>

        {/* Social login */}
        <div className="flex items-center my-6 w-full max-w-sm">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">Or login with</span>
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
          className="w-full max-h-screen  object-cover"
        />
      </div>
    </div>
  );
}
