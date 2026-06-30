import React, { useState } from "react";
import { Video, Image, Smile, MoreHorizontal } from "lucide-react";
import api from "../../services/api";

export default function CreatePostCard({ onCreatePost, userId }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: userId,
          content: content,
          postTopic: "General",
          location: "Hồ Chí Minh",
        }),
      });

      if (response.ok) {
        setContent("");
        // Notify post creation
        window.dispatchEvent(new Event("postCreated"));
        if (onCreatePost) onCreatePost();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '16px', boxSizing: 'border-box', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Top Text input area */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <img 
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" 
          alt="User avatar" 
          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '14px', outline: 'none', resize: 'none', color: '#1f2937', fontFamily: 'inherit', boxSizing: 'border-box', padding: '4px 0' }}
            rows={2}
          />
          {content.trim() && (
            <button 
              onClick={handlePost} 
              disabled={loading}
              style={{ alignSelf: 'flex-end', background: '#1064ea', border: 'none', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          )}
        </div>
      </div>

      {/* Bottom Option Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            <Video size={18} />
            <span>Live Video</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            <Image size={18} />
            <span>Photo/Video</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            <Smile size={18} />
            <span>Feeling/Activity</span>
          </div>
        </div>
        
        <button style={{ background: '#f3f4f6', border: 'none', padding: '6px', borderRadius: '50%', color: '#4b5563', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MoreHorizontal size={16} />
        </button>
      </div>

    </div>
  );
}
