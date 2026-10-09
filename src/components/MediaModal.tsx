import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Heart, 
  MessageSquare, 
  Share2, 
  MapPin, 
  Clock, 
  Dumbbell, 
  Utensils, 
  Compass, 
  CheckCircle2, 
  Send,
  Bookmark,
  Instagram,
  ExternalLink
} from 'lucide-react';
import { PortfolioItem, Comment } from '../types/portfolio';
import { CREATOR_PROFILE } from '../data/initialData';

function extractInstagramReelId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

function isHtml5Video(url?: string): boolean {
  if (!url) return false;
  return (
    url.startsWith('data:video/') ||
    url.startsWith('blob:') ||
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)
  );
}

interface MediaModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onToggleLike: (itemId: string) => void;
  onAddComment: (itemId: string, comment: Comment) => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  item,
  onClose,
  onToggleLike,
  onAddComment
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('Alex Turner');
  const [isSaved, setIsSaved] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Video progress animation when playing
  useEffect(() => {
    if (!item || item.mediaType !== 'video' || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 0.5));
    }, 200);
    return () => clearInterval(interval);
  }, [item, isPlaying]);

  if (!item) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: authorName.trim() || 'Visitor',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      text: commentText.trim(),
      timestamp: 'Just now'
    };

    onAddComment(item.id, newComment);
    setCommentText('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl rounded-2xl border border-zinc-800 bg-[#121216] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-zinc-300 hover:text-white transition-colors"
          title="Close modal (ESC)"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Column: Media Player / Lightbox Display */}
        <div className="relative lg:w-3/5 bg-black flex items-center justify-center min-h-[320px] sm:min-h-[440px] lg:min-h-[600px] overflow-hidden group">
          {(() => {
            const reelId = extractInstagramReelId(item.mediaUrl);
            const isVideo = isHtml5Video(item.mediaUrl);

            // 1. Instagram Reel Embed
            if (reelId) {
              return (
                <div className="w-full h-full min-h-[480px] flex flex-col items-center justify-center p-4 bg-zinc-950">
                  <iframe
                    src={`https://www.instagram.com/reel/${reelId}/embed/`}
                    className="w-full max-w-[380px] h-[520px] rounded-xl border border-zinc-800 shadow-2xl"
                    allowFullScreen
                    scrolling="no"
                  />
                  <a
                    href={item.mediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-xs text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Watch original Reel on Instagram</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              );
            }

            // 2. Playable HTML5 Video File (MP4, WebM, MOV)
            if (isVideo) {
              return (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <video
                    src={item.mediaUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full max-h-[650px] object-contain"
                  />
                  {item.socialSource === 'instagram' && (
                    <a
                      href={`https://www.instagram.com/${CREATOR_PROFILE.instagramId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-black/70 hover:bg-black text-pink-400 text-xs font-semibold flex items-center gap-1.5 border border-pink-500/30 transition-colors backdrop-blur-sm"
                    >
                      <Instagram className="h-3.5 w-3.5" />
                      <span>@{CREATOR_PROFILE.instagramId}</span>
                    </a>
                  )}
                </div>
              );
            }

            // 3. Image / Reel Poster View
            return (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="w-full h-full object-contain max-h-[650px]"
                  referrerPolicy="no-referrer"
                />

                {/* If it's tagged as video/reel, show an interactive video overlay */}
                {item.mediaType === 'video' && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded bg-black/70 text-xs font-mono text-amber-400 font-bold border border-amber-500/20">
                        REEL · {item.duration || '0:45'}
                      </span>
                      <a
                        href={`https://www.instagram.com/${CREATOR_PROFILE.instagramId}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded bg-black/70 hover:bg-black text-pink-400 text-xs font-semibold flex items-center gap-1 border border-pink-500/30 transition-colors"
                      >
                        <Instagram className="h-3.5 w-3.5" />
                        <span>Instagram Reel</span>
                      </a>
                    </div>

                    <div className="flex items-center justify-center">
                      <a
                        href={`https://www.instagram.com/${CREATOR_PROFILE.instagramId}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-pink-600 to-amber-600 text-white font-bold text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all"
                      >
                        <Play className="h-5 w-5 fill-current" />
                        <span>Watch on Instagram</span>
                      </a>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300">
                      <span>{item.title}</span>
                      <span>{item.views || '120K'} views</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Right Column: Creator Info, Details, Workout/Recipe Breakdown, Comments */}
        <div className="lg:w-2/5 flex flex-col justify-between p-5 sm:p-6 overflow-y-auto max-h-[50vh] lg:max-h-[650px] bg-[#121216]">
          
          <div className="space-y-5">
            {/* Creator Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <img
                  src={CREATOR_PROFILE.avatar}
                  alt={CREATOR_PROFILE.name}
                  className="h-10 w-10 rounded-full object-cover border border-amber-400/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white flex items-center gap-1">
                    {CREATOR_PROFILE.name}
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                  </h4>
                  <p className="text-xs text-zinc-400">{CREATOR_PROFILE.handle} · {item.publishedAt}</p>
                </div>
              </div>
            </div>

            {/* Post Title & Location */}
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                <span className="capitalize text-amber-400 font-semibold">{item.category}</span>
                {item.location && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-zinc-400" />
                      {item.location}
                    </span>
                  </>
                )}
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {item.title}
              </h2>
            </div>

            {/* Caption / Story */}
            <p className="text-sm text-zinc-300 leading-relaxed">
              {item.caption}
            </p>

            {/* Category Domain Information: Workout Breakdown / Recipe / Travel notes */}
            {item.category === 'fitness' && item.workoutDetails && (
              <div className="p-4 rounded-xl bg-zinc-900 border border-amber-500/20 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Dumbbell className="h-3.5 w-3.5" />
                    Workout Guide
                  </span>
                  <span className="text-zinc-300 font-mono">
                    {item.workoutDetails.difficulty} · {item.workoutDetails.durationMin}m
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  <span className="font-medium text-zinc-300">Equipment:</span> {item.workoutDetails.equipment}
                </p>
                <div className="space-y-1 pt-1">
                  {item.workoutDetails.exercises.map((ex, i) => (
                    <div key={i} className="text-xs text-zinc-200 flex items-start gap-1.5">
                      <span className="text-amber-400 font-mono text-[10px] mt-0.5">{i + 1}.</span>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.category === 'food' && item.recipeDetails && (
              <div className="p-4 rounded-xl bg-zinc-900 border border-emerald-500/20 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Utensils className="h-3.5 w-3.5" />
                    Nutrition & Recipe
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {item.recipeDetails.proteinGrams}g Protein · {item.recipeDetails.calories} kcal
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  <span className="font-medium text-zinc-300">Prep:</span> {item.recipeDetails.prepTimeMin} minutes
                </p>
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-semibold text-zinc-400 block">Ingredients:</span>
                  {item.recipeDetails.ingredients.map((ing, i) => (
                    <div key={i} className="text-xs text-zinc-200 flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.category === 'travel' && item.travelDetails && (
              <div className="p-4 rounded-xl bg-zinc-900 border border-blue-500/20 space-y-2">
                <span className="font-bold text-blue-400 uppercase tracking-wider text-xs flex items-center gap-1">
                  <Compass className="h-3.5 w-3.5" />
                  Expedition Dossier
                </span>
                <p className="text-xs text-zinc-300">
                  <span className="text-zinc-500 font-medium">Destination:</span> {item.travelDetails.country}
                </p>
                <p className="text-xs text-zinc-300">
                  <span className="text-zinc-500 font-medium">Best Season:</span> {item.travelDetails.bestSeason}
                </p>
                <p className="text-xs text-zinc-200 italic pt-1 border-t border-zinc-800">
                  "{item.travelDetails.highlight}"
                </p>
              </div>
            )}

            {/* Interactive Likes & Social Action Toolbar */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleLike(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    item.isLiked
                      ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                      : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${item.isLiked ? 'fill-current' : ''}`} />
                  <span className="font-mono tabular-nums">{item.likes.toLocaleString()}</span>
                </button>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSaved
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-300 bg-zinc-800/80 hover:bg-zinc-700 transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>{shareCopied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>

            {/* Comments List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300 uppercase tracking-wider">
                  Follower Discussions ({item.comments.length})
                </span>
              </div>

              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {item.comments.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic py-2">
                    No comments yet. Be the first follower to leave feedback!
                  </p>
                ) : (
                  item.comments.map((comm) => (
                    <div key={comm.id} className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-200">{comm.author}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">{comm.timestamp}</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">{comm.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Add Comment Input Form */}
          <form onSubmit={handleCommentSubmit} className="mt-4 pt-3 border-t border-zinc-800 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your Name"
                className="w-1/3 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
              />
              <span className="text-[11px] text-zinc-500">as commenter</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Ask about this workout, destination, or recipe..."
                className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="p-2 rounded-xl bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400 disabled:opacity-40 transition-all shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
