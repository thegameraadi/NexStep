import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, BookOpen, Zap, MessageCircle, FileText, CheckSquare } from 'lucide-react';
import { useUser } from '../context/UserContext';
import ExperienceFeed from '../components/visa/ExperienceFeed';
import ConsulateIntel from '../components/visa/ConsulateIntel';
import QuestionBank from '../components/visa/QuestionBank';
import PracticeMode from '../components/visa/PracticeMode';
import Chatrooms from '../components/visa/Chatrooms';
import Resources from '../components/visa/Resources';
import DocumentChecklist from '../components/visa/DocumentChecklist';

const TABS = [
  { id: 'experiences', label: 'Experiences', icon: Users },
  { id: 'consulates', label: 'Consulate Intel', icon: Building2 },
  { id: 'questions', label: 'Question Bank', icon: BookOpen },
  { id: 'practice', label: 'Practice Mode', icon: Zap },
  { id: 'chatrooms', label: 'Chatrooms', icon: MessageCircle },
  { id: 'resources', label: 'Resources', icon: FileText },
  { id: 'checklist', label: 'Doc Checklist', icon: CheckSquare },
];

function StageBanner({ currentStage }) {
  return (
    <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start gap-3 mb-6">
      <span className="text-2xl flex-shrink-0">🔖</span>
      <div className="flex-1">
        <p className="font-bold text-amber-900 text-sm">You'll need this soon — bookmark it for when you're ready</p>
        <p className="text-xs text-amber-700 mt-1 leading-relaxed">
          The Visa Vault becomes your command center once you reach <strong>Stage 8 (Visa Application)</strong>. You're currently at Stage {currentStage}. Feel free to explore, bookmark questions, and review the document checklist in advance — the more familiar you are now, the less overwhelming it'll be when the time comes.
        </p>
        <Link to="/roadmap" className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 underline mt-2 hover:text-amber-900">
          View your roadmap →
        </Link>
      </div>
    </div>
  );
}

export default function VisaPage() {
  const [activeTab, setActiveTab] = useState('experiences');
  const { profile } = useUser();
  const isActive = profile.currentStage >= 8;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-navy-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Visa Vault</h1>
            {!isActive && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Unlocks at Stage 8
              </span>
            )}
          </div>
          <p className="text-navy-300 text-base max-w-xl">
            Everything you need to navigate the F-1 visa — community experiences, consulate intel, a full question bank, and interactive practice.
          </p>

          {/* Tab nav */}
          <div className="mt-8 flex gap-1 overflow-x-auto pb-px">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-xl transition-colors flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-[#F9FAFB] text-navy-900'
                      : 'text-navy-400 hover:text-navy-200 hover:bg-navy-800'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isActive && <StageBanner currentStage={profile.currentStage || 1} />}
        {activeTab === 'experiences' && <ExperienceFeed />}
        {activeTab === 'consulates' && <ConsulateIntel />}
        {activeTab === 'questions' && <QuestionBank />}
        {activeTab === 'practice' && <PracticeMode />}
        {activeTab === 'chatrooms' && <Chatrooms />}
        {activeTab === 'resources' && <Resources />}
        {activeTab === 'checklist' && <DocumentChecklist />}
      </div>
    </div>
  );
}
