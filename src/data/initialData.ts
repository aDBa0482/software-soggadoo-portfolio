import { PortfolioItem, UserProfile } from '../types/portfolio';

// Local generated image assets
import heroPortrait from '../assets/images/hero_creator_editorial_1791025428527.jpg';
import fitnessWorkout from '../assets/images/content_fitness_workout_1791025366895.jpg';
import contentTravelWanderlust from '../assets/images/content_travel_wanderlust_1791025386270.jpg';
import contentFoodNourish from '../assets/images/content_food_nourish_1791025399906.jpg';
import lifestyleSerenity from '../assets/images/content_lifestyle_serenity_1791025409536.jpg';
import reelFitnessCore from '../assets/images/reel_fitness_core_1791025447491.jpg';
import reelTravelSunset from '../assets/images/reel_travel_sunset_1791025459165.jpg';
import foodArtisanPasta from '../assets/images/food_artisan_pasta_1791025472766.jpg';
import heroLandscapeBackdrop from '../assets/images/hero_landscape_backdrop_1791027120745.jpg';

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: "Shaik Ahammad",
  handle: "@software_soggadoo",
  dateOfBirth: "20 Jan 1997",
  education: "B.Tech Graduate (ECE) - VITS College Kavali",
  tagline: "Fitness, Travel, Food & Lifestyle Influencer",
  bio: "B.Tech in Electronics & Communication Engineering (ECE) from VITS College Kavali. Passionate about strength training, healthy food nutrition, and discovering breathtaking travel destinations. Welcome to my personal portfolio!",
  avatar: heroPortrait,
  heroImage: heroPortrait,
  backgroundImage: heroLandscapeBackdrop,
  location: "Kavali, Andhra Pradesh & Explorer",
  instagramId: "software_soggadoo",
  instagramUrl: "https://www.instagram.com/software_soggadoo/",
  instagramQrImage: "", // Will be dynamically generated via QRCode or custom uploaded by user
  facebookName: "Shaik Ahammad (Click to Add URL)",
  facebookUrl: "https://www.facebook.com",
  youtubeName: "Shaik Ahammad Channel (Click to Add URL)",
  youtubeUrl: "https://www.youtube.com",
  tiktokHandle: "@software_soggadoo",
  tiktokUrl: "https://www.tiktok.com",
  stats: {
    totalFollowers: "250K+",
    monthlyReach: "1.2M",
    engagementRate: "5.4%",
    countriesVisited: "12+",
  }
};

export const CREATOR_PROFILE = DEFAULT_USER_PROFILE;

