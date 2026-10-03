import React from 'react';
import { CheckCircle2, PlusCircle, UserCheck, Heart, Edit3, Eye, ShieldCheck, Lock, Share2 } from 'lucide-react';
import { UserProfile } from '../types/portfolio';

interface NavbarProps {
  profile: UserProfile;
  isOwner: boolean;
  onToggleOwnerMode: () => void;
  onOpenUpload: () => void;
  onOpenFollow: () => void;
  onOpenEdit: () => void;
  onOpenShare: () => void;
  isFollowing: boolean;
  followerCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  isOwner,
  onToggleOwnerMode,
  onOpenUpload,
  onOpenFollow,
  onOpenEdit,
  onOpenShare,
  isFollowing,
  followerCount
}) => {
  return (
    <>
      {/* Owner Mode Status Ribbon (Only visible when Owner Mode is enabled) */}
      {isOwner && (
        <div className="bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 border-b border-amber-500/30 px-4 py-1 text-center text-xs text-amber-300 flex items-center justify-center gap-3">
          <span className="flex items-center gap-1 font-semibold">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
            <span>Owner Mode Active (Edit controls visible only to you)</span>
          </span>
          <button
            onClick={onToggleOwnerMode}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 hover:bg-black text-[11px] text-zinc-300 hover:text-white border border-white/20 transition-colors"
          >
            <Eye className="h-3 w-3" />
            <span>Preview as Public Visitor</span>
          </button>
        </div>
      )}

      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#0c0c0e]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors uppercase">
                {profile.name}
              </span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-400/20" aria-label="Verified Creator" />
            </a>
            <span className="hidden xl:inline text-xs text-zinc-500 font-medium">
              · {profile.handle}
            </span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#highlights" className="hover:text-white transition-colors">
              Highlights
            </a>
            <a href="#fitness" className="hover:text-white transition-colors">
              Fitness
            </a>
            <a href="#travel" className="hover:text-white transition-colors">
              Travel
            </a>
            <a href="#food" className="hover:text-white transition-colors">
              Food
            </a>
            <a href="#instagram-socials" className="hover:text-white transition-colors">
              Instagram & Socials
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Owner-Only Buttons */}
            {isOwner && (
              <>
                <button
                  onClick={onOpenEdit}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg border border-amber-500/30 transition-all active:scale-[0.98]"
                  title="Only you can see this edit button"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Edit Profile</span>
                  <span className="sm:hidden">Edit</span>
                </button>

                <button
                  onClick={onOpenUpload}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-zinc-200 bg-zinc-800/80 hover:bg-zinc-700 rounded-lg border border-zinc-700/60 transition-all active:scale-[0.98]"
                  title="Upload fitness videos or photos (Owner only)"
                >
                  <PlusCircle className="h-3.5 w-3.5 text-zinc-300" />
                  <span className="hidden sm:inline">Upload</span>
                </button>
              </>
            )}

            {/* If NOT Owner, show a small discreet Creator Unlock key icon */}
            {!isOwner && (
              <button
                onClick={onToggleOwnerMode}
                className="p-2 text-zinc-600 hover:text-zinc-400 transition-colors"
                title="Creator Login / Owner Mode"
                aria-label="Creator Login"
              >
                <Lock className="h-3.5 w-3.5" />
              </button>
            )}

            {/* Share Button (Visible to everyone) */}
            <button
              onClick={onOpenShare}
              className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-zinc-300 bg-zinc-800/80 hover:bg-zinc-700 hover:text-white rounded-lg border border-zinc-700/60 transition-all active:scale-[0.98]"
              title="Share portfolio website"
            >
              <Share2 className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Follow Button (Visible to everyone) */}
            <button
              onClick={onOpenFollow}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all active:scale-[0.98] ${
                isFollowing
                  ? 'bg-zinc-800 text-emerald-400 border border-emerald-400/30 hover:bg-zinc-700'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/10'
              }`}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <Heart className="h-3.5 w-3.5 fill-current" />
                  <span>Follow</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>
    </>
  );
};
