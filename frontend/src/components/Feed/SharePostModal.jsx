import React, { useState } from "react";
import { X, Send, BookOpen, MessageCircle, Link } from "lucide-react";

export default function SharePostModal({ isOpen, onClose, post }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !post) return null;

  const contacts = [
    { id: 1, name: "Hurin Seary", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop" },
    { id: 2, name: "Surfiya Zakir", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop" },
    { id: 3, name: "Goria Coast", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop" },
    { id: 4, name: "David Goria", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${post.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAction = (action) => {
    alert(`Success: ${action}`);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      
      {/* Share Post Card Dialog matching Image 10 */}
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '460px', padding: '24px', boxSizing: 'border-box', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', position: 'relative' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>Share post</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Post Preview Box */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
          {post.medias && post.medias.length > 0 ? (
            <img src={post.medias[0].mediaURL} alt="Preview" style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '64px', height: '64px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1064ea', fontWeight: 'bold' }}>Post</div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: '600', color: '#1f2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {post.content || "Check out this amazing photo!"}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop" alt="Author" style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600' }}>{post.username || "Victor Exrixon"}</span>
            </div>
          </div>
        </div>

        {/* Three Action Buttons Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
          <button 
            onClick={() => handleAction("Shared to Feed!")}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid #e0f2fe', borderRadius: '10px', background: '#f0f9ff', color: '#1064ea', cursor: 'pointer', outline: 'none' }}
          >
            <BookOpen size={20} />
            <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Share to Feed</span>
          </button>
          <button 
            onClick={() => handleAction("Sent via Message!")}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid #e0f2fe', borderRadius: '10px', background: '#f0f9ff', color: '#1064ea', cursor: 'pointer', outline: 'none' }}
          >
            <MessageCircle size={20} />
            <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Send via Message</span>
          </button>
          <button 
            onClick={handleCopy}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid #e0f2fe', borderRadius: '10px', background: '#f0f9ff', color: '#1064ea', cursor: 'pointer', outline: 'none' }}
          >
            <Link size={20} />
            <span style={{ fontSize: '11px', fontWeight: 'bold' }}>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>

        {/* Send to Recent Contacts */}
        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '12px', fontWeight: 'bold', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Send to recent contacts</h4>
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
            {contacts.map((contact) => (
              <div key={contact.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '70px', flexShrink: 0 }}>
                <img src={contact.avatar} alt={contact.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                <span style={{ fontSize: '10px', fontWeight: '600', color: '#4b5563', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                  {contact.name.split(' ')[0]}
                </span>
                <button 
                  onClick={() => handleAction(`Sent to ${contact.name}!`)}
                  style={{ padding: '4px 12px', background: '#1064ea', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Send
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
