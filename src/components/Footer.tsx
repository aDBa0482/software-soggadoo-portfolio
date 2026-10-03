import React from 'react';
import { Instagram, Youtube, Facebook, CheckCircle2, Heart, Edit3, Lock, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types/portfolio';

interface FooterProps {
  profile: UserProfile;
  isOwner?: boolean;
  onToggleOwnerMode?: () => void;
  onOpenFollow: () => void;
  onOpenUpload: () => void;
  onOpenEdit: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  isOwner = false,
  onToggleOwnerMode,
  onOpenFollow,
  onOpenUpload,
  onOpenEdit,
}) => {
  return (
    <footer className="border-t border-zinc-800 bg-[#08080a] text-zinc-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-zinc-800/80">
          
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-white uppercase">
                {profile.name}
              </span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {profile.tagline} · {profile.education}. Sharing fitness motivation, travel diaries, and food stories with a growing global community.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              Instagram: {profile.handle}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap gap-8 text-xs font-medium text-zinc-400">
            <div>
              <p className="text-white font-semibold uppercase tracking-wider mb-2 text-[11px]">
                Portfolio Categories
              </p>
              <ul className="space-y-1.5">
                <li><a href="#highlights" className="hover:text-emerald-400 transition-colors">Highlights</a></li>
                <li><a href="#fitness" className="hover:text-emerald-400 transition-colors">Fitness Workouts</a></li>
                <li><a href="#travel" className="hover:text-emerald-400 transition-colors">Travel Expeditions</a></li>
                <li><a href="#food" className="hover:text-emerald-400 transition-colors">Food & Nutrition</a></li>
              </ul>
            </div>

            <div>
              <p className="text-white font-semibold uppercase tracking-wider mb-2 text-[11px]">
                Social Profiles
              </p>
              <ul className="space-y-1.5">
                <li>
                  <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                    Instagram @{profile.instagramId}
                  </a>
                </li>
                <li>
                  <a href={profile.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
                    YouTube Channel
                  </a>
                </li>
                <li>
                  <a href={profile.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    Facebook Profile
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-white font-semibold uppercase tracking-wider mb-2 text-[11px]">
                {isOwner ? 'Creator Controls' : 'Connect'}
              </p>
              <ul className="space-y-1.5">
                <li>
                  <button onClick={onOpenFollow} className="hover:text-emerald-400 transition-colors text-left">
                    Follow Portfolio
                  </button>
                </li>
                {isOwner ? (
                  <>
                    <li>
                      <button onClick={onOpenEdit} className="text-amber-400 hover:underline flex items-center gap-1">
                        <Edit3 className="h-3 w-3" />
                        <span>Edit Profile Details</span>
                      </button>
                    </li>
                    <li>
                      <button onClick={onOpenUpload} className="hover:text-emerald-400 transition-colors text-left">
                        Upload Videos / Photos
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <button 
                      onClick={onToggleOwnerMode}
                      className="text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
                    >
                      <Lock className="h-3 w-3" />
                      <span>Creator Login</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Unboxed metadata and quiet copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} {profile.name}</span>
            <span aria-hidden="true">·</span>
            <span>Born: {profile.dateOfBirth}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.education}</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400">
            {isOwner ? (
              <span className="text-amber-400 font-medium flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Owner View (Controls Visible)</span>
              </span>
            ) : (
              <span className="text-zinc-500 font-medium">Public Visitor View</span>
            )}
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">@{profile.instagramId}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
