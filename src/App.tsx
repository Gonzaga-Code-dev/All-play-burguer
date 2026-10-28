/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RetroScrollProgressBar } from './components/RetroScrollProgressBar.tsx';
import { VideoIntroGate } from './components/VideoIntroGate.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ExperienceSection } from './components/ExperienceSection.tsx';
import { RodizioSection } from './components/RodizioSection.tsx';
import { PiscinaoSection } from './components/PiscinaoSection.tsx';
import { AnimatedMenuSection } from './components/AnimatedMenuSection.tsx';
import { EventsSection } from './components/EventsSection.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    // Check if user already saw the intro in this session
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('allplay_intro_seen');
      return !seen;
    }
    return false;
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowIntro(true);
  };

  return (
    <div className="min-h-screen bg-[#120B0A] text-[#F5EEFF] flex flex-col selection:bg-[#E8541C] selection:text-white">
      {/* Retro Horizontal Gaming Scroll Progress Bar */}
      <RetroScrollProgressBar />

      {/* Fullscreen Video Intro Gate with authentic uploaded video */}
      {showIntro && (
        <VideoIntroGate onComplete={handleIntroComplete} forceShow={true} />
      )}

      {/* Main Single Page Application */}
      <Header onReplayIntro={handleReplayIntro} />

      <main className="flex-grow">
        <Hero />
        <ExperienceSection />
        <RodizioSection />
        <PiscinaoSection />
        <AnimatedMenuSection />
        <EventsSection />
        <ReviewsSection />
        <LocationSection />
      </main>

      <Footer onReplayIntro={handleReplayIntro} />
      <FloatingWhatsApp />
    </div>
  );
}
