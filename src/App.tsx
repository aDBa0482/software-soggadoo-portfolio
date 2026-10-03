/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedHighlights } from './components/FeaturedHighlights';
import { FitnessSection } from './components/FitnessSection';
import { TravelSection } from './components/TravelSection';
import { FoodSection } from './components/FoodSection';
import { SocialFeeds } from './components/SocialFeeds';
import { UploadModal } from './components/UploadModal';
import { MediaModal } from './components/MediaModal';
import { FollowModal } from './components/FollowModal';
import { EditProfileModal } from './components/EditProfileModal';
import { OwnerLoginModal } from './components/OwnerLoginModal';
import { ShareModal } from './components/ShareModal';
import { Footer } from './components/Footer';

import { INITIAL_PORTFOLIO_ITEMS, DEFAULT_USER_PROFILE } from './data/initialData';
import { PortfolioItem, Comment, UserProfile } from './types/portfolio';
import { CheckCircle2, Heart } from 'lucide-react';

const STORAGE_KEY_ITEMS = 'shaik_portfolio_items_v3';
const STORAGE_KEY_FOLLOW = 'shaik_portfolio_is_following_v3';
const STORAGE_KEY_PROFILE = 'shaik_portfolio_user_profile_v3';
const STORAGE_KEY_OWNER = 'shaik_portfolio_is_owner_v3';
const STORAGE_KEY_PASSWORD = 'shaik_portfolio_owner_password_v3';

