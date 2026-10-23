import React, { useState } from 'react';
import { Calendar, Users, Sparkles, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import GuestSelectorDropdown from './GuestSelectorDropdown';
import { calculateNights, formatDateDisplay, getTodayDateString } from '../utils/bookingUtils';

export default function BookingWidget({
  bookingState,
  setBookingState,
  onSearch,
  variant = 'hero' // 'hero' | 'compact' | 'sticky'
}) {
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  const todayStr = getTodayDateString(0);
  const nights = calculateNights(bookingState.checkIn, bookingState.checkOut);

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    let newCheckOut = bookingState.checkOut;

    // If new checkIn is >= checkOut, advance checkOut by 1 day
    if (new Date(newCheckIn) >= new Date(newCheckOut)) {
      const d = new Date(newCheckIn);
      d.setDate(d.getDate() + 1);
      newCheckOut = d.toISOString().split('T')[0];
    }

    setBookingState((prev) => ({
      ...prev,
      checkIn: newCheckIn,
      checkOut: newCheckOut
    }));
  };

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value;
    if (new Date(newCheckOut) > new Date(bookingState.checkIn)) {
      setBookingState((prev) => ({
        ...prev,
        checkOut: newCheckOut
      }));
    }
  };

  const guestSummary = `${bookingState.adults + bookingState.children} Guests, ${bookingState.rooms} Room${bookingState.rooms > 1 ? 's' : ''}`;

  return (
    <div className="w-full max-w-5xl mx-auto relative z-20">
      {/* Top Banner / Trust Hook */}
      <div className="flex items-center justify-between px-3 py-1.5 mb-2 text-xs text-stone-200">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium text-[11px] backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-amber-300" />
            DIRECT EXCLUSIVE
          </span>
          <span className="hidden sm:inline text-stone-300 text-xs">
            Unlock Flash 15% Savings & Complimentary Breakfast
          </span>
        </div>
        <div className="flex items-center gap-3 text-stone-300 text-xs">
          <span className="hidden md:flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Best Rate Guarantee
          </span>
          <span className="flex items-center gap-1 text-stone-300">
            <Clock className="w-3.5 h-3.5 text-resort-300" /> 24-hr Free Cancellation
          </span>
        </div>
      </div>

      {/* Main Booking Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-luxury p-3 lg:p-4 border border-stone-200/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsGuestOpen(false);
            onSearch();
          }}
          className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
        >
          {/* Check-In Date */}
          <div className="md:col-span-3 bg-stone-50 hover:bg-stone-100/80 transition-colors rounded-xl p-3 border border-stone-200/70 focus-within:border-resort-600 focus-within:ring-2 focus-within:ring-resort-200 relative">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center justify-between mb-1">
              <span>Check-In</span>
              <Calendar className="w-3.5 h-3.5 text-resort-600" />
            </label>
            <input
              type="date"
              min={todayStr}
              value={bookingState.checkIn}
              onChange={handleCheckInChange}
              required
              className="w-full bg-transparent font-medium text-stone-900 text-sm focus:outline-none cursor-pointer"
            />
            <div className="text-[11px] text-stone-500 font-normal mt-0.5 truncate">
              {formatDateDisplay(bookingState.checkIn)}
            </div>
          </div>

          {/* Check-Out Date */}
          <div className="md:col-span-3 bg-stone-50 hover:bg-stone-100/80 transition-colors rounded-xl p-3 border border-stone-200/70 focus-within:border-resort-600 focus-within:ring-2 focus-within:ring-resort-200 relative">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                Check-Out
              </label>
              <span className="text-[10px] font-semibold bg-resort-100 text-resort-800 px-1.5 py-0.5 rounded">
                {nights} {nights === 1 ? 'Night' : 'Nights'}
              </span>
            </div>
            <input
              type="date"
              min={bookingState.checkIn}
              value={bookingState.checkOut}
              onChange={handleCheckOutChange}
              required
              className="w-full bg-transparent font-medium text-stone-900 text-sm focus:outline-none cursor-pointer"
            />
            <div className="text-[11px] text-stone-500 font-normal mt-0.5 truncate">
              {formatDateDisplay(bookingState.checkOut)}
            </div>
          </div>

          {/* Guests & Rooms Dropdown trigger */}
          <div className="md:col-span-3 relative">
            <button
              type="button"
              onClick={() => setIsGuestOpen(!isGuestOpen)}
              className="w-full text-left bg-stone-50 hover:bg-stone-100/80 transition-colors rounded-xl p-3 border border-stone-200/70 focus:outline-none focus:border-resort-600 focus:ring-2 focus:ring-resort-200"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center justify-between mb-1">
                <span>Guests & Rooms</span>
                <Users className="w-3.5 h-3.5 text-resort-600" />
              </div>
              <div className="text-sm font-semibold text-stone-900 truncate">
                {guestSummary}
              </div>
              <div className="text-[11px] text-stone-500 truncate mt-0.5">
                {bookingState.adults} Adults · {bookingState.children} Children
              </div>
            </button>

            {/* Popover */}
            <GuestSelectorDropdown
              isOpen={isGuestOpen}
              onClose={() => setIsGuestOpen(false)}
              guests={{
                rooms: bookingState.rooms,
                adults: bookingState.adults,
                children: bookingState.children,
                childAges: bookingState.childAges
              }}
              onChange={(updated) => {
                setBookingState((prev) => ({
                  ...prev,
                  rooms: updated.rooms,
                  adults: updated.adults,
                  children: updated.children,
                  childAges: updated.childAges
                }));
              }}
            />
          </div>

          {/* Action Button: Check Availability / Flash Pricing */}
          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-stone-900 via-stone-800 to-forest-900 hover:from-forest-900 hover:to-stone-950 text-white font-medium p-3.5 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center border border-resort-600/40"
            >
              {/* Subtle shimmer effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
              
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white group-hover:text-amber-200 transition-colors">
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-[11px] font-normal text-resort-300 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Instant Flash Rates</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
