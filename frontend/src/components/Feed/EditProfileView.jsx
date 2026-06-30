import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import api from "../../services/api";

export default function EditProfileView() {
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    email: "",
    phone: "",
    website: "",
    twitter: "",
    linkedin: "",
    instagram: ""
  });

  const [coverPhoto, setCoverPhoto] = useState("https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=300&fit=crop");
  const [profilePhoto, setProfilePhoto] = useState("https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop");

  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await api.me();
        if (user) {
          setFormData({
            fullName: user.name || "",
            bio: user.bio || "",
            email: user.email || "",
            phone: user.phone || "",
            website: localStorage.getItem(`profile_web_${user.username}`) || "https://sociala.com",
            twitter: localStorage.getItem(`profile_tw_${user.username}`) || "@sociala_net",
            linkedin: localStorage.getItem(`profile_li_${user.username}`) || "linkedin.com/in/sociala",
            instagram: localStorage.getItem(`profile_ig_${user.username}`) || "@sociala.insta"
          });
          if (user.avatar) setProfilePhoto(user.avatar);
          if (user.cover) setCoverPhoto(user.cover);
        }
      } catch (err) {
        console.error("Error loading user profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    if (type === "avatar") {
      setAvatarFile(file);
      setProfilePhoto(localUrl);
    } else {
      setCoverFile(file);
      setCoverPhoto(localUrl);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("bio", formData.bio);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      if (avatarFile) data.append("avatar", avatarFile);
      if (coverFile) data.append("cover", coverFile);

      const user = await api.me();
      if (user) {
        localStorage.setItem(`profile_web_${user.username}`, formData.website);
        localStorage.setItem(`profile_tw_${user.username}`, formData.twitter);
        localStorage.setItem(`profile_li_${user.username}`, formData.linkedin);
        localStorage.setItem(`profile_ig_${user.username}`, formData.instagram);
      }

      await api.updateUserProfile(data);
      alert("Profile saved successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#4b5563' }}>Loading profile...</div>;
  }

  return (
    <div style={{ padding: '24px', boxSizing: 'border-box', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Edit User Profile</h2>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '24px', boxSizing: 'border-box', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>Edit Profile</h3>
          <button 
            onClick={handleSave}
            disabled={saving}
            style={{ padding: '10px 20px', background: '#1064ea', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Cover Photo Container */}
        <div style={{ position: 'relative', height: '180px', borderRadius: '12px', overflow: 'hidden', background: '#374151', marginBottom: '48px' }}>
          <img src={coverPhoto} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
          <label style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '10px 18px', background: 'rgba(255,255,255,0.9)', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', color: '#1f2937', cursor: 'pointer', border: 'none' }}>
            Change Cover Photo
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "cover")} style={{ display: 'none' }} />
          </label>

          {/* Profile Photo Circle Overlay */}
          <div style={{ position: 'absolute', bottom: '-36px', left: '24px', width: '96px', height: '96px', borderRadius: '50%', border: '4px solid #fff', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <label style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
              <Camera size={18} />
              <span style={{ fontSize: '9px', fontWeight: 'bold', marginTop: '2px', textAlign: 'center' }}>Change Photo</span>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "avatar")} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        {/* Form Fields grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Basic Info */}
          <div>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 'bold', color: '#1f2937', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' }}>Basic Info</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none', background: '#f9fafb', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none', background: '#f9fafb', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'none' }} />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 'bold', color: '#1f2937', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' }}>Contact Info</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none', background: '#f9fafb', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none', background: '#f9fafb', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 'bold', color: '#1f2937', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' }}>Social Links</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Website</label>
                <input type="text" name="website" value={formData.website} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none', background: '#f9fafb', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Twitter</label>
                <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none', background: '#f9fafb', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>LinkedIn</label>
                <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none', background: '#f9fafb', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>Instagram</label>
                <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px', outline: 'none', background: '#f9fafb', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
