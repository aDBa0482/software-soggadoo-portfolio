import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Dumbbell, 
  Compass, 
  Utensils, 
  Sparkles, 
  Check, 
  Plus, 
  Trash2,
  AlertCircle 
} from 'lucide-react';
import { PortfolioItem, Category } from '../types/portfolio';
import { compressImageFile } from '../utils/storage';

// Presets for quick upload testing if user doesn't have local media on hand
import reelFitnessCore from '../assets/images/reel_fitness_core_1791025447491.jpg';
import contentTravelWanderlust from '../assets/images/content_travel_wanderlust_1791025386270.jpg';
import foodArtisanPasta from '../assets/images/food_artisan_pasta_1791025472766.jpg';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadItem: (item: PortfolioItem) => void;
  defaultCategory?: 'fitness' | 'travel' | 'food' | 'lifestyle';
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUploadItem,
  defaultCategory = 'fitness'
}) => {
  const [category, setCategory] = useState<'fitness' | 'travel' | 'food' | 'lifestyle'>(defaultCategory);
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('15:00');
  const [isFeatured, setIsFeatured] = useState(true);
  const [mediaPreview, setMediaPreview] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Fitness metadata
  const [workoutDifficulty, setWorkoutDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [workoutDurationMin, setWorkoutDurationMin] = useState(25);
  const [workoutEquipment, setWorkoutEquipment] = useState('Kettlebell & Mat');
  const [workoutFocus, setWorkoutFocus] = useState('Total Body Functional Burn');
  const [exercisesText, setExercisesText] = useState('Goblet Squats (4x12)\nPush Press (4x10)\nMountain Climbers (4x45s)');

  // Food metadata
  const [foodCalories, setFoodCalories] = useState(480);
  const [foodProtein, setFoodProtein] = useState(38);
  const [foodPrepTime, setFoodPrepTime] = useState(15);
  const [foodIngredients, setFoodIngredients] = useState('Organic Tempeh or Chicken Breast\nAvocado & Hemp Seeds\nQuinoa & Steamed Greens');

  // Travel metadata
  const [travelCountry, setTravelCountry] = useState('Portugal');
  const [travelSeason, setTravelSeason] = useState('Spring / Autumn');
  const [travelHighlight, setTravelHighlight] = useState('Coastal trail connecting Sintra cliffs to Cascais bay');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isProcessingFile, setIsProcessingFile] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setError('File size exceeds 50MB limit.');
      return;
    }

    try {
      setIsProcessingFile(true);
      setError('');
      if (file.type.startsWith('image/')) {
        const compressed = await compressImageFile(file, 1400, 1400, 0.84);
        setMediaPreview(compressed);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          setMediaPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error('Error processing media upload:', err);
      setError('Failed to process image file. Please try another image.');
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleApplyPreset = (presetUrl: string, presetType: 'video' | 'image', cat: 'fitness' | 'travel' | 'food' | 'lifestyle') => {
    setMediaPreview(presetUrl);
    setMediaType(presetType);
    setCategory(cat);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a title for your post.');
      return;
    }
    if (!mediaPreview) {
      setError('Please upload an image/video file or select a sample preset.');
      return;
    }

    const newItem: PortfolioItem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      mediaType,
      mediaUrl: mediaPreview,
      caption: caption.trim() || 'No caption provided.',
      location: location.trim() || undefined,
      duration: mediaType === 'video' ? duration : undefined,
      views: '1.2K',
      likes: 1,
      isLiked: true,
      comments: [],
      isFeatured,
      publishedAt: 'Just now',
      socialSource: 'portfolio',
    };

    if (category === 'fitness') {
      newItem.workoutDetails = {
        difficulty: workoutDifficulty,
        durationMin: Number(workoutDurationMin) || 20,
        equipment: workoutEquipment,
        focus: workoutFocus,
        exercises: exercisesText.split('\n').filter(Boolean),
      };
    } else if (category === 'food') {
      newItem.recipeDetails = {
        calories: Number(foodCalories) || 400,
        proteinGrams: Number(foodProtein) || 30,
        prepTimeMin: Number(foodPrepTime) || 15,
        ingredients: foodIngredients.split('\n').filter(Boolean),
      };
    } else if (category === 'travel') {
      newItem.travelDetails = {
        country: travelCountry,
        bestSeason: travelSeason,
        highlight: travelHighlight,
      };
    }

    onUploadItem(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-zinc-800 bg-[#121216] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Creator Studio — Upload Media
              </h3>
              <p className="text-xs text-zinc-400">
                Publish a fitness video, travel story, or culinary recipe directly to your portfolio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Category & Media Type Switchers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Content Category
              </label>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setCategory('fitness')}
                  className={`py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    category === 'fitness' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Fitness
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('travel')}
                  className={`py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    category === 'travel' ? 'bg-blue-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Travel
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('food')}
                  className={`py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    category === 'food' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Food
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('lifestyle')}
                  className={`py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    category === 'lifestyle' ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Lifestyle
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Media Format
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setMediaType('video')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    mediaType === 'video' ? 'bg-zinc-800 text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Video className="h-3.5 w-3.5" />
                  <span>Video Reel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMediaType('image')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    mediaType === 'image' ? 'bg-zinc-800 text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>Photo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Media Upload Area */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Select or Drop File
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-800 hover:border-amber-500/50 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-zinc-900/40 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {mediaPreview ? (
                <div className="relative inline-block max-h-48 rounded-xl overflow-hidden border border-zinc-700">
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="max-h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-3 py-1 bg-black/80 text-white text-xs rounded-lg">
                      Click to change file
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-amber-400 group-hover:bg-zinc-700 transition-colors">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-white">
                    Click to browse your device
                  </p>
                  <p className="text-xs text-zinc-500">
                    Supports high-res PNG, JPG, MP4, WebM (up to 25MB)
                  </p>
                </div>
              )}
            </div>

            {/* Quick Demo Presets */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[11px] text-zinc-500 font-medium">Or quick sample:</span>
              <button
                type="button"
                onClick={() => handleApplyPreset(reelFitnessCore, 'video', 'fitness')}
                className="text-[11px] text-amber-400 hover:underline px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800"
              >
                Sample Fitness Reel
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset(contentTravelWanderlust, 'image', 'travel')}
                className="text-[11px] text-blue-400 hover:underline px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800"
              >
                Sample Travel Photo
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset(foodArtisanPasta, 'image', 'food')}
                className="text-[11px] text-emerald-400 hover:underline px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800"
              >
                Sample Food Dish
              </button>
            </div>
          </div>

          {/* Title & Caption */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Post Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 20-Min Coastal Dumbbell Conditioning or Positano Hidden Coves"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Caption & Story
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={3}
                placeholder="Share workout cues, travel tips, ingredients, or lifestyle insights..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bali, Uluwatu Cliffs or Los Angeles"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {mediaType === 'video' && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Duration (e.g. 15:40)
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="15:00"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Conditional Category Specific Details */}
          {category === 'fitness' && (
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-amber-500/20 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Dumbbell className="h-3.5 w-3.5" />
                Fitness Workout Breakdown
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Difficulty</label>
                  <select
                    value={workoutDifficulty}
                    onChange={(e) => setWorkoutDifficulty(e.target.value as any)}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Equipment</label>
                  <input
                    type="text"
                    value={workoutEquipment}
                    onChange={(e) => setWorkoutEquipment(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Exercise List (one per line)</label>
                <textarea
                  value={exercisesText}
                  onChange={(e) => setExercisesText(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white resize-none"
                />
              </div>
            </div>
          )}

          {category === 'food' && (
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-emerald-500/20 space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="h-3.5 w-3.5" />
                Nutrition & Macros Breakdown
              </h4>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={foodProtein}
                    onChange={(e) => setFoodProtein(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={foodCalories}
                    onChange={(e) => setFoodCalories(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Prep Time (min)</label>
                  <input
                    type="number"
                    value={foodPrepTime}
                    onChange={(e) => setFoodPrepTime(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Key Ingredients (one per line)</label>
                <textarea
                  value={foodIngredients}
                  onChange={(e) => setFoodIngredients(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white resize-none"
                />
              </div>
            </div>
          )}

          {category === 'travel' && (
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-blue-500/20 space-y-3">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5" />
                Travel Expedition Notes
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Country / Region</label>
                  <input
                    type="text"
                    value={travelCountry}
                    onChange={(e) => setTravelCountry(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Best Season</label>
                  <input
                    type="text"
                    value={travelSeason}
                    onChange={(e) => setTravelSeason(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Traveler's Secret / Highlight</label>
                <input
                  type="text"
                  value={travelHighlight}
                  onChange={(e) => setTravelHighlight(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* Featured Toggle */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-700 text-amber-500 focus:ring-amber-400"
            />
            <label htmlFor="isFeatured" className="text-xs text-zinc-300 cursor-pointer">
              Pin to <span className="font-semibold text-white">Featured Work & Highlights</span> showcase
            </label>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 active:scale-[0.98]"
            >
              <Check className="h-4 w-4" />
              <span>Publish to Portfolio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
