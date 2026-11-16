import React, { useEffect, useState } from 'react';

interface Salon {
  name: string;
  area: string;
  rating: string;
  price: string;
  emoji: string;
}

interface SalonRegistration {
  salonName: string;
  ownerName: string;
  phone: string;
  whatsapp: string;
  address: string;
  area: string;
  services: string[];
  prices: string;
  openingTime: string;
  closingTime: string;
  status: string;
}

const salons: Salon[] = [
  {
    name: 'Royal Hair Studio',
    area: 'Gomti Nagar, Lucknow',
    rating: '4.8',
    price: '₹199',
    emoji: '💈'
  },
  {
    name: 'Style & Shine Salon',
    area: 'Hazratganj, Lucknow',
    rating: '4.7',
    price: '₹249',
    emoji: '💇'
  },
  {
    name: 'Urban Beauty Salon',
    area: 'Indira Nagar, Lucknow',
    rating: '4.9',
    price: '₹299',
    emoji: '💆'
  }
];

const services = [
  { emoji: '💇', name: 'Haircut' },
  { emoji: '🧔', name: 'Beard' },
  { emoji: '💆', name: 'Facial' },
  { emoji: '✨', name: 'Hair Spa' },
  { emoji: '💅', name: 'Manicure' },
  { emoji: '💄', name: 'Makeup' }
];

