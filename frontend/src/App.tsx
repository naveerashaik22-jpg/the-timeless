import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header, AVESView } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AuthWelcomeView } from './components/auth/AuthWelcomeView';
import { WelcomeTransitionModal } from './components/auth/WelcomeTransitionModal';
import { AuthModal } from './components/auth/AuthModal';
import { ProfileJournalDrawer } from './components/profile/ProfileJournalDrawer';
import { LandingEditorialView } from './components/landing/LandingEditorialView';
import { CreateMomentThreadView } from './components/moment/CreateMomentThreadView';
import { MenuBrowser } from './components/menu/MenuBrowser';
import { CartDrawer } from './components/cart/CartDrawer';
import { OrderSummaryModal } from './components/cart/OrderSummaryModal';
import { OrderSuccessModal } from './components/order/OrderSuccessModal';
import { FAQModal } from './components/faq/FAQModal';

export const AppContent: React.FC = () => {
  const {
    currentUser,
    isAuthenticated,
    login,
    signup,
    continueAsGuest,
    logout
  } = useAuth();

  // Navigation State
  const [currentView, setCurrentView] = useState<AVESView>('landing');
  const [activeMomentPrompt, setActiveMomentPrompt] = useState<string | undefined>(undefined);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const handleStartMoment = (prompt?: string) => {
    setActiveMomentPrompt(prompt || "I've had a long day. I want something comforting...");
    setCurrentView('create_moment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: AVESView) => {
    if (view !== 'create_moment') {
      setActiveMomentPrompt(undefined);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOutOrSwitch = () => {
    logout();
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF6EE] text-espresso-950 selection:bg-vintageGold-500 selection:text-espresso-950 font-sans">
      
      {/* Universal Navigation Header with Profile Anchor */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenFaq={() => setIsFaqOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* SCREEN 1: Editorial Landing & Cover */}
        {currentView === 'landing' && (
          <LandingEditorialView
            onStartMoment={handleStartMoment}
            onExploreMenu={() => handleNavigate('menu')}
            userProfile={currentUser ? { name: currentUser.name, isGuest: currentUser.isGuest } : undefined}
            onChangeTableOrSignOut={handleSignOutOrSwitch}
          />
        )}

        {/* SCREEN 2: THE AVES THREAD Signature Moment Creation & Moment Reveal */}
        {currentView === 'create_moment' && (
          <CreateMomentThreadView
            initialPrompt={activeMomentPrompt}
            userProfile={currentUser ? { name: currentUser.name, isGuest: currentUser.isGuest } : undefined}
            onBackToLanding={() => handleNavigate('landing')}
            onExploreMenu={() => handleNavigate('menu')}
          />
        )}

        {/* SCREEN: Menu Browser Archive (Direct Backend Integration & Visual Moods) */}
        {currentView === 'menu' && (
          <MenuBrowser
            onStartCompanionWithMood={(moodPrompt) => handleStartMoment(moodPrompt)}
          />
        )}

      </main>

      {/* Universal Ecosystem Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenFaq={() => setIsFaqOpen(true)}
      />

      {/* Global Modals, Trays, Transition Overlay, and Digital Café Journal */}
      <AuthModal />
      <WelcomeTransitionModal />
      <ProfileJournalDrawer />
      <CartDrawer />
      <OrderSummaryModal />
      <OrderSuccessModal />
      <FAQModal
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
        onAskChatbot={(q) => {
          handleStartMoment(q);
        }}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
