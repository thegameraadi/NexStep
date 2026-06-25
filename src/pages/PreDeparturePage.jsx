import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Landmark, Heart, Smartphone, Package, CheckSquare } from 'lucide-react';
import { useUser } from '../context/UserContext';
import HousingGuide from '../components/predeparture/HousingGuide';
import BankingMoney from '../components/predeparture/BankingMoney';
import Insurance from '../components/predeparture/Insurance';
import SimCard from '../components/predeparture/SimCard';
import PackingGuide from '../components/predeparture/PackingGuide';
import ArrivalChecklist from '../components/predeparture/ArrivalChecklist';

const TABS = [
  { id: 'housing', label: 'Housing', icon: Home },
  { id: 'banking', label: 'Banking & Money', icon: Landmark },
  { id: 'insurance', label: 'Insurance', icon: Heart },
  { id: 'sim', label: 'SIM & Phone', icon: Smartphone },
  { id: 'packing', label: 'Packing Guide', icon: Package },
  { id: 'checklist', label: 'Arrival Checklist', icon: CheckSquare },
];

function StageBanner({ currentStage }) {
  return (
    <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start gap-3 mb-6">
      <span className="text-2xl flex-shrink-0">🔖</span>
      <div className="flex-1">
        <p className="font-bold text-amber-900 text-sm">Coming up soon — explore now so you're ready</p>
        <p className="text-xs text-amber-700 mt-1 leading-relaxed">
          The Pre-Departure Hub becomes your primary resource once you reach <strong>Stage 9</strong>. You're currently at Stage {currentStage}. Feel free to browse, start your packing list, and check the arrival checklist in advance — the more prepared you are before that stage hits, the less stressful your departure will be.
        </p>
        <Link to="/roadmap" className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 underline mt-2 hover:text-amber-900">
          View your roadmap →
        </Link>
      </div>
    </div>
  );
}

export default function PreDeparturePage() {
  const [activeTab, setActiveTab] = useState('housing');
  const { profile } = useUser();
  const isActive = profile.currentStage >= 9;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-navy-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Pre-Departure Hub</h1>
            {!isActive && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Activates at Stage 9
              </span>
            )}
          </div>
          <p className="text-navy-300 text-base max-w-2xl">
            Everything between your visa approval and landing in the US — housing, banking, insurance, your phone plan, what to pack, and your first-month checklist.
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
        {activeTab === 'housing' && <HousingGuide />}
        {activeTab === 'banking' && <BankingMoney />}
        {activeTab === 'insurance' && <Insurance />}
        {activeTab === 'sim' && <SimCard />}
        {activeTab === 'packing' && <PackingGuide />}
        {activeTab === 'checklist' && <ArrivalChecklist />}
      </div>
    </div>
  );
}
