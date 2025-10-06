import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import loginpicture from "../../assets/Image/loginpicture.jpg";
import { Link, useNavigate } from "react-router-dom";   
import { assets } from "../../assets/assets";
import { IoIosArrowBack } from "react-icons/io";

export default function Verifyotp() {
  const [password, setPassword] = useState<string>(""); 
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ password });
    // এখানে API কল বা auth logic দিন

    // সাবমিটের পর পরবর্তী পেইজে নেভিগেট করুন
    navigate("/adminlogin");
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
        <div className="self-start flex items-center justify-center gap-2">
          <IoIosArrowBack />
          <span>
            Back to <Link to="/adminlogin" className="text-blue-600 underline">login</Link>
          </span>
        </div>

        <h1 className="text-2xl font-semibold mb-6 self-start">
         Verify code
        </h1>
        <p className="self-start pb-3 text-xl max-w-md text-[#313131]">
         An authentication code has been sent to your email
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-full space-y-5">
          <div className="relative w-full">
            <fieldset className="border border-gray-400 rounded px-3 pt-1">
                <legend className="text-sm px-1 text-[#1C1B1F]">Enter Code</legend>
                <input
                  type="text"
                  placeholder="****"
                  className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-8 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <Link to="/adminlogin">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Verify
          </button></Link>
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
