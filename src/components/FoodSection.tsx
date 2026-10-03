import React from 'react';
import { Utensils, Flame, Clock, PlusCircle, Heart, MessageSquare, Sparkles } from 'lucide-react';
import { PortfolioItem } from '../types/portfolio';

interface FoodSectionProps {
  items: PortfolioItem[];
  isOwner?: boolean;
  onSelectItem: (item: PortfolioItem) => void;
  onOpenUpload: () => void;
}

export const FoodSection: React.FC<FoodSectionProps> = ({
  items,
  isOwner = false,
  onSelectItem,
  onOpenUpload,
}) => {
  const foodItems = items.filter(i => i.category === 'food');

  return (
    <section id="food" className="py-16 lg:py-24 border-b border-zinc-800/80 bg-[#0c0c0e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <Utensils className="h-4 w-4" />
              <span>Category Focus 03</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Conscious Culinary & Nutrition
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
              Nourishing athletic recovery with high-protein plant-forward recipes, global market discoveries, and guilt-free gastronomic craftsmanship.
            </p>
          </div>

          {isOwner && (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenUpload}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/10 active:scale-[0.98]"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Upload Recipe / Dish</span>
              </button>
            </div>
          )}
        </div>

        {/* Nutrition Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">30g+ Protein Floor</h3>
              <p className="text-zinc-400 text-xs mt-0.5">
                Every main meal is formulated to deliver substantial bioavailable protein for muscle preservation.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Whole-Food Micros</h3>
              <p className="text-zinc-400 text-xs mt-0.5">
                Unprocessed superfoods loaded with polyphenol antioxidants and natural gut fiber.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Under 25-Min Prep</h3>
              <p className="text-zinc-400 text-xs mt-0.5">
                Streamlined culinary techniques that respect a busy, globe-trotting fitness lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {foodItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-emerald-500/40 hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Image Banner */}
              <div className="relative h-72 overflow-hidden bg-zinc-950">
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Macro Badge Overlay */}
                {item.recipeDetails && (
                  <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-emerald-500 text-zinc-950 font-bold text-xs shadow-md">
                      {item.recipeDetails.proteinGrams}g Protein
                    </span>
                    <span className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-xs">
                      {item.recipeDetails.calories} kcal
                    </span>
                    <span className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-zinc-300 text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3 text-emerald-400" />
                      {item.recipeDetails.prepTimeMin} min prep
                    </span>
                  </div>
                )}
              </div>

              {/* Content info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span>{item.location || 'Kitchen Studio'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.publishedAt}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {item.caption}
                  </p>

                  {/* Sample Ingredients list */}
                  {item.recipeDetails?.ingredients && (
                    <div className="pt-3 border-t border-zinc-800">
                      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        Key Ingredients ({item.recipeDetails.ingredients.length}):
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.recipeDetails.ingredients.slice(0, 4).map((ing, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 text-xs"
                          >
                            {ing.split(',')[0]}
                          </span>
                        ))}
                        {item.recipeDetails.ingredients.length > 4 && (
                          <span className="px-2 py-0.5 rounded bg-zinc-800/40 text-zinc-400 text-xs">
                            +{item.recipeDetails.ingredients.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

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
                  <span className="text-emerald-400 font-medium">View Full Recipe & Steps →</span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
