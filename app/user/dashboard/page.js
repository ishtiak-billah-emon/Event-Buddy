"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { getEventsFromStorage } from "../../../utils/localStorage";
import Link from "next/link";
import Pagination from "../../../components/Pagination";

export default function UserDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  useEffect(() => {
    const storedEvents = getEventsFromStorage();
    setEvents(storedEvents.filter(event => event.isUpcoming));
  }, []);

  if (!user || user.role !== "user") {
    router.push("/login");
    return null;
  }

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.username}!</h1>
        <p className="text-gray-600">
          Browse and book upcoming events or{" "}
          <Link href="/user/bookings" className="text-blue-500 hover:underline">
            view your bookings
          </Link>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={event.image || "/images/default-event.jpg"}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-2">
                {event.date} at {event.time}
              </p>
              <p className="text-gray-600 mb-4">{event.location}</p>
              <Link
                href={`/events/${event.id}`}
                className="block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                View Details & Book
              </Link>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No upcoming events available.
          </div>
        )}
      </div>

      {events.length > eventsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
