"use client";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Eye, MapPin, Target } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useAddregionMutation, useGetcalculationregionQuery, useGetregionsQuery } from "@/redux/api/apiSlice";

type Region = {
  id?: string | number;
  name?: string;
  area?: string;
  apartments?: number;   // total apartments in this building
  status?: "Active" | "Inactive" | "Maintenance" | string;
  region?: string | number;
  active?: number;       // active apartments in this building (if your API provides)
  createdOn?: string;
  code?: string | number;
};

const fallbackDetail = {
  name: "Mosabbir",
  status: "active",
  type: "Residential",
  address: "JVAI, Mohakhali",
  area: "Mohakhali",
  apartments: 4,
  region: "03",
  activeUnits: 0,
  createdDate: "17/08/2025",
};

function normalizeToArray<T = unknown>(payload: any): T[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload as T[];
  if (Array.isArray(payload.results)) return payload.results as T[];
  if (Array.isArray(payload.data)) return payload.data as T[];
  if (Array.isArray(payload.items)) return payload.items as T[];
  if (typeof payload === "object") {
    for (const v of Object.values(payload)) {
      if (Array.isArray(v)) return v as T[];
    }
  }
  return [];
}

export default function RegionComponent() {
  // read token so we can avoid early 401 calls (skip until token exists)
  const token = useSelector((s: any) => s?.auth?.accessToken);

  const {
    data: regionsData,
    isLoading,
    isError,
    error: regionsError,
    refetch,
  } = useGetregionsQuery(undefined, { skip: !token });

  const { data: calcData } = useGetcalculationregionQuery(undefined, { skip: !token });

  const [addRegion, { isLoading: isCreating }] = useAddregionMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    name: "",
    area: "",
    apartments: "",
    status: "Active" as "Active" | "Inactive" | "Maintenance",
  });

  // List for cards
  const buildings: Region[] = useMemo(
    () => normalizeToArray<Region>(regionsData),
    [regionsData]
  );

  // --- Totals from your Postman response shape (with safe fallbacks) ---
  const totalBuildings =
    calcData?.total_buildings ??
    buildings.length;

  const totalApartments =
    calcData?.total_apartments ??
    buildings.reduce((sum, b) => sum + (Number(b.apartments) || 0), 0);

  const totalActiveApts =
    calcData?.total_active_apartments ??
    buildings.reduce((sum, b) => sum + (Number(b.active) || 0), 0);

  const totalInactiveApts =
    calcData?.total_inactive_apartments ??
    Math.max(totalApartments - totalActiveApts, 0);

  // Search
  const filteredBuildings = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return buildings;
    return buildings.filter((b) => {
      const name = (b?.name ?? "").toLowerCase();
      const area = (b?.area ?? "").toLowerCase();
      return name.includes(q) || area.includes(q);
    });
  }, [buildings, searchTerm]);

  // Create (adds a new “card” by creating a building/region)
  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name || "New Building",
      area: form.area || "Mohakhali",
      apartments: Number(form.apartments) || 0,
      status: form.status,
    };
    try {
      await addRegion(payload).unwrap();
      setForm({ name: "", area: "", apartments: "", status: "Active" });
      refetch();
    } catch (err) {
      console.error("Failed to add region:", err);
    }
  };

  // Guards
  if (!token) {
    return (
      <div className="p-6 border rounded-xl bg-yellow-50 text-yellow-800">
        Please sign in first. No access token found.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse bg-gray-100 h-8 w-40 rounded" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-50 h-24 rounded-xl border border-gray-200 animate-pulse" />
          ))}
        </div>
        <div className="bg-gray-50 h-14 rounded-xl border border-gray-200 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-50 h-40 rounded-xl border border-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    const status = (regionsError as any)?.status;
    return (
      <div className="p-6 border rounded-xl bg-red-50 text-red-700 space-y-2">
        <p className="font-semibold">Failed to load regions.</p>
        {status === 401 ? <p>Unauthorized (401). Check your login/token.</p> : null}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Buildings</h1>
          <p className="text-[#8E8E8E] text-xl">Manage buildings & apartments</p>
        </div>
        <div className="flex space-x-2 items-center">
          {/* Add Building */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-4 py-2 bg-blue-500 text-white text-md font-medium flex items-center gap-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Building
              </button>
            </DialogTrigger>

            <DialogContent className="bg-white border-0 rounded-lg max-w-4xl w-full">
              <DialogHeader className="border-b border-gray-200 pb-4">
                <DialogTitle className="bg-gradient-to-r from-[#0a078f] via-[#8241ed] to-[#2463ea] bg-clip-text text-transparent font-semibold text-2xl">
                  Add New Building
                </DialogTitle>
                <DialogDescription>
                  <p className="text-gray-500 font-semibold">Fill the form and create a building record</p>
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Left: Form */}
                <form className="space-y-4" onSubmit={onCreate}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Building Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. JVAI Tower"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                      Area *
                    </label>
                    <input
                      id="area"
                      type="text"
                      required
                      value={form.area}
                      onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
                      placeholder="e.g. Mohakhali"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="apartments" className="block text-sm font-medium text-gray-700">
                      Apartments *
                    </label>
                    <input
                      id="apartments"
                      type="number"
                      min={0}
                      required
                      value={form.apartments}
                      onChange={(e) => setForm((f) => ({ ...f, apartments: e.target.value }))}
                      placeholder="e.g. 4"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status *
                    </label>
                    <select
                      id="status"
                      value={form.status}
                      onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as typeof form.status }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <DialogClose asChild>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </DialogClose>
                    <button
                      type="submit"
                      disabled={isCreating}
                      className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
                    >
                      {isCreating ? "Creating..." : "+ Create"}
                    </button>
                  </div>
                </form>

                {/* Right: Map placeholder */}
                <div className="w-full h-[350px] rounded-md border border-gray-300 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">Map goes here</div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Refresh */}
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white text-md font-medium flex items-center gap-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.001 8.001 0 01-15.356-2m15.356 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Top Stats — matches your Postman keys */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Buildings", value: totalBuildings, icon: <LuBuilding2 /> },
          { label: "Total Apartments", value: totalApartments, icon: <FiHome /> },
          { label: "Active Apartments", value: totalActiveApts, icon: <FaCheckCircle /> },
          { label: "Inactive Apartments", value: totalInactiveApts, icon: <GoPlus /> },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 px-6 shadow flex items-center justify-between border border-gray-200"
          >
            <div>
              <p className="text-lg text-[#8E8E8E] py-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-500 p-3 bg-sky-100 rounded-lg">{stat.icon}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search + disabled filters */}
      <div className="flex items-center gap-8 p-6 border border-gray-300 rounded-xl justify-between">
        <div className="flex items-center border border-gray-400 p-2 rounded-xl w-full max-w-sm">
          <IoIosSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by name, email or location..."
            className="outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-20">
          <div className="flex gap-2 items-center justify-center">
            <p className="text-base text-gray-500 py-2 font-bold">Status</p>
            <Button disabled className="bg-green-100 px-3 py-2 text-green-600 rounded-full disabled:opacity-100">
              Active
            </Button>
            <Button disabled className="bg-yellow-100 px-3 py-2 text-yellow-600 rounded-full disabled:opacity-100">
              Inactive
            </Button>
            <Button disabled className="bg-red-200 px-3 py-2 text-red-700 rounded-full disabled:opacity-100">
              Maintenance
            </Button>
          </div>

          <div className="flex gap-2 items-center justify-center">
            <p className="text-base text-gray-500 py-2 font-bold">Type</p>
            <Button disabled className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full disabled:opacity-100">
              residential
            </Button>
            <Button disabled className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full disabled:opacity-100">
              commercial
            </Button>
            <Button disabled className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full disabled:opacity-100">
              office
            </Button>
            <Button disabled className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full disabled:opacity-100">
              retail
            </Button>
          </div>

          <div className="flex gap-2 items-center justify-center">
            <p className="text-base text-gray-500 py-2 font-bold">Area</p>
            <Button disabled className="bg-gray-100 px-3 py-2 text-gray-600 rounded-full disabled:opacity-100">
              mohakhali
            </Button>
          </div>
        </div>
      </div>

      {/* Buildings List (cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {filteredBuildings.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12 border border-dashed rounded-xl">
            No buildings match your search.
          </div>
        ) : (
          filteredBuildings.map((b, idx) => (
            <div
              key={b.id ?? `${b.name ?? "building"}-${idx}`}
              className="rounded-xl p-4 shadow flex relative items-center justify-between gap-2 border border-gray-200 mt-5"
            >
              <div className="flex justify-start gap-3 items-center ">
                <div className="pb-28 pt-4 ">
                  <h2 className="font-semibold">
                    <span className="px-4 py-4 mr-2 bg-sky-100 rounded-full">
                      {(b.name ?? "?").slice(0, 2)}
                    </span>
                  </h2>
                </div>
                <div className="py-2">
                  <p>
                    {b.name ?? "Untitled"}
                    <span
                      className={`text-sm px-2 py-1 ml-2 rounded-full ${
                        b.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : b.status === "Inactive"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.status ?? "Unknown"}
                    </span>
                  </p>

                  <div className="flex items-center gap-3 py-2">
                    <p className="flex items-center gap-2">
                      <IoLocationOutline /> {b.area ?? "Unknown"}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiHome /> {(b.region as string) ?? "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="flex gap-8 text-md text-gray-500 mt-2">
                      <span className="flex flex-col items-center">
                        <span className="text-lg font-bold text-black">
                          {(String(Number(b.apartments) || 0)).padStart(2, "0")}
                        </span>
                        Apts
                      </span>
                      <span className="flex flex-col items-center">
                        <span className="text-lg font-bold text-black">
                          {Number(b.active) || 0}
                        </span>
                        Active
                      </span>
                      <span className="flex flex-col items-center">
                        <span className="text-lg font-bold text-black">{b.createdOn ?? "-"}</span>
                        Created
                      </span>
                      <span className="flex flex-col items-center">
                        <span className="text-lg font-bold text-black">{b.code ?? "-"}</span>
                        ID
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* building details */}
              <Dialog>
                <DialogTrigger asChild>
                  <Eye size={20} className="cursor-pointer absolute top-4 right-4" />
                </DialogTrigger>

                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-semibold pb-4 border-b border-gray-200">
                      {b.name ?? fallbackDetail.name}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6">
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className={`${
                          (b.status ?? "").toLowerCase() === "active"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : (b.status ?? "").toLowerCase() === "inactive"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        {b.status ?? fallbackDetail.status}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                        {b.region ? `Region ${b.region}` : `Region ${fallbackDetail.region}`}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-gray-700">
                        <MapPin size={16} className="text-gray-500 mt-0.5" />
                        <span className="text-sm">{b.area ?? fallbackDetail.address}</span>
                      </div>
                      <div className="flex items-start gap-2 text-gray-700">
                        <Target size={16} className="text-gray-500 mt-0.5" />
                        <span className="text-sm">Code: {b.code ?? "—"}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4">
                        <div className="text-3xl font-bold text-gray-800">{Number(b.apartments) || fallbackDetail.apartments}</div>
                        <div className="text-sm text-gray-600 mt-1">Apts</div>
                      </div>
                      <div className="text-center p-4">
                        <div className="text-3xl font-bold text-gray-800">{b.region ?? fallbackDetail.region}</div>
                        <div className="text-sm text-gray-600 mt-1">Region</div>
                      </div>
                      <div className="text-center p-4">
                        <div className="text-3xl font-bold text-gray-800">{b.active ?? fallbackDetail.activeUnits}</div>
                        <div className="text-sm text-gray-600 mt-1">Active</div>
                      </div>
                      <div className="text-center p-4">
                        <div className="text-xl font-bold text-gray-800">{b.createdOn ?? fallbackDetail.createdDate}</div>
                        <div className="text-sm text-gray-600 mt-1">Created</div>
                      </div>
                    </div>

                    <DialogClose asChild>
                      <div className="flex justify-end">
                        <Button>Close</Button>
                      </div>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
