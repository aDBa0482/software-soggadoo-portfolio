export type Category = 'all' | 'fitness' | 'travel' | 'food' | 'lifestyle';

export type MediaType = 'video' | 'image';

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'fitness' | 'travel' | 'food' | 'lifestyle';
  mediaType: MediaType;
  mediaUrl: string;
  aspectRatio?: '16:9' | '4:3' | '9:16' | '1:1';
  caption: string;
  location?: string;
  duration?: string;
  views?: string;
  likes: number;
  isLiked?: boolean;
  comments: Comment[];
  isFeatured?: boolean;
  publishedAt: string;
  socialSource?: 'instagram' | 'youtube' | 'facebook' | 'portfolio';
  workoutDetails?: {
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    durationMin: number;
    equipment: string;
    focus: string;
    exercises: string[];
  };
  recipeDetails?: {
    calories: number;
    proteinGrams: number;
    prepTimeMin: number;
    ingredients: string[];
  };
  travelDetails?: {
    country: string;
    bestSeason: string;
    highlight: string;
  };
}

export interface UserProfile {
  name: string;
  handle: string;
  dateOfBirth: string;
  education: string;
  tagline: string;
  bio: string;
  avatar: string;
  heroImage: string;
  backgroundImage?: string;
  location: string;
  instagramId: string;
  instagramUrl: string;
  instagramQrImage?: string;
  facebookName: string;
  facebookUrl: string;
  youtubeName: string;
  youtubeUrl: string;
  tiktokHandle?: string;
  tiktokUrl?: string;
  stats: {
    totalFollowers: string;
    monthlyReach: string;
    engagementRate: string;
    countriesVisited: string;
  };
}

export interface SocialChannel {
  name: string;
  platform: 'instagram' | 'youtube' | 'facebook' | 'tiktok';
  handle: string;
  profileUrl: string;
  followers: string;
  description: string;
}
