import { Routes, Route } from 'react-router-dom';
import { MyListProvider } from './context/MyListContext';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';

// Home page sections
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

// Program explorer pages
import ProgramsPage from './pages/ProgramsPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import MyListPage from './pages/MyListPage';

function HomePage() {
  return (
    <>
      <Hero />
      <SectionTiles />
      <StatsBar />
      <RoadmapSection />
      <ProgramsSection />
      <ApplicationsSection />
      <FinanceSection />
      <VisaSection />
      <PreDepartureSection />
      <CommunitySection />
    </>
  );
}

export default function App() {
  return (
    <MyListProvider>
      <div className="min-h-screen bg-[#F9FAFB]">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/:id" element={<ProgramDetailPage />} />
            <Route path="/my-list" element={<MyListPage />} />
          </Routes>
        </main>

        <Footer />
        <MobileBottomNav />
        <div className="h-16 lg:hidden" aria-hidden="true" />
      </div>
    </MyListProvider>
  );
}
