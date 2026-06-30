import React from "react";

const ComingSoonView = ({ title }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', textAlign: 'center', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', maxWidth: '500px', width: '100%' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>{title}</h2>
        <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.5' }}>
          We are working hard to bring this feature to life. Stay tuned for exciting updates!
        </p>
        <div style={{ width: '80px', height: '4px', background: 'linear-gradient(to right, #1064ea, #10b981)', margin: '0 auto', borderRadius: '2px' }}></div>
      </div>
    </div>
  );
};

export default ComingSoonView;
