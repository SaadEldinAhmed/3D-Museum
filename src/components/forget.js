import React, { useState } from 'react';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleSendCode = (e) => {
    e.preventDefault();
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setRecoveryCode(code);
    alert(`Your recovery code from IMuseum is: ${code}`);
    setCodeSent(true);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (enteredCode === recoveryCode) {
      setVerified(true);
    } else {
      alert('Incorrect code. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5001/back/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, newPassword })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Password successfully reset. Redirecting to login...');
      window.location.href = '/login';
    } else {
      alert(`❌ Error: ${data.message}`);
    }
  } catch (err) {
    console.error("❌ Client error:", err);
    alert('Client error occurred while resetting password');
  }
};


  return (
    <div
      style={{
        backgroundColor: '#f4f1ea',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
          border: '2px solid #d4af37',
        }}
      >
        <h2 style={{ color: '#4b3f2f' }}>Forgot Password</h2>
        {!verified ? (
          <form onSubmit={codeSent ? handleVerifyCode : handleSendCode}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              disabled={codeSent}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />

            {codeSent && (
              <input
                type="text"
                placeholder="Enter the 4-digit code"
                required
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                }}
              />
            )}

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
                cursor: 'pointer',
              }}
            >
              {codeSent ? 'Verify Code' : 'Send Recovery Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <input
              type="password"
              placeholder="Enter new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
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
                cursor: 'pointer',
              }}
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
