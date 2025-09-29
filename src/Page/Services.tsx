import { assets, ServiceTopCard } from "@/assets/assets"
import Card from "@/Components/Card"
import ServiceCard from "@/Components/ServiceCard"


const Services = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl text-[#030229]">Services</h1>
          <p className="text-gray-500 mt-2">Manage, analyze & elevate your offering portfolio. Refined experience with
            enhanced visuals.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-gray-300 border border-gray-300 px-5 py-2.5 rounded-xl font-semibold  cursor-pointer hover:border-blue-600  hover:bg-blue-600 hover:text-white">  Export</button>
          <button className="bg-blue-600 border border-gray-300 text-white font-semibold font-sm px-5 py-2.5 rounded-xl hover:bg-gray-300 hover:text-black hover:border cursor-pointer">Add Services</button>
        </div>
      </div>

      {/* Card */}
      {
        <div className="grid grid-cols-5 gap-4 mt-6">
          {ServiceTopCard.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              number={card.number}
              iconSrc={assets[card.iconKey]}
              iconAlt={card.iconAlt}
            />
          ))}
        </div>
      }

      {/* Search */}
      <div className="flex items-center justify-between gap-4 mt-8 p-6 bg-white border border-gray-300 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search employees..."
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <select
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer">
            <option>All Category</option>
            <option>Regular Cleaning</option>
            <option>Deep Cleaning</option>
            <option>Maintenance</option>
            <option>Landscaping</option>
            <option>Pest Control</option>
            <option>Security</option>
          </select>
          <select
            className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer">
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
          <select className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer">
            <option>All Shifts</option>
            <option>Morning</option>
            <option>Evening</option>
            <option>Night</option>
          </select>
        </div>
        <select className="border border-gray-300 rounded-md px-6 py-2 text-sm text-gray-600 cursor-pointer">
          <option>Sort By Popularity</option>
          <option>Sort By Name</option>
        </select>
      </div>

      {/* Service Card */}
      <div className="mt-6">
        <ServiceCard />
      </div>
    </>
  )
}

export default Services