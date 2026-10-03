import React from 'react';
import { Compass, MapPin, Calendar, PlusCircle, Play, Heart, MessageSquare, Globe2 } from 'lucide-react';
import { PortfolioItem } from '../types/portfolio';

interface TravelSectionProps {
  items: PortfolioItem[];
  isOwner?: boolean;
  onSelectItem: (item: PortfolioItem) => void;
  onOpenUpload: () => void;
}

export const TravelSection: React.FC<TravelSectionProps> = ({
  items,
  isOwner = false,
  onSelectItem,
  onOpenUpload,
}) => {
  const travelItems = items.filter(i => i.category === 'travel');

  return (
    <section id="travel" className="py-16 lg:py-24 border-b border-zinc-800/80 bg-[#0f0f12]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              <Compass className="h-4 w-4" />
              <span>Category Focus 02</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Global Expeditions & Travel Diaries
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
              Exploring 42 countries through the lens of rugged coastal treks, architectural heritage, open sea sailing, and immersion into local traditions.
            </p>
          </div>

          {isOwner && (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenUpload}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/10 active:scale-[0.98]"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Upload Travel Photo / Reel</span>
              </button>
            </div>
          )}
        </div>

        {/* Travel Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {travelItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900/90 overflow-hidden hover:border-blue-500/40 hover:shadow-2xl transition-all duration-300"
            >
              {/* Media Preview */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-zinc-950">
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                {/* Location Badge */}
                {item.location && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md text-xs font-medium text-white border border-white/10">
                    <MapPin className="h-3.5 w-3.5 text-blue-400" />
                    <span>{item.location}</span>
                  </div>
                )}

                {item.mediaType === 'video' && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-600 text-white font-mono text-xs font-bold">
                    <Play className="h-3 w-3 fill-current" />
                    <span>{item.duration || 'Vlog'}</span>
                  </div>
                )}

                {item.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 fill-current ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span>Published {item.publishedAt}</span>
                  {item.travelDetails?.country && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-blue-400 font-medium">{item.travelDetails.country}</span>
                    </>
                  )}
                  {item.travelDetails?.bestSeason && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>Best time: {item.travelDetails.bestSeason}</span>
                    </>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {item.caption}
                </p>

                {item.travelDetails?.highlight && (
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs">
                    <span className="font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                      Traveler's Secret:
                    </span>
                    <p className="text-zinc-200">
                      {item.travelDetails.highlight}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs text-zinc-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Heart className={`h-3.5 w-3.5 ${item.isLiked ? 'text-red-500 fill-red-500' : ''}`} />
                      <span className="font-mono tabular-nums">{item.likes.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span className="font-mono tabular-nums">{item.comments.length}</span>
                    </span>
                  </div>
                  <span className="text-blue-400 font-medium">Explore Guide & Photos →</span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
