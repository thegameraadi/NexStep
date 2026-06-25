import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, GraduationCap, BookOpen, Calendar, MapPin, Globe } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { FIELDS, INTAKES, SITUATIONS, COUNTRIES } from '../data/roadmap';

const DEGREE_OPTIONS = [
  {
    value: 'Masters',
    label: "Master's degree",
    sub: 'MS, MEng, MPS, MFA…',
    icon: '🎓',
    color: 'border-blue-200 hover:border-blue-400 bg-blue-50/50',
    active: 'border-navy-900 bg-navy-900 text-white',
  },
  {
    value: 'MBA',
    label: 'MBA',
    sub: 'Full-time, part-time, executive',
    icon: '📈',
    color: 'border-purple-200 hover:border-purple-400 bg-purple-50/50',
    active: 'border-navy-900 bg-navy-900 text-white',
  },
  {
    value: 'PhD',
    label: 'PhD / Doctoral',
    sub: 'Research-focused, usually funded',
    icon: '🔬',
    color: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/50',
    active: 'border-navy-900 bg-navy-900 text-white',
  },
  {
    value: 'Undecided',
    label: "I'm not sure yet",
    sub: "Still exploring my options",
    icon: '🧭',
    color: 'border-amber-200 hover:border-amber-400 bg-amber-50/50',
    active: 'border-navy-900 bg-navy-900 text-white',
  },
];

const SITUATION_ICONS = {
  'Just exploring': '🧐',
  'Preparing for tests': '📝',
  'Building applications': '✍️',
  'Waiting for decisions': '⏳',
  'Got admits — choosing': '🎉',
  'Visa stage': '🛂',
  'Pre-departure': '🧳',
  'Already in US': '🇺🇸',
};

const STEPS = [
  { icon: GraduationCap, label: "What you're pursuing" },
  { icon: BookOpen, label: 'Field of study' },
  { icon: Calendar, label: 'Target intake' },
  { icon: MapPin, label: 'Where you are now' },
  { icon: Globe, label: 'Country of origin' },
];

