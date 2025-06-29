// src/components/SelectionForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { color } from 'three/src/nodes/TSL.js';

const SelectionForm = ({ onStart }) => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [museum, setMuseum] = useState('');
  const [section, setSection] = useState('');


  const navigate = useNavigate();

  const handleSelect = () => {
    navigate('/payment'); // assuming /payment route shows PaymentForm
  };



  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Select</h2>
        <p style={styles.subtitle}>Choose your preferences to continue</p>

        <label style={styles.label}>Country</label>
        <select style={styles.select} value={country} onChange={e => setCountry(e.target.value)}>
          <option value="">Select Country</option>
          <option value="Egypt">Egypt</option>
        </select>

        <label style={styles.label}>City</label>
        <select style={styles.select} value={city} onChange={e => setCity(e.target.value)}>
          <option value="">Select City</option>
          <option value="Cairo">Cairo</option>
        </select>

        <label style={styles.label}>Museum</label>
        <select style={styles.select} value={museum} onChange={e => setMuseum(e.target.value)}>
          <option value="">Select Museum</option>
          <option value="New Cairo Museum">New Cairo Museum</option>
        </select>

        <label style={styles.label}>Section</label>
        <select style={styles.select} value={section} onChange={e => setSection(e.target.value)}>
          <option value="">Select Section</option>
          <option value="Ancient Egyptian">Ancient Egyptian</option>
        </select>

        <button style={styles.button} onClick={handleSelect}>
          Start
        </button>
      </div>
    </div>
  );
};

const styles = {
  body:{
    color:"black"
  },
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    textAlign: 'center',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color:"black"
  },
  subtitle: {
    textAlign: 'center',
  
    marginBottom: '1rem',
    color:"black"
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '0.2rem',
    color:"black"
  },
  select: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '0.5rem',
  },
  button: {
    padding: '1rem',
    background: '#C2B280',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};

export default SelectionForm;
