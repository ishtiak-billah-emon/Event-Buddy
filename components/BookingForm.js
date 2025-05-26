"use client";

import { useState } from 'react';
import { bookEventSeats, getRemainingSeats } from '../utils/localStorage';
import { useAuth } from '../context/AuthContext';
import SeatSelector from './SeatSelector';
import { useRouter } from 'next/navigation';

export default function BookingForm({ eventId, onBookingComplete }) {
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { bookEvent } = useAuth();
  const router = useRouter();

  const handleSeatSelect = (seats) => {
    setError('');
    setSuccess(false);
    setNumberOfSeats(seats);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // Get current remaining seats
      const currentRemaining = getRemainingSeats(eventId);
      
      if (numberOfSeats <= 0) {
        throw new Error('Please select at least one seat');
      }

      if (numberOfSeats > currentRemaining) {
        throw new Error(`Only ${currentRemaining} seats available`);
      }

      // Book the seats
      const remainingSeats = bookEventSeats(eventId, numberOfSeats);
      
      // Add booking to user's bookings
      const booked = bookEvent(eventId, numberOfSeats);
      
      if (!booked) {
        throw new Error('Failed to complete booking');
      }

      // Call the callback with updated remaining seats
      if (onBookingComplete) {
        onBookingComplete(remainingSeats);
      }

      // Show success message
      setSuccess(true);
      
      // Reset form after 2 seconds and redirect to bookings page
      setTimeout(() => {
        setNumberOfSeats(1);
        router.push('/user/bookings');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Book Seats</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <SeatSelector 
          selectedSeats={numberOfSeats}
          onSelect={handleSeatSelect}
        />

        {error && (
          <div className="text-red-500 text-sm mt-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg text-center">
            Booking successful! Redirecting to your bookings...
          </div>
        )}

        <button
          type="submit"
          disabled={loading || success}
          className={`w-full py-3 px-4 rounded-lg text-white text-lg font-medium transition-colors ${
            loading || success
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#4F46E5] hover:bg-[#4338CA]'
          }`}
        >
          {loading ? 'Booking...' : success ? 'Booked Successfully!' : `Book ${numberOfSeats} ${numberOfSeats === 1 ? 'Seat' : 'Seats'}`}
        </button>
      </form>
    </div>
  );
} 