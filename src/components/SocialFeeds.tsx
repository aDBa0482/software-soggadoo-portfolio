import React from 'react';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  ExternalLink, 
  Share2, 
  CheckCircle2, 
  Edit3 
} from 'lucide-react';
import { UserProfile, PortfolioItem } from '../types/portfolio';

interface SocialFeedsProps {
  profile: UserProfile;
  isOwner?: boolean;
  onOpenEdit: () => void;
  onSelectItem: (item: PortfolioItem) => void;
}

export const SocialFeeds: React.FC<SocialFeedsProps> = ({ 
  profile, 
  isOwner = false, 
  onOpenEdit, 
  onSelectItem 
}) => {
  return (
    <section id="instagram-socials" className="py-16 lg:py-20 border-b border-zinc-800/80 bg-[#0c0c0e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1.5">
              <Share2 className="h-4 w-4" />
              <span>Social Media Channels</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Connect on Instagram, YouTube & Facebook
            </h2>
            <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
              Follow my daily updates, fitness reels, and travel photos.
            </p>
          </div>

          {isOwner && (
            <button
              onClick={onOpenEdit}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all self-start md:self-auto"
              title="Only visible to Owner"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Update Social Accounts in UI</span>
            </button>
          )}
        </div>

        {/* 3 Main Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* 1. INSTAGRAM */}
          <div className="rounded-2xl bg-zinc-900 border border-emerald-500/30 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/60 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-gradient-to-tr from-pink-500 to-amber-500 text-white">
                  <Instagram className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  Primary Handle
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                  @{profile.instagramId}
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Daily fitness routines, travel photography, and lifestyle stories.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <a
                href={profile.instagramUrl || `https://www.instagram.com/${profile.instagramId}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-bold text-xs transition-all shadow-md active:scale-[0.98]"
              >
                <Instagram className="h-4 w-4" />
                <span>Visit Instagram @{profile.instagramId}</span>
                <ExternalLink className="h-3 w-3 ml-0.5" />
              </a>

              {isOwner && (
                <button
                  onClick={onOpenEdit}
                  className="w-full text-center text-xs text-amber-400 hover:text-amber-300 py-1 transition-colors"
                >
                  Change Instagram Handle or QR
                </button>
              )}
            </div>
          </div>

          {/* 2. YOUTUBE */}
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-red-500/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-red-600 text-white">
                  <Youtube className="h-6 w-6" />
                </div>
                {isOwner && (
                  <button
                    onClick={onOpenEdit}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Edit URL</span>
                  </button>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  {profile.youtubeName || 'YouTube Channel'}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Long-form workout tutorials, travel vlogs, and diet guidance.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <a
                href={profile.youtubeUrl || 'https://www.youtube.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs border border-zinc-700 transition-all"
              >
                <Youtube className="h-4 w-4 text-red-500" />
                <span>Open YouTube Channel</span>
                <ExternalLink className="h-3 w-3 ml-0.5" />
              </a>

              <p className="text-[11px] text-zinc-500 text-center truncate">
                {profile.youtubeUrl}
              </p>
            </div>
          </div>

          {/* 3. FACEBOOK */}
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-blue-600 text-white">
                  <Facebook className="h-6 w-6" />
                </div>
                {isOwner && (
                  <button
                    onClick={onOpenEdit}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Edit URL</span>
                  </button>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  {profile.facebookName || 'Facebook Page / Profile'}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Community discussions, challenge updates, and photo albums.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <a
                href={profile.facebookUrl || 'https://www.facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs border border-zinc-700 transition-all"
              >
                <Facebook className="h-4 w-4 text-blue-400" />
                <span>Visit Facebook Profile</span>
                <ExternalLink className="h-3 w-3 ml-0.5" />
              </a>

              <p className="text-[11px] text-zinc-500 text-center truncate">
                {profile.facebookUrl}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
