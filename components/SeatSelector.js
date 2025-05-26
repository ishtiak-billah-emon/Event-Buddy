export default function SeatSelector({ onSelect, selectedSeats }) {
  const seatOptions = [1, 2, 3, 4];

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-navy-700">Select Number of Seats</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {seatOptions.map((seats) => (
          <button
            key={seats}
            type="button"
            onClick={() => onSelect(seats)}
            className={`relative flex flex-col items-center justify-center p-6 rounded-lg border ${
              selectedSeats === seats
                ? 'border-[#6366F1] bg-[#EEF2FF]'
                : 'border-gray-200 hover:border-[#6366F1] hover:bg-[#EEF2FF]/50'
            }`}
          >
            {/* Ticket Icon */}
            <svg 
              className={`w-6 h-6 mb-2 ${
                selectedSeats === seats ? 'text-[#6366F1]' : 'text-gray-400'
              }`} 
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* Number */}
            <span className={`text-xl font-bold ${
              selectedSeats === seats ? 'text-[#6366F1]' : 'text-gray-700'
            }`}>
              {seats}
            </span>
            {/* Label */}
            <span className={`text-sm ${
              selectedSeats === seats ? 'text-[#6366F1]' : 'text-gray-500'
            }`}>
              {seats === 1 ? 'Seat' : 'Seats'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
} 