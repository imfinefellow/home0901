import React, { useState, useEffect } from 'react';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AiDemoSection } from './components/AiDemoSection';
import { CommunitySection } from './components/CommunitySection';
import { CheonanMapSection } from './components/CheonanMapSection';
import { AboutCompanySection } from './components/AboutCompanySection';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('services');

  // Smooth scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <AccessibilityProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-blue-200 selection:text-blue-900">
        {/* Top Navigation & Accessibility Bar */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Always show Hero Banner on top for mission clarity */}
          <HeroSection onNavigate={(tab) => setActiveTab(tab)} />

          {/* Tab View Switching */}
          {activeTab === 'services' && (
            <>
              <ServicesSection onTryAi={() => setActiveTab('ai-demo')} />
              <AiDemoSection />
              <CommunitySection />
              <CheonanMapSection />
              <AboutCompanySection />
            </>
          )}

          {activeTab === 'ai-demo' && (
            <div className="py-4">
              <AiDemoSection />
              <ServicesSection onTryAi={() => setActiveTab('ai-demo')} />
            </div>
          )}

          {activeTab === 'community' && (
            <div className="py-4">
              <CommunitySection />
              <CheonanMapSection />
            </div>
          )}

          {activeTab === 'cheonan-map' && (
            <div className="py-4">
              <CheonanMapSection />
              <CommunitySection />
            </div>
          )}

          {activeTab === 'about' && (
            <div className="py-4">
              <AboutCompanySection />
              <ServicesSection onTryAi={() => setActiveTab('ai-demo')} />
            </div>
          )}
        </main>

        {/* Global Floating Accessibility Toolbar */}
        <AccessibilityToolbar />

        {/* Footer */}
        <Footer onNavigate={(tab) => setActiveTab(tab)} />
      </div>
    </AccessibilityProvider>
  );
}
