import { assets, ServiceTopCard } from "@/assets/assets"
import Card from "@/Components/Card"
import ServiceCard from "@/Components/ServiceCard"
import { Button } from "@/Components/ui/button"


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
          <Button size={'lg'}>+ Export</Button>
          <Button size={'lg'}>Add Services</Button>
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