function ProgressDots({ current, total }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < current
              ? 'w-2 h-2 bg-[#F5A623]'
              : i === current
              ? 'w-6 h-2 bg-navy-900'
              : 'w-2 h-2 bg-navy-200'
          }`}
        />
      ))}
    </div>
  );
}

function SlideWrapper({ children, dir }) {
  return (
    <div
      className={`animate-fade-up`}
      style={{ animationFillMode: 'both' }}
    >
      {children}
    </div>
  );
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { completeOnboarding, profile } = useUser();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    pursuing: profile.pursuing ?? null,
    field: profile.field ?? null,
    targetIntake: profile.targetIntake ?? null,
    situation: profile.situation ?? null,
    country: profile.country ?? null,
  });
  const topRef = useRef(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step]);

  const set = (key, val) => setAnswers((p) => ({ ...p, [key]: val }));

  const canNext = () => {
    if (step === 0) return !!answers.pursuing;
    if (step === 1) return !!answers.field;
    if (step === 2) return !!answers.targetIntake;
    if (step === 3) return !!answers.situation;
    if (step === 4) return !!answers.country;
    return false;
  };

  const handleNext = () => {
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      completeOnboarding(answers);
      navigate('/roadmap');
    }
  };

  const handleSkip = () => {
    completeOnboarding({
      pursuing: answers.pursuing ?? 'Undecided',
      field: answers.field ?? 'Other',
      targetIntake: answers.targetIntake ?? 'Not sure yet',
      situation: answers.situation ?? 'Just exploring',
      country: answers.country ?? 'Other',
    });
    navigate('/roadmap');
  };

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col" ref={topRef}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-bold text-lg text-white">
          Nex<span className="text-[#F5A623]">Step</span>
        </span>
        <button
          onClick={handleSkip}
          className="text-sm text-navy-300 hover:text-white transition-colors"
        >
          Skip for now
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Progress dots */}
          <div className="flex items-center justify-center mb-8">
            <ProgressDots current={step} total={5} />
          </div>

          <SlideWrapper key={step} dir={1}>
            {/* Step 1: Pursuing */}
            {step === 0 && (
              <div>
                <div className="text-center mb-8">
                  <div className="text-4xl mb-3">🎓</div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    What are you pursuing?
                  </h1>
                  <p className="text-navy-300 text-sm">
                    This helps us personalize your roadmap and program recommendations.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEGREE_OPTIONS.map(({ value, label, sub, icon, color, active }) => (
                    <button
                      key={value}
                      onClick={() => set('pursuing', value)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                        answers.pursuing === value
                          ? 'border-[#F5A623] bg-navy-800'
                          : 'border-navy-700 bg-navy-800/50 hover:border-navy-500'
                      }`}
                    >
                      <span className="text-2xl flex-shrink-0">{icon}</span>
                      <div>
                        <div className={`font-bold text-sm ${answers.pursuing === value ? 'text-[#F5A623]' : 'text-white'}`}>
                          {label}
                        </div>
                        <div className="text-xs text-navy-400 mt-0.5">{sub}</div>
                      </div>
                      {answers.pursuing === value && (
                        <div className="ml-auto w-5 h-5 rounded-full bg-[#F5A623] flex items-center justify-center flex-shrink-0">
                          <Check size={11} strokeWidth={3} className="text-navy-900" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Field */}
            {step === 1 && (
              <div>
                <div className="text-center mb-8">
                  <div className="text-4xl mb-3">📚</div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    What field are you targeting?
                  </h1>
                  <p className="text-navy-300 text-sm">
                    We'll surface the most relevant programs, scholarships, and community posts for you.
                  </p>
                </div>
                <div className="relative">
                  <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-1 rounded-2xl">
                    {FIELDS.map((field) => (
                      <button
                        key={field}
                        onClick={() => set('field', field)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                          answers.field === field
                            ? 'border-[#F5A623] bg-navy-700 text-[#F5A623]'
                            : 'border-navy-700 bg-navy-800/50 text-white hover:border-navy-500'
                        }`}
                      >
                        <span className="font-medium text-sm">{field}</span>
                        {answers.field === field && (
                          <Check size={14} className="text-[#F5A623] flex-shrink-0 ml-2" strokeWidth={2.5} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Target intake */}
            {step === 2 && (
              <div>
                <div className="text-center mb-8">
                  <div className="text-4xl mb-3">📅</div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    When are you targeting to start?
                  </h1>
                  <p className="text-navy-300 text-sm">
                    We'll calibrate your roadmap timeline and deadline alerts around this.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {INTAKES.map((intake) => (
                    <button
                      key={intake}
                      onClick={() => set('targetIntake', intake)}
                      className={`py-4 px-3 rounded-2xl border-2 text-center font-semibold text-sm transition-all ${
                        answers.targetIntake === intake
                          ? 'border-[#F5A623] bg-navy-700 text-[#F5A623]'
                          : 'border-navy-700 bg-navy-800/50 text-white hover:border-navy-500'
                      }`}
                    >
                      {intake}
                      {answers.targetIntake === intake && (
                        <div className="mt-1 flex justify-center">
                          <Check size={12} className="text-[#F5A623]" strokeWidth={2.5} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Situation */}
            {step === 3 && (
              <div>
                <div className="text-center mb-8">
                  <div className="text-4xl mb-3">📍</div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Where are you in your journey?
                  </h1>
                  <p className="text-navy-300 text-sm">
                    This sets your current stage on the roadmap. You can always update it later.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {SITUATIONS.map((sit) => (
                    <button
                      key={sit}
                      onClick={() => set('situation', sit)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all ${
                        answers.situation === sit
                          ? 'border-[#F5A623] bg-navy-700'
                          : 'border-navy-700 bg-navy-800/50 hover:border-navy-500'
                      }`}
                    >
                      <span className="text-xl flex-shrink-0">{SITUATION_ICONS[sit]}</span>
                      <span className={`font-medium text-sm ${answers.situation === sit ? 'text-[#F5A623]' : 'text-white'}`}>
                        {sit}
                      </span>
                      {answers.situation === sit && (
                        <div className="ml-auto w-5 h-5 rounded-full bg-[#F5A623] flex items-center justify-center flex-shrink-0">
                          <Check size={11} strokeWidth={3} className="text-navy-900" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Country */}
            {step === 4 && (
              <div>
                <div className="text-center mb-8">
                  <div className="text-4xl mb-3">🌍</div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Where are you from?
                  </h1>
                  <p className="text-navy-300 text-sm">
                    Helps surface country-specific visa tips, scholarships, and community members from your country.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-1">
                  {COUNTRIES.map((country) => (
                    <button
                      key={country}
                      onClick={() => set('country', country)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                        answers.country === country
                          ? 'border-[#F5A623] bg-navy-700 text-[#F5A623]'
                          : 'border-navy-700 bg-navy-800/50 text-white hover:border-navy-500'
                      }`}
                    >
                      <span className="font-medium text-sm">{country}</span>
                      {answers.country === country && (
                        <Check size={14} className="text-[#F5A623] flex-shrink-0" strokeWidth={2.5} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </SlideWrapper>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {step > 0 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 text-sm text-navy-300 hover:text-white transition-colors"
              >
                <ArrowLeft size={15} />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={!canNext()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                canNext()
                  ? 'bg-[#F5A623] text-navy-900 hover:bg-amber-500 shadow-lg shadow-amber-400/20'
                  : 'bg-navy-700 text-navy-500 cursor-not-allowed'
              }`}
            >
              {step === 4 ? (
                <>
                  Build My Roadmap
                  <GraduationCap size={16} />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>

          {/* Step label */}
          <div className="text-center mt-4">
            <span className="text-xs text-navy-500">
              Step {step + 1} of 5 · {STEPS[step].label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
