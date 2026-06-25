import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MyListProvider } from './context/MyListContext';
import { UserProvider, useUser } from './context/UserContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { SOPProvider } from './context/SOPContext';
import { FinanceProvider } from './context/FinanceContext';
import { DecisionsProvider } from './context/DecisionsContext';
import { VisaProvider } from './context/VisaContext';
import { PreDepartureProvider } from './context/PreDepartureContext';
import { CommunityProvider } from './context/CommunityContext';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';

// Home page sections (eager — above-the-fold)
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

// Lazy-loaded pages (split from main bundle)
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'));
const ProgramDetailPage = lazy(() => import('./pages/ProgramDetailPage'));
const MyListPage = lazy(() => import('./pages/MyListPage'));
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage'));
const FinancePage = lazy(() => import('./pages/FinancePage'));
const DecisionsPage = lazy(() => import('./pages/DecisionsPage'));
const VisaPage = lazy(() => import('./pages/VisaPage'));
const PreDeparturePage = lazy(() => import('./pages/PreDeparturePage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const KnowledgePage = lazy(() => import('./pages/KnowledgePage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-navy-200 border-t-[#F5A623] animate-spin" />
        <p className="text-sm text-navy-400">Loading…</p>
      </div>
    </div>
  );
}

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
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/visa" element={<VisaPage />} />
            <Route path="/pre-departure" element={<PreDeparturePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
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
                <VisaProvider>
                  <PreDepartureProvider>
                    <CommunityProvider>
                      <Shell />
                    </CommunityProvider>
                  </PreDepartureProvider>
                </VisaProvider>
              </DecisionsProvider>
            </FinanceProvider>
          </SOPProvider>
        </ApplicationProvider>
      </MyListProvider>
    </UserProvider>
  );
}