export const INITIAL_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "fit-01",
    title: "Morning Functional Core & Mobility Routine",
    category: "fitness",
    mediaType: "video",
    mediaUrl: reelFitnessCore,
    aspectRatio: "9:16",
    caption: "A 20-minute bodyweight routine to unlock tight hips, activate core stability, and build healthy posture after sitting at the desk.",
    location: "Sunrise Beach Fitness",
    duration: "20:15",
    views: "180K",
    likes: 12400,
    isLiked: false,
    isFeatured: true,
    socialSource: "instagram",
    publishedAt: "2 days ago",
    workoutDetails: {
      difficulty: "Intermediate",
      durationMin: 20,
      equipment: "Bodyweight & Mat",
      focus: "Core Stability, Hip Mobility",
      exercises: [
        "Dynamic Hip Flexor Stretch (5 reps / side)",
        "Dead Bugs (4 sets x 12 reps)",
        "Deep Squats (3 sets x 15 reps)",
        "Side Plank Holds (3 sets x 30s)"
      ]
    },
    comments: [
      {
        id: "c1",
        author: "Praveen Kumar",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
        text: "Super routine bro! Very useful for engineers sitting long hours.",
        timestamp: "1 day ago"
      }
    ]
  },
  {
    id: "trv-01",
    title: "Exploring Scenic Coastlines & Mountain Viewpoints",
    category: "travel",
    mediaType: "image",
    mediaUrl: contentTravelWanderlust,
    aspectRatio: "4:3",
    caption: "Catching the morning sun across tranquil waters. Travel clears the mind and gives fresh perspective to life.",
    location: "Coastal Expedition",
    views: "220K",
    likes: 19800,
    isLiked: true,
    isFeatured: true,
    socialSource: "instagram",
    publishedAt: "4 days ago",
    travelDetails: {
      country: "India & Beyond",
      bestSeason: "October to March",
      highlight: "Sunrise cliffs and hidden beaches"
    },
    comments: [
      {
        id: "c2",
        author: "Kiran V",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
        text: "Awesome photography Shaik! Where was this shot?",
        timestamp: "2 days ago"
      }
    ]
  },
  {
    id: "food-01",
    title: "High-Protein Superfood Bowl for Post-Workout",
    category: "food",
    mediaType: "image",
    mediaUrl: contentFoodNourish,
    aspectRatio: "4:3",
    caption: "Clean eating: 32g protein, antioxidant-rich fresh fruits, nuts, and seeds. Simple, tasty, and perfect for muscle recovery.",
    location: "Healthy Kitchen Studio",
    views: "140K",
    likes: 11200,
    isLiked: false,
    isFeatured: true,
    socialSource: "instagram",
    publishedAt: "5 days ago",
    recipeDetails: {
      calories: 420,
      proteinGrams: 32,
      prepTimeMin: 10,
      ingredients: [
        "1 cup Greek yogurt or Plant Protein base",
        "Handful of blueberries & fresh dragon fruit",
        "1 tbsp chia seeds & toasted almonds",
        "Drizzle of pure honey"
      ]
    },
    comments: []
  },
  {
    id: "fit-02",
    title: "Strength & Conditioning Session",
    category: "fitness",
    mediaType: "image",
    mediaUrl: fitnessWorkout,
    aspectRatio: "4:3",
    caption: "Building strength and discipline daily. Consistency over intensity always wins.",
    location: "Open Air Training",
    views: "95K",
    likes: 8700,
    isLiked: false,
    isFeatured: false,
    socialSource: "portfolio",
    publishedAt: "1 week ago",
    workoutDetails: {
      difficulty: "Intermediate",
      durationMin: 40,
      equipment: "Dumbbells / Barbells",
      focus: "Upper Body & Core Power",
      exercises: [
        "Overhead Press (4 sets x 10 reps)",
        "Pull-ups (4 sets x 8 reps)",
        "Dumbbell Rows (3 sets x 12 reps)"
      ]
    },
    comments: []
  },
  {
    id: "trv-02",
    title: "Sunset Serenity by the Water",
    category: "travel",
    mediaType: "video",
    mediaUrl: reelTravelSunset,
    aspectRatio: "9:16",
    caption: "Golden hour glow. One of the most peaceful evenings recorded on camera.",
    location: "Seaside Gateway",
    duration: "12:30",
    views: "160K",
    likes: 15400,
    isLiked: false,
    isFeatured: false,
    socialSource: "instagram",
    publishedAt: "2 weeks ago",
    comments: []
  },
  {
    id: "food-02",
    title: "Wholesome Fresh Pasta with Heirlooms & Basil",
    category: "food",
    mediaType: "image",
    mediaUrl: foodArtisanPasta,
    aspectRatio: "4:3",
    caption: "Balancing healthy meals with rich flavor. Made with fresh herbs and quality olive oil.",
    location: "Culinary Journal",
    views: "110K",
    likes: 9400,
    isLiked: false,
    isFeatured: false,
    socialSource: "portfolio",
    publishedAt: "2 weeks ago",
    recipeDetails: {
      calories: 520,
      proteinGrams: 20,
      prepTimeMin: 20,
      ingredients: [
        "Fresh handmade pasta",
        "Ripe cherry tomatoes & garlic",
        "Extra virgin olive oil",
        "Fresh basil & grated parmesan"
      ]
    },
    comments: []
  }
];
