/**
 * Freeway Self-Drive Car Rental - Unified Application Script
 * Powers Theme (Dark/Light), RTL Support, Multi-Page Navigation,
 * Fleet Catalog Filtering, Booking Calculator, Damage Inspection & Telemetry.
 */

// Global State
const FreewayState = {
  theme: localStorage.getItem('freeway_theme') || 'light',
  rtl: localStorage.getItem('freeway_rtl') === 'true',
  currentUser: {
    name: 'Alex Walker',
    email: 'alex.walker@freedomdrive.io',
    licenseNo: 'DL-9824-CAL-2027',
    kycStatus: 'Verified',
    membership: 'Freedom Gold VIP',
    points: 1450,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  activeTrip: {
    id: 'TRIP-84920',
    carModel: 'Ford Bronco Wildtrak 4x4',
    category: 'SUV / Adventure',
    plate: '7XYZ892',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    pickupLocation: 'Downtown Freedom Station - Bay 4',
    dropoffLocation: 'LAX International Airport Terminal 2 Hub',
    startTime: 'Today, 08:30 AM',
    endTime: 'Today, 08:30 PM',
    remainingMinutes: 285,
    isLocked: true,
    fuelLevel: 78,
    odometerStart: 14220,
    odometerCurrent: 14385,
    dailyRate: 89,
    status: 'In Progress'
  },
  fleet: [
    {
      id: 'car-1',
      name: 'Tesla Model 3 Long Range',
      category: 'Electric',
      typeLabel: 'EV Sedan',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
      priceDay: 85,
      priceHour: 14,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Electric (580 km range)',
      features: ['Autopilot Ready', 'Free Supercharging', 'Bluetooth Keyless', 'Premium Audio'],
      luggage: '3 Bags',
      rating: 4.92,
      tripsCount: 142,
      availableAt: 'Downtown Hub & Airport Terminal'
    },
    {
      id: 'car-2',
      name: 'Ford Bronco Wildtrak 4x4',
      category: 'SUV',
      typeLabel: 'Adventure 4x4',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      priceDay: 95,
      priceHour: 16,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Petrol (EcoBoost V6)',
      features: ['Removable Hardtop', 'Trail-Turn Assist', 'Apple CarPlay & Android Auto', 'Roof Rack Mount'],
      luggage: '5 Bags',
      rating: 4.96,
      tripsCount: 98,
      availableAt: 'Westside Station & Mountain Outpost'
    },
    {
      id: 'car-3',
      name: 'BMW 330i M Sport',
      category: 'Sedan',
      typeLabel: 'Executive Luxury',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
      priceDay: 110,
      priceHour: 18,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Petrol (TwinPower Turbo)',
      features: ['Harman Kardon Sound', 'Head-Up Display', 'Vernasca Leather', 'Sunroof'],
      luggage: '4 Bags',
      rating: 4.89,
      tripsCount: 215,
      availableAt: 'Airport Terminal Hub'
    },
    {
      id: 'car-4',
      name: 'Ford Mustang GT Convertible',
      category: 'Convertible',
      typeLabel: 'Open-Air Muscle',
      image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80',
      priceDay: 125,
      priceHour: 22,
      seats: 4,
      transmission: 'Automatic',
      fuel: 'Petrol (5.0L Coyote V8)',
      features: ['Power Soft-Top', 'Active Valve Exhaust', 'Brembo Brakes', 'Sport Driving Modes'],
      luggage: '2 Bags',
      rating: 4.98,
      tripsCount: 164,
      availableAt: 'Coastal Beach Hub'
    },
    {
      id: 'car-5',
      name: 'Hyundai Ioniq 5 AWD',
      category: 'Electric',
      typeLabel: 'EV Crossover',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
      priceDay: 79,
      priceHour: 13,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Electric (480 km range)',
      features: ['Ultra-Fast 800V Charging', 'V2L Power Outlet', 'Spacious Flat Floor', 'Smart Cruise'],
      luggage: '4 Bags',
      rating: 4.91,
      tripsCount: 120,
      availableAt: 'Downtown Hub & Tech Station'
    },
    {
      id: 'car-6',
      name: 'Toyota RAV4 Hybrid AWD',
      category: 'SUV',
      typeLabel: 'Hybrid Explorer',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
      priceDay: 68,
      priceHour: 11,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Hybrid (950 km range)',
      features: ['5.2 L/100km Fuel Economy', 'Spacious Cargo Trunk', 'Blind Spot Monitor', 'Adaptive Cruise'],
      luggage: '5 Bags',
      rating: 4.86,
      tripsCount: 310,
      availableAt: 'Airport & Suburban Hubs'
    },
    {
      id: 'car-7',
      name: 'Mini Cooper S Hardtop',
      category: 'Hatchback',
      typeLabel: 'Urban Go-Kart',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
      priceDay: 59,
      priceHour: 10,
      seats: 4,
      transmission: 'Automatic',
      fuel: 'Petrol (TwinPower)',
      features: ['Panoramic Moonroof', 'Harman Audio', 'Easy Street Parking', 'Sport Driving Mode'],
      luggage: '2 Bags',
      rating: 4.83,
      tripsCount: 188,
      availableAt: 'City Center Express'
    },
    {
      id: 'car-8',
      name: 'Jeep Wrangler Rubicon 4x4',
      category: 'SUV',
      typeLabel: 'Rock-Crawler 4x4',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      priceDay: 115,
      priceHour: 19,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Petrol (V6 4WD)',
      features: ['Rock-Trac 4WD', '33-inch All-Terrain Tyres', 'Removable Doors', 'Front Winch Ready'],
      luggage: '4 Bags',
      rating: 4.97,
      tripsCount: 85,
      availableAt: 'Mountain Foothills Hub'
    },
    {
      id: 'car-9',
      name: 'Porsche Macan GTS',
      category: 'SUV',
      typeLabel: 'Luxury Performance',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      priceDay: 165,
      priceHour: 28,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Petrol (Twin-Turbo V6)',
      features: ['Air Suspension', 'Sport Chrono Package', 'Bose Surround System', 'Alcantara Trim'],
      luggage: '4 Bags',
      rating: 4.99,
      tripsCount: 74,
      availableAt: 'Airport VIP Bay'
    },
    {
      id: 'car-10',
      name: 'Volkswagen Golf GTI',
      category: 'Hatchback',
      typeLabel: 'Hot Hatch',
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
      priceDay: 72,
      priceHour: 12,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Petrol (2.0L TSI)',
      features: ['Paddle Shifters', 'Sport Bucket Seats', 'Dynamic Chassis Control', 'Digital Cockpit Pro'],
      luggage: '3 Bags',
      rating: 4.88,
      tripsCount: 135,
      availableAt: 'Downtown Central'
    },
    {
      id: 'car-11',
      name: 'Polestar 2 Dual Motor',
      category: 'Electric',
      typeLabel: 'EV Fastback',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
      priceDay: 89,
      priceHour: 15,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Electric (510 km range)',
      features: ['Google Built-In OS', 'Harmonized AWD', 'Panoramic Glass Roof', 'Pixel LED Lights'],
      luggage: '4 Bags',
      rating: 4.93,
      tripsCount: 92,
      availableAt: 'Tech Corridor Hub'
    },
    {
      id: 'car-12',
      name: 'Mazda MX-5 Miata Club',
      category: 'Convertible',
      typeLabel: 'Lightweight Roadster',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
      priceDay: 82,
      priceHour: 14,
      seats: 2,
      transmission: 'Manual',
      fuel: 'Petrol (Skyactiv-G)',
      features: ['Manual 6-Speed', 'Bilstein Dampers', 'Brembo / BBS Package', 'Pure Driving Feel'],
      luggage: '1 Bag',
      rating: 4.95,
      tripsCount: 110,
      availableAt: 'Coastal Beach Hub'
    }
  ],
  upcomingTrips: JSON.parse(localStorage.getItem('freeway_upcoming_trips')) || [
    {
      id: 'TRIP-90114',
      car: 'Tesla Model 3 Long Range',
      category: 'Electric Sedan',
      dates: 'Next Friday, Oct 18 - Oct 21',
      location: 'Downtown Freedom Station',
      totalAmount: 255.00,
      deposit: 0,
      status: 'Confirmed & Key Assigned'
    }
  ],
  damageInspectionPoints: [
    {
      id: 'point-1',
      title: 'Front Bumper & Grille',
      top: '22%',
      left: '50%',
      status: 'cleared',
      badge: 'Passed',
      notes: 'No stone chips or fractures detected. Ultrasonic proximity radar calibrated.',
      photo: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'point-2',
      title: 'Left Front Fender & Wheel Rim',
      top: '36%',
      left: '25%',
      status: 'scratch',
      badge: 'Pre-existing Micro-Scratch',
      notes: '1.2cm clearcoat scuff near indicator recorded before handover. Customer is 100% not liable.',
      photo: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'point-3',
      title: 'Windshield & Wiper Blades',
      top: '42%',
      left: '50%',
      status: 'cleared',
      badge: 'Pristine Glass',
      notes: 'Zero cracks, stars, or stone pitting. Rain sensor wiper blades inspected.',
      photo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'point-4',
      title: 'Right Passenger Doors & Mirrors',
      top: '55%',
      left: '75%',
      status: 'cleared',
      badge: 'Clean Body',
      notes: 'Door weather stripping intact. Power side mirrors responsive and scratch-free.',
      photo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'point-5',
      title: 'Rear Bumper & Tailgate Sensor',
      top: '82%',
      left: '50%',
      status: 'cleared',
      badge: 'Passed',
      notes: 'Rear wide-angle camera lens clean. Reverse parking radar operational.',
      photo: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80'
    }
  ]
};

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(FreewayState.theme);
  applyRTL(FreewayState.rtl);
  highlightActiveNav();
  setupGlobalListeners();

  // Page-specific initializers
  if (document.getElementById('fleetGrid')) {
    renderFleet();
  }
  if (document.getElementById('damagePinsContainer')) {
    renderInspectionPoints();
  }
  if (document.getElementById('upcomingTripsContainer')) {
    renderUpcomingTrips();
  }
  if (document.getElementById('smartLockBtn')) {
    updateCarLockButton();
  }
});

