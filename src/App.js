import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SelectionForm from './components/select';
import PaymentForm from './components/payment';
import ReviewCard from './components/review';
import CustomerList from './components/manage';
import Dashboard from './components/dashboard';
import ThreeRoom from './components/room';
import LoginForm from './components/login';
import SignupForm from './components/signup';
import ForgotPasswordForm from './components/forget';
import EgyptTripPlan from './components/recommendations';
import BookingForm from './components/booking';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      {/* Navbar */}
      <nav style={{
        backgroundColor: '#1a1a1a',
        padding: '1rem 2rem',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      }}>
        <h2 style={{ margin: 0 }}>🌍 I Museum</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/signup')} style={buttonStyle}>Start</button>
         
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{
        flex: 1,
        padding: '5rem 2rem',
        textAlign: 'center',
        background: 'url("img5") center/cover no-repeat',
        color: '#fff',
      }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Discover Timeless Wonders</h1>
        <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto', textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }}>
          Journey through culture, history, and art. Plan your visit to the I Museum — a destination crafted for curious tourists from around the world.
        </p>
        <video autoPlay loop muted playsInline controls style={{ width: '90%', maxWidth: '800px', marginTop: '2rem', borderRadius: '12px', boxShadow: '0 6px 18px rgba(0,0,0,0.5)' }}>
          <source src="video.mp4" type="video/mp4"  />
        </video>
      </main>

      {/* Feature Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#f9f9f9', color: '#222', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.4rem', marginBottom: '2rem', color: '#2c3e50' }}>Must-See Exhibits</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
          {[{
            img: 'img1.jpg',
            title: 'Ancient Wonders',
            text: 'Artifacts from early civilizations that shaped humanity.',
          }, {
            img: 'img2.jpg',
            title: 'Cultural Icons',
            text: 'Discover art that changed the world.',
          }, {
            img: 'img3.jpg',
            title: 'Interactive Journey',
            text: 'Engage with immersive digital installations.',
          }].map((card, i) => (
            <div key={i} style={cardStyle}>
              <img src={card.img} alt={card.title} style={imageStyle} />
              <h3 style={{ marginTop: '1rem', color: '#2c3e50' }}>{card.title}</h3>
              <p style={{ color: '#555' }}>{card.text}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '3rem', maxWidth: '800px', marginInline: 'auto', color: '#333', fontSize: '1.1rem', lineHeight: '1.7' }}>
          <img src="img6.png" alt="Gallery" style={{ width: '100%', borderRadius: '12px', marginBottom: '2rem' }} />
          <p>Behold rare manuscripts and ancient scrolls in our archival gallery, digitally preserved and interactively rendered for educational viewing.</p>
     
        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#fff', textAlign: 'center', color: '#333' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Why Visit I Museum?</h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Located at the intersection of heritage and innovation, I Museum offers curated tours, multilingual guides, and an unforgettable cultural experience for international tourists.
        </p>
        <p style={{ fontSize: '1rem', maxWidth: '700px', margin: '1rem auto' }}>
          From ancient manuscripts to futuristic tech displays, every corner of our museum is designed to inspire, educate, and amaze visitors of all ages. Live performances and 3D reconstructions make your visit more interactive than ever.
        </p>
        <img src="img5.jpg" alt="Museum Interior" style={{ width: '100%', maxWidth: '700px', borderRadius: '10px', margin: '2rem 0' }} />
        <p style={{ fontSize: '1rem', maxWidth: '700px', margin: '1rem auto', color: '#555' }}>
          🌐 Stay connected with our complimentary Wi-Fi, and share your experiences instantly.
        </p>
        <p style={{ fontSize: '1rem', maxWidth: '700px', margin: '1rem auto', color: '#555' }}>
          💬 Don’t miss our live translation booths where you can chat with guides in real time.
        </p>
      </section>

      {/* Visitor Tips */}
      <section style={{ padding: '3rem 2rem', backgroundColor: '#eef2f3', textAlign: 'center', color: '#222' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Visitor Tips</h2>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '1rem', maxWidth: '700px', margin: '0 auto', textAlign: 'left' }}>
          <li>🕒 Opening Hours: 10 AM - 6 PM, Tuesday to Sunday</li>
          <li>🎧 Audio Guides Available in 7 Languages</li>
          <li>🍽 On-site café with regional and international cuisine</li>
          <li>📸 Photography allowed (no flash)</li>
          <li>🧑‍🏫 Guided tours available daily</li>
          <li>🪙 Discounts for students and seniors</li>
          <li>🛍 Visit our gift shop for unique souvenirs and exclusive merchandise</li>
          <li>🚻 Clean and accessible restrooms throughout the premises</li>
        </ul>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1a1a1a', color: 'white', textAlign: 'center', padding: '2rem 1rem' }}>
        <p style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>📍 100 Museum Ave, Cultural City, World</p>
        <p style={{ margin: '0.5rem 0' }}>📧 <a href="mailto:info@imuseum.org" style={{ color: '#ecf0f1' }}>info@imuseum.org</a> | ☎️ +1 (555) 123-4567</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#aaa' }}>© 2025 I Museum. Explore. Experience. Enlighten.</p>
      </footer>
    </div>
  );
}

const buttonStyle = {
  padding: '0.7rem 1.5rem',
  fontSize: '1rem',
  backgroundColor: '#c0392b',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background 0.3s',
};

const cardStyle = {
  width: '380px',
  padding: '1.5rem',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 6px 14px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const imageStyle = {
  width: '100%',
  height: '520px',
  objectFit: 'cover',
  borderRadius: '10px',
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select" element={<SelectionForm />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/review" element={<ReviewCard />} />
        <Route path="/manage" element={<CustomerList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/room" element={<ThreeRoom />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forget" element={<ForgotPasswordForm />} />
      <Route path="/recommendations" element={<EgyptTripPlan />} />
        <Route path="/Booking" element={<BookingForm />} />




      </Routes>
    </Router>
  );
}

export default App;
