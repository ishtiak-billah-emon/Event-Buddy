"use client";

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const STORAGE_KEY = "eventBuddyAuth";
const BOOKINGS_KEY = "eventBuddyBookings";

// Dummy admin credentials
const ADMIN_CREDENTIALS = {
  email: "admin@eventbuddy.com",
  password: "admin123"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Load user data and bookings from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem(STORAGE_KEY);
    const storedBookings = localStorage.getItem(BOOKINGS_KEY);

    if (storedAuth) {
      setUser(JSON.parse(storedAuth));
    }

    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(BOOKINGS_KEY); // Clear bookings on logout
    }
  }, [user]);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    } else {
      localStorage.removeItem(BOOKINGS_KEY);
    }
  }, [bookings]);

  const login = async (email, password) => {
    // Check for admin credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminUser = {
        id: 'admin',
        email: ADMIN_CREDENTIALS.email,
        fullName: 'Admin User',
        role: 'admin'
      };
      setUser(adminUser);
      return;
    }

    // For demo purposes, allow any email/password for regular users
    const regularUser = {
      id: Date.now().toString(),
      email,
      fullName: email.split('@')[0], // Use email username as full name
      role: 'user'
    };
    setUser(regularUser);
  };

  const signup = async (userData) => {
    // For demo purposes, create a new user with the provided data
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: 'user'
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
  };

  const bookEvent = (eventId, seats) => {
    if (!user) return false;

    const newBooking = {
      id: Date.now().toString(),
      eventId,
      seats,
      userId: user.id,
      userEmail: user.email,
      userName: user.fullName,
      bookingDate: new Date().toISOString(),
    };

    setBookings(prev => [...prev, newBooking]);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        bookings,
        login,
        logout,
        signup,
        bookEvent,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
