import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, UserPreferences, PastOrder, UserDiscovery, AvesMemoryInsight } from '../types';
import {
  loginApi,
  registerApi,
  guestSessionApi,
  fetchCurrentUserApi,
  updatePreferencesApi,
  toggleFavoriteApi,
  deleteMemoryApi,
  fetchMyOrders
} from '../services/api';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isProfileOpen: boolean;
  isAuthModalOpen: boolean;
  welcomeModalUser: string | null;
  authError: string | null;
  isLoadingAuth: boolean;
  openProfile: () => void;
  closeProfile: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  dismissWelcomeModal: () => void;
  login: (email: string, password?: string) => Promise<void>;
  signup: (name: string, email: string, password?: string) => Promise<void>;
  continueAsGuest: (guestName?: string) => Promise<void>;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  removeMemory: (memoryId: string) => Promise<void>;
  togglePausePersonalization: () => void;
  toggleFavorite: (itemId: string) => Promise<void>;
  refreshOrders: () => Promise<void>;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  favoriteFlavors: ['Bourbon Vanilla', 'Ceylon Cinnamon', 'Dark Cacao', 'Cardamom'],
  dietaryPreferences: ['Vegetarian'],
  favoriteCategories: ['HOT BEVERAGES', 'DESSERTS'],
  sweetnessPreference: 'Mildly Sweet (Level 2/5)',
  spicePreference: 'Gentle Aromatic Spice',
  roastPreference: 'Medium-Dark Single Origin Arabica'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('aves_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse cached user profile', e);
    }
    return null;
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [welcomeModalUser, setWelcomeModalUser] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  // Helper to map backend orders to PastOrder interface
  const mapBackendOrders = (orders: any[]): PastOrder[] => {
    const list: PastOrder[] = [];
    for (const ord of orders) {
      for (const item of (ord.items || [])) {
        list.push({
          id: `${ord.order_id}-${item.item_id}`,
          item: item.name,
          category: item.category || 'HOT BEVERAGES',
          date: ord.created_at,
          price: item.price,
          cafe: ord.table_or_zone || 'The Timeless Main Lounge',
          status: 'Completed',
          image: item.image || 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=400&q=80'
        });
      }
    }
    return list;
  };

  // Synchronize orders for the current user from real backend
  const refreshOrders = useCallback(async () => {
    if (!currentUser?.id) return;
    try {
      const orders = await fetchMyOrders(currentUser.id);
      const mapped = mapBackendOrders(orders);
      setCurrentUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          previousOrders: mapped
        };
      });
    } catch (e) {
      console.warn('Could not refresh orders from backend:', e);
    }
  }, [currentUser?.id]);

  // Load real orders whenever currentUser is set
  useEffect(() => {
    if (currentUser?.id) {
      refreshOrders();
    }
  }, [currentUser?.id, refreshOrders]);

  // Sync token and profile to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aves_user_profile', JSON.stringify(currentUser));
      if (currentUser.token) {
        localStorage.setItem('aves_auth_token', currentUser.token);
      }
    } else {
      localStorage.removeItem('aves_user_profile');
      localStorage.removeItem('aves_auth_token');
    }
  }, [currentUser]);

  // Verify stored session on mount
  useEffect(() => {
    const token = localStorage.getItem('aves_auth_token');
    if (token && !currentUser) {
      fetchCurrentUserApi(token)
        .then(async (user) => {
          const orders = await fetchMyOrders(user.id).catch(() => []);
          const profile: UserProfile = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            memberSince: user.member_since,
            isGuest: user.is_guest,
            preferences: { ...DEFAULT_PREFERENCES, ...(user.preferences || {}) },
            favorites: user.favorites || [],
            previousOrders: mapBackendOrders(orders),
            discoveries: [],
            memories: (user.memories || []).map((m: any) => ({
              id: m.id,
              statement: m.statement,
              category: m.category,
              active: Boolean(m.active)
            })),
            personalizationPaused: false,
            token: user.token || token
          };
          setCurrentUser(profile);
        })
        .catch(() => {
          localStorage.removeItem('aves_auth_token');
          localStorage.removeItem('aves_user_profile');
        });
    }
  }, []);

  const login = async (email: string, password?: string) => {
    setAuthError(null);
    setIsLoadingAuth(true);
    try {
      const rawPassword = password || 'vintage1926'; // Fallback to demo credentials if none provided
      const res = await loginApi(email, rawPassword);
      const orders = await fetchMyOrders(res.id).catch(() => []);

      const profile: UserProfile = {
        id: res.id,
        name: res.name,
        email: res.email,
        avatar: res.avatar,
        memberSince: res.member_since,
        isGuest: res.is_guest,
        preferences: { ...DEFAULT_PREFERENCES, ...(res.preferences || {}) },
        favorites: res.favorites || [],
        previousOrders: mapBackendOrders(orders),
        discoveries: [],
        memories: (res.memories || []).map((m: any) => ({
          id: m.id,
          statement: m.statement,
          category: m.category,
          active: Boolean(m.active)
        })),
        personalizationPaused: false,
        token: res.token
      };

      setCurrentUser(profile);
      setIsAuthModalOpen(false);
      setWelcomeModalUser(profile.name);
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed. Please verify your credentials.');
      throw err;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const signup = async (name: string, email: string, password?: string) => {
    setAuthError(null);
    setIsLoadingAuth(true);
    try {
      const rawPassword = password || 'vintage1926';
      const res = await registerApi(name, email, rawPassword);

      const profile: UserProfile = {
        id: res.id,
        name: res.name,
        email: res.email,
        avatar: res.avatar,
        memberSince: res.member_since,
        isGuest: false,
        preferences: { ...DEFAULT_PREFERENCES, ...(res.preferences || {}) },
        favorites: [],
        previousOrders: [],
        discoveries: [],
        memories: [],
        personalizationPaused: false,
        token: res.token
      };

      setCurrentUser(profile);
      setIsAuthModalOpen(false);
      setWelcomeModalUser(profile.name);
    } catch (err: any) {
      setAuthError(err.message || 'Registration failed. Please check your details.');
      throw err;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const continueAsGuest = async (guestName?: string) => {
    setAuthError(null);
    setIsLoadingAuth(true);
    try {
      const res = await guestSessionApi(guestName);
      const profile: UserProfile = {
        id: res.id,
        name: res.name,
        email: res.email,
        avatar: undefined,
        memberSince: 'Tabletop Guest Session',
        isGuest: true,
        preferences: DEFAULT_PREFERENCES,
        favorites: [],
        previousOrders: [],
        discoveries: [],
        memories: [],
        personalizationPaused: false,
        token: res.token
      };

      setCurrentUser(profile);
      setIsAuthModalOpen(false);
      setWelcomeModalUser(profile.name);
    } catch (err: any) {
      // Fallback local guest profile if offline
      const guestProfile: UserProfile = {
        id: `gst-${Date.now().toString().slice(-4)}`,
        name: guestName?.trim() || 'Guest Traveler',
        email: 'guest@aves.tabletop',
        avatar: undefined,
        memberSince: 'Tabletop Guest Session',
        isGuest: true,
        preferences: DEFAULT_PREFERENCES,
        favorites: [],
        previousOrders: [],
        discoveries: [],
        memories: [],
        personalizationPaused: false
      };
      setCurrentUser(guestProfile);
      setIsAuthModalOpen(false);
      setWelcomeModalUser(guestProfile.name);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsProfileOpen(false);
    setIsAuthModalOpen(false);
    setWelcomeModalUser(null);
    setAuthError(null);
    localStorage.removeItem('aves_user_profile');
    localStorage.removeItem('aves_auth_token');
  };

  const updatePreferences = async (updated: Partial<UserPreferences>) => {
    if (!currentUser) return;
    const newPrefs = { ...currentUser.preferences, ...updated };
    setCurrentUser({ ...currentUser, preferences: newPrefs });

    if (currentUser.token) {
      try {
        await updatePreferencesApi(newPrefs, currentUser.token);
      } catch (e) {
        console.warn('Failed to sync preferences to backend:', e);
      }
    }
  };

  const removeMemory = async (memoryId: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      memories: currentUser.memories.filter((m) => m.id !== memoryId)
    });

    if (currentUser.token) {
      try {
        await deleteMemoryApi(memoryId, currentUser.token);
      } catch (e) {
        console.warn('Failed to delete memory on backend:', e);
      }
    }
  };

  const togglePausePersonalization = () => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      personalizationPaused: !currentUser.personalizationPaused
    });
  };

  const toggleFavorite = async (itemId: string) => {
    if (!currentUser) return;
    const exists = currentUser.favorites.includes(itemId);
    const updatedFavorites = exists
      ? currentUser.favorites.filter((id) => id !== itemId)
      : [...currentUser.favorites, itemId];

    setCurrentUser({
      ...currentUser,
      favorites: updatedFavorites
    });

    if (currentUser.token) {
      try {
        await toggleFavoriteApi(itemId, currentUser.token);
      } catch (e) {
        console.warn('Failed to sync favorite on backend:', e);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isProfileOpen,
        isAuthModalOpen,
        welcomeModalUser,
        authError,
        isLoadingAuth,
        openProfile: () => setIsProfileOpen(true),
        closeProfile: () => setIsProfileOpen(false),
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => {
          setAuthError(null);
          setIsAuthModalOpen(false);
        },
        dismissWelcomeModal: () => setWelcomeModalUser(null),
        login,
        signup,
        continueAsGuest,
        logout,
        updatePreferences,
        removeMemory,
        togglePausePersonalization,
        toggleFavorite,
        refreshOrders
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
