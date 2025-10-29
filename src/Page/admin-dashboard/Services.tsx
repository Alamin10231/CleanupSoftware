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
      iconAlt: "Total Service",
    },
    {
      title: "Active",
      number: serviceOverview?.active_booking ?? 0,
      iconKey: "Active",
      iconAlt: "Active Services",
    },
    {
      title: "Total Revenue",
      number: serviceOverview?.total_revenue ?? 0,
      iconKey: "Total_revenue",
      iconAlt: "Total Revenue",
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <h1 className="font-bold text-2xl text-[#030229]">Services</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

      {/* Services List / Cards */}
      <div className="mt-4">
        <ServiceCard />
      </div>
    </div>
  );
};

export default Services;