/* ==========================================================================
   1. Theme Management (Dark / Light) with Guaranteed Text Contrast
   ========================================================================== */
function applyTheme(theme) {
  FreewayState.theme = theme;
  document.documentElement.setAttribute('data-bs-theme', theme);
  localStorage.setItem('freeway_theme', theme);

  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  if (theme === 'dark') {
    if (themeIcon) themeIcon.className = 'bi bi-moon-stars-fill text-warning me-1';
    if (themeLabel) themeLabel.textContent = 'Dark';
    document.body.classList.add('theme-dark');
  } else {
    if (themeIcon) themeIcon.className = 'bi bi-sun-fill text-warning me-1';
    if (themeLabel) themeLabel.textContent = 'Light';
    document.body.classList.remove('theme-dark');
  }
}

function toggleTheme() {
  const newTheme = FreewayState.theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  showToast(`Switched to ${newTheme.toUpperCase()} mode.`, 'info');
}

/* ==========================================================================
   2. RTL (Right-to-Left) Layout Toggle
   ========================================================================== */
function applyRTL(isRtl) {
  FreewayState.rtl = isRtl;
  localStorage.setItem('freeway_rtl', isRtl);

  const rtlStylesheet = document.getElementById('bootstrap-rtl');
  const ltrStylesheet = document.getElementById('bootstrap-ltr');
  const rtlBtn = document.getElementById('rtlToggleBtn');
  const rtlLabel = document.getElementById('rtlLabel');

  if (isRtl) {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
    if (rtlStylesheet) rtlStylesheet.removeAttribute('disabled');
    if (ltrStylesheet) ltrStylesheet.setAttribute('disabled', 'true');
    if (rtlLabel) rtlLabel.textContent = 'LTR';
    if (rtlBtn) rtlBtn.classList.add('active');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
    if (rtlStylesheet) rtlStylesheet.setAttribute('disabled', 'true');
    if (ltrStylesheet) ltrStylesheet.removeAttribute('disabled');
    if (rtlLabel) rtlLabel.textContent = 'RTL';
    if (rtlBtn) rtlBtn.classList.remove('active');
  }
}

