// src/components/PaymentForm.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {

    const navigate = useNavigate();
    
      const handleSelect = () => {
        alert("payment succeded ")
        navigate('/room'); // assuming /payment route shows PaymentForm
      };

      const home = () => {
        navigate('/'); // assuming /payment route shows PaymentForm
      };
    
  return (
    <div style={{
      backgroundColor: '#fdf0c2',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        {/* Payment Details Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <div>
            <h2 style={{ margin: 0 ,color: 'black' }}>Payment Details</h2>
            <h1 style={{ color: '#9c4200' }}>$25</h1>
          </div>
          <span style={{ color: '#999' }}>Transaction #87629354</span>
        </div>

        {/* Payment Method */}
        <div style={{ marginBottom: '1rem' ,color: 'black' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>
            Payment Method
          </label>
          <button style={{
            padding: '0.75rem 1.5rem',
            border: '2px solid #9c4200',
            borderRadius: '8px',
            backgroundColor: 'white',
            color: '#9c4200',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>💳</span> Credit Card
          </button>
        </div>

        {/* Form */}
        <form>
          <div style={{ marginBottom: '1rem' ,color: 'black'}}>
            <label>Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456"
              style={inputStyle} />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' ,color: 'black'}}>
            <div style={{ flex: 1 }}>
              <label>Expiration Date</label>
              <input type="text" placeholder="MM / YY"
                style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label>CVV / CVC</label>
              <input type="text" placeholder="123"
                style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' ,color: 'black' }}>
            <label>Cardholder Name</label>
            <input type="text" placeholder="John Smith"
              style={inputStyle} />
          </div>

          {/* Order Summary */}
          <div style={{
            backgroundColor: '#C2B280',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',color: 'black'
          }}>
            <strong>Order Summary</strong>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              <span>Total</span>
              <span><strong>$25 USD</strong></span>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem' ,color: 'black' }}>
            <button type="submit" style={payButtonStyle} onClick={handleSelect}>
              Pay Now $25
            </button>
            <button type="button" style={cancelButtonStyle} onClick={home}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginTop: '0.25rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  boxSizing: 'border-box'
};

const payButtonStyle = {
  flex: 1,
  padding: '1rem',
  backgroundColor: '#9c4200',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const cancelButtonStyle = {
  flex: 1,
  padding: '1rem',
  backgroundColor: '#fff',
  color: '#9c4200',
  border: '2px solid #9c4200',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default PaymentForm;
