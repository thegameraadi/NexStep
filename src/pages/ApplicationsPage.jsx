import { useState } from 'react';
import { Plus, LayoutGrid, FileText, Users, BookOpen, MessageSquare } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';
import KanbanBoard from '../components/applications/KanbanBoard';
import AddSchoolModal from '../components/applications/AddSchoolModal';
import SOPBuilder from '../components/sop/SOPBuilder';
import LORTracker from '../components/lor/LORTracker';
import ResumeTips from '../components/resume/ResumeTips';
import CommunityReviews from '../components/community/CommunityReviews';

const TABS = [
  { id: 'tracker', label: 'Tracker', icon: LayoutGrid, description: 'Kanban board for all your schools' },
  { id: 'sop', label: 'SOP Builder', icon: FileText, description: 'Write and refine your statement' },
  { id: 'lor', label: 'LOR Tracker', icon: Users, description: 'Track recommendation letters' },
  { id: 'resume', label: 'Resume', icon: BookOpen, description: 'Tips and sample structures' },
  { id: 'community', label: 'Community', icon: MessageSquare, description: 'Peer essay reviews' },
];

function StatusSummary({ schools }) {
  if (schools.length === 0) return null;
  const byStatus = {
    Researching: schools.filter(s => s.status === 'Researching').length,
    Preparing:   schools.filter(s => s.status === 'Preparing').length,
    Submitted:   schools.filter(s => s.status === 'Submitted').length,
    Interview:   schools.filter(s => s.status === 'Interview').length,
    Decision:    schools.filter(s => s.status === 'Decision').length,
  };
  const admitted = schools.filter(s => s.decisionResult === 'Admitted').length;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {Object.entries(byStatus).map(([status, count]) => count > 0 && (
        <span key={status} className="text-xs text-navy-300 bg-navy-800 px-2.5 py-1 rounded-full">
          {count} {status}
        </span>
      ))}
      {admitted > 0 && (
        <span className="text-xs text-emerald-400 bg-emerald-900/40 px-2.5 py-1 rounded-full font-semibold">
          🎉 {admitted} Admitted
        </span>
      )}
    </div>
  );
}

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState('tracker');
  const [showAddModal, setShowAddModal] = useState(false);
  const { schools } = useApplications();

  const activeTabDef = TABS.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Page header */}
      <div className="bg-navy-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Application HQ</h1>
              <p className="text-navy-300 text-base max-w-xl">
                Track every school, build your SOP, manage your LORs, and learn from the community.
              </p>
              <div className="mt-3">
                <StatusSummary schools={schools} />
              </div>
            </div>
            {activeTab === 'tracker' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F5A623] text-navy-900 font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-amber-500 transition-colors"
              >
                <Plus size={16} />
                Track a School
              </button>
            )}
          </div>

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

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'tracker' && <KanbanBoard />}
        {activeTab === 'sop' && <SOPBuilder />}
        {activeTab === 'lor' && <LORTracker />}
        {activeTab === 'resume' && <ResumeTips />}
        {activeTab === 'community' && <CommunityReviews />}
      </div>

      {showAddModal && <AddSchoolModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
