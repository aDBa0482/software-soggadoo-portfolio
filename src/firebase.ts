import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { UserProfile, PortfolioItem } from './types/portfolio';

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firestore with specific Database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const PROFILE_DOC_PATH = 'profiles/creator';
const ITEMS_COLLECTION_PATH = 'items';

/**
 * Fetch profile from Cloud Firestore
 */
export async function getCloudProfile(): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, 'profiles', 'creator');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (err) {
    console.warn('Could not fetch profile from Firebase:', err);
  }
  return null;
}

/**
 * Save profile to Cloud Firestore so all visitors across the world see it
 */
export async function saveCloudProfile(profile: UserProfile): Promise<boolean> {
  try {
    const docRef = doc(db, 'profiles', 'creator');
    await setDoc(docRef, {
      ...profile,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('Failed to save profile to Firebase Firestore:', err);
    return false;
  }
}

/**
 * Fetch all shared portfolio items & reels from Cloud Firestore
 */
export async function getCloudItems(): Promise<PortfolioItem[] | null> {
  try {
    const colRef = collection(db, ITEMS_COLLECTION_PATH);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items: PortfolioItem[] = [];
      snap.forEach(docSnap => {
        items.push(docSnap.data() as PortfolioItem);
      });
      return items;
    }
  } catch (err) {
    console.warn('Could not fetch items from Firebase:', err);
  }
  return null;
}

/**
 * Save a new or updated portfolio item to Cloud Firestore
 */
export async function saveCloudItem(item: PortfolioItem): Promise<boolean> {
  try {
    const docRef = doc(db, ITEMS_COLLECTION_PATH, item.id);
    await setDoc(docRef, {
      ...item,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (err) {
    console.error('Failed to save item to Firebase:', err);
    return false;
  }
}

/**
 * Subscribe to real-time profile changes so anyone viewing the website sees live updates immediately
 */
export function subscribeToCloudProfile(onUpdate: (profile: UserProfile) => void) {
  const docRef = doc(db, 'profiles', 'creator');
  return onSnapshot(docRef, (snap) => {
    if (snap.exists()) {
      onUpdate(snap.data() as UserProfile);
    }
  }, (err) => {
    console.warn('Profile real-time subscription error:', err);
  });
}

/**
 * Subscribe to real-time portfolio items
 */
export function subscribeToCloudItems(onUpdate: (items: PortfolioItem[]) => void) {
  const colRef = collection(db, ITEMS_COLLECTION_PATH);
  return onSnapshot(colRef, (snap) => {
    if (!snap.empty) {
      const items: PortfolioItem[] = [];
      snap.forEach(docSnap => {
        items.push(docSnap.data() as PortfolioItem);
      });
      onUpdate(items);
    }
  }, (err) => {
    console.warn('Items real-time subscription error:', err);
  });
}
