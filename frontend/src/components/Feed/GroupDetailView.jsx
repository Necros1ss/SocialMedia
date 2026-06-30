import React, { useState } from "react";
import { UserPlus, BookOpen, UserCheck, Shield } from "lucide-react";
import FeedItem from "./FeedItem";

export default function GroupDetailView({ userId }) {
  const [activeTab, setActiveTab] = useState("posts");
  const [isJoined, setIsJoined] = useState(false);

  const mockPosts = [
    {
      id: 99,
      username: "Alex Chen",
      postTopic: "Photography",
      location: "San Francisco, CA",
      content: "Captured this last night, what do you think of the composition?",
      medias: [
        { id: 1, mediaType: "IMAGE", mediaURL: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=300&fit=crop" }
      ],
      reactionCount: [["LIKE", 40]],
      commentCount: 12,
      shareCount: 2,
      createdAt: "2026-06-29T18:00:00Z"
    },
    {
      id: 100,
      username: "Sarah Lee",
      postTopic: "Nature",
      location: "Vancouver, BC",
      content: "Morning mist in the mountains. Simply breathtaking.",
      medias: [
        { id: 2, mediaType: "IMAGE", mediaURL: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=300&fit=crop" }
      ],
      reactionCount: [["LIKE", 85], ["LOVE", 23]],
      commentCount: 30,
      shareCount: 15,
      createdAt: "2026-06-29T15:30:00Z"
    }
  ];

  const moderators = [
    { id: 1, name: "Mark Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
    { id: 2, name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" },
    { id: 3, name: "Chris Brown", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" }
  ];

  return (
    <div style={{ background: '#f0f2f5', minHeight: 'calc(100vh - 65px)', boxSizing: 'border-box' }}>
      
      {/* Cover Header matching Image 9 */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1452587925148-ce544e77e60d?w=1200&h=400&fit=crop" alt="Group Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}></div>
          
          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: '#fff' }}>
            <div>
              <h1 style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: 'bold' }}>Photography Lovers</h1>
              <span style={{ fontSize: '13px', opacity: 0.9 }}>1.2K Members • 3 New Posts</span>
            </div>
            <button 
              onClick={() => setIsJoined(!isJoined)}
              style={{ padding: '12px 24px', background: isJoined ? '#10b981' : '#1064ea', border: 'none', borderRadius: '30px', color: '#fff', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {isJoined ? <UserCheck size={16} /> : <UserPlus size={16} />}
              {isJoined ? "Joined" : "Join Group"}
            </button>
          </div>
        </div>

        {/* Tab Headers */}
        <div style={{ padding: '0 24px', display: 'flex', gap: '24px' }}>
          {["About", "Posts", "Members", "Media"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              style={{ background: 'none', border: 'none', padding: '16px 8px', fontSize: '14px', fontWeight: '600', color: activeTab === tab.toLowerCase() ? '#1064ea' : '#4b5563', borderBottom: activeTab === tab.toLowerCase() ? '3px solid #1064ea' : '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two Column layout */}
      <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '24px', boxSizing: 'border-box' }}>
        
        {/* Left Column (Create Post & Feeds) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Create Post Card */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '16px', boxSizing: 'border-box', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="User" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
              <input 
                type="text" 
                placeholder="Share a photo or thought..." 
                style={{ flex: 1, padding: '10px 16px', borderRadius: '30px', border: 'none', background: '#f0f2f5', fontSize: '13px', outline: 'none' }} 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', borderTop: '1px solid #f3f4f6', paddingTop: '10px', fontSize: '12px', color: '#4b5563', fontWeight: '600' }}>
              <span>📷 Photo/Video</span>
              <span>📊 Poll</span>
              <span>🏷️ Tag</span>
            </div>
          </div>

          {/* Posts list */}
          {mockPosts.map((post) => (
            <FeedItem 
              key={post.id} 
              userId={userId} 
              post={post} 
              openPost={() => {}} 
            />
          ))}
        </div>

        {/* Right Column (Group Rules & Moderators) */}
        <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Group Rules Card */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '16px', boxSizing: 'border-box', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <BookOpen size={18} style={{ color: '#1064ea' }} />
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>Group Rules</h4>
            </div>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#4b5563', lineHeight: '1.8' }}>
              <li>Be respectful.</li>
              <li>Stay on topic.</li>
              <li>No spam.</li>
            </ol>
          </div>

          {/* Moderators Card */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '16px', boxSizing: 'border-box', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Shield size={18} style={{ color: '#1064ea' }} />
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>Moderators</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {moderators.map((mod) => (
                <div key={mod.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={mod.avatar} alt={mod.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{mod.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
