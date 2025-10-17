import { assets } from "@/assets/assets"
import Card from "@/Components/Card"
import ServiceCard from "@/Components/ServiceCard"
import { Button } from "@/Components/ui/button"
import {  useGetServiceAdminOverviewQuery } from "@/redux/api/apiSlice"
import { Link } from "react-router"


const Services = () => {

  const {data:serviceOverview} = useGetServiceAdminOverviewQuery()
  // console.log("serviceOverview",serviceOverview);
 
  
   const ServiceTopCard = [
  {
    title: "Total Service",
    number: serviceOverview?.total_services ?? 0,
    iconKey: "total_service",
    iconAlt: "total employee",
  },
  { title: "Active",
    number: serviceOverview?.active_booking ?? 0, 
    iconKey: "Active",
    iconAlt: "active" },
  // {
  //   title: "Avg Rating",
  //   number: 4.8,
  //   iconKey: "AVG_rating",
  //   iconAlt: "Avg Performance",
  // },
  {
    title: "Total Revenue",
    number: serviceOverview?.total_revenue ?? 0,
    iconKey: "Total_revenue",
    iconAlt: "Total_revenue",
  },

];
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
          <Link to="/add-services">
            <Button size={'lg'}>Add Services</Button>
          </Link>
        </div>
      </div>

      {/* Card */}
      {
        <div className="grid grid-cols-4 gap-4 mt-6">
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
