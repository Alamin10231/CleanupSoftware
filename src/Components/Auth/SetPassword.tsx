import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  FaApple,
  FaEye,
  FaEyeSlash,
  FaFacebook,
} from "react-icons/fa";
import loginpicture from "../../assets/Image/loginpicture.jpg";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { IoIosArrowBack } from "react-icons/io";

export default function VerifyCode() {
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");

  // আলাদা স্টেট দুই ইনপুটের জন্য
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }

    console.log({ password, cpassword });
    // এখানে API কল বা auth logic দিন

    // সফল হলে পরবর্তী পেইজে নেভিগেট করুন
    navigate("/success");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 md:px-16 bg-white">
        {/* Logo */}
        <div className="flex items-center self-end space-x-2 mb-8">
          <div className="p-6">
            <img
              src={assets.logo}
              alt="CleanUp Pro Logo"
              className="w-[140px] mx-auto"
            />
          </div>
        </div>

        {/* Back to login */}
        <div className="self-start flex items-center gap-2 mb-4">
          <IoIosArrowBack />
          <span>
            Back to{" "}
            <Link to="/adminlogin" className="text-blue-600 underline">
              login
            </Link>
          </span>
        </div>

        <h1 className="text-2xl font-semibold mb-3 self-start">
          Set a password
        </h1>
        <p className="self-start pb-3 text-lg max-w-md text-[#313131]">
          Your previous password has been reset. Please set a new password for
          your account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {/* Create Password */}
          <div className="relative w-full">
            <fieldset className="border border-gray-400 rounded px-3 pt-1 relative">
              <legend className="text-sm px-1 text-[#1C1B1F]">
                Create Password
              </legend>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F] pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </fieldset>
          </div>

          {/* Confirm Password */}
          <div className="relative w-full">
            <fieldset className="border border-gray-400 rounded px-3 pt-1 relative">
              <legend className="text-sm px-1 text-[#1C1B1F]">
                Confirm Password
              </legend>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F] pr-10"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </fieldset>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

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
          <button
            type="button"
            className="flex items-center justify-center border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50"
          >
            <FaApple className="text-black mr-2" />
            Apple
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
