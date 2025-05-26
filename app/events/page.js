// import { useRouter } from "next/navigation";
// import { events } from "../../data/events";
// import { useAuth } from "../../../context/AuthContext";
// import Link from "next/link";

// export default function EventDetails({ params }) {
//   const { user, bookEvent } = useAuth();
//   const router = useRouter();
//   const event = events.find((e) => e.id === params.id);

//   if (!event) {
//     return <div className="text-center text-red-500">Event not found</div>;
//   }

//   const handleBook = () => {
//     if (!user) {
//       router.push("/login");
//       return;
//     }
//     const seats = prompt("Enter number of seats (1-4):");
//     const numSeats = parseInt(seats);
//     if (numSeats >= 1 && numSeats <= 4) {
//       bookEvent(event.id, numSeats);
//       alert("Booking successful!");
//     } else {
//       alert("Please enter a valid number of seats (1-4).");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <img
//         src={event.image}
//         alt={event.title}
//         className="w-full h-64 object-cover rounded-md mb-4"
//       />
//       <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
//       <p className="text-gray-600 mb-2">
//         {event.date} at {event.time}
//       </p>
//       <p className="text-gray-600 mb-2">{event.location}</p>
//       <p className="text-gray-800 mb-4">{event.description}</p>
//       {event.isUpcoming && (
//         <button
//           onClick={handleBook}
//           className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//         >
//           Book Now
//         </button>
//       )}
//       <Link href="/" className="ml-4 text-blue-500 hover:underline">
//         Back to Home
//       </Link>
//     </div>
//   );
// }
