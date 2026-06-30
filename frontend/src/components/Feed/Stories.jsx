import React from "react";
import { Plus } from "lucide-react";

export default function Stories() {
  const storiesList = [
    { id: 1, name: "Victor Exrixon", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop", cover: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=450&fit=crop" },
    { id: 2, name: "Surfiya Zakir", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop", cover: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=300&h=450&fit=crop" },
    { id: 3, name: "Goria Coast", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop", cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=450&fit=crop" },
    { id: 4, name: "Hurin Seary", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop", cover: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=450&fit=crop" }
  ];

  return (
    <div className="stories-list" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', WebkitOverflowScrolling: 'touch', height: '200px', minHeight: '200px' }}>
      
      {/* Add Story Card */}
      <div style={{ position: 'relative', minWidth: '110px', height: '180px', borderRadius: '12px', background: '#374151', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ background: '#fff', padding: '10px', borderRadius: '50%', color: '#1064ea', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <Plus size={20} strokeWidth={3} />
        </div>
        <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>Add Story</span>
      </div>

      {/* Users Story Cards */}
      {storiesList.map((story) => (
        <div key={story.id} style={{ position: 'relative', minWidth: '110px', height: '180px', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', flexShrink: 0 }}>
          <img src={story.cover} alt="Story cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}></div>
          
          {/* User profile photo overlay at bottom center */}
          <div style={{ position: 'absolute', bottom: '34px', left: '50%', transform: 'translateX(-50%)', width: '36px', height: '36px', borderRadius: '50%', border: '3px solid #fff', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
            <img src={story.avatar} alt="User Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* User name */}
          <span style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, textAlign: 'center', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {story.name}
          </span>
        </div>
      ))}

    </div>
  );
}
