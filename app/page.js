"use client";
import { BsCalendar2Event } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getEventsFromStorage } from "../utils/localStorage";
import { isUpcomingOrToday, formatEventDate } from "../utils/dateUtils";
import Pagination from "../components/Pagination";
import bgImage from "../image/Bg.png";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [upcomingCurrentPage, setUpcomingCurrentPage] = useState(1);
  const [pastCurrentPage, setPastCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const storedEvents = getEventsFromStorage();
    setEvents(storedEvents);
  }, []);

  // Filter events based on current date
  const upcomingEvents = events.filter((event) =>
    isUpcomingOrToday(event.date)
  );
  const pastEvents = events.filter((event) => !isUpcomingOrToday(event.date));

  // Pagination calculations
  const getPageItems = (items, currentPage) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return items.slice(startIndex, endIndex);
  };

  const upcomingTotalPages = Math.ceil(upcomingEvents.length / ITEMS_PER_PAGE);
  const pastTotalPages = Math.ceil(pastEvents.length / ITEMS_PER_PAGE);

  const currentUpcomingEvents = getPageItems(
    upcomingEvents,
    upcomingCurrentPage
  );
  const currentPastEvents = getPageItems(pastEvents, pastCurrentPage);

  const EventCard = ({ event }) => {
    const { month, day, weekday } = formatEventDate(event.date);

    return (
      <Link href={`/events/${event.id}`} className="block">
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <div className="aspect-video relative">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-row justify-start gap-12 items-center mt-2 p-3">
            {/* date and time */}
            <div>
              <h1 className="font-bold text-sm uppercase text-indigo-600">
                {month}
              </h1>
              <p className="text-black text-2xl font-bold">{day}</p>
            </div>
            {/* Event title */}
            <div>
              <h3 className="font-semibold text-xl text-indigo-900 font-semibold mb-2">
                {event.title}
              </h3>
            </div>
          </div>
          {/* event schedule */}
          <div className="flex gap-6 p-3">
            <span className="font-medium flex gap-2 items-center">
              <span className="text-indigo-600">
                <BsCalendar2Event />
              </span>
              {weekday}
            </span>
            <span className="flex gap-2 items-center">
              <span className="text-indigo-600">
                <GoClock />
              </span>
              {event.time}
            </span>
            <span className="flex gap-2 items-center">
              <span className="text-indigo-600">
                <CiLocationOn />
              </span>
              {event.location}
            </span>
          </div>
          {/* tags */}
          <div className="flex flex-wrap gap-2 mb-6 p-3">
            {event.tags &&
              event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-600 rounded-lg"
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* divider */}
          <div></div>
          {/* seats */}
          <div className="flex justify-between p-3">
            <div>{event.remainingSeats} Spots Left</div>
            <div>Total {event.capacity} Seats</div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center min-h-[600px]"
        style={
          {
            // backgroundImage: `url(${bgImage.src})`,
          }
        }
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fafbff] to-[#b6beff] bg-opacity-50"></div>

        {/* Hero Section */}
        <div className="relative max-w-6xl mx-auto px-4 pb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl font-bold pt-6 mb-6 text-indigo-950">
              Discover
              <span className="text-indigo-600 block">Amazing Events</span>
            </h1>
            <p className="text-indigo-900 mb-8">
              Find and book events that match your interests, from tech
              conferences to music festivals, weve got you covered!
            </p>

            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 pr-32 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Search Events
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Sections */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentUpcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {upcomingEvents.length === 0 && (
              <p className="text-gray-500 col-span-full text-center">
                No upcoming events at the moment.
              </p>
            )}
          </div>
          {upcomingEvents.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={upcomingCurrentPage}
              totalPages={upcomingTotalPages}
              onPageChange={setUpcomingCurrentPage}
            />
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Previous Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {pastEvents.length === 0 && (
              <p className="text-gray-500 col-span-full text-center">
                No past events to show.
              </p>
            )}
          </div>
          {pastEvents.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={pastCurrentPage}
              totalPages={pastTotalPages}
              onPageChange={setPastCurrentPage}
            />
          )}
        </section>
      </div>
    </div>
  );
}
