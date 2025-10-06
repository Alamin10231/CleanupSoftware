import { useState } from "react";
import { assets } from "../../assets/assets";
import Button from "@/Components/Button";
import { Link, NavLink } from "react-router";
import PricingSection from "@/Components/PricingSection";
import Discover_More from "@/Components/Discover_More";

const Home = () => {
    const faqs = [
        {
            question: "Which is the Best Influence Service?",
            answer: "Our top influence service helps you reach a wider audience and boost engagement through verified influencers.",
        },
        {
            question: "Which is the Best Influence Service?",
            answer: "We provide personalized strategies to maximize your ROI with influencer marketing.",
        },
        {
            question: "Which is the Best Influence Service?",
            answer: "Our platform tracks results in real-time so you can see the impact of your campaigns instantly.",
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="nunito">
            <div
                className="w-full h-[100vh] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${assets.Color_Background_Image})`,
                }}
            >
                {/* Nav */}
                <div className="container mx-auto px-10 py-6 flex justify-between items-center">
                    <Link to="/home">
                        <img src={assets.logo} alt="logo" />
                    </Link>
                    <div className="flex gap-10 items-center">
                        <NavLink to="/home">Home</NavLink>
                        <NavLink to="#">About Us</NavLink>
                        <NavLink to="#">Contact Us</NavLink>
                    </div>
                    <div className="flex gap-6">
                        <Link to="/adminlogin"><button className="text-[#8241ED] border border-[#8241ED] px-4 py-2 cursor-pointer rounded-full hover:bg-[#8241ED] hover:text-white">
                            Log In
                        </button></Link>
                       <Link to="/signup"> <Button text="Sign Up" /></Link>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="container mx-auto px-10 flex justify-between items-center mt-25">
                    <div>
                        <span className="text-sm text-white bg-[#8241ED] px-3 py-1 rounded-full">
                            Our Staff
                        </span>
                        <h1 className="text-7xl font-bold text-gray-900 leading-tight mt-6">
                            Professional Cleaning <br /> & Maintenance <br />{" "}
                            Services
                        </h1>
                        <div className="flex gap-6 mt-10">
                            <button className="px-6 py-3 rounded-full border-blue-600 bg-blue-600 text-white cursor-pointer">
                                Hire
                            </button>
                            <button className="border cursor-pointer border-[#8241ED] text-[#8241ED] px-6 py-3 rounded-full hover:bg-[#8241ED] hover:text-white">
                                Discover more
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-6">
                        <img
                            src={assets.image1}
                            alt="img1"
                            className="w-44 h-44 rounded-xl object-cover"
                        />
                        <img
                            src={assets.image2}
                            alt="img2"
                            className="w-44 h-44 rounded-xl object-cover"
                        />
                        <img
                            src={assets.image3}
                            alt="img3"
                            className="w-44 h-44 rounded-xl object-cover"
                        />
                        <img
                            src={assets.image4}
                            alt="img4"
                            className="w-44 h-44 rounded-xl object-cover col-span-2"
                        />
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div>
                <p className="text-center text-2xl py-5 text-blue-500">Service</p>
                <h2 className="text-center text-5xl font-bold">
                    Choose the Service You Need
                </h2>
                <p className="text-center text-base pt-5">
                    Select the services that match your lifestyle and property
                    needs.
                </p>

                <div className="container mx-auto px-6 py-10">
                    <div className="grid grid-cols-4 gap-6">
                        <div>
                            <img
                                src={assets.Regular_Cleaning}
                                className="w-full h-48 object-cover rounded-xl"
                            />
                            <h3 className="text-xl font-semibold mt-3">
                                Regular Cleaning
                            </h3>
                            <p className="text-base text-gray-400">
                                Maintain a spotless environment with our routine
                                cleaning services.
                            </p>
                        </div>
                        <div>
                            <img
                                src={assets.DeepCleaning}
                                className="w-full h-48 object-cover rounded-xl"
                            />
                            <h3 className="text-xl font-semibold mt-3">
                                Deep Cleaning
                            </h3>
                            <p className="text-base text-gray-400">
                                Thorough cleaning for a fresh start, reaching
                                every corner.
                            </p>
                        </div>
                        <div>
                            <img
                                src={assets.Maintence}
                                className="w-full h-48 object-cover rounded-xl"
                            />
                            <h3 className="text-xl font-semibold mt-3">
                                Maintenance
                            </h3>
                            <p className="text-base text-gray-400">
                                Keep your property in top shape with our
                                comprehensive maintenance solutions.
                            </p>
                        </div>
                        <div>
                            <img
                                src={assets.Landscaping}
                                className="w-full h-48 object-cover rounded-xl"
                            />
                            <h3 className="text-xl font-semibold mt-3">
                                Landscaping
                            </h3>
                            <p className="text-base text-gray-400">
                                Enhance your property's curb appeal with our
                                professional landscaping.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-10 justify-items-center">
                        <div>
                            <img
                                src={assets.pest_control}
                                className="w-full h-48 object-cover rounded-xl"
                            />
                            <h3 className="text-xl font-semibold mt-3">
                                Pest Control
                            </h3>
                            <p className="text-base text-gray-400">
                                Protect your property from unwanted pests with
                                our effective pest control.
                            </p>
                        </div>
                        <div>
                            <img
                                src={assets.Security}
                                className="w-full h-48 object-cover rounded-xl"
                            />
                            <h3 className="text-xl font-semibold mt-3">
                                Security
                            </h3>
                            <p className="text-base text-gray-400">
                                Ensure safety and peace of mind with our
                                reliable security services.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Need Help Section with Smooth Accordion */}
            <div className="">
                <h1 className="text-4xl font-bold text-center mt-20">
                    Need Help
                </h1>
                <p className="text-base text-gray-400 text-center mt-5">
                    We are here to assist you. Contact our support team for any
                    inquiries or assistance you may need.
                </p>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center  px-6 md:px-20 py-10 gap-10">
                    {/* Left Side */}
                    <div className="flex-1">
                        <img src={assets.Help} className="w-full h-auto" />
                    </div>

                    {/* Right Side Accordion */}
                    <div className="flex-1 space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    className=" rounded-lg overflow-hidden shadow-sm"
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full   px-6 py-4 cursor-pointer bg-blue-100 hover:bg-gray-200 flex justify-between items-center transition-colors"
                                    >
                                        <span className="font-semibold text-gray-800">
                                            {faq.question}
                                        </span>
                                        <span className="text-blue-600">
                                            {isOpen ? "−" : "+"}
                                        </span>
                                    </button>
                                    <div
                                        style={{
                                            maxHeight: isOpen ? "500px" : "0px",
                                        }}
                                        className="transition-all duration-500 overflow-hidden px-6"
                                    >
                                        <p className="py-4 bg-white text-gray-600">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Client Says */}
            <div className="mt-20 text-center bg-[rgba(36,99,234,0.2)] p-20 rounded-lg ">
                {/* Heading */}
                <h1 className="text-4xl font-bold">Client Says</h1>
                <p className="max-w-2xl mx-auto mt-4 text-gray-600">
                    Furthermore, Lorem provides valuable insights into customer
                    behavior and preferences. With analytics tools provided by
                    social media platforms, businesses can take.
                </p>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row items-stretch mt-10 justify-center">
                    {/* Left Side (Image) */}
                    <div className="overflow-hidden h-[300px] w-[300px] rounded-l-lg">
                        <img
                            className="w-full h-full object-cover"
                            src={assets.Client}
                            alt="client"
                        />
                    </div>

                    {/* Right Side (Testimonial Card) */}
                    <div className="relative bg-white p-6 shadow-md w-full md:w-[500px] h-[300px] flex flex-col justify-between text-left rounded-r-lg">
                        {/* Quote Icon */}
                        <svg
                            className="absolute top-4 right-4 w-8 h-8 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M9 11.5c0-3.59 2.91-6.5 6.5-6.5V4C10.91 4 7 7.91 7 12.5S10.91 21 15.5 21v-1.5c-3.59 0-6.5-2.91-6.5-6.5zm8 0c0-3.59 2.91-6.5 6.5-6.5V4C18.91 4 15 7.91 15 12.5s3.91 8.5 8.5 8.5v-1.5c-3.59 0-6.5-2.91-6.5-6.5z" />
                        </svg>

                        {/* Client Info */}
                        <div>
                            <h3 className="text-xl font-semibold">
                                Lana Bernier
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Senior Paradigm Strategist
                            </p>
                        </div>

                        {/* Testimonial */}
                        <p className="mt-4 text-gray-600 text-sm leading-relaxed flex-grow">
                            Vestibulum ante ipsum primis in faucibus orci luctus
                            et ultrices posuere cubilia Curae; Sed dignissim,
                            velit eget consectetur commodo, justo velit
                            consequat justo.
                        </p>

                        {/* Date */}
                        <p className="text-xs text-gray-400 mt-3">
                            25 December, 2023 • 8:00 am
                        </p>
                    </div>
                </div>
            </div>

            {/* Pricing */}
            <PricingSection />
            <Discover_More />
        </div>
    );
};

export default Home;
