import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginpicture from "../../assets/Image/loginpicture.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { IoIosArrowBack } from "react-icons/io";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

export default function SetPassword() {
   const { email } = useParams()
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      console.log('submitting password reset...', { email, code, new_password: password})
    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.loading("Resetting password...", { id: "reset-password" });
    try {
      await resetPassword({
        email,
        code,
        new_password: password,
      }).unwrap();
      toast.success("Password reset successful!", { id: "reset-password" });
      navigate("/login");
    } catch (err: any) {
      toast.error(err.data?.message || "Something went wrong", {
        id: "reset-password",
      });
    }
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
          Set a new password
        </h1>
        <p className="self-start pb-3 text-lg max-w-md text-[#313131]">
          Your previous password has been reset. Please set a new one for your
          account.
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
          {/* otp */}
          <div className="relative w-full">
            <fieldset className="border border-gray-400 rounded px-3 pt-1 relative">
              <legend className="text-sm px-1 text-[#1C1B1F]">
                OTP
              </legend>
              <input
                type={"text"}
                placeholder="••••••••"
                className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F] pr-10"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </fieldset>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-2 rounded-md transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
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
