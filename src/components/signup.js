import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/back/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/select'); // navigate if success
      } else {
        const data = await response.json();
        alert(data.error || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Server error');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forget');
  };

  return (
    <div style={{
      backgroundColor: '#f4f1ea',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#333',
      fontFamily: 'serif',
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        border: '2px solid #d4af37'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#4b3f2f' }}>Sign Up for I Museum</h2>
        <form onSubmit={handleSignup}>
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#b6862e',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              style={{ color: '#b6862e', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Login
            </span>
          </p>
          <p>
            <span
              onClick={handleForgotPassword}
              style={{ color: '#6a4e25', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Forgot your password?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
