"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { getEventsFromStorage } from "../../../utils/localStorage";
import Link from "next/link";
import { useState, useEffect } from "react";
import BookingForm from "../../../components/BookingForm";

export default function EventDetails({ params }) {
  const { user } = useAuth();
  const router = useRouter();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const events = getEventsFromStorage();
    const foundEvent = events.find((e) => e.id === params.id);
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [params.id]);

  if (!event) {
    return <div className="text-center text-red-500">Event not found</div>;
  }

  const handleBookingComplete = (remainingSeats) => {
    setEvent(prev => ({
      ...prev,
      remainingSeats
    }));
    alert("Booking successful!");
  };

  return (
    <div className="bg-[#F8F7FF]">
      <div className="min-h-screen bg-[#F8F7FF] max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="top-4 left-4 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1C1E23] hover:text-gray-600"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Back to events</span>
          </Link>
        </div>

        {/* Event Image */}
        <div className="w-full h-[400px] relative">
          <img
            src={event.image || "/images/default-event.jpg"}
            alt={event.title}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {event.tags &&
              event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* Event Title */}
          <h1 className="text-[32px] font-bold text-[#1C1E23] mb-8">
            {event.title}
          </h1>

          {/* Event Details */}
          <div className="grid grid-cols-3 gap-8 mb-12 bg-white p-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-[#1C1E23]">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium text-[#1C1E23]">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-[#1C1E23]">{event.location}</p>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-[#1C1E23]">
                  Available Seats
                </h3>
                <p className="text-gray-600">
                  {event.remainingSeats} out of {event.capacity} seats remaining
                </p>
              </div>
            </div>
            
            {user ? (
              <BookingForm 
                eventId={event.id} 
                onBookingComplete={handleBookingComplete}
              />
            ) : (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">Please log in to book seats</p>
                <Link
                  href="/login"
                  className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h1 className="text-2xl text-[#373872] font-semibold">
              About this event
            </h1>
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