function toggleRTL() {
  const newRtl = !FreewayState.rtl;
  applyRTL(newRtl);
  showToast(newRtl ? 'RTL Layout Enabled (Arabic/Hebrew formatting).' : 'LTR Standard Layout Enabled.', 'secondary');
}

/* ==========================================================================
   3. Highlight Active Navigation Item Based on Current Page URL
   ========================================================================== */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   4. Fleet Rendering & Category Filtering
   ========================================================================== */
let currentCategoryFilter = 'All';
let currentTransmissionFilter = 'All';
let currentSearchQuery = '';

function renderFleet() {
  const container = document.getElementById('fleetGrid');
  if (!container) return;

  const filtered = FreewayState.fleet.filter(car => {
    const matchCat = currentCategoryFilter === 'All' || car.category.toLowerCase() === currentCategoryFilter.toLowerCase();
    const matchTrans = currentTransmissionFilter === 'All' || car.transmission.toLowerCase() === currentTransmissionFilter.toLowerCase();
    const matchSearch = currentSearchQuery === '' ||
      car.name.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
      car.category.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
      car.typeLabel.toLowerCase().includes(currentSearchQuery.toLowerCase());
    return matchCat && matchTrans && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5 text-body-secondary">
        <i class="bi bi-car-front display-3 d-block mb-3 text-body-tertiary"></i>
        <h5>No vehicles found matching your criteria.</h5>
        <p class="small">Try resetting your category or search filter.</p>
        <button class="btn btn-outline-freeway mt-2" onclick="resetFleetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(car => `
    <div class="col-md-6 col-lg-4 d-flex">
      <div class="card w-100 shadow-sm border-body h-100 bg-body hover-lift">
        <div class="position-relative">
          <img src="${car.image}" class="card-img-top object-fit-cover" alt="${car.name}" style="height: 220px;">
          <span class="position-absolute top-0 start-0 m-3 badge bg-dark bg-opacity-75 text-white backdrop-blur">
            <i class="bi bi-star-fill text-warning me-1"></i>${car.rating} (${car.tripsCount} trips)
          </span>
          <span class="position-absolute top-0 end-0 m-3 badge bg-freeway">
            ${car.typeLabel}
          </span>
        </div>
        <div class="card-body d-flex flex-column text-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h5 class="card-title fw-bold mb-0 text-body">${car.name}</h5>
              <small class="text-body-secondary"><i class="bi bi-geo-alt me-1"></i>${car.availableAt}</small>
            </div>
          </div>

          <div class="row g-2 text-center my-2 text-body-secondary small border-top border-bottom py-2 border-body">
            <div class="col-4">
              <i class="bi bi-people me-1 text-primary"></i>${car.seats} Seats
            </div>
            <div class="col-4">
              <i class="bi bi-gear me-1 text-primary"></i>${car.transmission}
            </div>
            <div class="col-4">
              <i class="bi bi-fuel-pump me-1 text-primary"></i>${car.fuel.split(' ')[0]}
            </div>
          </div>

          <ul class="list-unstyled small text-body-secondary mb-3">
            ${car.features.slice(0, 3).map(f => `<li><i class="bi bi-check2-circle text-success me-1"></i>${f}</li>`).join('')}
          </ul>

          <div class="mt-auto d-flex justify-content-between align-items-center pt-2 border-top border-body">
            <div>
              <span class="h4 fw-bold text-freeway mb-0">$${car.priceDay}</span>
              <span class="text-body-secondary small">/day</span>
              <div class="text-body-secondary small">$${car.priceHour}/hr flex</div>
            </div>
            <button class="btn btn-freeway px-3" onclick="openBookingModal('${car.id}')">
              <i class="bi bi-lightning-charge me-1"></i>Book Fast
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterFleetByCategory(category, btnElement) {
  currentCategoryFilter = category;
  document.querySelectorAll('.fleet-filter-btn').forEach(b => {
    b.classList.remove('active', 'btn-freeway', 'text-white');
    b.classList.add('btn-outline-secondary');
  });
  if (btnElement) {
    btnElement.classList.remove('btn-outline-secondary');
    btnElement.classList.add('active', 'btn-freeway', 'text-white');
  }
  renderFleet();
}

function filterFleetByTransmission(trans, selectElement) {
  currentTransmissionFilter = trans;
  renderFleet();
}

function handleFleetSearch(query) {
  currentSearchQuery = query;
  renderFleet();
}

function resetFleetFilters() {
  currentCategoryFilter = 'All';
  currentTransmissionFilter = 'All';
  currentSearchQuery = '';
  const searchInput = document.getElementById('fleetSearchInput');
  if (searchInput) searchInput.value = '';
  const transSelect = document.getElementById('fleetTransSelect');
  if (transSelect) transSelect.value = 'All';
  const allBtn = document.querySelector('.fleet-filter-btn[data-category="All"]');
  if (allBtn) filterFleetByCategory('All', allBtn);
  else renderFleet();
}

/* ==========================================================================
   5. Interactive Damage Inspection Report Module
   ========================================================================== */
function renderInspectionPoints() {
  const container = document.getElementById('damagePinsContainer');
  if (!container) return;

  container.innerHTML = FreewayState.damageInspectionPoints.map((point, index) => `
    <div class="damage-pin ${point.status}"
         style="top: ${point.top}; left: ${point.left};"
         title="${point.title}: ${point.badge}"
         onclick="inspectPoint('${point.id}')">
      ${index + 1}
    </div>
  `).join('');

  // Default to point-2
  inspectPoint('point-2');
}

function inspectPoint(pointId) {
  const point = FreewayState.damageInspectionPoints.find(p => p.id === pointId);
  if (!point) return;

  const detailBox = document.getElementById('inspectionDetailBox');
  if (!detailBox) return;

  const statusBadgeClass = point.status === 'cleared' ? 'bg-success' : (point.status === 'scratch' ? 'bg-warning text-dark' : 'bg-danger');

  detailBox.innerHTML = `
    <div class="card border-body bg-body shadow-sm">
      <div class="card-header bg-body-tertiary border-body d-flex justify-content-between align-items-center">
        <h6 class="fw-bold mb-0 text-body"><i class="bi bi-shield-check me-2 text-freeway"></i>${point.title}</h6>
        <span class="badge ${statusBadgeClass}">${point.badge}</span>
      </div>
      <div class="card-body text-body">
        <div class="row g-3">
          <div class="col-md-5">
            <img src="${point.photo}" class="img-fluid rounded border border-body object-fit-cover w-100" style="height: 140px;" alt="${point.title}">
            <div class="form-text small text-body-secondary text-center mt-1">High-Res Telemetry Photo</div>
          </div>
          <div class="col-md-7">
            <label class="fw-semibold small text-body-secondary">Official Technician Walkaround Note:</label>
            <p class="small text-body bg-body-tertiary p-2 rounded border border-body">${point.notes}</p>
            
            <div class="alert alert-info py-1 px-2 small mb-2 d-flex align-items-center">
              <i class="bi bi-info-circle me-2 fs-6"></i>
              <span>Timestamp: Pre-Trip Inspection Cleared</span>
            </div>

            <button class="btn btn-sm btn-outline-secondary w-100" onclick="openNewDamageModal('${point.title}')">
              <i class="bi bi-camera-fill me-1"></i>Report Post-Trip Spot / Scratch
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function openNewDamageModal(areaTitle = 'Exterior Body') {
  const areaInput = document.getElementById('reportDamageArea');
  if (areaInput) areaInput.value = areaTitle;
  const modalEl = document.getElementById('reportDamageModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

function submitDamageReport(e) {
  e.preventDefault();
  const area = document.getElementById('reportDamageArea').value;
  const desc = document.getElementById('reportDamageDesc').value;

  const newId = `point-${FreewayState.damageInspectionPoints.length + 1}`;
  FreewayState.damageInspectionPoints.push({
    id: newId,
    title: area,
    top: '65%',
    left: '35%',
    status: 'reported',
    badge: 'Under Review',
    notes: `Customer Note: ${desc}. AI Photo verification logged.`,
    photo: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'
  });

  renderInspectionPoints();
  inspectPoint(newId);

  const modalEl = document.getElementById('reportDamageModal');
  if (modalEl) bootstrap.Modal.getInstance(modalEl).hide();
  document.getElementById('damageReportForm').reset();
  showToast('Damage spot logged and recorded on your trip report!', 'success');
}

/* ==========================================================================
   6. Smart Car Remote Telemetry Controls
   ========================================================================== */
function toggleCarLock() {
  FreewayState.activeTrip.isLocked = !FreewayState.activeTrip.isLocked;
  updateCarLockButton();

  if (FreewayState.activeTrip.isLocked) {
    showToast('Car doors secured and anti-theft immobilizer activated.', 'primary');
  } else {
    showToast('Smart keyless entry unlocked! Engine ignition enabled.', 'success');
  }
}

function updateCarLockButton() {
  const lockBtn = document.getElementById('smartLockBtn');
  const lockStatusBadge = document.getElementById('carLockBadge');
  if (!lockBtn || !lockStatusBadge) return;

  if (FreewayState.activeTrip.isLocked) {
    lockBtn.innerHTML = '<i class="bi bi-unlock-fill me-1"></i>Unlock Doors';
    lockBtn.className = 'btn btn-sm btn-success fw-bold';
    lockStatusBadge.className = 'badge bg-secondary';
    lockStatusBadge.innerHTML = '<i class="bi bi-lock-fill me-1"></i>Doors Locked';
  } else {
    lockBtn.innerHTML = '<i class="bi bi-lock-fill me-1"></i>Lock Doors';
    lockBtn.className = 'btn btn-sm btn-warning text-dark fw-bold';
    lockStatusBadge.className = 'badge bg-success';
    lockStatusBadge.innerHTML = '<i class="bi bi-unlock-fill me-1"></i>Doors Unlocked';
  }
}

function triggerCarBeep() {
  showToast('Horn honked & headlights flashed twice for 3 seconds.', 'warning');
}

/* ==========================================================================
   7. Booking Modal & Reservation Engine
   ========================================================================== */
function openBookingModal(carId) {
  const car = FreewayState.fleet.find(c => c.id === carId) || FreewayState.fleet[0];
  if (!car) return;

  const modalCarName = document.getElementById('modalBookingCarName');
  const modalCarCategory = document.getElementById('modalBookingCarCategory');
  const modalCarImg = document.getElementById('modalBookingCarImg');
  const modalPriceDay = document.getElementById('modalBookingPriceDay');
  const hiddenCarId = document.getElementById('bookingCarIdHidden');

  if (modalCarName) modalCarName.textContent = car.name;
  if (modalCarCategory) modalCarCategory.textContent = `${car.category} • ${car.transmission}`;
  if (modalCarImg) modalCarImg.src = car.image;
  if (modalPriceDay) modalPriceDay.textContent = `$${car.priceDay}`;
  if (hiddenCarId) hiddenCarId.value = car.id;

  calculateBookingTotal();

  const modalEl = document.getElementById('bookingModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

function calculateBookingTotal() {
  const daysSelect = document.getElementById('bookingDaysSelect');
  const days = daysSelect ? parseInt(daysSelect.value) || 1 : 1;
  const carIdInput = document.getElementById('bookingCarIdHidden');
  const carId = carIdInput ? carIdInput.value : 'car-1';
  const car = FreewayState.fleet.find(c => c.id === carId) || FreewayState.fleet[0];

  const insCheck = document.getElementById('bookingInsuranceCheck');
  const insuranceRate = (insCheck && insCheck.checked) ? 15 * days : 0;
  const subtotal = (car.priceDay * days) + insuranceRate;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = (subtotal + tax).toFixed(2);

  const sumDays = document.getElementById('modalSummaryDays');
  const sumSubtotal = document.getElementById('modalSummarySubtotal');
  const sumIns = document.getElementById('modalSummaryInsurance');
  const sumTax = document.getElementById('modalSummaryTax');
  const sumTotal = document.getElementById('modalSummaryTotal');

  if (sumDays) sumDays.textContent = `${days} Day(s)`;
  if (sumSubtotal) sumSubtotal.textContent = `$${(car.priceDay * days).toFixed(2)}`;
  if (sumIns) sumIns.textContent = insuranceRate > 0 ? `$${insuranceRate.toFixed(2)}` : '$0.00 (Standard)';
  if (sumTax) sumTax.textContent = `$${tax.toFixed(2)}`;
  if (sumTotal) sumTotal.textContent = `$${total}`;
}

function confirmReservation(e) {
  e.preventDefault();
  const carId = document.getElementById('bookingCarIdHidden').value;
  const car = FreewayState.fleet.find(c => c.id === carId) || FreewayState.fleet[0];
  const days = document.getElementById('bookingDaysSelect').value;
  const pickup = document.getElementById('bookingPickupStation').value;
  const total = document.getElementById('modalSummaryTotal').textContent;

  const newBooking = {
    id: `TRIP-${Math.floor(10000 + Math.random() * 90000)}`,
    car: car.name,
    category: car.category,
    dates: `Next ${days} Day(s)`,
    location: pickup,
    totalAmount: parseFloat(total.replace('$', '')),
    deposit: 0,
    status: 'Confirmed & Key Assigned'
  };

  FreewayState.upcomingTrips.unshift(newBooking);
  localStorage.setItem('freeway_upcoming_trips', JSON.stringify(FreewayState.upcomingTrips));

  const modalEl = document.getElementById('bookingModal');
  if (modalEl) bootstrap.Modal.getInstance(modalEl).hide();

  showToast(`Booking ${newBooking.id} Confirmed! Instant smart key ready in your Dashboard.`, 'success');

  // If on another page, redirect to dashboard.html after 1.5 seconds
  if (!window.location.pathname.includes('dashboard.html')) {
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  } else {
    renderUpcomingTrips();
  }
}

function renderUpcomingTrips() {
  const container = document.getElementById('upcomingTripsContainer');
  if (!container) return;

  container.innerHTML = FreewayState.upcomingTrips.map(trip => `
    <div class="col-12 mb-3">
      <div class="card border-body bg-body shadow-sm">
        <div class="card-body d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="badge bg-success">${trip.status}</span>
              <span class="text-body-secondary small">Booking Ref: #${trip.id}</span>
            </div>
            <h5 class="fw-bold mb-0 text-body">${trip.car}</h5>
            <small class="text-body-secondary"><i class="bi bi-geo-alt me-1"></i>${trip.location} | <i class="bi bi-calendar3 me-1"></i>${trip.dates}</small>
          </div>
          <div class="text-end">
            <div class="h5 fw-bold text-freeway mb-1">$${trip.totalAmount.toFixed(2)}</div>
            <div class="small text-success"><i class="bi bi-shield-check me-1"></i>Zero Deposit Guaranteed</div>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-danger" onclick="cancelUpcomingTrip('${trip.id}')">Cancel</button>
            <button class="btn btn-sm btn-freeway" onclick="showToast('Digital key is active and ready for vehicle unlock!', 'info')">
              <i class="bi bi-phone me-1"></i>Digital Key
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function cancelUpcomingTrip(tripId) {
  FreewayState.upcomingTrips = FreewayState.upcomingTrips.filter(t => t.id !== tripId);
  localStorage.setItem('freeway_upcoming_trips', JSON.stringify(FreewayState.upcomingTrips));
  renderUpcomingTrips();
  showToast('Booking cancelled with 100% refund processed immediately.', 'warning');
}

/* ==========================================================================
   8. Invoices & Billing Modal
   ========================================================================== */
function openInvoiceModal(invoiceId) {
  const invoiceData = {
    id: invoiceId || 'INV-2026-0927',
    date: 'Sep 27, 2026',
    customer: FreewayState.currentUser.name,
    license: FreewayState.currentUser.licenseNo,
    car: 'BMW 330i M Sport (Plate: 7XYZ892)',
    tripPeriod: 'Sep 24, 2026, 09:00 AM to Sep 27, 2026, 06:00 PM',
    distance: '482 km (Free 600 km allowance included)',
    items: [
      { desc: 'Self-Drive Vehicle Rental (3 Days @ $110.00/day)', amount: 330.00 },
      { desc: 'Freedom Shield Zero-Liability Cover ($15/day)', amount: 45.00 },
      { desc: 'Airport Hub Pickup Service', amount: 12.00 },
      { desc: 'Fuel Top-up Credit Refund (Returned +15% more fuel)', amount: -48.00 },
      { desc: 'State Clean Air Tax & Highway Toll Surcharge', amount: 25.50 }
    ],
    total: 364.50,
    paymentMethod: 'Mastercard ending in 4921',
    depositRefund: '100% Zero Deposit Held'
  };

  const idEl = document.getElementById('invModalId');
  const dateEl = document.getElementById('invModalDate');
  const custEl = document.getElementById('invModalCustomer');
  const licEl = document.getElementById('invModalLicense');
  const carEl = document.getElementById('invModalCar');
  const periodEl = document.getElementById('invModalPeriod');
  const tbody = document.getElementById('invModalTableBody');
  const totalEl = document.getElementById('invModalTotal');
  const payEl = document.getElementById('invModalPaymentMethod');

  if (idEl) idEl.textContent = invoiceData.id;
  if (dateEl) dateEl.textContent = invoiceData.date;
  if (custEl) custEl.textContent = invoiceData.customer;
  if (licEl) licEl.textContent = invoiceData.license;
  if (carEl) carEl.textContent = invoiceData.car;
  if (periodEl) periodEl.textContent = invoiceData.tripPeriod;

  if (tbody) {
    tbody.innerHTML = invoiceData.items.map(item => `
      <tr>
        <td class="text-body">${item.desc}</td>
        <td class="text-end text-body ${item.amount < 0 ? 'text-success fw-bold' : ''}">
          ${item.amount < 0 ? '-' : ''}$${Math.abs(item.amount).toFixed(2)}
        </td>
      </tr>
    `).join('');
  }

  if (totalEl) totalEl.textContent = `$${invoiceData.total.toFixed(2)}`;
  if (payEl) payEl.textContent = invoiceData.paymentMethod;

  const modalEl = document.getElementById('invoiceModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

/* ==========================================================================
   9. Instant Booking Quick Bar on Home Page
   ========================================================================== */
function executeQuickSearch(e) {
  e.preventDefault();
  const cat = document.getElementById('quickCarCategory').value;
  // Redirect to fleet.html with filter param
  window.location.href = `fleet.html?category=${encodeURIComponent(cat)}`;
}

// Check URL params on fleet page load
if (window.location.pathname.includes('fleet.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category');
  if (catParam && catParam !== 'All') {
    window.addEventListener('DOMContentLoaded', () => {
      const targetBtn = document.querySelector(`.fleet-filter-btn[data-category="${catParam}"]`);
      if (targetBtn) {
        filterFleetByCategory(catParam, targetBtn);
      }
    });
  }
}

/* ==========================================================================
   10. Toast Notification Utility
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    container.style.zIndex = '2000';
    document.body.appendChild(container);
  }

  const toastId = 'toast-' + Math.random().toString(36).substring(2, 9);
  const bgClass = type === 'success' ? 'bg-success text-white' :
                 (type === 'warning' ? 'bg-warning text-dark' :
                 (type === 'danger' ? 'bg-danger text-white' : 'bg-dark text-white'));

  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body fw-semibold">
          <i class="bi bi-bell-fill me-2"></i>${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', toastHtml);
  const toastElement = document.getElementById(toastId);
  const bsToast = new bootstrap.Toast(toastElement, { delay: 4000 });
  bsToast.show();

  toastElement.addEventListener('hidden.bs.toast', () => {
    toastElement.remove();
  });
}

/* ==========================================================================
   11. Global Event Listeners Setup
   ========================================================================== */
function setupGlobalListeners() {
  const themeToggle = document.getElementById('themeToggleBtn');
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  const rtlToggle = document.getElementById('rtlToggleBtn');
  if (rtlToggle) rtlToggle.addEventListener('click', toggleRTL);

  const quickForm = document.getElementById('quickBookingForm');
  if (quickForm) quickForm.addEventListener('submit', executeQuickSearch);

  const daysSelect = document.getElementById('bookingDaysSelect');
  if (daysSelect) daysSelect.addEventListener('change', calculateBookingTotal);

  const insCheck = document.getElementById('bookingInsuranceCheck');
  if (insCheck) insCheck.addEventListener('change', calculateBookingTotal);

  const confirmForm = document.getElementById('modalReservationForm');
  if (confirmForm) confirmForm.addEventListener('submit', confirmReservation);

  const dmgForm = document.getElementById('damageReportForm');
  if (dmgForm) dmgForm.addEventListener('submit', submitDamageReport);
}