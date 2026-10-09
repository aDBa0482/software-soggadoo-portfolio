import React, { useState } from 'react';
import { 
  Play, 
  Heart, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Flame, 
  Eye, 
  PlusCircle, 
  Utensils, 
  Compass, 
  Dumbbell,
  Instagram,
  Video
} from 'lucide-react';
import { PortfolioItem, Category } from '../types/portfolio';

type HighlightFilter = Category | 'reels';

interface FeaturedHighlightsProps {
  items: PortfolioItem[];
  isOwner?: boolean;
  onSelectItem: (item: PortfolioItem) => void;
  onOpenUpload: (defaultCategory?: 'fitness' | 'travel' | 'food' | 'lifestyle') => void;
}

export const FeaturedHighlights: React.FC<FeaturedHighlightsProps> = ({
  items,
  isOwner = false,
  onSelectItem,
  onOpenUpload,
}) => {
  const [activeFilter, setActiveFilter] = useState<HighlightFilter>('all');

  // Filter items that are marked as featured (or if user uploaded and marked)
  const featuredPool = items.filter(i => i.isFeatured || i.views);
  const filteredItems = activeFilter === 'all' 
    ? featuredPool 
    : activeFilter === 'reels'
    ? featuredPool.filter(i => i.mediaType === 'video' || i.socialSource === 'instagram' || i.aspectRatio === '9:16')
    : featuredPool.filter(i => i.category === activeFilter);

  return (
    <section id="highlights" className="py-16 lg:py-24 border-b border-zinc-800/80 bg-[#0c0c0e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <Flame className="h-4 w-4" />
              <span>Curated Portfolio Showcase</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Work & Highlights
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
              The highest-engagement fitness training videos, global expedition photography, and chef-curated nutrition recipes from my journey.
            </p>
          </div>

          {/* Interactive Filter Segmented Control & Upload Action */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeFilter === 'all'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                All Highlights
              </button>
              <button
                onClick={() => setActiveFilter('reels')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeFilter === 'reels'
                    ? 'bg-gradient-to-r from-pink-600 to-amber-600 text-white font-bold shadow-sm'
                    : 'text-pink-400 hover:text-pink-300'
                }`}
              >
                <Instagram className="h-3 w-3" />
                <span>Instagram Reels & Videos</span>
              </button>
              <button
                onClick={() => setActiveFilter('fitness')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeFilter === 'fitness'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Fitness
              </button>
              <button
                onClick={() => setActiveFilter('travel')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeFilter === 'travel'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Travel
              </button>
              <button
                onClick={() => setActiveFilter('food')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeFilter === 'food'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Food
              </button>
            </div>

            {isOwner && (
              <button
                onClick={() => onOpenUpload(activeFilter === 'all' ? undefined : activeFilter)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Add Highlight</span>
              </button>
            )}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            // First item gets a prominent 2-column or larger spotlight
            const isLarge = index === 0;

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/50 ${
                  isLarge ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Media Container */}
                <div className={`relative overflow-hidden ${isLarge ? 'h-[360px] sm:h-[440px]' : 'h-[320px] sm:h-[360px]'}`}>
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                  {/* Category & Media Type Pill */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-white">
                      {item.category === 'fitness' && <Dumbbell className="h-3 w-3 text-amber-400" />}
                      {item.category === 'travel' && <Compass className="h-3 w-3 text-blue-400" />}
                      {item.category === 'food' && <Utensils className="h-3 w-3 text-emerald-400" />}
                      <span className="capitalize">{item.category}</span>
                    </span>

                    {item.socialSource === 'instagram' ? (
                      <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-pink-600/90 text-white font-bold backdrop-blur-md">
                        <Instagram className="h-3 w-3" />
                        <span>Instagram Reel</span>
                      </span>
                    ) : item.mediaType === 'video' ? (
                      <span className="flex items-center gap-1 px-2 py-1 text-xs font-mono font-medium rounded-md bg-amber-500 text-zinc-950 font-bold">
                        <Play className="h-3 w-3 fill-current" />
                        <span>{item.duration || 'Video'}</span>
                      </span>
                    ) : null}
                  </div>

                  {/* Top Right: Location or Source */}
                  {item.location && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 text-xs rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-zinc-300">
                      <MapPin className="h-3 w-3 text-amber-400 shrink-0" />
                      <span className="truncate max-w-[150px]">{item.location}</span>
                    </div>
                  )}

                  {/* Video Play Central Overlay Button (if video) */}
                  {item.mediaType === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/90 text-zinc-950 shadow-xl backdrop-blur-sm group-hover:scale-110 group-hover:bg-amber-400 transition-all">
                        <Play className="h-6 w-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Content Card Info */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    {/* Unboxed Metadata row */}
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      {item.views && (
                        <>
                          <span className="flex items-center gap-1 font-mono tabular-nums text-white">
                            <Eye className="h-3 w-3 text-zinc-400" />
                            {item.views}
                          </span>
                          <span className="text-zinc-500" aria-hidden="true">·</span>
                        </>
                      )}
                      <span>{item.publishedAt}</span>
                      {item.workoutDetails && (
                        <>
                          <span className="text-zinc-500" aria-hidden="true">·</span>
                          <span className="text-amber-400 font-medium">{item.workoutDetails.difficulty}</span>
                        </>
                      )}
                      {item.recipeDetails && (
                        <>
                          <span className="text-zinc-500" aria-hidden="true">·</span>
                          <span className="text-emerald-400 font-medium">{item.recipeDetails.proteinGrams}g Protein</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>

                    {/* Social Counters / Metrics */}
                    <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs text-zinc-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 hover:text-red-400 transition-colors">
                          <Heart className={`h-3.5 w-3.5 ${item.isLiked ? 'text-red-500 fill-red-500' : ''}`} />
                          <span className="font-mono tabular-nums">{item.likes.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span className="font-mono tabular-nums">{item.comments.length}</span>
                        </span>
                      </div>
                      <span className="text-amber-400 font-medium text-xs group-hover:translate-x-1 transition-transform">
                        View Details →
                      </span>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
