import React, { useState } from "react";
import "../../styles/replyInput.css"; // we'll give you the CSS below

const AddReply = ({
  onSubmit,
  placeholder = "Write a comment...",
  postId,
  parentCommentId,
  postMedias,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit({
        content: text,
        postId: postId,
        parentCommentId: parentCommentId,
      });

      setText("");
      setIsOpen(false);
    } catch (err) {
      alert("Failed to post reply", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setText("");
    setIsOpen(false);
  };

  const hasImage = postMedias && postMedias.filter(m => m.mediaType === "IMAGE").length > 0;

  // Top-level comment input for Post Detail View (always open, floating design)
  if (!parentCommentId) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        background: '#fff', 
        padding: '10px 16px', 
        borderRadius: '30px', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
        width: '95%',
        margin: '12px auto 20px', 
        position: 'relative',
        zIndex: 10,
        border: '1px solid #f1f5f9'
      }}>
        <img src={"https://api.dicebear.com/7.x/adventurer/svg?seed=me"} alt="avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
        <input
          type="text"
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if(e.key === 'Enter') handleSubmit(); }}
          style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', color: '#1f2937' }}
        />
        <div style={{ display: 'flex', gap: '12px', color: '#6b7280', alignItems: 'center' }}>
           <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
           <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={!text.trim() || isLoading}
          style={{ background: '#1064ea', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', opacity: (!text.trim() || isLoading) ? 0.7 : 1 }}
        >
          {isLoading ? "..." : "Post"}
        </button>
      </div>
    );
  }

  // Nested reply input (requires toggle)
  if (!isOpen) {
    return (
      <button
        className="action-reply highlight-item"
        onClick={() => setIsOpen(true)}
        style={{ border: 'none', background: 'transparent', color: '#1064ea', cursor: 'pointer', fontSize: '12px', fontWeight: '600', padding: 0 }}
      >
        Reply
      </button>
    );
  }

  return (
    <div className="add-reply-box" style={{ marginTop: '8px' }}>
      <textarea
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
        rows={2}
        className="reply-textarea"
        style={{ width: '100%', borderRadius: '12px', padding: '12px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none' }}
      />
      <div className="reply-actions" style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || isLoading}
          className="reply-btn post-btn"
          style={{ background: '#1064ea', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}
        >
          {isLoading ? "Posting..." : "Reply"}
        </button>
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="reply-btn cancel-btn"
          style={{ background: '#f3f4f6', color: '#4b5563', border: 'none', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddReply;