function App() {
  const [search, setSearch] = useState('');

  const [selectedSalon, setSelectedSalon] =
    useState<Salon | null>(null);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

  const [ownerOpen, setOwnerOpen] = useState(false);
  const [ownerDone, setOwnerDone] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [registrations, setRegistrations] =
    useState<SalonRegistration[]>([]);

  const [ownerForm, setOwnerForm] = useState({
    salonName: '',
    ownerName: '',
    phone: '',
    whatsapp: '',
    address: '',
    area: '',
    services: [] as string[],
    prices: '',
    openingTime: '',
    closingTime: ''
  });

  // Load saved registrations
  useEffect(() => {
    try {
      const saved = localStorage.getItem('salonRegistrations');

      if (saved) {
        setRegistrations(JSON.parse(saved));
      }
    } catch {
      console.error('Registration data could not be loaded.');
    }
  }, []);

  const filteredSalons = salons.filter((salon) => {
    const value = search.toLowerCase();

    return (
      salon.name.toLowerCase().includes(value) ||
      salon.area.toLowerCase().includes(value)
    );
  });

  const closeBooking = () => {
    setBookingOpen(false);
    setBookingDone(false);
    setCustomerName('');
    setPhone('');
    setDate('');
    setTime('');
  };

  // Customer Booking
  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert('कृपया सही 10 अंकों का मोबाइल नंबर डालें।');
      return;
    }

    setBookingDone(true);
  };

  // Owner Form Input
  const handleOwnerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setOwnerForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Services Selection
  const toggleService = (service: string) => {
    setOwnerForm(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  // Owner Registration
  const handleOwnerSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(ownerForm.phone)) {
      alert('सही 10 अंकों का मोबाइल नंबर डालें।');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(ownerForm.whatsapp)) {
      alert('सही WhatsApp नंबर डालें।');
      return;
    }

    if (ownerForm.services.length === 0) {
      alert('कम से कम एक Service चुनें।');
      return;
    }

    const newRegistration: SalonRegistration = {
      ...ownerForm,
      status: 'Pending Approval'
    };

    try {
      const updated = [...registrations, newRegistration];

      localStorage.setItem(
        'salonRegistrations',
        JSON.stringify(updated)
      );

      setRegistrations(updated);
      setOwnerDone(true);

    } catch {
      alert('जानकारी सेव नहीं हो पाई। कृपया दोबारा कोशिश करें।');
    }
  };

  const closeOwner = () => {
    setOwnerOpen(false);
    setOwnerDone(false);

    setOwnerForm({
      salonName: '',
      ownerName: '',
      phone: '',
      whatsapp: '',
      address: '',
      area: '',
      services: [],
      prices: '',
      openingTime: '',
      closingTime: ''
    });
  };

  return (
    <div className="app">

      {/* NAVBAR */}

      <header className="navbar">

        <h2>✂️ SalonBook</h2>

        <nav>
          <a href="#home">Home</a>
          <a href="#salons">Explore Salons</a>
          <a href="#services">Services</a>
        </nav>

        <button
          className="owner-btn"
          onClick={() => setOwnerOpen(true)}
        >
          Register Salon
        </button>

      </header>


      {/* HERO */}

      <section className="hero" id="home">

        <div className="hero-content">

          <p className="tagline">
            YOUR BEAUTY, YOUR STYLE
          </p>

          <h1>
            Find Your Perfect
            <br />
            <span>Salon Near You</span>
          </h1>

          <p>
            Discover the best salons in Lucknow.
            Compare prices, read reviews and book
            your appointment easily.
          </p>

          <div className="search-box">

            <input
              type="text"
              placeholder="Enter your area or salon name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={() =>
                document.getElementById('salons')?.scrollIntoView({
                  behavior: 'smooth'
                })
              }
            >
              Search Salon
            </button>

          </div>

        </div>

      </section>


      {/* SERVICES */}

      <section className="services" id="services">

        <h2>Explore Services</h2>

        <div className="service-grid">

          {services.map(service => (

            <div className="service-card" key={service.name}>

              <p>{service.emoji}</p>

              <span>{service.name}</span>

            </div>

          ))}

        </div>

      </section>


      {/* SALON LIST */}

      <section className="salons" id="salons">

        <h2>Popular Salons in Lucknow</h2>

        <p>Find your favourite salon and book today.</p>

        <div className="salon-grid">

          {filteredSalons.length > 0 ? (

            filteredSalons.map((salon, index) => (

              <div className="salon-card" key={index}>

                <div className="salon-image">
                  {salon.emoji}
                </div>

                <div className="salon-info">

                  <h3>{salon.name}</h3>

                  <p>📍 {salon.area}</p>

                  <p>⭐ {salon.rating} Rating</p>

                  <h4>Starting {salon.price}</h4>

                  <button
                    onClick={() => setSelectedSalon(salon)}
                  >
                    View Salon
                  </button>

                </div>

              </div>

            ))

          ) : (

            <p>कोई Salon नहीं मिला। दूसरा Area खोजें।</p>

          )}

        </div>

      </section>


      {/* SALON OWNER SECTION */}

      <section className="owner-section" id="owner">

        <h2>Are You a Salon Owner?</h2>

        <p>
          Register your salon and get more customers
          through our platform.
        </p>

        <button
          onClick={() => setOwnerOpen(true)}
        >
          Register Your Salon
        </button>

      </section>


      {/* FOOTER */}

      <footer>

        <h2>✂️ SalonBook</h2>

        <p>Discover. Book. Look Beautiful.</p>

        <p>© 2026 SalonBook. All Rights Reserved.</p>

      </footer>


      {/* SALON DETAILS */}

      {selectedSalon && !bookingOpen && (

        <div
          style={overlayStyle}
          onClick={() => setSelectedSalon(null)}
        >

          <div
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
          >

            <div style={{ fontSize: '60px' }}>
              {selectedSalon.emoji}
            </div>

            <h2>{selectedSalon.name}</h2>

            <p>📍 {selectedSalon.area}</p>

            <p>⭐ {selectedSalon.rating} Rating</p>

            <h3 style={{ color: '#d65378' }}>
              Starting {selectedSalon.price}
            </h3>

            <button
              style={buttonStyle}
              onClick={() => setBookingOpen(true)}
            >
              📅 Book Appointment
            </button>

            <button
              style={{ ...buttonStyle, background: '#555' }}
              onClick={() => setSelectedSalon(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* BOOKING FORM */}

      {selectedSalon && bookingOpen && (

        <div style={overlayStyle}>

          <div
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
          >

            {!bookingDone ? (

              <>

                <h2>📅 Book Appointment</h2>

                <h3>{selectedSalon.name}</h3>

                <p>{selectedSalon.area}</p>

                <form onSubmit={handleBooking}>

                  <input
                    style={inputStyle}
                    placeholder="आपका पूरा नाम"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />

                  <input
                    style={inputStyle}
                    type="tel"
                    placeholder="10 अंकों का मोबाइल नंबर"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                    }
                    maxLength={10}
                    required
                  />

                  <label>Booking Date</label>

                  <input
                    style={inputStyle}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />

                  <label>Booking Time</label>

                  <input
                    style={inputStyle}
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />

                  <button type="submit" style={buttonStyle}>
                    Confirm Booking
                  </button>

                </form>

                <button
                  style={{ ...buttonStyle, background: '#555' }}
                  onClick={closeBooking}
                >
                  Cancel
                </button>

              </>

            ) : (

              <>

                <div style={{ fontSize: '55px' }}>✅</div>

                <h2>Booking Details तैयार हैं!</h2>

                <p>ग्राहक: {customerName}</p>

                <p>मोबाइल: {phone}</p>

                <p>Salon: {selectedSalon.name}</p>

                <p>तारीख: {date}</p>

                <p>समय: {time}</p>

                <p>
                  यह Demo Confirmation है।
                  Booking Database में सेव नहीं हुई है।
                </p>

                <button
                  style={buttonStyle}
                  onClick={() => {
                    closeBooking();
                    setSelectedSalon(null);
                  }}
                >
                  Done
                </button>

              </>

            )}

          </div>

        </div>

      )}


      {/* SALON OWNER REGISTRATION */}

      {ownerOpen && (

        <div
          style={overlayStyle}
          onClick={closeOwner}
        >

          <div
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
          >

            {!ownerDone ? (

              <>

                <h2>🏪 Register Your Salon</h2>

                <p>अपना Salon हमारी वेबसाइट पर रजिस्टर करें।</p>

                <form onSubmit={handleOwnerSubmit}>

                  <input
                    style={inputStyle}
                    name="salonName"
                    placeholder="Salon का नाम"
                    value={ownerForm.salonName}
                    onChange={handleOwnerChange}
                    required
                  />

                  <input
                    style={inputStyle}
                    name="ownerName"
                    placeholder="मालिक का पूरा नाम"
                    value={ownerForm.ownerName}
                    onChange={handleOwnerChange}
                    required
                  />

                  <input
                    style={inputStyle}
                    name="phone"
                    type="tel"
                    placeholder="मोबाइल नंबर"
                    value={ownerForm.phone}
                    onChange={(e) =>
                      setOwnerForm(prev => ({
                        ...prev,
                        phone: e.target.value.replace(/\D/g, '').slice(0, 10)
                      }))
                    }
                    required
                  />

                  <input
                    style={inputStyle}
                    name="whatsapp"
                    type="tel"
                    placeholder="WhatsApp नंबर"
                    value={ownerForm.whatsapp}
                    onChange={(e) =>
                      setOwnerForm(prev => ({
                        ...prev,
                        whatsapp: e.target.value.replace(/\D/g, '').slice(0, 10)
                      }))
                    }
                    required
                  />

                  <textarea
                    style={inputStyle}
                    name="address"
                    placeholder="Salon का पूरा पता"
                    value={ownerForm.address}
                    onChange={handleOwnerChange}
                    required
                  />

                  <input
                    style={inputStyle}
                    name="area"
                    placeholder="Lucknow का Area"
                    value={ownerForm.area}
                    onChange={handleOwnerChange}
                    required
                  />

                  <h3>अपनी Services चुनें</h3>

                  {services.map(service => (

                    <label
                      key={service.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '7px',
                        textAlign: 'left'
                      }}
                    >

                      <input
                        type="checkbox"
                        checked={ownerForm.services.includes(service.name)}
                        onChange={() => toggleService(service.name)}
                      />

                      {service.emoji} {service.name}

                    </label>

                  ))}

                  <textarea
                    style={inputStyle}
                    name="prices"
                    placeholder="Services की कीमतें लिखें (जैसे Haircut ₹199)"
                    value={ownerForm.prices}
                    onChange={handleOwnerChange}
                    required
                  />

                  <label>Salon खुलने का समय</label>

                  <input
                    style={inputStyle}
                    type="time"
                    value={ownerForm.openingTime}
                    onChange={(e) =>
                      setOwnerForm(prev => ({
                        ...prev,
                        openingTime: e.target.value
                      }))
                    }
                    required
                  />

                  <label>Salon बंद होने का समय</label>

                  <input
                    style={inputStyle}
                    type="time"
                    value={ownerForm.closingTime}
                    onChange={(e) =>
                      setOwnerForm(prev => ({
                        ...prev,
                        closingTime: e.target.value
                      }))
                    }
                    required
                  />

                  <button
                    type="submit"
                    style={buttonStyle}
                  >
                    Submit Registration
                  </button>

                </form>

                <button
                  style={{ ...buttonStyle, background: '#555' }}
                  onClick={closeOwner}
                >
                  Cancel
                </button>

              </>

            ) : (

              <>

                <div style={{ fontSize: '55px' }}>✅</div>

                <h2>Registration सफल हुआ!</h2>

                <p>
                  Salon: {ownerForm.salonName}
                </p>

                <p>
                  मालिक: {ownerForm.ownerName}
                </p>

                <p>
                  आपकी Registration जानकारी इस डिवाइस में सेव हुई है।
                </p>

                <h3 style={{ color: '#d65378' }}>
                  Status: Pending Approval
                </h3>

                <p>
                  यह अभी Demo Registration है।
                  Admin Approval और Online Database अभी सक्रिय नहीं हैं।
                </p>

                <button
                  style={buttonStyle}
                  onClick={closeOwner}
                >
                  Done
                </button>

              </>

            )}

          </div>

        </div>

      )}

    </div>
  );
}


// STYLES

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '15px'
};

const modalStyle: React.CSSProperties = {
  background: 'white',
  padding: '25px',
  borderRadius: '18px',
  width: '100%',
  maxWidth: '400px',
  maxHeight: '85vh',
  overflowY: 'auto',
  textAlign: 'center',
  color: '#333'
};

const buttonStyle: React.CSSProperties = {
  background: '#d65378',
  color: 'white',
  border: 'none',
  padding: '12px 22px',
  borderRadius: '8px',
  cursor: 'pointer',
  marginTop: '12px',
  width: '100%'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px',
  margin: '10px 0',
  border: '1px solid #ddd',
  borderRadius: '8px',
  fontSize: '15px'
};

export default App;
