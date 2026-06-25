import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, GraduationCap, Calendar, Globe, MapPin } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { STAGES } from '../data/roadmap';
import RoadmapProgressBar from '../components/roadmap/RoadmapProgressBar';
import StageCard from '../components/roadmap/StageCard';
import StageUpdater from '../components/roadmap/StageUpdater';

function ProfileChip({ icon: Icon, value, fallback }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-1.5 text-xs text-navy-300 bg-navy-800 px-3 py-1.5 rounded-full">
      <Icon size={11} className="text-navy-400" />
      <span>{value}</span>
    </div>
  );
}

export default function RoadmapPage() {
  const navigate = useNavigate();
  const { profile, resetProfile } = useUser();

  const stageStatus = (stageId) => {
    if (stageId < profile.currentStage) return 'complete';
    if (stageId === profile.currentStage) return 'active';
    return 'upcoming';
  };

  // Time remaining label
  const currentStageDef = STAGES.find((s) => s.id === profile.currentStage);
  const remainingStages = 10 - profile.currentStage;

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-16">
      {/* Header */}
      <div className="bg-navy-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-navy-300 hover:text-white transition-colors text-sm mb-6"
          >
            <ArrowLeft size={15} />
            Home
          </button>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Roadmap</h1>
              <p className="text-navy-300 text-sm">
                A personalized 10-stage guide from your first thought to your first class.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <StageUpdater />
              <button
                onClick={() => navigate('/onboarding')}
                className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-navy-400 hover:text-white transition-colors"
                title="Edit profile"
              >
                <Settings size={15} />
              </button>
            </div>
          </div>

          {/* Profile chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            <ProfileChip icon={GraduationCap} value={profile.pursuing} />
            <ProfileChip icon={MapPin} value={profile.field} />
            <ProfileChip icon={Calendar} value={profile.targetIntake} />
            <ProfileChip icon={Globe} value={profile.country} />
          </div>

          {/* Progress bar */}
          <RoadmapProgressBar />

          {/* Current stage callout */}
          {currentStageDef && (
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-navy-800/60 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{currentStageDef.emoji}</span>
                <div>
                  <p className="text-xs text-navy-400 font-medium">You are currently at</p>
                  <p className="text-white font-bold text-sm">{currentStageDef.name}</p>
                </div>
              </div>
              {remainingStages > 0 && (
                <div className="sm:ml-auto text-xs text-navy-400">
                  <span className="text-[#F5A623] font-bold">{remainingStages}</span> stage{remainingStages !== 1 ? 's' : ''} remaining
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Context banner if no intake set */}
        {profile.targetIntake && profile.targetIntake !== 'Not sure yet' && (
          <div className="mb-8 bg-white rounded-2xl border border-navy-100 p-4 flex items-center gap-3">
            <Calendar size={16} className="text-[#F5A623] flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy-900">Target: {profile.targetIntake}</p>
              <p className="text-xs text-navy-500">Your roadmap is calibrated for this intake window.</p>
            </div>
            <Link
              to="/programs"
              className="flex-shrink-0 text-xs font-semibold text-[#F5A623] hover:underline"
            >
              Browse programs →
            </Link>
          </div>
        )}

        {/* Stage list */}
        <div>
          {STAGES.map((stage, i) => (
            <StageCard
              key={stage.id}
              stage={stage}
              status={stageStatus(stage.id)}
              isLast={i === STAGES.length - 1}
            />
          ))}
        </div>

        {/* Completion state */}
        {profile.currentStage === 10 && (
          <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="font-bold text-emerald-900 text-lg mb-2">You made it!</h3>
            <p className="text-emerald-700 text-sm leading-relaxed mb-4">
              You're in the US and attending your program. Your journey helped build NexStep for the next student.
              Share your experience with the community.
            </p>
            <Link
              to="/#community"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Share your story
            </Link>
          </div>
        )}

        {/* Reset option */}
        <div className="mt-12 pt-6 border-t border-navy-100 text-center">
          <p className="text-xs text-navy-400 mb-2">Wrong profile? Start fresh.</p>
          <button
            onClick={() => { resetProfile(); navigate('/onboarding'); }}
            className="text-xs font-semibold text-navy-400 hover:text-navy-600 hover:underline transition-colors"
          >
            Redo onboarding
          </button>
        </div>
      </div>
    </div>
  );
}
