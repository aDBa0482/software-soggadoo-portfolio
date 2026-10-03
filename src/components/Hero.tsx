import React from 'react';
import { 
  Instagram, 
  MapPin, 
  Flame, 
  PlusCircle, 
  CheckCircle2,
  Heart,
  GraduationCap,
  Calendar,
  Edit3,
  ExternalLink,
  Camera,
  Image as ImageIcon,
  Share2
} from 'lucide-react';
import { UserProfile, PortfolioItem } from '../types/portfolio';
import { InstagramCard } from './InstagramCard';

interface HeroProps {
  profile: UserProfile;
  isOwner?: boolean;
  onOpenUpload: () => void;
  onOpenFollow: () => void;
  onOpenEdit: () => void;
  onOpenShare?: () => void;
  onSelectItem: (item: PortfolioItem) => void;
  featuredReel?: PortfolioItem;
  isFollowing: boolean;
  followerCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  isOwner = false,
  onOpenUpload,
  onOpenFollow,
  onOpenEdit,
  onOpenShare,
  isFollowing,
  followerCount,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800/80 min-h-[580px] flex items-center">
      
      {/* 1. Panoramic Landscape Background Image with Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={profile.backgroundImage || profile.heroImage}
          alt="Landscape scenery background"
          className="h-full w-full object-cover object-center filter brightness-[0.45] saturate-[1.1]"
        />
        {/* Layered dark gradients for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/85 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/95 via-[#0c0c0e]/75 to-transparent" />
      </div>

      {/* Landscape Edit Badge (Only visible to Owner) */}
      {isOwner && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onOpenEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-zinc-300 hover:text-white text-xs font-medium border border-white/20 backdrop-blur-md transition-all shadow-md"
            title="Change background landscape image (Owner only)"
          >
            <ImageIcon className="h-3.5 w-3.5 text-emerald-400" />
            <span>Change Background Landscape</span>
          </button>
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Shaik Ahammad's Photo, Credentials, Bio, Action Buttons */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Creator Profile Picture Lockup */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative group shrink-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-3 border-emerald-400 shadow-2xl shadow-emerald-500/20"
                />
                
                {/* Camera icon to update profile picture (only for owner) */}
                {isOwner && (
                  <button
                    onClick={onOpenEdit}
                    className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-zinc-950 shadow-md hover:bg-emerald-400 transition-colors"
                    title="Change profile picture"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                    {profile.name}
                  </h1>
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400 fill-emerald-400/20 shrink-0" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-emerald-400 mt-0.5">
                  {profile.handle} · {profile.tagline}
                </p>
              </div>
            </div>

            {/* Academic Credentials & DOB Badges */}
            <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 backdrop-blur-md">
                <GraduationCap className="h-4 w-4 text-emerald-400" />
                <span className="font-medium text-white">{profile.education}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 backdrop-blur-md">
                <Calendar className="h-4 w-4 text-amber-400" />
                <span>Born: <span className="font-medium text-white">{profile.dateOfBirth}</span></span>
              </div>

              {profile.location && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 backdrop-blur-md">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            {/* Bio description */}
            <p className="text-sm sm:text-base leading-relaxed text-zinc-200 font-normal max-w-xl">
              {profile.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Follow Button (Visible to everyone) */}
              <button
                onClick={onOpenFollow}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
              >
                <Heart className={`h-4 w-4 ${isFollowing ? 'fill-zinc-950' : ''}`} />
                <span>{isFollowing ? 'Following Shaik Ahammad ✓' : 'Follow Portfolio'}</span>
              </button>

              {/* Share Button (Visible to everyone) */}
              {onOpenShare && (
                <button
                  onClick={onOpenShare}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 font-medium text-xs sm:text-sm border border-zinc-700 backdrop-blur-md transition-all active:scale-[0.98]"
                  title="Share portfolio website"
                >
                  <Share2 className="h-4 w-4 text-emerald-400" />
                  <span>Share</span>
                </button>
              )}

              {/* Owner-Only Edit Controls */}
              {isOwner && (
                <>
                  <button
                    onClick={onOpenEdit}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-amber-400 font-semibold text-xs sm:text-sm border border-amber-500/40 backdrop-blur-md transition-all active:scale-[0.98]"
                    title="Only visible to you"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile / Details</span>
                  </button>

                  <button
                    onClick={onOpenUpload}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 font-medium text-xs sm:text-sm border border-zinc-700 backdrop-blur-md transition-all active:scale-[0.98]"
                    title="Only visible to you"
                  >
                    <PlusCircle className="h-4 w-4 text-emerald-400" />
                    <span>Upload Media</span>
                  </button>
                </>
              )}
            </div>

          </div>

          {/* Right Column: Prominent Scannable Instagram QR Code Card */}
          <div className="lg:col-span-5">
            <InstagramCard profile={profile} isOwner={isOwner} onOpenEdit={onOpenEdit} />
          </div>

        </div>
      </div>
    </section>
  );
};
