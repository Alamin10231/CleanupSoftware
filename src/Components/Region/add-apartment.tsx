import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "../ui/button";

export default function AddApartment() {
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
              d="M3 9.75L12 3l9 6.75M4.5 10.5V20a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5V10.5M9 21V13h6v8"
            />
          </svg>
          Add Apartment
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white border-0 rounded-lg max-w-4xl w-full">
        {/* Header */}
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="bg-gradient-to-r from-[#0a078f] via-[#8241ed] to-[#2463ea] bg-clip-text text-transparent font-semibold text-2xl">
            Add New Apartment
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left side form */}
          <form className="space-y-4">
            {/* Client */}
            <div>
              <label
                htmlFor="client"
                className="block text-sm font-medium text-gray-700"
              >
                Client
              </label>
              <select
                id="client"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option>All / Not linked</option>
                <option>All / Not linked</option>
                <option>All / Not linked</option>
              </select>
            </div>

            {/* Building */}
            <div>
              <label
                htmlFor="building"
                className="block text-sm font-medium text-gray-700"
              >
                Building *
              </label>
              <select
                id="building"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option>Select building</option>
              </select>
            </div>

            {/* Apartment Number + Floor */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="apartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apartment Number *
                </label>
                <input
                  type="text"
                  id="apartment"
                  placeholder="e.g. A-203"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="floor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Floor *
                </label>
                <input
                  type="number"
                  id="floor"
                  placeholder="e.g. 2"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            {/* Living rooms + Bathrooms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="living"
                  className="block text-sm font-medium text-gray-700"
                >
                  Living Rooms *
                </label>
                <input
                  type="number"
                  id="living"
                  placeholder="e.g. 2"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bathrooms *
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  placeholder="e.g. 2"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            {/* Outdoor Area */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="outdoor"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="outdoor" className="text-sm text-gray-700">
                Outdoor area
              </label>
            </div>
          </form>

          {/* Right side map */}
          <div className="w-full h-[350px] rounded-md border border-gray-300 overflow-hidden">
            {/* Replace this div with actual Map (Leaflet, Google Maps, etc.) */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Map goes here
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 px-6">
          <div className="flex justify-end gap-3 w-full">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              + Create
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
