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

      

      {/* Service Card */}
      <div className="mt-6">
        <ServiceCard />
      </div>
    </>
  )
}

export default Services