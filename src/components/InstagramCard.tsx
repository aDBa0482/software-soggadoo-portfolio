import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Instagram, ExternalLink, QrCode as QrIcon, CheckCircle2, Sparkles, Upload, Edit3 } from 'lucide-react';
import { UserProfile } from '../types/portfolio';

interface InstagramCardProps {
  profile: UserProfile;
  isOwner?: boolean;
  onOpenEdit?: () => void;
}

export const InstagramCard: React.FC<InstagramCardProps> = ({ profile, isOwner = false, onOpenEdit }) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    if (profile.instagramQrImage) {
      setQrCodeDataUrl(profile.instagramQrImage);
      return;
    }

    const targetUrl = profile.instagramUrl || `https://www.instagram.com/${profile.instagramId}/`;
    
    QRCode.toDataURL(targetUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: '#10b981',
        light: '#ffffff',
      },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('Error generating QR:', err));
  }, [profile.instagramId, profile.instagramUrl, profile.instagramQrImage]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#121b18]/90 via-[#0f1412]/95 to-[#0c0c0e]/95 p-6 shadow-2xl backdrop-blur-md">
      {/* Decorative gradient glow */}
      <div 
        className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true" 
      />

      <div className="flex flex-col sm:flex-row items-center gap-6">
        
        {/* QR Code Container */}
        <div className="relative shrink-0 flex flex-col items-center">
          <div className="relative p-3 rounded-2xl bg-white shadow-2xl border-4 border-emerald-500/30">
            {qrCodeDataUrl ? (
              <img
                src={qrCodeDataUrl}
                alt={`Instagram QR Code for ${profile.instagramId}`}
                className="h-36 w-36 sm:h-40 sm:w-40 object-contain"
              />
            ) : (
              <div className="h-36 w-36 flex items-center justify-center text-zinc-400">
                <QrIcon className="h-10 w-10 animate-spin" />
              </div>
            )}

            {/* Central Instagram Mini Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl bg-white shadow-md border border-emerald-400/40 text-emerald-600">
              <Instagram className="h-5 w-5" />
            </div>
          </div>

          <span className="mt-2.5 font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
            @{profile.instagramId}
          </span>
        </div>

        {/* Text Info & Follow Action */}
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Instagram className="h-3.5 w-3.5" />
            <span>Official Instagram Handle</span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
              <span>@{profile.instagramId}</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
              Scan this QR code with your mobile camera or tap below to follow my fitness workouts, travel reels, and daily lifestyle stories!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
            <a
              href={profile.instagramUrl || `https://www.instagram.com/${profile.instagramId}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
            >
              <Instagram className="h-4 w-4" />
              <span>Open Instagram Profile</span>
              <ExternalLink className="h-3.5 w-3.5 ml-0.5" />
            </a>

            {isOwner && onOpenEdit && (
              <button
                onClick={onOpenEdit}
                className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-amber-400 text-xs font-medium border border-amber-500/30 transition-colors"
                title="Only visible to you (Owner)"
              >
                <Edit3 className="h-3 w-3" />
                <span>Edit QR / ID</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
