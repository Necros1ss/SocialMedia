import React from "react";

export default function NotFoundView({ onGoHome }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center', background: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb', maxWidth: '800px', margin: '20px auto', boxSizing: 'border-box' }}>
      <img 
        src="https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7912.jpg" 
        alt="Page Not Found" 
        style={{ width: '280px', marginBottom: '24px' }} 
      />
      <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#1f2937', margin: '0 0 8px 0' }}>404</h1>
      <p style={{ fontSize: '15px', color: '#6b7280', margin: '0 0 24px 0' }}>Oops! The page you are looking for is not found.</p>
      <button 
        onClick={onGoHome}
        style={{ padding: '12px 28px', background: '#1064ea', border: 'none', borderRadius: '30px', color: '#fff', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
      >
        Go Back Home
      </button>
    </div>
  );
}
