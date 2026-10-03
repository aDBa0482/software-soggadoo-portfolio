import React, { useState, useRef } from 'react';
import { 
  X, 
  User, 
  Calendar, 
  GraduationCap, 
  Instagram, 
  Youtube, 
  Facebook, 
  MapPin, 
  Save, 
  Upload, 
  Check, 
  Sparkles,
  QrCode,
  Image as ImageIcon,
  Camera
} from 'lucide-react';
import { UserProfile } from '../types/portfolio';
import { compressImageFile } from '../utils/storage';

// Presets for background landscape images
import heroLandscapeBackdrop from '../assets/images/hero_landscape_backdrop_1791027120745.jpg';
import contentTravelWanderlust from '../assets/images/content_travel_wanderlust_1791025386270.jpg';
import reelTravelSunset from '../assets/images/reel_travel_sunset_1791025459165.jpg';
import heroPortrait from '../assets/images/hero_creator_editorial_1791025428527.jpg';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (updatedProfile: UserProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);
  const [dateOfBirth, setDateOfBirth] = useState(profile.dateOfBirth);
  const [education, setEducation] = useState(profile.education);
  const [tagline, setTagline] = useState(profile.tagline);
  const [bio, setBio] = useState(profile.bio);
  const [location, setLocation] = useState(profile.location);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [backgroundImage, setBackgroundImage] = useState(profile.backgroundImage || heroLandscapeBackdrop);
  
  // Social details
  const [instagramId, setInstagramId] = useState(profile.instagramId);
  const [instagramUrl, setInstagramUrl] = useState(profile.instagramUrl);
  const [instagramQrImage, setInstagramQrImage] = useState(profile.instagramQrImage || '');
  const [facebookName, setFacebookName] = useState(profile.facebookName);
  const [facebookUrl, setFacebookUrl] = useState(profile.facebookUrl);
  const [youtubeName, setYoutubeName] = useState(profile.youtubeName);
  const [youtubeUrl, setYoutubeUrl] = useState(profile.youtubeUrl);

  const [activeTab, setActiveTab] = useState<'photos' | 'profile' | 'socials'>('photos');
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);
  const qrInputRef = useRef<HTMLInputElement>(null);

  const [isProcessingImg, setIsProcessingImg] = useState(false);

  if (!isOpen) return null;

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProcessingImg(true);
      const compressed = await compressImageFile(file, 800, 800, 0.86);
      setAvatar(compressed);
    } catch (err) {
      console.error('Failed to compress avatar:', err);
    } finally {
      setIsProcessingImg(false);
    }
  };

  const handleBackgroundFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProcessingImg(true);
      const compressed = await compressImageFile(file, 1600, 1000, 0.82);
      setBackgroundImage(compressed);
    } catch (err) {
      console.error('Failed to compress background landscape:', err);
    } finally {
      setIsProcessingImg(false);
    }
  };

  const handleQrFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProcessingImg(true);
      const compressed = await compressImageFile(file, 600, 600, 0.9);
      setInstagramQrImage(compressed);
    } catch (err) {
      console.error('Failed to process QR image:', err);
    } finally {
      setIsProcessingImg(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name: name.trim() || 'Shaik Ahammad',
      handle: handle.trim() || '@software_soggadoo',
      dateOfBirth: dateOfBirth.trim() || '20 Jan 1997',
      education: education.trim() || 'B.Tech graduate(ECE) - Vits college kavali',
      tagline: tagline.trim() || 'Fitness, Travel, Food & Lifestyle Influencer',
      bio: bio.trim(),
      location: location.trim(),
      avatar: avatar || profile.avatar,
      heroImage: avatar || profile.heroImage,
      backgroundImage: backgroundImage || profile.backgroundImage,
      instagramId: instagramId.trim().replace('@', '') || 'software_soggadoo',
      instagramUrl: instagramUrl.trim() || `https://www.instagram.com/${instagramId.trim().replace('@', '')}/`,
      instagramQrImage: instagramQrImage,
      facebookName: facebookName.trim(),
      facebookUrl: facebookUrl.trim(),
      youtubeName: youtubeName.trim(),
      youtubeUrl: youtubeUrl.trim(),
    };

    onSaveProfile(updated);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-zinc-800 bg-[#121216] shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div>
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <span>Owner Studio — Edit Your Portfolio</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-sans text-xs">
                Visible Only to You
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              Update your profile photo, landscape background image, education, bio, and social links
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-800 px-6 pt-2 bg-zinc-900/40">
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'photos'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            🖼️ Photos & Landscape Background
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            👤 Personal Details & Bio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('socials')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'socials'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            📱 Social Accounts (Insta, FB, YouTube)
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: PHOTOS & LANDSCAPE BACKGROUND */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              
              {/* Profile Photo Upload */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <User className="h-4 w-4 text-emerald-400" />
                    <span>Your Profile Photo (Avatar)</span>
                  </label>
                  <span className="text-[11px] text-zinc-400">Shows on hero and posts</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative group shrink-0">
                    <img
                      src={avatar}
                      alt="Profile preview"
                      className="h-20 w-20 rounded-full object-cover border-2 border-emerald-400 shadow-md"
                    />
                    <div 
                      onClick={() => avatarInputRef.current?.click()}
                      className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity"
                    >
                      <Camera className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFile}
                      className="hidden"
                    />
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>Upload My Photo</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAvatar(heroPortrait)}
                        className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs border border-zinc-700 transition-colors"
                      >
                        Use Default
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Upload any portrait photo from your computer or phone
                    </p>
                  </div>
                </div>
              </div>

              {/* Landscape Background Image Upload */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <ImageIcon className="h-4 w-4 text-emerald-400" />
                    <span>Background Landscape Image</span>
                  </label>
                  <span className="text-[11px] text-emerald-400">Panoramic Hero Backdrop</span>
                </div>

                {/* Preview of Landscape Backdrop */}
                <div className="relative h-32 w-full rounded-xl overflow-hidden border border-zinc-700 group">
                  <img
                    src={backgroundImage}
                    alt="Landscape Background Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => bgInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-black/80 text-white text-xs font-medium border border-white/20"
                    >
                      Click to Change Landscape Image
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <input
                    ref={bgInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundFile}
                    className="hidden"
                  />
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => bgInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload Custom Landscape</span>
                    </button>

                    <span className="text-zinc-500 text-xs">or pick scenic preset:</span>

                    <button
                      type="button"
                      onClick={() => setBackgroundImage(heroLandscapeBackdrop)}
                      className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 border border-zinc-700"
                    >
                      Mountain Vista
                    </button>
                    <button
                      type="button"
                      onClick={() => setBackgroundImage(contentTravelWanderlust)}
                      className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 border border-zinc-700"
                    >
                      Coastal Sea
                    </button>
                    <button
                      type="button"
                      onClick={() => setBackgroundImage(reelTravelSunset)}
                      className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 border border-zinc-700"
                    >
                      Golden Sunset
                    </button>
                  </div>
                </div>
              </div>

              {/* Instagram QR Code */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <QrCode className="h-4 w-4 text-emerald-400" />
                    <span>Instagram QR Code</span>
                  </label>
                  <span className="text-[11px] text-zinc-400">@{instagramId}</span>
                </div>

                <div className="flex items-center gap-4">
                  {instagramQrImage ? (
                    <img
                      src={instagramQrImage}
                      alt="Uploaded QR Code"
                      className="h-16 w-16 rounded-xl object-contain bg-white p-1 border border-emerald-400"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500 text-[10px] text-center p-1">
                      Auto QR Active
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <input
                      ref={qrInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleQrFile}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => qrInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium border border-zinc-700 transition-colors"
                    >
                      Upload QR Code Image
                    </button>
                    {instagramQrImage && (
                      <button
                        type="button"
                        onClick={() => setInstagramQrImage('')}
                        className="text-[11px] text-amber-400 hover:underline block ml-1"
                      >
                        Reset to Auto Generated QR
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PERSONAL DETAILS */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Shaik Ahammad"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="text"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    placeholder="20 Jan 1997"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Education & College Degree *
                </label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="B.tech graduate(ECE) - Vits college kavali"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Tagline / Niches
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Fitness, Travel, Food & Lifestyle Influencer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Kavali, AP, India"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Bio / Introduction
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe your fitness philosophy, favorite travel destinations, and food journey..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: SOCIAL ACCOUNTS */}
          {activeTab === 'socials' && (
            <div className="space-y-4">
              
              {/* Instagram Section */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-pink-500/20 space-y-3">
                <div className="flex items-center gap-2 text-pink-400 font-bold text-xs uppercase">
                  <Instagram className="h-4 w-4" />
                  <span>Instagram Settings</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Instagram ID (Handle)</label>
                    <input
                      type="text"
                      value={instagramId}
                      onChange={(e) => {
                        setInstagramId(e.target.value);
                        setInstagramUrl(`https://www.instagram.com/${e.target.value.replace('@', '')}/`);
                      }}
                      placeholder="software_soggadoo"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Profile Full URL</label>
                    <input
                      type="text"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      placeholder="https://www.instagram.com/software_soggadoo/"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* YouTube Section */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-red-500/20 space-y-3">
                <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase">
                  <Youtube className="h-4 w-4" />
                  <span>YouTube Channel</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Channel Name</label>
                    <input
                      type="text"
                      value={youtubeName}
                      onChange={(e) => setYoutubeName(e.target.value)}
                      placeholder="Shaik Ahammad Fitness & Travel"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Channel URL</label>
                    <input
                      type="text"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://www.youtube.com/@ShaikAhammad"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Facebook Section */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-blue-500/20 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase">
                  <Facebook className="h-4 w-4" />
                  <span>Facebook Profile / Page</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Facebook Page / Name</label>
                    <input
                      type="text"
                      value={facebookName}
                      onChange={(e) => setFacebookName(e.target.value)}
                      placeholder="Shaik Ahammad Community"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Facebook URL</label>
                    <input
                      type="text"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      placeholder="https://www.facebook.com/shaik.ahammad"
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Action Bar */}
          <div className="pt-4 flex items-center justify-between border-t border-zinc-800">
            <span className="text-xs text-zinc-500">
              Updates your profile photo, landscape background & details
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessingImg}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 active:scale-[0.98]"
              >
                <Save className="h-4 w-4" />
                <span>{isProcessingImg ? 'Optimizing Photo...' : 'Save All Changes'}</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
