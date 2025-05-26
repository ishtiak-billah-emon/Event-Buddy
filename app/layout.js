"use client";

import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Event Buddy</title>
        <meta name="description" content="A simple event booking system" />
      </Head>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow w-full pt-20">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
