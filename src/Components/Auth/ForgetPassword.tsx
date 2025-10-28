import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginpicture from "../../assets/Image/loginpicture.jpg";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "sonner";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import Logo from "../Logo";

export default function ForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Sending OTP...", { id: "forget-password" });
    try {
      await forgetPassword({ email }).unwrap();
      toast.success("OTP sent successfully!", { id: "forget-password" });
      navigate(`/set-password/${encodeURIComponent(email)}`);
    } catch (err: any) {
      console.log(err);
      toast.error(err.data?.message || "Something went wrong", {
        id: "forget-password",
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
            <Logo />
          </div>
        </div>

        {/* Back to login */}
        <div className="self-start flex items-center justify-center gap-2">
          <IoIosArrowBack />
          <span>
            Back to{" "}
            <Link to="/login" className="text-blue-600 underline">
              login
            </Link>
          </span>
        </div>

        <h1 className="text-2xl font-semibold mb-6 self-start">
          Forget your Password
        </h1>
        <p className="self-start pb-3 text-xl max-w-md text-[#313131]">
          Don't worry, happens to all of us. Enter your email below to recover
          your password
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-full space-y-5">
          <div className="relative w-full">
            <fieldset className="border border-gray-400 rounded px-3 pt-1">
              <legend className="text-sm px-1 text-[#1C1B1F]">Email</legend>
              <input
                type="email"
                placeholder="user@example.com"
                className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Submit
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
