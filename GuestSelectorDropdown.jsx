import React, { useRef, useEffect } from 'react';
import { Users, Plus, Minus, Check, Baby, ChevronDown } from 'lucide-react';

export default function GuestSelectorDropdown({
  guests,
  onChange,
  isOpen,
  onClose
}) {
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const updateField = (field, delta) => {
    const currentVal = guests[field];
    let newVal = currentVal + delta;

    if (field === 'rooms') {
      newVal = Math.max(1, Math.min(6, newVal));
      // Ensure adults is at least equal to rooms
      if (guests.adults < newVal) {
        onChange({ ...guests, rooms: newVal, adults: newVal });
        return;
      }
    } else if (field === 'adults') {
      newVal = Math.max(guests.rooms, Math.min(12, newVal));
    } else if (field === 'children') {
      newVal = Math.max(0, Math.min(6, newVal));
      // Adjust childAges array length
      let newAges = [...(guests.childAges || [])];
      if (newVal > currentVal) {
        for (let i = currentVal; i < newVal; i++) {
          newAges.push('5'); // default 5 years
        }
      } else {
        newAges = newAges.slice(0, newVal);
      }
      onChange({ ...guests, children: newVal, childAges: newAges });
      return;
    }

    onChange({ ...guests, [field]: newVal });
  };

  const handleChildAgeChange = (index, age) => {
    const newAges = [...(guests.childAges || [])];
    newAges[index] = age;
    onChange({ ...guests, childAges: newAges });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-dropdown border border-resort-200 p-5 z-50 animate-fade-in text-stone-800"
    >
      <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
        <h4 className="font-serif font-semibold text-stone-900 text-lg flex items-center gap-2">
          <Users className="w-4 h-4 text-resort-600" />
          Guests & Rooms
        </h4>
        <span className="text-xs font-medium text-resort-600 bg-resort-50 px-2.5 py-1 rounded-full border border-resort-200">
          Max 12 Guests
        </span>
      </div>

      <div className="space-y-4">
        {/* Rooms */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-stone-800">Rooms</div>
            <div className="text-xs text-stone-500">Minimum 1 room</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateField('rooms', -1)}
              disabled={guests.rooms <= 1}
              className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:border-resort-600 hover:text-resort-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-semibold text-sm text-stone-800">
              {guests.rooms}
            </span>
            <button
              type="button"
              onClick={() => updateField('rooms', 1)}
              disabled={guests.rooms >= 6}
              className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:border-resort-600 hover:text-resort-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Adults */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-stone-800">Adults</div>
            <div className="text-xs text-stone-500">Ages 12 and above</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateField('adults', -1)}
              disabled={guests.adults <= guests.rooms}
              className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:border-resort-600 hover:text-resort-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-semibold text-sm text-stone-800">
              {guests.adults}
            </span>
            <button
              type="button"
              onClick={() => updateField('adults', 1)}
              disabled={guests.adults >= 12}
              className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:border-resort-600 hover:text-resort-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-stone-800">Children</div>
            <div className="text-xs text-stone-500">Ages 0 to 11 years</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateField('children', -1)}
              disabled={guests.children <= 0}
              className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:border-resort-600 hover:text-resort-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-semibold text-sm text-stone-800">
              {guests.children}
            </span>
            <button
              type="button"
              onClick={() => updateField('children', 1)}
              disabled={guests.children >= 6}
              className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:border-resort-600 hover:text-resort-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Children Age Selectors */}
        {guests.children > 0 && (
          <div className="pt-3 border-t border-stone-100 bg-stone-50/70 -mx-5 px-5 py-3">
            <div className="text-xs font-semibold text-stone-700 mb-2 flex items-center gap-1.5">
              <Baby className="w-3.5 h-3.5 text-resort-600" />
              Specify Children's Ages (at check-in)
            </div>
            <div className="grid grid-cols-2 gap-2">
              {guests.childAges?.map((age, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <label className="text-[11px] text-stone-500">Child {idx + 1}</label>
                  <div className="relative">
                    <select
                      value={age}
                      onChange={(e) => handleChildAgeChange(idx, e.target.value)}
                      className="w-full text-xs bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 pr-6 appearance-none focus:outline-none focus:border-resort-600 text-stone-800 font-medium"
                    >
                      <option value="0">Under 1 yr (Infant)</option>
                      <option value="1">1 year old</option>
                      <option value="2">2 years old</option>
                      <option value="3">3 years old</option>
                      <option value="4">4 years old</option>
                      <option value="5">5 years old</option>
                      <option value="6">6 years old</option>
                      <option value="7">7 years old</option>
                      <option value="8">8 years old</option>
                      <option value="9">9 years old</option>
                      <option value="10">10 years old</option>
                      <option value="11">11 years old</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
        <span className="text-xs text-stone-500">
          Infants (0-2 yrs) stay complimentary
        </span>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-resort-700 transition-colors flex items-center gap-1"
        >
          <Check className="w-3.5 h-3.5" />
          Apply
        </button>
      </div>
    </div>
  );
}
