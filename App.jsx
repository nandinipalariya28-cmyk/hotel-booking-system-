import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, Coffee, Wifi, Phone, MapPin, 
  Star, ChevronRight, Award, Compass, Heart, UtensilsCrossed, 
  TreePine, Flame, Bath, Clock, CheckCircle, ArrowUpRight
} from 'lucide-react';
import BookingWidget from './components/BookingWidget';
import FlashResultsModal from './components/FlashResultsModal';
import CheckoutDrawer from './components/CheckoutDrawer';
import BookingConfirmationModal from './components/BookingConfirmationModal';
import { mockRooms, DIRECT_BOOKING_BENEFITS } from './data/mockRooms';
import { getTodayDateString, formatINR, calculateNights, computePricing } from './utils/bookingUtils';

export default function App() {
  // Booking parameters state
  const [bookingState, setBookingState] = useState({
    checkIn: getTodayDateString(0),
    checkOut: getTodayDateString(2),
    rooms: 1,
    adults: 2,
    children: 0,
    childAges: []
  });

  // Modal / Drawer visibility states
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  // Selected room & booking details
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const nights = calculateNights(bookingState.checkIn, bookingState.checkOut);

  // Handlers
  const handleOpenResults = () => {
    setIsResultsOpen(true);
  };

  const handleSelectRoom = (room, pricing) => {
    setSelectedRoom(room);
    setSelectedPricing(pricing);
    setIsResultsOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBookingSuccess = (bookingDetails) => {
    setConfirmedBooking(bookingDetails);
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
  };

  const handleNewBooking = () => {
    setIsConfirmationOpen(false);
    setConfirmedBooking(null);
    setSelectedRoom(null);
    setSelectedPricing(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-resort-200">
      
      {/* Top Notification Strip */}
      <div className="bg-stone-950 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium text-amber-200">Exclusive Flash Direct Rates:</span>
            <span>Save up to 20% + Complimentary Gourmet Breakfast & Evening Tea</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-resort-400" />
              Kangra Valley, Himachal Pradesh
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-resort-400" />
              Concierge: +91 (0) 1894 235 555
            </span>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-amber-300 font-serif font-bold text-xl border border-resort-400/40 shadow-sm">
              H
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-stone-900 block leading-tight">
                THE HERITAGE PINE
              </span>
              <span className="text-[10px] uppercase tracking-widest text-resort-600 font-semibold block">
                Resort & Spa • Himalayas
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-stone-700">
            <a href="#villas" className="hover:text-resort-700 transition-colors">Villas & Suites</a>
            <a href="#experience" className="hover:text-resort-700 transition-colors">Dining & Views</a>
            <a href="#wellness" className="hover:text-resort-700 transition-colors">Ayurvedic Spa</a>
            <a href="#perks" className="hover:text-resort-700 transition-colors">Direct Benefits</a>
          </nav>

          {/* CTA Header Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenResults}
              className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 border border-resort-500/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Flash Rates</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex flex-col justify-between pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
            alt="The Heritage Pine Resort Himachal"
            className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 max-w-4xl mx-auto text-center pt-8 pb-6 text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-amber-200">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            Voted #1 Mountain Luxury Resort in Kangra Valley
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Where Himalayan Mist Meets <br className="hidden sm:inline" />
            <span className="italic font-normal text-amber-200">Timeless Elegance</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-200 font-light">
            Perched amidst verdant cedar pine forests with unobstructed panoramic vistas of the snow-capped Dhauladhar range. Indulge in cozy stone fireplaces, artisan dining, and heated infinity vistas.
          </p>
        </div>

        {/* Hero Booking Widget */}
        <div className="relative z-20 w-full mt-4">
          <BookingWidget
            bookingState={bookingState}
            setBookingState={setBookingState}
            onSearch={handleOpenResults}
            variant="hero"
          />
        </div>
      </section>

      {/* Direct Booking Advantage Section */}
      <section id="perks" className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-resort-600 block mb-1">
              Direct Reservation Guarantee
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Why Reserve Directly With Us?
            </h2>
            <p className="text-stone-500 text-sm mt-2">
              Book directly through our website to enjoy exclusive flash discounts, zero booking commission fees, and curated mountain experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {DIRECT_BOOKING_BENEFITS.map((b, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200 hover:border-resort-300 hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-resort-100 flex items-center justify-center text-resort-800 mb-4">
                    {idx === 0 && <Sparkles className="w-6 h-6 text-amber-600" />}
                    {idx === 1 && <Coffee className="w-6 h-6 text-stone-800" />}
                    {idx === 2 && <ShieldCheck className="w-6 h-6 text-emerald-700" />}
                    {idx === 3 && <Heart className="w-6 h-6 text-resort-700" />}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">
                    {b.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center gap-1 text-[11px] font-semibold text-resort-700">
                  <span>Guaranteed inclusion</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms Showcase */}
      <section id="villas" className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-resort-600 block mb-1">
                Sanctuary in the Hills
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                Signature Rooms & Mountain Suites
              </h2>
              <p className="text-stone-500 text-sm mt-2 max-w-xl">
                Every room is architected with warm Himalayan cedarwood, private sit-out balconies, and deep soaking tubs facing misty pine horizons.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                type="button"
                onClick={handleOpenResults}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-resort-800 hover:text-stone-900 border-b-2 border-resort-600 pb-1"
              >
                <span>View Real-Time Flash Availability</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Room Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockRooms.map((room) => {
              const pricing = computePricing({
                basePricePerNight: room.basePricePerNight,
                discountPercent: room.discountPercent,
                nights,
                rooms: bookingState.rooms
              });

              return (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-card hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-stone-900/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm">
                      {room.badge}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-xs font-semibold px-2 py-0.5 rounded shadow flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {room.rating}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-resort-600 mb-1">
                        {room.category} Class
                      </div>
                      <h3 className="font-serif font-bold text-stone-900 text-lg mb-1 leading-snug">
                        {room.name}
                      </h3>
                      <p className="text-xs text-stone-500 mb-3 line-clamp-2">
                        {room.tagline}
                      </p>

                      <div className="space-y-1 text-xs text-stone-600 mb-4">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{room.bed}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{room.size} • Balcony</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-xs text-stone-400 line-through mr-1.5">
                            {formatINR(pricing.standardNightly)}
                          </span>
                          <span className="font-serif font-bold text-xl text-stone-900">
                            {formatINR(pricing.flashNightly)}
                          </span>
                          <span className="text-[11px] text-stone-500"> / nt</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Save {room.discountPercent}%
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectRoom(room, pricing)}
                        className="w-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <span>Book Flash Rate</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resort Experience & Amenities Banner */}
      <section id="experience" className="py-20 bg-stone-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Immersive Himalayan Escapes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Authentic Mountain Gastronomy & Forest Wellness
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed">
                Relish slow-cooked Kangri Dham cuisine, wood-fired pizzas under starlit nights, and signature Tibetan singing bowl meditations overlooking cedar ravines.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border border-stone-800 bg-stone-800/40 p-4 rounded-xl">
                  <Flame className="w-5 h-5 text-amber-400 mb-2" />
                  <h4 className="font-serif font-semibold text-sm">The Pine Ridge Hearth</h4>
                  <p className="text-xs text-stone-400 mt-1">Evening bonfires with live pahadi acoustic melodies.</p>
                </div>
                <div className="border border-stone-800 bg-stone-800/40 p-4 rounded-xl">
                  <Bath className="w-5 h-5 text-resort-300 mb-2" />
                  <h4 className="font-serif font-semibold text-sm">Himalayan Cedar Spa</h4>
                  <p className="text-xs text-stone-400 mt-1">Ayurvedic hot stone and pine needle detox treatments.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleOpenResults}
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-colors inline-flex items-center gap-2"
                >
                  <span>Check Flash Availability</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-700 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                  alt="Spa and wellness"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-stone-950/90 border border-stone-700 backdrop-blur-md p-4 rounded-2xl max-w-xs shadow-xl hidden sm:block">
                <div className="flex items-center gap-2 text-amber-300 mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-bold">Travellers' Choice 2026</span>
                </div>
                <p className="text-[11px] text-stone-300">
                  Awarded Best Mountain Luxury Resort in Northern India by Luxury Hospitality Awards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 text-xs py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2 text-white font-serif font-bold text-lg mb-2">
                <span>THE HERITAGE PINE</span>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed">
                A sanctuary of serenity nestled high in the Dhauladhar foothills. Offering luxury accommodations, curated mountain dining, and rejuvenating therapies.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
                Quick Reservation
              </div>
              <ul className="space-y-2">
                <li><button onClick={handleOpenResults} className="hover:text-amber-300 transition-colors">Instant Flash Pricing</button></li>
                <li><button onClick={handleOpenResults} className="hover:text-amber-300 transition-colors">Himalayan Suites</button></li>
                <li><button onClick={handleOpenResults} className="hover:text-amber-300 transition-colors">Couples Getaway Deals</button></li>
                <li><button onClick={handleOpenResults} className="hover:text-amber-300 transition-colors">Direct Booking Perks</button></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
                Contact & Concierge
              </div>
              <p className="text-stone-400">
                Palampur Kangra Valley, HP 176061, India<br />
                Direct Desk: +91 1894 235 555<br />
                WhatsApp: +91 98822 54321<br />
                Email: reservations@heritagepineresort.com
              </p>
            </div>
            <div>
              <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
                Direct Booking Guarantee
              </div>
              <p className="text-stone-400 leading-relaxed">
                Zero middleman markups. Our website offers guaranteed lowest price with free 24-48hr cancellation and breakfast included.
              </p>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
            <div>© 2026 The Heritage Pine Resort & Spa. All rights reserved.</div>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms & Cancellation Policy</span>
              <span>•</span>
              <span>Security Guarantee</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal 1: Dynamic Pricing & Flash Results Modal */}
      <FlashResultsModal
        isOpen={isResultsOpen}
        onClose={() => setIsResultsOpen(false)}
        bookingState={bookingState}
        onSelectRoom={handleSelectRoom}
        onModifySearch={() => {
          setIsResultsOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Drawer 2: Guest Details & Checkout Form */}
      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedRoom={selectedRoom}
        pricing={selectedPricing}
        bookingState={bookingState}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Modal 3: Booking Confirmation Receipt & Voucher */}
      <BookingConfirmationModal
        isOpen={isConfirmationOpen}
        booking={confirmedBooking}
        onClose={() => setIsConfirmationOpen(false)}
        onNewBooking={handleNewBooking}
      />

    </div>
  );
}
