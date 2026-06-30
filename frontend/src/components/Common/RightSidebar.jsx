import React, { useEffect, useState } from "react";
import { UserCheck, UserX, MessageSquare } from "lucide-react";
import api from "../../services/api";

export default function RightSidebar({ onOpenChat }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await api.getFriends();
        const mapped = data.map((friend) => ({
          id: friend.id,
          name: friend.name || friend.username,
          avatar: friend.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
          status: "online",
        }));
        setContacts(mapped);
      } catch (err) {
        console.error("Error fetching friends for sidebar:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  const friendRequests = [
    { id: 1, name: "Anthony Daugloi", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", mutual: "12 mutual friends" },
    { id: 2, name: "Mohannad Zitoun", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop", mutual: "12 mutual friends" }
  ];

  const groups = [
    { id: 1, name: "Studio Express", avatar: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=80&fit=crop", time: "2 min" },
    { id: 2, name: "Armany Design", avatar: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=80&h=80&fit=crop", status: "online" }
  ];

  return (
    <div className="right-sidebar" style={{ width: '100%', padding: '20px', boxSizing: 'border-box', background: '#fff', borderLeft: '1px solid #e5e7eb', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Friend Request Card */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '16px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>Friend Request</h4>
          <span style={{ fontSize: '12px', color: '#1064ea', fontWeight: '600', cursor: 'pointer' }}>See all</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {friendRequests.map((req) => (
            <div key={req.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <img src={req.avatar} alt={req.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{req.name}</h5>
                <span style={{ fontSize: '11px', color: '#9ca3af' }}>{req.mutual}</span>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button style={{ flex: 1, padding: '6px 10px', background: '#1064ea', border: 'none', borderRadius: '20px', color: '#fff', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>Confirm</button>
                  <button style={{ flex: 1, padding: '6px 10px', background: '#f3f4f6', border: 'none', borderRadius: '20px', color: '#4b5563', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts List */}
      <div>
        <h4 style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>Contacts</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {contacts.map((contact) => (
            <div key={contact.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => onOpenChat && onOpenChat(contact)}>
              <div style={{ position: 'relative', width: '32px', height: '32px' }}>
                <img src={contact.avatar} alt={contact.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                {contact.status === "online" && (
                  <span style={{ position: 'absolute', bottom: 0, right: 0, width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', border: '2px solid #fff' }}></span>
                )}
                {contact.status === "away" && (
                  <span style={{ position: 'absolute', bottom: 0, right: 0, width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', border: '2px solid #fff' }}></span>
                )}
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#4b5563', flex: 1 }}>{contact.name}</span>
              {contact.badge ? (
                <span style={{ background: '#1064ea', color: '#fff', fontSize: '10px', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{contact.badge}</span>
              ) : contact.time ? (
                <span style={{ fontSize: '11px', color: '#9ca3af' }}>{contact.time}</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Groups List */}
      <div>
        <h4 style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>Groups</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {groups.map((group) => (
            <div key={group.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', background: '#1064ea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '12px' }}>
                {group.name.split(' ').map(n => n[0]).join('')}
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#4b5563', flex: 1 }}>{group.name}</span>
              {group.time && <span style={{ fontSize: '11px', color: '#9ca3af' }}>{group.time}</span>}
              {group.status === "online" && (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
