import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Edit3, ArrowLeft, Loader2, Sparkles, BookOpen } from 'lucide-react';
import api from '../services/api';
import FeedItem from '../components/Feed/FeedItem';
import '../styles/profile.css';

export default function ProfilePage({ user }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const [updating, setUpdating] = useState(false);

  const isOwnProfile = user && user.username === username;

  const loadProfileData = async () => {
    setLoading(true);
    try {
      const profileData = await api.getUserProfile(username);
      setProfile(profileData);
      setEditName(profileData.name || '');
      setEditBio(profileData.bio || '');
      
      const postsData = await api.getUserPosts(profileData.id);
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, [username]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append('fullName', editName);
      formData.append('bio', editBio);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }
      if (coverFile) {
        formData.append('cover', coverFile);
      }

      const updated = await api.updateUserProfile(formData);
      setProfile(updated);
      setIsEditing(false);
      // Reload profile
      await loadProfileData();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <Loader2 className="spinner" size={48} />
        <p>Loading premium profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-error">
        <h2>Không tìm thấy người dùng</h2>
        <button onClick={() => navigate('/')}>Quay lại Feed</button>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      {/* Back Button */}
      <button className="back-feed-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={18} /> Quay lại Feed
      </button>

      {/* Profile Card */}
      <div className="profile-header-card">
        {/* Cover Photo */}
        <div className="profile-cover-wrapper" style={{ backgroundImage: `url(${coverPreview || profile.cover || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200'})` }}>
          {isOwnProfile && (
            <label className="edit-cover-label">
              <Camera size={18} />
              <span>Thay ảnh bìa</span>
              <input type="file" accept="image/*" onChange={handleCoverChange} style={{ display: 'none' }} />
            </label>
          )}
        </div>

        {/* Profile Details Area */}
        <div className="profile-details-row">
          <div className="avatar-overlap-wrapper">
            <img 
              className="profile-avatar-img" 
              src={avatarPreview || profile.avatar || 'https://api.dicebear.com/7.x/adventurer/svg?seed=' + profile.username} 
              alt={profile.name} 
            />
            {isOwnProfile && (
              <label className="edit-avatar-badge">
                <Camera size={14} />
                <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
              </label>
            )}
          </div>

          <div className="profile-text-meta">
            <h1 className="profile-full-name">{profile.name} <Sparkles size={18} className="glow-icon" /></h1>
            <p className="profile-username">@{profile.username}</p>
            <p className="profile-bio">{profile.bio || 'Chưa có tiểu sử.'}</p>
          </div>

          <div className="profile-actions-area">
            {isOwnProfile ? (
              <button className="edit-profile-trigger-btn" onClick={() => setIsEditing(true)}>
                <Edit3 size={16} /> Chỉnh sửa trang cá nhân
              </button>
            ) : (
              <button className="message-user-btn" onClick={() => navigate('/messenger')}>
                Nhắn tin
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-card">
            <h2>Chỉnh sửa trang cá nhân</h2>
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label>Họ và tên</label>
                <input 
                  type="text" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Tiểu sử</label>
                <textarea 
                  value={editBio} 
                  onChange={(e) => setEditBio(e.target.value)} 
                  maxLength={160}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Hủy</button>
                <button type="submit" className="btn-submit" disabled={updating}>
                  {updating ? 'Đang cập nhật...' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User's Posts Feed */}
      <div className="profile-posts-section">
        <h3 className="section-title"><BookOpen size={18} /> Bài viết đã đăng</h3>
        {posts.length === 0 ? (
          <div className="no-posts-card">
            <p>Người dùng này chưa đăng bài viết nào.</p>
          </div>
        ) : (
          <div className="profile-feed-grid">
            {posts.map((post) => (
              <FeedItem key={post.postId} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
