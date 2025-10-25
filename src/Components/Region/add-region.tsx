import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useAddregionMutation } from "@/redux/features/admin/regions/regions.api";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function AddRegion() {
  const [regionName, setRegionName] = useState("");
  const [AddRegion, { isLoading }] = useAddregionMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(AddRegion({ name: regionName }).unwrap(), {
      success: "Region created successfully",
      error: "Failed to create region",
    });
    setRegionName("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Region
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white border-0 rounded-lg max-w-md">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="bg-gradient-to-r from-[#0a078f] via-[#8241ed] to-[#2463ea] bg-clip-text text-transparent font-semibold text-2xl">
            Add New Region
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region Name *
            </label>
            <input
              type="text"
              value={regionName}
              onChange={(e) => setRegionName(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-4 flex justify-end gap-3">
            <Button type="submit">
              {isLoading ? (
                "Creating Region..."
              ) : (
                <>
                  <Plus /> Create Region
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
