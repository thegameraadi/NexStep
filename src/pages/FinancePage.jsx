import { useState } from 'react';
import { Calculator, GraduationCap, Building2, Landmark, BarChart3 } from 'lucide-react';
import CostCalculator from '../components/finance/CostCalculator';
import ScholarshipDB from '../components/finance/ScholarshipDB';
import FundingGuide from '../components/finance/FundingGuide';
import LoanGuidance from '../components/finance/LoanGuidance';
import BudgetPlanner from '../components/finance/BudgetPlanner';

const TABS = [
  { id: 'calculator', label: 'Cost Calculator', icon: Calculator },
  { id: 'scholarships', label: 'Scholarships', icon: GraduationCap },
  { id: 'funding', label: 'Funding Guide', icon: Building2 },
  { id: 'loans', label: 'Loans', icon: Landmark },
  { id: 'budget', label: 'Budget Planner', icon: BarChart3 },
];

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-navy-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Finance Center</h1>
          <p className="text-navy-300 text-base max-w-xl">
            Everything about paying for a US education — calculators, scholarships, loans, and real student budgets.
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
        {activeTab === 'calculator' && <CostCalculator />}
        {activeTab === 'scholarships' && <ScholarshipDB />}
        {activeTab === 'funding' && <FundingGuide />}
        {activeTab === 'loans' && <LoanGuidance />}
        {activeTab === 'budget' && <BudgetPlanner />}
      </div>
    </div>
  );
}
