import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Twitter, 
  QrCode,
  Download
} from 'lucide-react';
import QRCode from 'qrcode';
import { UserProfile } from '../types/portfolio';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Use the public shared URL or fallback to current origin
  const shareUrl = window.location.href.split('?')[0];

  React.useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(shareUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#10b981',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Error generating website QR:', err));
    }
  }, [isOpen, shareUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const shareText = encodeURIComponent(
    `Check out ${profile.name}'s official portfolio (@${profile.instagramId}) — Fitness, Travel, Food & Lifestyle:\n${shareUrl}`
  );

  const downloadQrCode = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${profile.instagramId}_portfolio_qr.png`;
    link.click();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#121216] shadow-2xl p-6 sm:p-7 space-y-6 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Share2 className="h-7 w-7" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Share Your Portfolio Website
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Share this link with your followers on Instagram, WhatsApp, Facebook, and YouTube!
          </p>
        </div>

        {/* 1-Click Copy Link Box */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-zinc-300">
            Your Public Website Link:
          </label>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900 border border-zinc-700">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent text-xs sm:text-sm font-mono text-emerald-400 px-2 select-all focus:outline-none truncate"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors shrink-0 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Social Share Buttons */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            1-Click Direct Share:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-bold transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>

            {/* Twitter / X */}
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-bold transition-colors"
            >
              <Twitter className="h-4 w-4" />
              <span>Twitter / X</span>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold transition-colors col-span-2 sm:col-span-1"
            >
              <Facebook className="h-4 w-4" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* Instagram Bio Guide */}
        <div className="p-4 rounded-xl bg-zinc-900 border border-pink-500/20 space-y-2">
          <div className="flex items-center gap-2 text-pink-400 font-bold text-xs uppercase">
            <Instagram className="h-4 w-4" />
            <span>How to add to your Instagram Bio (@{profile.instagramId}):</span>
          </div>
          <ol className="text-xs text-zinc-300 space-y-1 list-decimal list-inside pl-1 leading-relaxed">
            <li>Copy your website link using the button above.</li>
            <li>Open Instagram and go to your profile <strong>@{profile.instagramId}</strong>.</li>
            <li>Tap <strong>Edit Profile</strong> → <strong>Links</strong> → <strong>Add External Link</strong>.</li>
            <li>Paste your URL and set Title to <em>"My Fitness & Travel Portfolio"</em>!</li>
          </ol>
        </div>

        {/* Website Scannable QR Code */}
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {qrDataUrl && (
              <img
                src={qrDataUrl}
                alt="Website QR Code"
                className="h-16 w-16 rounded-lg bg-white p-1 object-contain shrink-0"
              />
            )}
            <div>
              <h4 className="text-xs font-bold text-white">
                Website QR Code
              </h4>
              <p className="text-[11px] text-zinc-400">
                Download to print on cards or post on your Instagram Story
              </p>
            </div>
          </div>

          <button
            onClick={downloadQrCode}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium border border-zinc-700 transition-colors shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Save QR</span>
          </button>
        </div>

      </div>
    </div>
  );
};
