import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  UserCheck, 
  Instagram, 
  Youtube, 
  Facebook, 
  Mail, 
  Check, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { UserProfile } from '../types/portfolio';

interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  isFollowing: boolean;
  onToggleFollow: () => void;
  followerCount: number;
}

export const FollowModal: React.FC<FollowModalProps> = ({
  isOpen,
  onClose,
  profile,
  isFollowing,
  onToggleFollow,
  followerCount,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#121216] shadow-2xl p-6 sm:p-8 space-y-6 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Creator Identity Header */}
        <div className="text-center space-y-2">
          <div className="relative mx-auto h-20 w-20 rounded-full overflow-hidden border-2 border-emerald-400 p-0.5">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-full w-full rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <h3 className="font-serif text-2xl font-bold text-white">
            Follow {profile.name}
          </h3>

          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            {profile.handle} · {profile.tagline}
          </p>

          {/* Primary 1-Click Follow Portfolio Button */}
          <div className="pt-2">
            <button
              onClick={onToggleFollow}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                isFollowing
                  ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/30 hover:bg-zinc-700'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 shadow-emerald-500/20 active:scale-[0.98]'
              }`}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="h-4 w-4" />
                  <span>Following {profile.name} ✓</span>
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 fill-current" />
                  <span>Follow Portfolio (1-Click)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Channels Quick Follow List */}
        <div className="space-y-2.5 pt-2 border-t border-zinc-800">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
            Follow Official Social Accounts:
          </span>

          <div className="space-y-2">
            <a
              href={profile.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-emerald-500/30 hover:border-emerald-500/60 transition-all text-xs"
            >
              <div className="flex items-center gap-2.5">
                <Instagram className="h-5 w-5 text-pink-400" />
                <div>
                  <span className="font-semibold text-white block">Instagram</span>
                  <span className="text-[11px] text-emerald-400 font-mono">@{profile.instagramId}</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-400" />
            </a>

            <a
              href={profile.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500/40 transition-all text-xs"
            >
              <div className="flex items-center gap-2.5">
                <Youtube className="h-5 w-5 text-red-500" />
                <div>
                  <span className="font-semibold text-white block">YouTube Channel</span>
                  <span className="text-[11px] text-zinc-400 font-mono">{profile.youtubeName || 'Channel'}</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-400" />
            </a>

            <a
              href={profile.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/40 transition-all text-xs"
            >
              <div className="flex items-center gap-2.5">
                <Facebook className="h-5 w-5 text-blue-400" />
                <div>
                  <span className="font-semibold text-white block">Facebook Profile</span>
                  <span className="text-[11px] text-zinc-400 font-mono">{profile.facebookName || 'Profile'}</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-400" />
            </a>
          </div>
        </div>

        {/* Updates Subscription */}
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
          <div className="flex items-start gap-2.5">
            <Mail className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Get Workout & Travel Updates
              </h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Receive new workout routines, travel spots, and diet recipes directly to your inbox.
              </p>
            </div>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
              <Check className="h-4 w-4" />
              <span>Thank you! You are now subscribed to updates.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
            <ShieldCheck className="h-3 w-3" />
            <span>Zero spam. No annoying ads.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
