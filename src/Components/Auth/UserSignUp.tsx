import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import loginpicture from "../../assets/Image/loginpicture.jpg";
import { Link } from "react-router";
import { assets } from "../../assets/assets";
export default function UserSignUp() {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);      // Password show/hide
  const [cshow, setCShow] = useState(false);    // Confirm Password show/hide

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, number, password, cpassword, remember });
    // এখানে API কল বা auth logic দিন
  };

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
          <div className=" " />
             <img src={assets.logo} alt="CleanUp Pro Logo" className="w-[140px] mx-auto" />
        </div>

        <h1 className="text-2xl relative  font-semibold mb-6 text-left self-start">
  Sign Up
</h1>
<p className="text-left self-start pb-3">Let's get you all st up so you can access your personal account</p>

        <form onSubmit={handleSubmit} className="w-full max-w-full space-y-5">
          {/* First & Last Name */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <fieldset className="border border-gray-400 rounded px-3 pt-1">
                <legend className="text-sm px-1 text-[#1C1B1F]">First Name</legend>
                <input
                  type="text"
                  defaultValue="John"
                  className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F]"
                />
              </fieldset>
            </div>
            <div className="flex-1">
              <fieldset className="border border-gray-400 rounded px-3 pt-1">
                <legend className="text-sm px-1 text-[#1C1B1F]">Last Name</legend>
                <input
                  type="text"
                  defaultValue="Doe"
                  className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F]"
                />
              </fieldset>
            </div>
          </div>

          {/* Email & Phone */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <fieldset className="border border-gray-400 rounded px-3 pt-1">
                <legend className="text-sm px-1 text-[#1C1B1F]">Email</legend>
                <input
                  type="email"
                  placeholder="john.doe@gmail.com"
                  className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="flex-1">
              <fieldset className="border border-gray-400 rounded px-3 pt-1">
                <legend className="text-sm px-1 text-[#1C1B1F]">Phone Number</legend>
                <input
                  type="number"
                  placeholder="********"
                  className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F]"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </fieldset>
            </div>
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
              className="absolute right-3 top-9 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative w-full">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type={cshow ? "text" : "password"}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              value={cpassword}
              onChange={(e) => setcPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setCShow(!cshow)}
              className="absolute right-3 top-9 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {cshow ? <FaEyeSlash /> : <FaEye />}
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
              <p className="font-semibold">I agree to all the <span className="text-[#FF8682]">Teams</span> and <span className="text-[#FF8682]">Privacy Policies</span></p>
            </label>
           
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#2463EA] text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
           Create Account
          </button>
        </form>

        {/* Social login */}
          <p className="py-2">Already have an account? <Link to="/adminlogin"><span className="text-[#FF8682]">login</span></Link></p>
        <div className="flex items-center my-6 w-full max-w-sm">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">Or sign up with</span>
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
    </div>
  );
}
