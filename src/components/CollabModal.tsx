import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  TrendingUp, 
  Globe, 
  Users, 
  Send, 
  Check, 
  Sparkles,
  Download,
  Award
} from 'lucide-react';
import { CREATOR_PROFILE } from '../data/initialData';

interface CollabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollabModal: React.FC<CollabModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brand, setBrand] = useState('');
  const [budget, setBudget] = useState('$5,000 - $15,000');
  const [campaignType, setCampaignType] = useState('Multi-Platform Campaign');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !brand) return;
    setSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-zinc-800 bg-[#121216] shadow-2xl p-6 sm:p-8 space-y-6 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Briefcase className="h-4 w-4" />
            <span>Media Kit & Brand Partnerships</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Partner with {CREATOR_PROFILE.name}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Connecting premium fitness, travel hospitality, wellness, and culinary brands with an authentic, high-converting global audience.
          </p>
        </div>

        {/* Verified Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <div>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Total Reach</span>
            <span className="font-mono text-xl font-bold text-white tabular-nums">1.42M+</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Engagement</span>
            <span className="font-mono text-xl font-bold text-amber-400 tabular-nums">4.8%</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Audience Age</span>
            <span className="font-mono text-xl font-bold text-white tabular-nums">18–34 (68%)</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Top Region</span>
            <span className="font-mono text-xl font-bold text-white tabular-nums">US / UK / EU</span>
          </div>
        </div>

        {/* Brand Roster */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
            Select Past Collaborators:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {['Nike Training', 'Gymshark', 'Four Seasons Resorts', 'Erewhon Organic', 'Lululemon', 'WHOOP'].map((brandName, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300"
              >
                {brandName}
              </span>
            ))}
          </div>
        </div>

        {/* Inquiry Form */}
        {submitted ? (
          <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Check className="h-6 w-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-white">
              Inquiry Dispatched Successfully
            </h4>
            <p className="text-xs text-zinc-300 max-w-sm mx-auto">
              Thank you, {name}. Aria's management team will review your proposal and respond within 24 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
              Direct Partnership Inquiry:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Brand / Agency"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Campaign Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                >
                  <option>$2,500 - $5,000</option>
                  <option>$5,000 - $15,000</option>
                  <option>$15,000 - $35,000</option>
                  <option>$35,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Deliverables</label>
                <select
                  value={campaignType}
                  onChange={(e) => setCampaignType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                >
                  <option>Multi-Platform Campaign</option>
                  <option>Dedicated YouTube Integration</option>
                  <option>Instagram Reels & Stories</option>
                  <option>Destination / Hotel Residency</option>
                  <option>Long-Term Brand Ambassador</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-zinc-400 mb-1">Brief Proposal / Objectives</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                placeholder="Share your timeline, target deliverables, or campaign vision..."
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                <span>Submit Collaboration Brief</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
