import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { events } from "../../../data/events";

export default function EditEvent({ params }) {
  const { user } = useAuth();
  const router = useRouter();
  const event = events.find((e) => e.id === params.id);

  if (!user || user.role !== "admin") {
    router.push("/login");
    return null;
  }

  if (!event) {
    return <div className="text-center text-red-500">Event not found</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Event updated successfully! (Simulated)");
    router.push("/admin/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            defaultValue={event.title}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            defaultValue={event.date}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            defaultValue={event.time}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            defaultValue={event.location}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            defaultValue={event.description}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}
