import React, { useState } from 'react';
import { 
  X, Sparkles, Check, Coffee, Wifi, ShieldCheck, MapPin, 
  Calendar, Users, Info, ChevronRight, Star, BedDouble, 
  Maximize, Eye, Gift, ArrowUpDown, ChevronDown
} from 'lucide-react';
import { mockRooms, DIRECT_BOOKING_BENEFITS } from '../data/mockRooms';
import { computePricing, formatINR, formatDateDisplay, calculateNights } from '../utils/bookingUtils';

export default function FlashResultsModal({
  isOpen,
  onClose,
  bookingState,
  onSelectRoom,
  onModifySearch
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedBreakdownId, setExpandedBreakdownId] = useState(null);
  const [activeImageIndexes, setActiveImageIndexes] = useState({});

  if (!isOpen) return null;

  const nights = calculateNights(bookingState.checkIn, bookingState.checkOut);

  const categories = ['All', 'Deluxe', 'Premium', 'Suites'];

  const filteredRooms = selectedCategory === 'All'
    ? mockRooms
    : mockRooms.filter(r => r.category === selectedCategory);

  const handleNextImage = (roomId, e) => {
    e.stopPropagation();
    const room = mockRooms.find(r => r.id === roomId);
    if (!room) return;
    const current = activeImageIndexes[roomId] || 0;
    const next = (current + 1) % room.images.length;
    setActiveImageIndexes(prev => ({ ...prev, [roomId]: next }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex flex-col justify-start items-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="w-full max-w-6xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-resort-200 overflow-hidden my-auto flex flex-col max-h-[94vh]">
        
        {/* Sticky Header with Search Summary */}
        <div className="sticky top-0 z-30 bg-stone-900 text-stone-100 border-b border-stone-800 px-4 sm:px-6 py-4 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                  Flash Direct Pricing Active
                </span>
                <span className="text-xs text-stone-400 hidden sm:inline">
                  • 15% Saved automatically
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                Available Rooms & Mountain Villas
              </h2>
            </div>

            {/* Stay Details Summary Pill & Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 bg-stone-800/90 border border-stone-700/80 rounded-xl px-3.5 py-1.5 text-xs text-stone-200">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-resort-300" />
                  <span>{formatDateDisplay(bookingState.checkIn).slice(0, 11)} – {formatDateDisplay(bookingState.checkOut).slice(0, 11)}</span>
                </div>
                <span className="text-stone-500">|</span>
                <span className="font-semibold text-amber-300">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                <span className="text-stone-500">|</span>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-resort-300" />
                  <span>{bookingState.adults + bookingState.children} Guests, {bookingState.rooms} Room</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onModifySearch}
                className="text-xs font-medium text-resort-300 hover:text-white underline underline-offset-4 transition-colors"
              >
                Edit Dates
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Direct Perks Highlight Bar */}
          <div className="mt-3 pt-3 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] sm:text-xs text-stone-300">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gourmet Buffet Breakfast Included</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Flexible 24-48h Free Cancellation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Complimentary High Tea for Two</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Priority Mountain Valley View</span>
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="bg-white border-b border-stone-200/80 px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider mr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="text-xs text-stone-500 hidden sm:block">
            Showing <span className="font-semibold text-stone-800">{filteredRooms.length}</span> luxury options
          </div>
        </div>

        {/* Main Content Area / Room Listings */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          {filteredRooms.map((room) => {
            const pricing = computePricing({
              basePricePerNight: room.basePricePerNight,
              discountPercent: room.discountPercent,
              nights,
              rooms: bookingState.rooms
            });

            const activeImgIdx = activeImageIndexes[room.id] || 0;
            const currentImg = room.images[activeImgIdx];
            const isBreakdownOpen = expandedBreakdownId === room.id;

            return (
              <div
                key={room.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-card hover:shadow-luxury transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Room Image & Gallery */}
                <div className="lg:col-span-5 relative group overflow-hidden bg-stone-100 min-h-[220px] lg:min-h-full">
                  <img
                    src={currentImg}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-stone-900/90 backdrop-blur-md text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-amber-400/30">
                      {room.badge}
                    </span>
                    <span className="bg-emerald-800/90 backdrop-blur-md text-white text-[11px] font-medium px-2 py-1 rounded-md">
                      Flash Deal
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-stone-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{room.rating}</span>
                    <span className="text-stone-400 font-normal">({room.reviewsCount})</span>
                  </div>

                  {/* Next Photo Pill */}
                  {room.images.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => handleNextImage(room.id, e)}
                      className="absolute bottom-3 right-3 bg-stone-900/80 hover:bg-stone-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm transition-colors flex items-center gap-1"
                    >
                      <span>Photo {activeImgIdx + 1}/{room.images.length}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Room Details & Inclusions */}
                <div className="lg:col-span-4 p-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-r border-stone-100">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-resort-600 mb-1">
                      {room.category} Class
                    </div>
                    <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
                      {room.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mb-3">
                      {room.tagline}
                    </p>

                    {/* Room Meta Badges */}
                    <div className="flex flex-wrap gap-3 text-xs text-stone-600 mb-4 pb-3 border-b border-stone-100">
                      <div className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5 text-stone-400" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-3.5 h-3.5 text-stone-400" />
                        <span>{room.bed}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-stone-400" />
                        <span>{room.occupancy}</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-1.5 mb-3">
                      <div className="text-xs font-semibold text-stone-700">Room Highlights:</div>
                      {room.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-stone-600">
                          <Check className="w-3 h-3 text-resort-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Booking Perks Pill */}
                  <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-2.5 mt-2">
                    <div className="text-[11px] font-bold text-amber-900 flex items-center gap-1 mb-1">
                      <Gift className="w-3 h-3 text-amber-700" />
                      Direct Reservation Perks Included:
                    </div>
                    <ul className="text-[11px] text-amber-950 space-y-0.5">
                      <li className="flex items-center gap-1">
                        • Gourmet Breakfast & High Tea
                      </li>
                      <li className="flex items-center gap-1">
                        • Zero Cancellation Fee (48 hrs)
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Instant Flash Pricing & Action */}
                <div className="lg:col-span-3 bg-stone-50/70 p-5 flex flex-col justify-between border-t lg:border-t-0 border-stone-100">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Save {room.discountPercent}% Direct
                      </span>
                      <span className="text-xs line-through text-stone-400">
                        {formatINR(pricing.standardNightly)}/nt
                      </span>
                    </div>

                    {/* Nightly Flash Rate */}
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
                        {formatINR(pricing.flashNightly)}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">/ night</span>
                    </div>

                    {/* Stay Calculation */}
                    <div className="bg-white rounded-xl p-3 border border-stone-200/80 my-3 text-xs space-y-1.5">
                      <div className="flex justify-between text-stone-600">
                        <span>{nights} {nights === 1 ? 'Night' : 'Nights'} × {bookingState.rooms} Room{bookingState.rooms > 1 ? 's' : ''}</span>
                        <span className="font-medium text-stone-800">{formatINR(pricing.flashSubtotal)}</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>Taxes & GST (12%)</span>
                        <span className="font-medium text-stone-800">{formatINR(pricing.taxesAndFees)}</span>
                      </div>
                      <div className="pt-1.5 border-t border-stone-100 flex justify-between font-bold text-stone-900">
                        <span className="flex items-center gap-1">
                          Total Stay
                          <button
                            type="button"
                            onClick={() => setExpandedBreakdownId(isBreakdownOpen ? null : room.id)}
                            className="text-stone-400 hover:text-stone-700"
                            title="Pricing calculation formula"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </span>
                        <span className="text-sm font-serif text-stone-900">{formatINR(pricing.totalAmount)}</span>
                      </div>
                    </div>

                    {/* Calculation breakdown popover details */}
                    {isBreakdownOpen && (
                      <div className="text-[11px] bg-stone-100 p-2.5 rounded-lg border border-stone-300 text-stone-600 mb-3 space-y-1 animate-fade-in">
                        <div className="font-semibold text-stone-800">Flash Calculation Formula:</div>
                        <div>({nights} nights × {formatINR(pricing.flashNightly)}) × {bookingState.rooms} room = {formatINR(pricing.flashSubtotal)}</div>
                        <div>+ 12% Hospitality Tax = {formatINR(pricing.taxesAndFees)}</div>
                        <div className="text-emerald-700 font-semibold">You save {formatINR(pricing.totalSavings)} vs public portals!</div>
                      </div>
                    )}
                  </div>

                  {/* Book Now Button */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => onSelectRoom(room, pricing)}
                      className="w-full bg-stone-900 hover:bg-stone-800 active:bg-stone-950 text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group border border-resort-500/30"
                    >
                      <span className="font-semibold text-sm">Select Room & Book</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                    <div className="text-center text-[11px] text-stone-500 mt-2 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Instant Confirmation • No Booking Fees
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
