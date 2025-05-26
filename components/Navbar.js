"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white to-[#F8F7FF] text-white p-4 flex justify-between items-center">
      <Link
        href="/"
        className="flex items-center gap-2 text-[#27187E] font-medium"
      >
        <span className="text-2xl">🎫</span>
        <span className="text-2xl font-bold">Event buddy.</span>
      </Link>
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link
              href="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            {user.role === "user" && (
              <>
                <Link
                  href="/user/bookings"
                  className="hover:underline text-indigo-600 hover:text-indigo-700"
                >
                  My Bookings
                </Link>
              </>
            )}
            {user.role === "admin" && (
              <Link
                href="/admin/dashboard"
                className="hover:underline text-indigo-600 hover:text-indigo-700"
              >
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={logout}
              className="hover:underline text-indigo-600 hover:text-indigo-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
