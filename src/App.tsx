import React from 'react';

const salons = [
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

function App() {
  return (
    <div className="app">

      <header className="navbar">
        <h2>✂️ Salon<span>Book</span></h2>
        <nav>
          <a href="#home">Home</a>
          <a href="#salons">Explore Salons</a>
          <a href="#services">Services</a>
        </nav>
        <button className="owner-btn">
          Register Salon
        </button>
      </header>

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
            />
            <button>Search Salon</button>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <h2>Explore Services</h2>

        <div className="service-grid">
          <div>💇<p>Haircut</p></div>
          <div>🧔<p>Beard</p></div>
          <div>💆<p>Facial</p></div>
          <div>✨<p>Hair Spa</p></div>
          <div>💅<p>Manicure</p></div>
          <div>💄<p>Makeup</p></div>
        </div>
      </section>

      <section className="salons" id="salons">
        <h2>Popular Salons in Lucknow</h2>
        <p>Find your favourite salon and book today.</p>

        <div className="salon-grid">
          {salons.map((salon, index) => (
            <div className="salon-card" key={index}>
              <div className="salon-image">
                {salon.emoji}
              </div>

              <div className="salon-info">
                <h3>{salon.name}</h3>
                <p>📍 {salon.area}</p>
                <p>⭐ {salon.rating} Rating</p>
                <h4>Starting {salon.price}</h4>

                <button>View Salon</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="owner-section">
        <h2>Are You a Salon Owner?</h2>
        <p>
          Register your salon and get more customers
          through our platform.
        </p>
        <button>Register Your Salon</button>
      </section>

      <footer>
        <h2>✂️ SalonBook</h2>
        <p>Discover. Book. Look Beautiful.</p>
        <p>© 2026 SalonBook. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default App;
