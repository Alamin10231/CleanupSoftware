import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import loginpicture from "../../assets/Image/loginpicture.jpg";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import { IoIosArrowBack } from "react-icons/io";
import { useVerifyOtpMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setOtp } from "@/redux/features/auth/authSlice";

export default function Verifyotp() {
  const [otp, setOtpState] = useState("");
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const dispatch = useDispatch();
  const { email } = useParams();

  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setResendDisabled(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendDisabled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitting otp...", email, otp);
    toast.loading("Verifying OTP...", { id: "verify-otp" });
    try {
      await verifyOtp({ email, code: otp }).unwrap();
      toast.success("OTP verified successfully!", { id: "verify-otp" });
      dispatch(setOtp(otp));
      navigate(`/set-password/${encodeURIComponent(email)}/${otp}`);
    } catch (err: any) {
      toast.error(err.data?.message || "Something went wrong", {
        id: "verify-otp",
      });
    }
  };

  const handleResendOtp = async () => {
    setResendDisabled(true);
    setCountdown(60);
    // Implement resend OTP logic here
    toast.success("OTP has been resent");
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
            Back to{" "}
            <Link to="/login" className="text-blue-600 underline">
              login
            </Link>
          </span>
        </div>

        <h1 className="text-2xl font-semibold mb-6 self-start">Verify code</h1>
        <p className="self-start pb-3 text-xl max-w-md text-[#313131]">
          An authentication code has been sent to your email
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-full space-y-5">
          <div className="relative w-full">
            <fieldset className="border border-gray-400 rounded px-3 pt-1">
              <legend className="text-sm px-1 text-[#1C1B1F]">
                Enter Code
              </legend>
              <input
                type="text"
                placeholder="******"
                className="w-full outline-none border-none pb-2 focus:ring-0 text-[#1C1B1F]"
                value={otp}
                onChange={(e) => setOtpState(e.target.value)}
              />
            </fieldset>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-sm text-gray-600 mt-4">
          Didn't receive the code?{" "}
          <button
            onClick={handleResendOtp}
            disabled={resendDisabled}
            className={`font-medium ${
              resendDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:underline"
            }`}
          >
            {resendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
          </button>
        </div>

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
