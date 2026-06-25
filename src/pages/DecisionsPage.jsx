import { useState } from 'react';
import { Trophy, Clock, GitCompare, MessageSquare } from 'lucide-react';
import ResultsFeed from '../components/decisions/ResultsFeed';
import WaitlistTracker from '../components/decisions/WaitlistTracker';
import OfferComparison from '../components/decisions/OfferComparison';
import DecisionCommunity from '../components/decisions/DecisionCommunity';

const TABS = [
  { id: 'results', label: 'Results', icon: Trophy },
  { id: 'waitlist', label: 'Waitlist', icon: Clock },
  { id: 'compare', label: 'Compare Offers', icon: GitCompare },
  { id: 'community', label: 'Community', icon: MessageSquare },
];

export default function DecisionsPage() {
  const [activeTab, setActiveTab] = useState('results');

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-navy-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Decisions Hub</h1>
          <p className="text-navy-300 text-base max-w-xl">
            Results, waitlist movement, offer comparisons, and community wisdom — everything for the waiting period and beyond.
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
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'results' && <ResultsFeed />}
        {activeTab === 'waitlist' && <WaitlistTracker />}
        {activeTab === 'compare' && <OfferComparison />}
        {activeTab === 'community' && <DecisionCommunity />}
      </div>
    </div>
  );
}
