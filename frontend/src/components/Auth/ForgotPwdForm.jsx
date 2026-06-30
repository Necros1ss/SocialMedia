import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import '../../styles/form.css';

export default function ForgotPwdForm({ onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus({ type: 'error', message: 'Vui lòng nhập địa chỉ email.' });
      return;
    }
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Mock sending reset link
      setTimeout(() => {
        setStatus({ type: 'success', message: 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn!' });
        setLoading(false);
      }, 1500);
    } catch (err) {
      setStatus({ type: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
      setLoading(false);
    }
  };

  return (
    <div className="form-container forgot-pwd-form" style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', maxWidth: '400px', margin: 'auto' }}>
      {/* Brand logo matching image 4 */}
      <div className="brand-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
        <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }}>
          <polygon points="12,2 2,12 9,12 9,22 15,22 15,12 22,12" style={{ fill: '#10b981' }} />
        </svg>
        <span className="brand-text" style={{ fontSize: '24px', fontWeight: 'bold', color: '#1064ea' }}>Sociala.</span>
      </div>

      <h2 style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>Forgot Password</h2>
      <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', marginBottom: '24px', lineHeight: '1.5' }}>
        Enter your email address to reset your password.
      </p>

      {status.message && (
        <div className={`status-msg ${status.type}`} style={{ padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px', textAlign: 'center', backgroundColor: status.type === 'error' ? '#fde8e8' : '#def7ec', color: status.type === 'error' ? '#e13838' : '#03543f' }}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ position: 'relative', marginBottom: '20px' }}>
          <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: '30px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '12px', borderRadius: '30px', border: 'none', backgroundColor: '#1064ea', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s', marginBottom: '16px' }}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onBackToLogin}
          style={{ background: 'none', border: 'none', color: '#1064ea', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
