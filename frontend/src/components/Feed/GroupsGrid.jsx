import React from "react";
import { Video, Plus } from "lucide-react";

export default function GroupsGrid() {
  const groups = [
    { id: 1, name: "Victor Exrixon", email: "support@gmail.com", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop", cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=200&fit=crop" },
    { id: 2, name: "Surfiya Zakir", email: "support@gmail.com", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop", cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop" },
    { id: 3, name: "Goria Coast", email: "support@gmail.com", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop", cover: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=400&h=200&fit=crop" },
    { id: 4, name: "Hurin Seary", email: "support@gmail.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop", cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=200&fit=crop" }
  ];

  return (
    <div style={{ padding: '24px', boxSizing: 'border-box', maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Group</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input type="text" placeholder="Search here.." style={{ padding: '8px 16px', borderRadius: '30px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none' }} />
          <button style={{ padding: '8px 16px', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Filter</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {groups.map((group) => (
          <div key={group.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            {/* Banner cover */}
            <div style={{ height: '120px', overflow: 'hidden' }}>
              <img src={group.cover} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Profile info card body */}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-36px', position: 'relative' }}>
              <img 
                src={group.avatar} 
                alt="Avatar" 
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} 
              />
              <h4 style={{ margin: '8px 0 2px 0', fontSize: '15px', fontWeight: 'bold', color: '#1f2937' }}>{group.name}</h4>
              <span style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>{group.email}</span>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <button style={{ background: '#e0f2fe', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1064ea', cursor: 'pointer' }}>
                  <Video size={18} />
                </button>
                <button style={{ flex: 1, background: '#1064ea', border: 'none', borderRadius: '20px', color: '#fff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  FOLLOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
