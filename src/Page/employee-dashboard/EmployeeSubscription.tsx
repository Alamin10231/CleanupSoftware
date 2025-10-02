import { useState } from "react"
import { Search } from "lucide-react"
import { Checkbox } from '@/Components/ui/checkbox';
import { Switch } from "@/Components/ui/switch";


type Subscription = {
  id: number
  property: string
  owner: string
  region: string
  building: string
  status: "active" | "due" | "paused" | "stopped"
  daysRemaining: number
  totalDays: number
  autoRenew: boolean | null
}

const data: Subscription[] = [
  {
    id: 1,
    property: "Apt 304, Sunset Tower",
    owner: "John Smith • North Region",
    region: "North",
    building: "Sunset Tower",
    status: "active",
    daysRemaining: 23,
    totalDays: 30,
    autoRenew: true,
  },
  {
    id: 2,
    property: "Apt 102, Ocean View",
    owner: "Sarah Johnson • South Region",
    region: "South",
    building: "Ocean View",
    status: "due",
    daysRemaining: -2,
    totalDays: 32,
    autoRenew: false,
  },
  {
    id: 3,
    property: "Apt 507, Metro Plaza",
    owner: "Mike Davis • East Region",
    region: "East",
    building: "Metro Plaza",
    status: "paused",
    daysRemaining: 15,
    totalDays: 30,
    autoRenew: true,
  },
  {
    id: 4,
    property: "Apt 201, Sunset Tower",
    owner: "Emma Wilson • North Region",
    region: "North",
    building: "Sunset Tower",
    status: "stopped",
    daysRemaining: 0,
    totalDays: 30,
    autoRenew: null,
  },
]

export default function EmployeeSubscription() {
  const [search, setSearch] = useState("")
const [selected,setselected] = useState<number[]>([])
  
  const filtered = data.filter((s) =>
    s.property.toLowerCase().includes(search.toLowerCase())
  )
 const handleselectall =( check:boolean)=>{
  if(check){
   setselected(filtered.map((s)=>s.id))
  }else{
    setselected([])
  }
 }

 const selectsingle = (id:number,check:boolean)=>{
  if(check){
    setselected((prev)=>[...prev,id])
  }
  else{
    setselected((prev)=>prev.filter((x)=> x !==id))
  }
 }
  

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <div className="flex gap-2">
          <button className="px-3 py-2 border rounded-md text-sm">Export</button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">
            + New Subscription
          </button>
        </div>
      </div>
      <p className="text-gray-500">Manage all property subscriptions and billing cycles</p>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-2 border rounded-md w-full"
          />
        </div>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Regions</option>
          <option>North</option>
          <option>South</option>
          <option>East</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Buildings</option>
          <option>Sunset Tower</option>
          <option>Ocean View</option>
          <option>Metro Plaza</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Active</option>
          <option>Due</option>
          <option>Paused</option>
          <option>Stopped</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Owners</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            
            <tr className="">
       {/* Select All Checkbox */}
<th>
  <Checkbox
  checked={selected.length ===filtered.length && filtered.length > 0 }
  onCheckedChange={(val)=>handleselectall(val as boolean)}
  />
</th>

              <th  className="p-3"> Property & Owner</th>
              <th className="p-3">Status</th>
              <th className="p-3">Timeline</th>
              <th className="p-3">Auto-renew</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sub) => (
              <tr key={sub.id} className="border-b">
                {/* Property */}
                <td><Checkbox  
               checked={selected.includes(sub.id)}
              onCheckedChange={(val)=>selectsingle(sub.id, val as boolean)}
                  className=""  /></td>
                <td className="p-3">
                  <div className="font-medium">{sub.property}</div>
                  <div className="text-xs text-gray-500">{sub.owner}</div>
                </td>

                {/* Status */}
                <td className="p-3">
                  {sub.status === "active" && (
                    <span className="text-green-600 font-medium">● Active & Paid</span>
                  )}
                  {sub.status === "due" && (
                    <span className="text-orange-600 font-medium">● Payment Due</span>
                  )}
                  {sub.status === "paused" && (
                    <span className="text-blue-600 font-medium">● Paused</span>
                  )}
                  {sub.status === "stopped" && (
                    <span className="text-red-600 font-medium">● Stopped</span>
                  )}
                </td>

                {/* Timeline */}
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    {sub.daysRemaining > 0 ? (
                      <span className="text-xs text-gray-600">
                        {sub.daysRemaining} days remaining
                      </span>
                    ) : sub.daysRemaining < 0 ? (
                      <span className="text-xs text-red-600">
                        {Math.abs(sub.daysRemaining)} days overdue
                      </span>
                    ) : (
                      <span className="text-xs text-red-600">Subscription ended</span>
                    )}

                    {/* Progress Bar */}
                    <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          sub.status === "active"
                            ? "bg-green-500"
                            : sub.status === "due"
                            ? "bg-orange-500"
                            : sub.status === "paused"
                            ? "bg-blue-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            (sub.daysRemaining > 0 ? sub.totalDays - sub.daysRemaining : sub.totalDays) /
                              sub.totalDays *
                              100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                {/* Auto Renew */}
                <td className="p-3">
                  {sub.autoRenew === true && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">
                      <Switch />  Enabled
                    </span>
                  )}
                  {sub.autoRenew === false && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    <Switch />
                      Disabled
                    </span>
                  )}
                  {sub.autoRenew === null && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      Not applicable
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="p-3 flex gap-3">
                  <button className="text-gray-600 hover:text-black">👁</button>
                  <button className="text-gray-600 hover:text-black">⬇</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
