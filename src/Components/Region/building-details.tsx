import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Eye, MapPin, Target } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { Building } from "@/Types/building.types";

interface BuildingDetailsProps {
  buildingData: Building;
}

export default function BuildingDetails({
  buildingData,
}: BuildingDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Eye size={20} className="cursor-pointer absolute top-4 right-4" />
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold pb-4 border-b border-gray-200">
            {buildingData.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Type Badge */}
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-700 border-blue-200"
            >
              {buildingData.type}
            </Badge>
          </div>

          {/* Address / Location */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-gray-700">
              <MapPin size={16} className="text-gray-500 mt-0.5" />
              <span className="text-sm">{`${buildingData.location}, ${buildingData.city}`}</span>
            </div>
            <div className="flex items-start gap-2 text-gray-700">
              <Target size={16} className="text-gray-500 mt-0.5" />
              <span className="text-sm">
                Region: {buildingData.region_name}
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-gray-800">
                {buildingData.total_apartments}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Apts</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-gray-800">
                {buildingData.active_apartments_in_building}
              </div>
              <div className="text-sm text-gray-600 mt-1">Active</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-gray-800">
                {buildingData.region_name}
              </div>
              <div className="text-sm text-gray-600 mt-1">Region</div>
            </div>
            <div className="text-center p-4">
              <div className="text-xl font-bold text-gray-800">
                {new Date(buildingData.created_at).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600 mt-1">Created</div>
            </div>
          </div>

          {/* Apartments List */}
          <div className="border-t border-b border-gray-200 py-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Apartments ({buildingData.total_apartments})
            </h3>
            <div className="space-y-2">
              {buildingData.apartments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-800">
                      {apt.apartment_number}
                    </span>
                    {apt.outdoor_area && (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-700 border-green-200 text-xs"
                      >
                        Outdoor
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    Floor: {apt.floor}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <DialogClose asChild>
            <div className="flex justify-end">
              <Button>Close</Button>
            </div>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
