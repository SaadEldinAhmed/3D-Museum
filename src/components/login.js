import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleLogin = async (e) => {
  e.preventDefault();
if (email === 'fekry@gmail.com' && password==='fekry') {
        navigate('/dashboard');
      } else {
        navigate('/select');
      }
  try {
    const response = await fetch('http://localhost:5001/back/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Login successful:", data);

      // You can store user info or token here if needed
      // localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate based on email
      
    } else {
      alert(data.message || 'Invalid email or password');
    }
  } catch (err) {
    console.error("❌ Login error:", err);
    alert('Server error');
  }
};


  const handleForgotPassword = () => {
    navigate('/forget');
  };

  return (
    <div
      style={{
        backgroundColor: '#f4f1ea',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333',
        fontFamily: 'serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '400px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          border: '2px solid #d4af37'
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', color: '#4b3f2f' }}>Login to I Museum</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Login
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              style={{ color: '#b6862e', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Sign Up
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

export default LoginForm;
