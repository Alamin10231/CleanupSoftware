import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginpicture from "../../assets/Image/loginpicture.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSignUpMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import logo from "/src/assets/logo/logo.svg";

export default function SignUp() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    toast.loading("Creating account...", { id: "signup" });

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

    const payload = {
      name: firstName,
      email: email,
      prime_phone: number,
      password: password,
    };

    try {
      const response = await signUp(payload).unwrap();
      dispatch(setCredentials(response));
      toast.success("Account created successfully!", { id: "signup" });
      navigate(`/verifyotp-activation/${encodeURIComponent(email)}`);
    } catch (err: any) {
      const message = err.data?.message || "Something went wrong, please try again.";
      setError(message);
      toast.error(message, { id: "signup" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#664FFF]">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-lg">
        
        {/* Left Panel */}
        <div className="hidden md:flex w-1/2 bg-[#7065FF] text-white p-20 flex-col justify-center">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Create <br /> Account
          </h2>
          <p className="mt-6 opacity-90 text-lg">
            Join us and enjoy all features.
          </p>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center w-full md:w-1/2 px-6 md:px-14 py-10">
          <div className="flex items-center self-end mb-6">
            <img src={logo} alt="CleanUp Pro Logo" className="h-12" />
          </div>

          <h1 className="text-2xl font-semibold mb-2 self-start">Sign Up</h1>
          <p className="text-[#313131] self-start pb-4">
            Create your personal account
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            {/* Name */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">First Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">Last Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  placeholder="0123456789"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-10 text-gray-500"
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
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
                placeholder="••••••••"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setCShow(!cshow)}
                className="absolute right-3 top-10 text-gray-500"
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
                className="rounded border-gray-300"
              />
              <span>
                I agree to all the{" "}
                <span className="text-[#FF8682]">Terms</span> and{" "}
                <span className="text-[#FF8682]">Privacy Policies</span>
              </span>
            </label>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit */}
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
          </form>

          <p className="text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-[#FF8682]">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
