// "use client";

// import Link from "next/link";

// export default function EventCard({ event }) {
//   // Format date to get month and day
//   const date = new Date(event.date);
//   const month = date
//     .toLocaleString("default", { month: "short" })
//     .toUpperCase();
//   const day = date.getDate();

//   return (
//     <Link href={`/events/${event.id}`}>
//       <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//         {/* Event Image */}
//         <div className="relative h-48 w-full">
//           <img
//             src={event.image}
//             alt={event.title}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Event Details */}
//         <div className="p-4">
//           {/* Date Display */}
//           <div className="flex items-start mb-3">
//             <div className="flex flex-col items-center bg-blue-50 rounded p-2 mr-3">
//               <span className="text-indigo-600 text-sm font-semibold">
//                 {month}
//               </span>
//               <span className="text-2xl font-bold text-indigo-700">{day}</span>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800">
//               {event.title}
//             </h3>
//           </div>

//           {/* Event Info */}
//           <div className="space-y-2">
//             <div className="flex items-center text-gray-600">
//               <svg
//                 className="w-4 h-4 mr-2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <span className="text-sm">{event.time}</span>
//             </div>
//             <div className="flex items-center text-gray-600">
//               <svg
//                 className="w-4 h-4 mr-2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//               <span className="text-sm">{event.location}</span>
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="mt-3 flex flex-wrap gap-2">
//             {event.tags?.map((tag, index) => (
//               <span
//                 key={index}
//                 className="bg-blue-50 text-indigo-600 text-xs px-2 py-1 rounded-full"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>

//           {/* Available Spots */}
//           <div className="mt-4 flex items-center justify-between text-sm">
//             <span className="text-gray-600">
//               {event.availableSpots} Spots Left
//             </span>
//             <span className="text-gray-500">
//               Total {event.totalSpots} Seats
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }
