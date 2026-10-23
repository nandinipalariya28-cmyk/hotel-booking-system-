export function getTodayDateString(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

export function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

export function formatDateDisplay(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const date = new Date(year, parseInt(month) - 1, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatShortDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const date = new Date(year, parseInt(month) - 1, day);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function computePricing({
  basePricePerNight,
  discountPercent = 15,
  nights = 1,
  rooms = 1,
  appliedPromo = null
}) {
  const standardNightly = basePricePerNight;
  const discountedNightly = Math.round(standardNightly * (1 - discountPercent / 100));

  const standardSubtotal = standardNightly * nights * rooms;
  let flashSubtotal = discountedNightly * nights * rooms;

  let promoDiscount = 0;
  if (appliedPromo && appliedPromo.discountPercent) {
    promoDiscount = Math.round((flashSubtotal * appliedPromo.discountPercent) / 100);
    flashSubtotal -= promoDiscount;
  }

  // 12% GST on luxury hospitality
  const taxRate = 0.12;
  const taxesAndFees = Math.round(flashSubtotal * taxRate);
  const totalAmount = flashSubtotal + taxesAndFees;
  const totalSavings = (standardSubtotal - flashSubtotal) + promoDiscount;

  return {
    nights,
    rooms,
    standardNightly,
    flashNightly: discountedNightly,
    standardSubtotal,
    flashSubtotal,
    promoDiscount,
    taxesAndFees,
    taxRatePercentage: 12,
    totalAmount,
    totalSavings
  };
}
