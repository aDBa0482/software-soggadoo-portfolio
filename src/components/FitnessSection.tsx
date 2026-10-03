import React from 'react';
import { Dumbbell, Play, PlusCircle, Flame, CheckCircle, Clock, Heart, MessageSquare } from 'lucide-react';
import { PortfolioItem } from '../types/portfolio';

interface FitnessSectionProps {
  items: PortfolioItem[];
  isOwner?: boolean;
  onSelectItem: (item: PortfolioItem) => void;
  onOpenUpload: () => void;
}

export const FitnessSection: React.FC<FitnessSectionProps> = ({
  items,
  isOwner = false,
  onSelectItem,
  onOpenUpload,
}) => {
  const fitnessItems = items.filter(i => i.category === 'fitness');

  return (
    <section id="fitness" className="py-16 lg:py-24 border-b border-zinc-800/80 bg-[#0c0c0e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <Dumbbell className="h-4 w-4" />
              <span>Category Focus 01</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Functional Fitness & Mobility
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
              High-intensity metabolic conditioning, athletic longevity, and kettlebell strength designed to build a resilient, capable physique for life's biggest adventures.
            </p>
          </div>

          {isOwner && (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenUpload}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/10 active:scale-[0.98]"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Upload Fitness Video / Photo</span>
              </button>
            </div>
          )}
        </div>

        {/* Fitness Pillars / Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-amber-400 font-mono text-xs font-semibold">PILLAR 01</span>
            <h3 className="text-white font-semibold text-sm mt-1">Multi-Planar Longevity</h3>
            <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
              Prioritizing rotational strength and deep joint mobility before loading heavy weight.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-amber-400 font-mono text-xs font-semibold">PILLAR 02</span>
            <h3 className="text-white font-semibold text-sm mt-1">Outdoor Functional Flow</h3>
            <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
              Taking workouts out of stale gym basements into natural sunshine, beaches, and mountain trails.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-amber-400 font-mono text-xs font-semibold">PILLAR 03</span>
            <h3 className="text-white font-semibold text-sm mt-1">Metabolic Precision</h3>
            <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
              Targeted 20 to 45 minute workouts engineered for optimal cardiovascular and hypertrophy response.
            </p>
          </div>
        </div>

        {/* Fitness Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fitnessItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Media Container */}
              <div className="relative h-64 overflow-hidden bg-zinc-950">
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Duration Badge if video */}
                {item.mediaType === 'video' && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-xs font-mono text-amber-400 font-bold border border-amber-500/20">
                    <Play className="h-3 w-3 fill-current" />
                    <span>{item.duration || 'Video'}</span>
                  </div>
                )}

                {item.workoutDetails && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-xs font-medium text-zinc-300 border border-white/10">
                    {item.workoutDetails.difficulty} · {item.workoutDetails.durationMin} Min
                  </div>
                )}

                {/* Play Button Trigger */}
                {item.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-zinc-950 shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span>{item.location || 'Outdoor Studio'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.publishedAt}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>

                  {/* Workout Exercises Highlights */}
                  {item.workoutDetails?.exercises && (
                    <div className="pt-2 border-t border-zinc-800/80">
                      <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Sample Exercises ({item.workoutDetails.exercises.length}):
                      </p>
                      <ul className="space-y-1">
                        {item.workoutDetails.exercises.slice(0, 2).map((ex, i) => (
                          <li key={i} className="text-xs text-zinc-300 flex items-center gap-1.5 truncate">
                            <CheckCircle className="h-3 w-3 text-amber-400 shrink-0" />
                            <span className="truncate">{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs text-zinc-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Heart className={`h-3.5 w-3.5 ${item.isLiked ? 'text-red-500 fill-red-500' : ''}`} />
                      <span className="font-mono tabular-nums">{item.likes.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span className="font-mono tabular-nums">{item.comments.length}</span>
                    </span>
                  </div>
                  <span className="text-amber-400 font-medium">Start Workout →</span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
