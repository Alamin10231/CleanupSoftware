import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import loginpicture from "../../assets/Image/loginpicture.jpg";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useDispatch } from "react-redux";
import { useSignUpMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

export default function SignUp() {
  // ✅ State variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);
  const [cshow, setCShow] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signUp, { isLoading }] = useSignUpMutation();

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    toast.loading("Creating account...", { id: "signup" });
    const payload = {
      name: firstName,
      email: email,
      prime_phone: number,
      password: password,
    };

    if (password !== cpassword) {
      setError("Passwords do not match!");
      toast.error("Passwords do not match!", { id: "signup" });
      return;
    }

    if (!remember) {
      setError("You must agree to the Terms and Privacy Policies.");
      toast.error("You must agree to the Terms and Privacy Policies.", {
        id: "signup",
      });
      return;
    }

    try {
      const response = await signUp(payload).unwrap();
      dispatch(setCredentials(response));
      toast.success("Account created successfully!", { id: "signup" });
      navigate(`/verifyotp-activation/${encodeURIComponent(email)}`);
    } catch (err: any) {
      console.error("Error:", err);
      const message = err.data?.message || "Something went wrong, please try again.";
      setError(message);
      toast.error(message, { id: "signup" });
    }
  };

  // ✅ UI
  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden md:block w-1/2">
        <img
          src={loginpicture}
          alt="Cleaning"
          className="w-full max-h-screen object-cover"
        />
      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 md:px-16 bg-white">
        {/* Logo */}
        <div className="flex self-end items-center space-x-2 mb-8">
          <img
            src={assets.logo}
            alt="CleanUp Pro Logo"
            className="w-[140px] mx-auto"
          />
        </div>

        <h1 className="text-2xl font-semibold mb-6 self-start">Sign Up</h1>
        <p className="text-left self-start pb-3">
          Let’s get you all set up so you can access your personal account
        </p>

        {/* ✅ Signup Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-full space-y-5">
          {/* First & Last Name */}
          <div className="flex items-center gap-3">
            <fieldset className="flex-1 border border-gray-400 rounded px-3 pt-1">
              <legend className="text-sm px-1 text-[#1C1B1F]">
                First Name
              </legend>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F]"
                required
              />
            </fieldset>
            <fieldset className="flex-1 border border-gray-400 rounded px-3 pt-1">
              <legend className="text-sm px-1 text-[#1C1B1F]">Last Name</legend>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F]"
                required
              />
            </fieldset>
          </div>

          {/* Email & Phone */}
          <div className="flex items-center gap-3">
            <fieldset className="flex-1 border border-gray-400 rounded px-3 pt-1">
              <legend className="text-sm px-1 text-[#1C1B1F]">Email</legend>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@gmail.com"
                className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F]"
                required
              />
            </fieldset>
            <fieldset className="flex-1 border border-gray-400 rounded px-3 pt-1">
              <legend className="text-sm px-1 text-[#1C1B1F]">Phone</legend>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="0123456789"
                className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F]"
                required
              />
            </fieldset>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
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

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type={cshow ? "text" : "password"}
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setCShow(!cshow)}
              className="absolute right-3 top-11 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {cshow ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Terms */}
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>
              I agree to all the <span className="text-[#FF8682]">Terms</span>{" "}
              and <span className="text-[#FF8682]">Privacy Policies</span>
            </span>
          </label>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          {/* <Link to="/verifyotp"> */}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-md transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2463EA] text-white hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
          {/* </Link> */}
        </form>

        {/* Already have an account */}
        <p className="py-2">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-[#FF8682]">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
