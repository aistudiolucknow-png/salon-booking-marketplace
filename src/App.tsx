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

  const filteredSalons = salons.filter((salon) => {
    const value = search.toLowerCase();

    return (
      salon.name.toLowerCase().includes(value) ||
      salon.area.toLowerCase().includes(value)
    );
  });

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


      {/* HERO SECTION */}

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

            <div
              className="service-card"
              key={service.name}
            >
              <p>{service.emoji}</p>
              <span>{service.name}</span>
            </div>

          ))}

        </div>

      </section>


      {/* SALON LIST */}

      <section className="salons" id="salons">

        <h2>Popular Salons in Lucknow</h2>

        <p>
          Find your favourite salon and book today.
        </p>

        <div className="salon-grid">

          {filteredSalons.length > 0 ? (

            filteredSalons.map((salon, index) => (

              <div
                className="salon-card"
                key={index}
              >

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

            <p>
              कोई Salon नहीं मिला। दूसरा नाम या Area खोजें।
            </p>

          )}

        </div>

      </section>


      {/* SALON OWNER */}

      <section className="owner-section" id="owner">

        <h2>Are You a Salon Owner?</h2>

        <p>
          Register your salon and get more customers
          through our platform.
        </p>

        <button
          onClick={() =>
            alert('Salon Registration जल्द शुरू होगा।')
          }
        >
          Register Your Salon
        </button>

      </section>


      {/* FOOTER */}

      <footer>

        <h2>✂️ SalonBook</h2>

        <p>Discover. Book. Look Beautiful.</p>

        <p>
          © 2026 SalonBook. All Rights Reserved.
        </p>

      </footer>


      {/* SALON DETAILS POPUP */}

      {selectedSalon && (

        <div
          onClick={() => setSelectedSalon(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              padding: '30px',
              borderRadius: '18px',
              width: '100%',
              maxWidth: '400px',
              textAlign: 'center',
              color: '#333'
            }}
          >

            <div style={{ fontSize: '65px' }}>
              {selectedSalon.emoji}
            </div>

            <h2>{selectedSalon.name}</h2>

            <p>📍 {selectedSalon.area}</p>

            <p>⭐ {selectedSalon.rating} Rating</p>

            <h3 style={{ color: '#d65378' }}>
              Starting {selectedSalon.price}
            </h3>

            <p>
              Salon की जानकारी देखने के लिए धन्यवाद।
            </p>

            <button
              onClick={() => setSelectedSalon(null)}
              style={{
                background: '#d65378',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '15px'
              }}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;
