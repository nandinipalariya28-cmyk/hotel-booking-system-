# Luxury Hotel & Resort Booking Flow Component

A modern, high-converting hotel and resort booking component suite and reservation flow inspired by premier hillside retreats (e.g., RS Sarovar Portico, Palampur).

Built with **React**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🌟 Key Features

### 1. The Search & Booking Widget (Hero / Header Bar)
- **Check-in & Check-out Date Pickers**: Automatically prevents booking in the past and dynamically recalculates minimum check-out date and stay duration.
- **Interactive Guests & Rooms Popover**:
  - Number of Rooms selector (1 - 6 rooms)
  - Number of Adults selector (1 - 12 adults)
  - Children selector (0 - 6 children) with **dynamic age specification** (under 1 yr infant, 1 to 11 yrs)
  - Real-time guest summary pill (`2 Guests, 1 Room`)
- **"Check Availability / Flash Pricing" CTA**:
  - Shimmer visual animation with microcopy (`Instant Flash Rates`, `Save 15% Today`).

### 2. Dynamic Pricing & Flash Result Screen (`FlashResultsModal`)
- **Luxury Room Showcase**: High-resolution imagery with photo previews, room size (sq.ft / m²), bed configuration, view type, and key amenities.
- **Instant Flash Pricing Calculation**:
  - Real-time calculation: `Total for N Nights = (Flash Nightly Rate × Nights × Rooms) + 12% Hospitality Tax`.
  - Transparent formula breakdown popover showing savings vs third-party OTAs.
- **Direct Booking Inclusions**:
  - Complimentary Artisan Mountain Buffet Breakfast
  - Free cancellation up to 48 hours before arrival
  - Complimentary sunset High Tea for two
  - Priority early check-in & ₹1,000 spa voucher
- **Filter Tabs**: Quick toggling between `All`, `Deluxe`, `Premium`, and `Suites`.

### 3. Sleek Guest Information & Checkout Drawer (`CheckoutDrawer`)
- Right-hand slide-over drawer with backdrop blur.
- Minimum essential fields to prevent abandonment:
  - Full Name
  - Email Address (for instant confirmation & calendar voucher)
  - Phone / WhatsApp with country code selector
  - One-click Room Preferences (e.g. *Quiet High-Floor*, *King Bed*, *Anniversary Celebration*, *Late Check-in*)
  - Optional special requests & dietary requirements
- WhatsApp Opt-in toggle: sends instant road directions and digital voucher.
- Promo / Coupon Code support (e.g., `WELCOME10` or `SAROVAR10` for an additional 10% discount).
- 256-bit SSL encryption trust badges and instant confirmation guarantee.

### 4. Booking Confirmation Voucher (`BookingConfirmationModal`)
- Unique reservation reference code (`HPR-XXXXXX`).
- Printable and downloadable booking summary voucher with full price breakdown and resort concierge direct contact.

---

## 🚀 Running the Project

```bash
cd luxury-resort-booking
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
luxury-resort-booking/
├── src/
│   ├── components/
│   │   ├── BookingWidget.jsx          # Primary search bar (Hero / Header)
│   │   ├── GuestSelectorDropdown.jsx  # Rooms, adults, and child age popover
│   │   ├── FlashResultsModal.jsx      # Room list with dynamic flash calculations
│   │   ├── CheckoutDrawer.jsx         # Guest details & frictionless checkout
│   │   ├── BookingConfirmationModal.jsx # Digital confirmation voucher
│   │   └── index.js                   # Unified component exports
│   ├── data/
│   │   └── mockRooms.js               # Room categories, images, and amenities
│   ├── utils/
│   │   └── bookingUtils.js            # Pricing calculation & date helpers
│   ├── App.jsx                        # Showcase resort landing page
│   ├── index.css                      # Tailwind base & custom animations
│   └── main.jsx
├── tailwind.config.js
└── package.json
```

---

## 💻 Integration into an Existing React / Next.js Project

You can copy the components in `src/components/` and utility helpers directly into your existing project:

```jsx
import React, { useState } from 'react';
import { 
  BookingWidget, 
  FlashResultsModal, 
  CheckoutDrawer, 
  BookingConfirmationModal,
  getTodayDateString 
} from './components';

export function HotelHero() {
  const [bookingState, setBookingState] = useState({
    checkIn: getTodayDateString(0),
    checkOut: getTodayDateString(2),
    rooms: 1,
    adults: 2,
    children: 0,
    childAges: []
  });

  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  return (
    <div className="relative">
      {/* 1. Embed Search Bar in your Hero section */}
      <BookingWidget
        bookingState={bookingState}
        setBookingState={setBookingState}
        onSearch={() => setIsResultsOpen(true)}
      />

      {/* 2. Flash Results Modal */}
      <FlashResultsModal
        isOpen={isResultsOpen}
        onClose={() => setIsResultsOpen(false)}
        bookingState={bookingState}
        onSelectRoom={(room, pricing) => {
          setSelectedRoom(room);
          setSelectedPricing(pricing);
          setIsResultsOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 3. Checkout Drawer */}
      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedRoom={selectedRoom}
        pricing={selectedPricing}
        bookingState={bookingState}
        onBookingSuccess={(booking) => {
          setConfirmedBooking(booking);
          setIsCheckoutOpen(false);
        }}
      />
    </div>
  );
}
```
