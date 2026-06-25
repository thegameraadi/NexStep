import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import Hero from './components/Hero';
import SectionTiles from './components/SectionTiles';
import StatsBar from './components/StatsBar';
import RoadmapSection from './components/sections/RoadmapSection';
import ProgramsSection from './components/sections/ProgramsSection';
import ApplicationsSection from './components/sections/ApplicationsSection';
import FinanceSection from './components/sections/FinanceSection';
import VisaSection from './components/sections/VisaSection';
import PreDepartureSection from './components/sections/PreDepartureSection';
import CommunitySection from './components/sections/CommunitySection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      <main>
        {/* Hero */}
        <Hero />

        {/* Section overview tiles */}
        <SectionTiles />

        {/* Live stats */}
        <StatsBar />

        {/* Module sections */}
        <RoadmapSection />
        <ProgramsSection />
        <ApplicationsSection />
        <FinanceSection />
        <VisaSection />
        <PreDepartureSection />
        <CommunitySection />
      </main>

      <Footer />

      {/* Mobile bottom nav — offset main content on mobile */}
      <MobileBottomNav />

      {/* Spacer for mobile bottom nav */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </div>
  );
}
