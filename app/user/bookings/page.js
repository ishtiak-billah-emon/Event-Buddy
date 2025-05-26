"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { getEventsFromStorage } from "../../../utils/localStorage";
import Link from "next/link";

export default function UserBookings() {
  const { user, bookings } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const loadBookings = () => {
      const storedEvents = getEventsFromStorage();
      setEvents(storedEvents);
      setLoading(false);
    };

    loadBookings();
  }, [user, router]);

  if (!user || user.role !== "user") {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Sort bookings by date (most recent first)
  const sortedBookings = [...bookings].sort((a, b) => 
    new Date(b.bookingDate) - new Date(a.bookingDate)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-gray-600">
          View all your event bookings here or{" "}
          <Link href="/user/dashboard" className="text-blue-500 hover:underline">
            browse more events
          </Link>
        </p>
      </div>

      <div className="space-y-6">
        {sortedBookings.map((booking) => {
          const event = events.find((e) => e.id === booking.eventId);
          if (!event) return null;

          return (
            <div
              key={booking.id}
              className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                  <div className="space-y-1">
                    <p className="text-gray-600">
                      <span className="font-medium">Date:</span> {event.date}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Time:</span> {event.time}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Location:</span> {event.location}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Seats booked:</span>{" "}
                      <span className="text-indigo-600 font-semibold">{booking.seats}</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View Event
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        {sortedBookings.length === 0 && (
          <div className="text-center bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 mb-4">You haven't booked any events yet.</p>
            <Link
              href="/user/dashboard"
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
