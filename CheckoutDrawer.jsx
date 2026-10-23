import React, { useState } from 'react';
import { 
  X, Lock, ShieldCheck, CheckCircle2, Calendar, 
  Users, CreditCard, Sparkles, MessageSquare, Phone, 
  Mail, User, Tag, ChevronRight, AlertCircle, Building2
} from 'lucide-react';
import { formatINR, formatDateDisplay } from '../utils/bookingUtils';

export default function CheckoutDrawer({
  isOpen,
  onClose,
  selectedRoom,
  pricing,
  bookingState,
  onBookingSuccess
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    whatsappOptIn: true,
    specialRequests: '',
    quickPreferences: []
  });

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen || !selectedRoom || !pricing) return null;

  const quickPillOptions = [
    'Quiet High-Floor Room',
    'King Bed Preference',
    'Anniversary / Celebration',
    'Late Check-in (after 7 PM)',
    'Extra Pillows'
  ];

  const toggleQuickPreference = (option) => {
    setFormData(prev => {
      const exists = prev.quickPreferences.includes(option);
      return {
        ...prev,
        quickPreferences: exists
          ? prev.quickPreferences.filter(item => item !== option)
          : [...prev.quickPreferences, option]
      };
    });
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (code === 'SAROVAR10' || code === 'WELCOME10' || code === 'DIRECT10') {
      const discountVal = Math.round(pricing.flashSubtotal * 0.10);
      setAppliedPromo({
        code,
        discountPercent: 10,
        amount: discountVal
      });
    } else if (code === '') {
      setPromoError('Please enter a coupon code.');
    } else {
      setPromoError('Invalid coupon code. Try WELCOME10 for 10% off.');
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = 'Please enter a valid contact number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate secure transaction / reservation confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      const bookingReference = 'HPR-' + Math.floor(100000 + Math.random() * 900000);
      
      const finalPricing = appliedPromo ? {
        ...pricing,
        promoDiscount: appliedPromo.amount,
        totalAmount: pricing.totalAmount - appliedPromo.amount
      } : pricing;

      onBookingSuccess({
        referenceId: bookingReference,
        room: selectedRoom,
        pricing: finalPricing,
        guest: formData,
        dates: {
          checkIn: bookingState.checkIn,
          checkOut: bookingState.checkOut,
          nights: pricing.nights
        },
        guests: {
          adults: bookingState.adults,
          children: bookingState.children,
          rooms: bookingState.rooms
        },
        createdAt: new Date().toISOString()
      });
    }, 1200);
  };

  // Adjust final total if promo applied
  const currentTotal = appliedPromo 
    ? Math.max(0, pricing.totalAmount - appliedPromo.amount)
    : pricing.totalAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-sm flex justify-end animate-fade-in">
      {/* Click outside backdrop */}
      <div className="flex-1 hidden md:block" onClick={onClose} />

      {/* Drawer Container */}
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-stone-200">
        
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-resort-600/30 border border-resort-400/40 flex items-center justify-center text-amber-300">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Guest Details & Reservation
              </h3>
              <p className="text-xs text-stone-300">
                Guaranteed Direct Flash Rate • Free Cancellation
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-5 sm:p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* Reservation Summary Card */}
          <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-resort-200">
            <div className="flex gap-4 items-start pb-3 border-b border-resort-200/60">
              <img
                src={selectedRoom.images[0]}
                alt={selectedRoom.name}
                className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-resort-600">
                  {selectedRoom.category} Room
                </span>
                <h4 className="font-serif font-bold text-stone-900 text-base truncate">
                  {selectedRoom.name}
                </h4>
                <div className="text-xs text-stone-500 mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
                  <span>{pricing.nights} {pricing.nights === 1 ? 'Night' : 'Nights'}</span>
                  <span>•</span>
                  <span>{formatDateDisplay(bookingState.checkIn).slice(0, 11)} – {formatDateDisplay(bookingState.checkOut).slice(0, 11)}</span>
                </div>
                <div className="text-xs text-stone-600 mt-0.5">
                  {bookingState.adults} Adults, {bookingState.rooms} Room
                </div>
              </div>
            </div>

            {/* Price breakdown in drawer */}
            <div className="pt-3 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Room Stay ({pricing.nights} nights × {bookingState.rooms} room)</span>
                <span>{formatINR(pricing.flashSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Service GST (12%)</span>
                <span>{formatINR(pricing.taxesAndFees)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promo Code ({appliedPromo.code})</span>
                  <span>-{formatINR(appliedPromo.amount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-resort-200 flex justify-between font-bold text-stone-900 text-sm">
                <span>Total Payable</span>
                <span className="font-serif text-base text-stone-900">{formatINR(currentTotal)}</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-medium pt-0.5">
                🎉 Direct Flash Perks & Daily Breakfast Included
              </div>
            </div>
          </div>

          {/* Promo Code Input */}
          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80">
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Coupon code (e.g. WELCOME10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 bg-white rounded-lg border border-stone-200 focus:outline-none focus:border-resort-600 font-medium uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Apply
              </button>
            </form>
            {promoError && (
              <p className="text-[11px] text-red-500 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {promoError}
              </p>
            )}
            {appliedPromo && (
              <p className="text-[11px] text-emerald-600 mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Code {appliedPromo.code} applied! Saved extra {formatINR(appliedPromo.amount)}.
              </p>
            )}
          </div>

          {/* Guest Form */}
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-resort-600" />
              Primary Guest Details
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full text-sm px-3.5 py-2.5 rounded-xl border ${
                    errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-stone-300 bg-white'
                  } focus:outline-none focus:border-resort-600 focus:ring-1 focus:ring-resort-600 transition-colors`}
                />
              </div>
              {errors.fullName && (
                <span className="text-[11px] text-red-500 mt-1 block">{errors.fullName}</span>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Address (for instant voucher) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="vikram@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full text-sm pl-10 pr-3.5 py-2.5 rounded-xl border ${
                    errors.email ? 'border-red-400 bg-red-50/20' : 'border-stone-300 bg-white'
                  } focus:outline-none focus:border-resort-600 focus:ring-1 focus:ring-resort-600 transition-colors`}
                />
              </div>
              {errors.email && (
                <span className="text-[11px] text-red-500 mt-1 block">{errors.email}</span>
              )}
            </div>

            {/* Phone Number / WhatsApp */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Mobile Number / WhatsApp <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className="bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-2.5 text-xs font-medium text-stone-800 focus:outline-none focus:border-resort-600"
                >
                  <option value="+91">🇮🇳 +91 (IN)</option>
                  <option value="+1">🇺🇸 +1 (US)</option>
                  <option value="+44">🇬🇧 +44 (UK)</option>
                  <option value="+971">🇦🇪 +971 (UAE)</option>
                  <option value="+65">🇸🇬 +65 (SG)</option>
                </select>

                <div className="relative flex-1">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full text-sm pl-10 pr-3.5 py-2.5 rounded-xl border ${
                      errors.phone ? 'border-red-400 bg-red-50/20' : 'border-stone-300 bg-white'
                    } focus:outline-none focus:border-resort-600 focus:ring-1 focus:ring-resort-600 transition-colors`}
                  />
                </div>
              </div>
              {errors.phone && (
                <span className="text-[11px] text-red-500 mt-1 block">{errors.phone}</span>
              )}
            </div>

            {/* WhatsApp check-in opt-in */}
            <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.whatsappOptIn}
                onChange={(e) => setFormData({ ...formData, whatsappOptIn: e.target.checked })}
                className="mt-0.5 rounded border-stone-300 text-stone-900 focus:ring-resort-500 h-4 w-4"
              />
              <span className="text-xs text-stone-600">
                Send reservation confirmation & mountain road directions directly to my WhatsApp
              </span>
            </label>

            {/* Quick Preferences Chips */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-stone-700 mb-1.5 flex items-center justify-between">
                <span>Room Preferences (Subject to availability)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickPillOptions.map((opt) => {
                  const isSelected = formData.quickPreferences.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleQuickPreference(opt)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                        isSelected
                          ? 'bg-resort-700 text-white border-resort-800'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center justify-between">
                <span>Special Requests / Dietary Needs</span>
                <span className="text-stone-400 font-normal text-[11px]">Optional</span>
              </label>
              <textarea
                rows={2}
                placeholder="E.g., Airport pick-up required, Jain food preference, celebrating 10th anniversary..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:border-resort-600 focus:ring-1 focus:ring-resort-600 transition-colors"
              />
            </div>
          </form>
        </div>

        {/* Drawer Footer / Sticky Confirmation Button */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-stone-600">Total Due Today:</span>
            <div className="text-right">
              <span className="font-serif font-bold text-lg text-stone-900">
                {formatINR(currentTotal)}
              </span>
              <span className="text-[10px] text-stone-500 block">Taxes included</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 active:bg-stone-950 text-white font-semibold text-sm shadow-luxury hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-amber-300" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Securing Your Reservation...
              </span>
            ) : (
              <>
                <span>Confirm Reservation & Proceed</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 mt-3">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL Encrypted
            </span>
            <span>•</span>
            <span>Zero Booking Fees</span>
            <span>•</span>
            <span>Instant Confirmation</span>
          </div>
        </div>

      </div>
    </div>
  );
}
