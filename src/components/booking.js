import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    alert('Booking submitted successfully!');
    navigate('/'); // go to home
  };

  return (
    <div style={styles.wrapper}>
      <style>
        {`
          input, button {
            transition: all 0.3s ease;
          }
          input:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
            outline: none;
          }
          button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
      <div style={styles.container}>
        <h2 style={styles.title}>Book Your Visit</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <div style={styles.row}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={{ ...styles.input, width: '48%' }}
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              style={{ ...styles.input, width: '48%' }}
              required
            />
          </div>
          <input
            type="number"
            name="guests"
            min="1"
            max="10"
            value={formData.guests}
            onChange={handleChange}
            style={styles.input}
            placeholder="Number of Guests"
            required
          />
          <button type="submit" style={styles.button}>
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

// Internal styles
const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#f9f9f9',
  },
  container: {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '4%',
  },
};

export default BookingForm;
