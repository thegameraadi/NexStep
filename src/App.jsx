import { Routes, Route, Navigate } from 'react-router-dom';
import { MyListProvider } from './context/MyListContext';
import { UserProvider, useUser } from './context/UserContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { SOPProvider } from './context/SOPContext';
import { FinanceProvider } from './context/FinanceContext';
import { DecisionsProvider } from './context/DecisionsContext';
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

// Onboarding + Roadmap
import OnboardingPage from './pages/OnboardingPage';
import RoadmapPage from './pages/RoadmapPage';

// Application HQ
import ApplicationsPage from './pages/ApplicationsPage';

// Finance Center
import FinancePage from './pages/FinancePage';

// Decisions Hub
import DecisionsPage from './pages/DecisionsPage';

function RoadmapGate() {
  const { profile } = useUser();
  if (!profile.completedOnboarding) return <Navigate to="/onboarding" replace />;
  return <RoadmapPage />;
}

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

function Shell() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/roadmap" element={<RoadmapGate />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:id" element={<ProgramDetailPage />} />
          <Route path="/my-list" element={<MyListPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/decisions" element={<DecisionsPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileBottomNav />
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <MyListProvider>
        <ApplicationProvider>
          <SOPProvider>
            <FinanceProvider>
              <DecisionsProvider>
                <Shell />
              </DecisionsProvider>
            </FinanceProvider>
          </SOPProvider>
        </ApplicationProvider>
      </MyListProvider>
    </UserProvider>
  );
}
