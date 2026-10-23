import React from 'react';
import { 
  CheckCircle2, Calendar, Users, MapPin, Download, 
  Share2, ArrowRight, Sparkles, Phone, MessageSquare, 
  Printer, Home
} from 'lucide-react';
import { formatINR, formatDateDisplay } from '../utils/bookingUtils';

export default function BookingConfirmationModal({
  booking,
  isOpen,
  onClose,
  onNewBooking
}) {
  if (!isOpen || !booking) return null;

  const { referenceId, room, pricing, guest, dates, guests } = booking;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-3xl shadow-2xl border border-resort-300 overflow-hidden text-stone-800 my-8">
        
        {/* Header Celebration Banner */}
        <div className="bg-gradient-to-br from-stone-900 via-forest-900 to-stone-900 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Reservation Confirmed & Guaranteed
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            We Look Forward to Welcoming You
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            A confirmation voucher has been sent to <span className="font-semibold text-white">{guest.email}</span>
            {guest.whatsappOptIn && <span> and WhatsApp (<span className="text-emerald-300">{guest.countryCode} {guest.phone}</span>)</span>}.
          </p>

          <div className="mt-4 inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-xs">
            <span className="text-stone-300">Booking Reference: </span>
            <span className="font-mono font-bold tracking-widest text-amber-300 text-sm">{referenceId}</span>
          </div>
        </div>

        {/* Voucher Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Property & Room Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-resort-600">
                The Heritage Pine Resort & Spa
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
                {room.name}
              </h3>
              <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-resort-600" />
                Pine Valley Ridge, Himachal Pradesh, India
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-stone-500 block">Total Amount Paid</span>
              <span className="font-serif text-2xl font-bold text-stone-900">
                {formatINR(pricing.totalAmount)}
              </span>
              <span className="text-[11px] text-emerald-700 font-medium block">
                Saved {formatINR(pricing.totalSavings)} direct booking
              </span>
            </div>
          </div>

          {/* Stay Timeline Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-stone-200">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block mb-1">
                Check-In
              </span>
              <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                {formatDateDisplay(dates.checkIn)}
              </div>
              <span className="text-[11px] text-stone-500">From 2:00 PM</span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block mb-1">
                Check-Out
              </span>
              <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                {formatDateDisplay(dates.checkOut)}
              </div>
              <span className="text-[11px] text-stone-500">Until 12:00 PM</span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block mb-1">
                Duration
              </span>
              <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                {dates.nights} {dates.nights === 1 ? 'Night' : 'Nights'}
              </div>
              <span className="text-[11px] text-stone-500">{guests.rooms} Room</span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block mb-1">
                Guests
              </span>
              <div className="font-semibold text-stone-900 text-xs sm:text-sm">
                {guests.adults} Adults
              </div>
              <span className="text-[11px] text-stone-500">{guests.children} Children</span>
            </div>
          </div>

          {/* Guest Info & Preferences */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 text-xs space-y-2">
            <div className="font-semibold text-stone-800">Primary Guest:</div>
            <div className="text-stone-700">
              <span className="font-medium">{guest.fullName}</span> • {guest.countryCode} {guest.phone} • {guest.email}
            </div>
            {guest.quickPreferences?.length > 0 && (
              <div className="pt-1 flex flex-wrap gap-1.5 items-center">
                <span className="text-stone-500">Preferences:</span>
                {guest.quickPreferences.map((p, i) => (
                  <span key={i} className="bg-white border border-stone-200 px-2 py-0.5 rounded text-[11px] text-stone-700">
                    {p}
                  </span>
                ))}
              </div>
            )}
            {guest.specialRequests && (
              <div className="text-stone-600 text-[11px] italic pt-1">
                "{guest.specialRequests}"
              </div>
            )}
          </div>

          {/* Direct Perks Inclusions */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
            <div className="text-xs font-bold text-amber-900 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              Complimentary Direct Perks with Your Stay:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-950">
              <div>✓ Daily Artisan Buffet Breakfast for all guests</div>
              <div>✓ Welcome Himalayan Herbal Tea on arrival</div>
              <div>✓ Evening High Tea on the Valley Sunset Terrace</div>
              <div>✓ Complimentary High Speed Starlink Wi-Fi</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-1/2 py-2.5 px-4 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              Print / Save Voucher
            </button>
            <button
              type="button"
              onClick={onNewBooking}
              className="w-full sm:w-1/2 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Home className="w-4 h-4 text-resort-300" />
              Return to Resort Home
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
