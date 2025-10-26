import { assets } from "@/assets/assets";
import Card from "@/Components/Card";
import ServiceCard from "@/Components/ServiceCard";
import { useGetServiceAdminOverviewQuery } from "@/redux/features/admin/services/services.api";

const Services = () => {
  const { data: serviceOverview } = useGetServiceAdminOverviewQuery(undefined);

  const ServiceTopCard = [
    {
      title: "Total Service",
      number: serviceOverview?.total_services ?? 0,
      iconKey: "total_service",
      iconAlt: "total employee",
    },
    {
      title: "Active",
      number: serviceOverview?.active_booking ?? 0,
      iconKey: "Active",
      iconAlt: "active",
    },
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
        </div>
      </div>

      {/* Card */}
      {
        <div className="grid grid-cols-3 gap-4 mt-6">
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
  );
};

export default Services;
