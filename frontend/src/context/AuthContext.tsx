import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserPreferences, PastOrder, UserDiscovery, AvesMemoryInsight } from '../types';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isProfileOpen: boolean;
  isAuthModalOpen: boolean;
  welcomeModalUser: string | null;
  openProfile: () => void;
  closeProfile: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  dismissWelcomeModal: () => void;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string) => void;
  continueAsGuest: () => void;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  removeMemory: (memoryId: string) => void;
  togglePausePersonalization: () => void;
  toggleFavorite: (itemId: string) => void;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  favoriteFlavors: ['Bourbon Vanilla', 'Ceylon Cinnamon', 'Dark Cacao', 'Cardamom'],
  dietaryPreferences: ['Vegetarian', 'Plant-Based Milk Option'],
  favoriteCategories: ['HOT BEVERAGES', 'DESSERTS'],
  sweetnessPreference: 'Mildly Sweet (Level 2/5)',
  spicePreference: 'Gentle Aromatic Spice',
  roastPreference: 'Medium-Dark Single Origin Arabica'
};

const DEFAULT_ORDERS: PastOrder[] = [
  {
    id: 'ord-1029',
    item: "Shakespeare's Vanilla Arabica",
    category: 'HOT BEVERAGES',
    date: 'Yesterday, 5:40 PM',
    price: 220,
    cafe: 'The Veranda • Table 08',
    status: 'Served',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ord-0982',
    item: 'The Renaissance Waffle',
    category: 'DESSERTS',
    date: '3 Oct 2026, 4:15 PM',
    price: 260,
    cafe: 'The Tranquil Nook • Table 04',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ord-0891',
    item: 'Heritage Samovar Chai',
    category: 'HOT BEVERAGES',
    date: '28 Sep 2026, 6:00 PM',
    price: 160,
    cafe: 'Ink & Ember • Armchair 03',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80'
  }
];

const DEFAULT_DISCOVERIES: UserDiscovery[] = [
  {
    id: 'disc-01',
    title: 'The Gatsby Botanical Cooler',
    category: 'COLD BEVERAGES',
    date: 'Discovered during Afternoon Reset',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80',
    memoryNote: 'Matched for celebratory effervescence & wild blackberry notes.'
  },
  {
    id: 'disc-02',
    title: 'Orange Blossom Shortbread',
    category: 'DESSERTS',
    date: 'Discovered during Book Session',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80',
    memoryNote: 'Selected to pair with cardamom samovar chai without overpowering it.'
  }
];

const DEFAULT_MEMORIES: AvesMemoryInsight[] = [
  {
    id: 'mem-01',
    statement: 'You usually enjoy mildly sweet drinks.',
    category: 'Taste Pattern',
    active: true
  },
  {
    id: 'mem-02',
    statement: 'You often choose comforting classics.',
    category: 'Sensory Rhythm',
    active: true
  },
  {
    id: 'mem-03',
    statement: "You've recently been exploring chai.",
    category: 'Exploration Thread',
    active: true
  },
  {
    id: 'mem-04',
    statement: 'You prefer oat microfoam over dairy during evening visits.',
    category: 'Barista Formulation',
    active: true
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('aves_user_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved user profile', e);
    }
    return null;
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [welcomeModalUser, setWelcomeModalUser] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aves_user_profile', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('aves_user_profile');
    }
  }, [currentUser]);

  const login = (email: string, name?: string) => {
    const displayName = name?.trim() || (email.toLowerCase().includes('naveera') ? 'Naveera' : email.split('@')[0] || 'Patron');
    const profile: UserProfile = {
      id: `usr-${Date.now().toString().slice(-6)}`,
      name: displayName,
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      memberSince: 'Autumn 2024 • Table Regular',
      isGuest: false,
      preferences: DEFAULT_PREFERENCES,
      favorites: ['item-02', 'item-01', 'item-03'],
      previousOrders: DEFAULT_ORDERS,
      discoveries: DEFAULT_DISCOVERIES,
      memories: DEFAULT_MEMORIES,
      personalizationPaused: false
    };

    setCurrentUser(profile);
    setIsAuthModalOpen(false);
    setWelcomeModalUser(displayName);
  };

  const signup = (name: string, email: string) => {
    login(email, name);
  };

  const continueAsGuest = () => {
    const guestProfile: UserProfile = {
      id: `gst-${Date.now().toString().slice(-4)}`,
      name: 'Guest Diner',
      email: 'guest@aves.tabletop',
      avatar: undefined,
      memberSince: 'Table 08 Veranda Session',
      isGuest: true,
      preferences: DEFAULT_PREFERENCES,
      favorites: ['item-02'],
      previousOrders: [],
      discoveries: [],
      memories: [
        {
          id: 'mem-guest-01',
          statement: 'Seated at Table 08 Veranda with guest session access.',
          category: 'Current Session',
          active: true
        }
      ],
      personalizationPaused: false
    };

    setCurrentUser(guestProfile);
    setIsAuthModalOpen(false);
    setWelcomeModalUser('Guest Diner');
  };

  const logout = () => {
    setCurrentUser(null);
    setIsProfileOpen(false);
    setIsAuthModalOpen(false);
    setWelcomeModalUser(null);
  };

  const updatePreferences = (updated: Partial<UserPreferences>) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      preferences: {
        ...currentUser.preferences,
        ...updated
      }
    });
  };

  const removeMemory = (memoryId: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      memories: currentUser.memories.filter((m) => m.id !== memoryId)
    });
  };

  const togglePausePersonalization = () => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      personalizationPaused: !currentUser.personalizationPaused
    });
  };

  const toggleFavorite = (itemId: string) => {
    if (!currentUser) return;
    const exists = currentUser.favorites.includes(itemId);
    setCurrentUser({
      ...currentUser,
      favorites: exists
        ? currentUser.favorites.filter((id) => id !== itemId)
        : [...currentUser.favorites, itemId]
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isProfileOpen,
        isAuthModalOpen,
        welcomeModalUser,
        openProfile: () => setIsProfileOpen(true),
        closeProfile: () => setIsProfileOpen(false),
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        dismissWelcomeModal: () => setWelcomeModalUser(null),
        login,
        signup,
        continueAsGuest,
        logout,
        updatePreferences,
        removeMemory,
        togglePausePersonalization,
        toggleFavorite
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
