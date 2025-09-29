import SearchBar from "@/Shared/SearchBar";
import { useState } from "react";

type props = {
statusFilter:string,
resetPage:() => void,
onChange:(value:string)=> void
}
export default function SubscriptionPlan({statusFilter,resetPage,onChange}:props) {
    const [searchValue,setSearchValue] = useState("")
  return (
    <div>
        <div>
            Add New Plan


        </div>
        <div>
            <SearchBar
             value={searchValue}
          onChange={setSearchValue}
            ></SearchBar>
        </div>
       
            <div className="flex items-center gap-2">
      <select
        value={statusFilter}
        onChange={(e) => {
          resetPage();                 // page আবার 1 করা
          onChange(e.target.value);    // প্যারেন্টে নতুন status পাঠানো
        }}
        className="border border-gray-300 rounded-md px-3 py-2"
      >
        <option>All status</option>
        <option>Active</option>
        <option>Pending</option>
        <option>Auto-Renew</option>
        <option>Expired</option>
        <option>Inactive</option>
      </select>
    </div>
       
    </div>
  )
}
