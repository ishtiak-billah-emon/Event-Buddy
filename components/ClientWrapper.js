"use client";

import { AuthProvider } from "../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientWrapper({ children }) {
  return (
    <AuthProvider>
      <Navbar />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <Footer />
    </AuthProvider>
  );
}
