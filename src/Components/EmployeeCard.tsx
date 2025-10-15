// import React from "react";

// interface EmployeeCardProps {
//   name: string;
//   role: string;
//   tags: string[];
//   shifts: string[];
//   email: string;
//   phone: string;
//   location: string;
//   taskCompletion: number;
//   salary: string;
//   performance: number;
//   clientRating: number;
//   punctuality: string;
// }

// const EmployeeCard: React.FC<EmployeeCardProps> = ({
//   name,
//   role,
//   tags,
//   shifts,
//   email,
//   phone,
//   location,
//   taskCompletion,
//   salary,
//   performance,
//   clientRating,
//   punctuality,
// }) => {
//   return (
//     <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-sm mb-8">
//       <table className="min-w-full border-collapse text-sm text-gray-600">
//         <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//           <tr>
//             <th className="px-4 py-3 text-left">Name</th>
//             <th className="px-4 py-3 text-left">Role</th>
//             <th className="px-4 py-3 text-left">Tags</th>
//             <th className="px-4 py-3 text-left">Shifts</th>
//             <th className="px-4 py-3 text-left">Email</th>
//             <th className="px-4 py-3 text-left">Phone</th>
//             <th className="px-4 py-3 text-left">Location</th>
//             <th className="px-4 py-3 text-left">Task Completion</th>
//             <th className="px-4 py-3 text-left">Salary</th>
//             <th className="px-4 py-3 text-left">Performance</th>
//             <th className="px-4 py-3 text-left">Client Rating</th>
//             <th className="px-4 py-3 text-left">Punctuality</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="border-t hover:bg-gray-50 transition">
//             {/* Name */}
//             <td className="px-4 py-3 flex items-center gap-2">
//               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
//                 {name.charAt(0)}
//               </div>
//               <div>
//                 <p className="font-medium text-gray-700">{name}</p>
//               </div>
//             </td>

//             {/* Role */}
//             <td className="px-4 py-3">{role}</td>

//             {/* Tags */}
//             <td className="px-4 py-3">
//               <div className="flex flex-wrap gap-1">
//                 {tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className={`text-xs px-2 py-0.5 rounded-full ${
//                       tag.toLowerCase() === "paid"
//                         ? "bg-green-100 text-green-600"
//                         : tag.toLowerCase() === "inactive"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-gray-100 text-gray-600"
//                     }`}
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </td>

//             {/* Shifts */}
//             <td className="px-4 py-3">
//               <div className="flex flex-wrap gap-1">
//                 {shifts.map((shift, i) => (
//                   <span
//                     key={i}
//                     className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full"
//                   >
//                     {shift}
//                   </span>
//                 ))}
//               </div>
//             </td>

//             {/* Contact Info */}
//             <td className="px-4 py-3">{email}</td>
//             <td className="px-4 py-3">{phone}</td>
//             <td className="px-4 py-3">{location}</td>

//             {/* Task Completion */}
//             <td className="px-4 py-3">
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="h-2 bg-blue-500 rounded-full"
//                   style={{ width: `${taskCompletion}%` }}
//                 ></div>
//               </div>
//               <p className="text-xs text-gray-500 mt-1 text-center">
//                 {taskCompletion}%
//               </p>
//             </td>

//             {/* Stats */}
//             <td className="px-4 py-3 font-medium text-gray-700">{salary}</td>
//             <td className="px-4 py-3 font-medium text-gray-700">{performance}</td>
//             <td className="px-4 py-3 font-medium text-gray-700">{clientRating}</td>
//             <td className="px-4 py-3 font-medium text-gray-700">{punctuality}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EmployeeCard;