export default function App() {
  // Owner Password State (Default is Shaik@1997, can be reset via OTP to 6301010537 & adba0482@gmail.com)
  const [ownerPassword, setOwnerPassword] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_PASSWORD) || 'Shaik@1997';
    } catch {
      return 'Shaik@1997';
    }
  });

  // Load User Profile from localStorage or use DEFAULT_USER_PROFILE
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) {
        return { ...DEFAULT_USER_PROFILE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Error loading user profile:', e);
    }
    return DEFAULT_USER_PROFILE;
  });

  // Owner Mode State: True for Shaik Ahammad when logged in; False for public visitors on new devices!
  const [isOwner, setIsOwner] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_OWNER);
      // If previously unlocked, keep unlocked. Otherwise false for public visitors!
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Load items from localStorage if available, or fall back to INITIAL_PORTFOLIO_ITEMS
  const [items, setItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading portfolio items from storage:', e);
    }
    return INITIAL_PORTFOLIO_ITEMS;
  });

  // Follow state
  const [isFollowing, setIsFollowing] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_FOLLOW) === 'true';
    } catch {
      return false;
    }
  });

  const [followerCount, setFollowerCount] = useState<number>(25480);

  // Modals state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadDefaultCategory, setUploadDefaultCategory] = useState<'fitness' | 'travel' | 'food' | 'lifestyle'>('fitness');
  const [followModalOpen, setFollowModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync owner password to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PASSWORD, ownerPassword);
    } catch (e) {
      console.error('Error syncing owner password:', e);
    }
  }, [ownerPassword]);

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error syncing profile to storage:', e);
    }
  }, [profile]);

  // Sync owner state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_OWNER, isOwner ? 'true' : 'false');
    } catch (e) {
      console.error('Error syncing owner state:', e);
    }
  }, [isOwner]);

  // Sync items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.error('Error syncing items to storage:', e);
    }
  }, [items]);

  // Sync follow state to localStorage and update follower count
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FOLLOW, isFollowing ? 'true' : 'false');
    } catch (e) {
      console.error('Error syncing follow state:', e);
    }
    setFollowerCount(25480 + (isFollowing ? 1 : 0));
  }, [isFollowing]);

  const handleToggleOwnerMode = () => {
    if (isOwner) {
      setIsOwner(false);
      showToast("Switched to Public Visitor View. Edit buttons are now hidden!");
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleUnlockOwner = () => {
    setIsOwner(true);
    showToast("Owner Mode activated! You can now edit your details and upload media.");
  };

  const handleToggleFollow = () => {
    setIsFollowing(prev => {
      const next = !prev;
      if (next) {
        showToast(`You are now following ${profile.name}'s portfolio!`);
      } else {
        showToast("You unfollowed this portfolio.");
      }
      return next;
    });
  };

  const handleOpenUpload = (category: 'fitness' | 'travel' | 'food' | 'lifestyle' = 'fitness') => {
    setUploadDefaultCategory(category);
    setUploadModalOpen(true);
  };

  const handleUploadItem = (newItem: PortfolioItem) => {
    setItems(prev => [newItem, ...prev]);
    showToast(`Published "${newItem.title}" to your ${newItem.category} portfolio!`);
  };

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    showToast("Profile & background landscape updated successfully!");
  };

  const handleToggleLike = (itemId: string) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const isLiked = !item.isLiked;
          const likes = item.likes + (isLiked ? 1 : -1);
          const updated = { ...item, isLiked, likes };
          if (selectedItem && selectedItem.id === itemId) {
            setSelectedItem(updated);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const handleAddComment = (itemId: string, newComment: Comment) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const comments = [newComment, ...item.comments];
          const updated = { ...item, comments };
          if (selectedItem && selectedItem.id === itemId) {
            setSelectedItem(updated);
          }
          return updated;
        }
        return item;
      })
    );
    showToast("Comment posted!");
  };

  const featuredReel = items.find(i => i.mediaType === 'video' && i.category === 'fitness');

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs sm:text-sm shadow-2xl animate-fade-in border border-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        profile={profile}
        isOwner={isOwner}
        onToggleOwnerMode={handleToggleOwnerMode}
        onOpenUpload={() => handleOpenUpload('fitness')}
        onOpenFollow={() => setFollowModalOpen(true)}
        onOpenEdit={() => setEditModalOpen(true)}
        onOpenShare={() => setShareModalOpen(true)}
        isFollowing={isFollowing}
        followerCount={followerCount}
      />

      <main className="flex-1">
        {/* Hero Section with Landscape Background and Profile Photo */}
        <Hero
          profile={profile}
          isOwner={isOwner}
          onOpenUpload={() => handleOpenUpload('fitness')}
          onOpenFollow={() => setFollowModalOpen(true)}
          onOpenEdit={() => setEditModalOpen(true)}
          onOpenShare={() => setShareModalOpen(true)}
          onSelectItem={(item) => setSelectedItem(item)}
          featuredReel={featuredReel}
          isFollowing={isFollowing}
          followerCount={followerCount}
        />

        {/* Featured Work & Highlights Bento Section */}
        <FeaturedHighlights
          items={items}
          isOwner={isOwner}
          onSelectItem={(item) => setSelectedItem(item)}
          onOpenUpload={handleOpenUpload}
        />

        {/* Dedicated Category: Fitness */}
        <FitnessSection
          items={items}
          isOwner={isOwner}
          onSelectItem={(item) => setSelectedItem(item)}
          onOpenUpload={() => handleOpenUpload('fitness')}
        />

        {/* Dedicated Category: Travel */}
        <TravelSection
          items={items}
          isOwner={isOwner}
          onSelectItem={(item) => setSelectedItem(item)}
          onOpenUpload={() => handleOpenUpload('travel')}
        />

        {/* Dedicated Category: Food */}
        <FoodSection
          items={items}
          isOwner={isOwner}
          onSelectItem={(item) => setSelectedItem(item)}
          onOpenUpload={() => handleOpenUpload('food')}
        />

        {/* Social Channels (Instagram QR, YouTube, Facebook with isOwner guard) */}
        <SocialFeeds
          profile={profile}
          isOwner={isOwner}
          onOpenEdit={() => setEditModalOpen(true)}
          onSelectItem={(item) => setSelectedItem(item)}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        isOwner={isOwner}
        onToggleOwnerMode={handleToggleOwnerMode}
        onOpenFollow={() => setFollowModalOpen(true)}
        onOpenUpload={() => handleOpenUpload('fitness')}
        onOpenEdit={() => setEditModalOpen(true)}
      />

      {/* Live Profile & Settings Editor Modal (allows updating photo, landscape background & details) */}
      <EditProfileModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

      {/* Owner Login Modal to switch from Visitor View to Owner Mode */}
      <OwnerLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onUnlock={handleUnlockOwner}
        storedPassword={ownerPassword}
        onUpdatePassword={(newPass) => {
          setOwnerPassword(newPass);
          showToast("Password updated and saved successfully!");
        }}
      />

      {/* Creator Upload Studio Modal */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadItem={handleUploadItem}
        defaultCategory={uploadDefaultCategory}
      />

      {/* Media Lightbox & Reel Video Player Modal */}
      <MediaModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onToggleLike={handleToggleLike}
        onAddComment={handleAddComment}
      />

      {/* Share Portfolio Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        profile={profile}
      />

      {/* Follow Portfolio & Newsletter Modal */}
      <FollowModal
        isOpen={followModalOpen}
        onClose={() => setFollowModalOpen(false)}
        profile={profile}
        isFollowing={isFollowing}
        onToggleFollow={handleToggleFollow}
        followerCount={followerCount}
      />

    </div>
  );
}
