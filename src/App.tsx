import React, { useState } from 'react';

interface Salon {
  name: string;
  area: string;
  rating: string;
  price: string;
  emoji: string;
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

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

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

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert('कृपया सही 10 अंकों का मोबाइल नंबर डालें।');
      return;
    }

    setBookingDone(true);
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

        <a href="#owner">
          <button className="owner-btn">
            Register Salon
          </button>
        </a>
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
          {services.map((service) => (
            <div className="service-card" key={service.name}>
              <p>{service.emoji}</p>
              <span>{service.name}</span>
            </div>
          ))}
        </div>
      </section>


      {/* SALONS */}

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

                  <button onClick={() => setSelectedSalon(salon)}>
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


      {/* OWNER */}

      <section className="owner-section" id="owner">
        <h2>Are You a Salon Owner?</h2>

        <p>
          Register your salon and get more customers
          through our platform.
        </p>

        <button
          onClick={() => alert('Salon Registration जल्द शुरू होगा।')}
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

        <div style={overlayStyle} onClick={() => setSelectedSalon(null)}>

          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>

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

            <br />

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
                    type="text"
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

                  <button
                    type="submit"
                    style={buttonStyle}
                  >
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
                  यह अभी केवल Demo Confirmation है।
                  आपकी Booking Database में सेव नहीं हुई है।
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

    </div>
  );
}


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
