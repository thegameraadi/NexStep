import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ASSISTANTSHIP_STORIES, FUNDING_BY_FIELD } from '../../data/finance';

const TA_RA_INFO = [
  {
    type: 'RA',
    full: 'Research Assistant',
    emoji: '🔬',
    description: 'Work directly on a professor\'s funded research project. Typically involves running experiments, analyzing data, writing code, or reviewing literature — depending on the field.',
    compensation: 'Usually includes: full tuition waiver + monthly stipend ($18,000–$42,000/year depending on field and school) + health insurance.',
    whoGets: 'Primarily PhD students and some research-focused MS students. You are essentially being hired as a junior researcher.',
    howToApply: 'Most RAs come through direct faculty connection — email professors before or during the application process. Some programs assign RAs through a matching process.',
  },
  {
    type: 'TA',
    full: 'Teaching Assistant',
    emoji: '🎓',
    description: 'Assist faculty in teaching undergraduate or graduate courses. Responsibilities typically include leading lab sections, grading, holding office hours, and sometimes delivering lectures.',
    compensation: 'Usually includes: partial or full tuition waiver + monthly stipend ($12,000–$22,000/year) + health insurance (varies by school).',
    whoGets: 'PhD students almost universally get TA funding as part of their offer. MS students can apply within departments — usually from the second semester onwards.',
    howToApply: 'Departments post TA openings internally. Ask your graduate coordinator within the first two weeks of arriving. Do not wait until you need the money.',
  },
  {
    type: 'GA',
    full: 'Graduate Assistant',
    emoji: '🏛️',
    description: 'A more general category that includes administrative, research, or teaching duties — often used at professional schools (MPP, MBA, MPA). May also include work at research centers or institutes.',
    compensation: 'Variable — typically partial tuition + stipend ($10,000–$22,000/year). Health insurance less commonly included than RA/TA roles.',
    whoGets: 'Often awarded to professional degree students. Some require specific skills (data analysis, communications, policy writing).',
    howToApply: 'Schools and research centers post GA positions. Also reach out to research centers and policy institutes directly — they often have unfilled GA positions that are not prominently advertised.',
  },
];

const HOW_TO_APPLY_STEPS = [
  {
    step: 1,
    title: 'Research professors before applying',
    body: 'Read recent papers from 3–5 faculty in your target department. Identify whose research is closest to your interests — not just broadly, but specifically. What problem are they working on? What gap are they trying to fill?',
  },
  {
    step: 2,
    title: 'Write a targeted cold email',
    body: 'Subject: "Prospective PhD/MS student — interest in [specific topic]". In 3 short paragraphs: (1) who you are and your research background, (2) why their specific paper or project interests you — with a concrete reference, (3) what you are working on / proposing and why it fits their lab. Ask for a 20-minute call, not a general "any advice" conversation.',
  },
  {
    step: 3,
    title: 'Apply to the program AND mention the professor',
    body: 'In your SOP, name the professor and describe why their work is relevant to your research goals. Admissions committees share SOPs with faculty who are named — this is a direct signal to a potential advisor.',
  },
  {
    step: 4,
    title: 'Follow up — once',
    body: 'If you don\'t hear back in 2 weeks, a single polite follow-up is acceptable. After that, move on. Professors are busy; silence does not mean rejection. Some respond only after decisions are made.',
  },
  {
    step: 5,
    title: 'For MS students: ask about TA positions after arriving',
    body: 'Most MS TA positions are not advertised externally. Visit the department coordinator in Week 1 and express interest. Departments prefer to hire students who are already there and have performed well academically.',
  },
  {
    step: 6,
    title: 'Never pay for a PhD',
    body: 'If a doctoral program offers you admission without funding, it means the faculty do not believe you are capable of producing publishable research. Either the program is low quality, or you should reapply to better-fit programs. Self-funded PhDs are almost never worth it.',
  },
];

function TypeCard({ info }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between p-5 hover:bg-navy-50 transition-colors text-left">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{info.emoji}</span>
          <div>
            <p className="font-bold text-navy-900">{info.type} — {info.full}</p>
            <p className="text-xs text-navy-500 mt-0.5 line-clamp-1">{info.description.slice(0, 80)}...</p>
          </div>
        </div>
        {open ? <ChevronUp size={16} className="text-navy-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-navy-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="border-t border-navy-100 p-5 space-y-4">
          <p className="text-sm text-navy-700 leading-relaxed">{info.description}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-emerald-50 rounded-xl p-3">
              <p className="text-xs font-bold text-emerald-700 mb-1">💰 Compensation</p>
              <p className="text-xs text-emerald-700 leading-relaxed">{info.compensation}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-xs font-bold text-blue-700 mb-1">👤 Who gets it</p>
              <p className="text-xs text-blue-700 leading-relaxed">{info.whoGets}</p>
            </div>
          </div>
          <div className="bg-amber-50 rounded-xl p-3">
            <p className="text-xs font-bold text-amber-700 mb-1">📋 How to apply</p>
            <p className="text-xs text-amber-700 leading-relaxed">{info.howToApply}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function StoryCard({ story }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-navy-100 p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-navy-600">{story.type}</span>
        </div>
        <div className="flex-1">
          <p className="font-bold text-navy-900 text-sm">{story.school}</p>
          <p className="text-xs text-navy-500">{story.field} · {story.degree} · From {story.country}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">{story.stipend}</span>
        {story.tuitionCovered && <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Full tuition waiver ✓</span>}
        {story.healthCovered && <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">Health covered ✓</span>}
      </div>

      <p className="text-sm text-navy-600 leading-relaxed line-clamp-3">{story.story}</p>

      {!open ? (
        <button onClick={() => setOpen(true)} className="mt-3 text-xs font-medium text-[#F5A623] hover:underline">
          Read full story + tip →
        </button>
      ) : (
        <div className="mt-3 space-y-3">
          <p className="text-sm text-navy-600 leading-relaxed">{story.story}</p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-xs font-bold text-amber-700 mb-1">💡 Key takeaway</p>
            <p className="text-xs text-amber-700 leading-relaxed">{story.tip}</p>
          </div>
          <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">Outcome: {story.outcome}</p>
          <button onClick={() => setOpen(false)} className="text-xs text-navy-400 hover:text-navy-600">Show less</button>
        </div>
      )}
    </div>
  );
}

const FUNDING_LEVELS = {
  'Excellent': { cls: 'bg-emerald-100 text-emerald-700', label: 'Excellent' },
  'Good': { cls: 'bg-blue-100 text-blue-700', label: 'Good' },
  'Moderate': { cls: 'bg-amber-100 text-amber-700', label: 'Moderate' },
  'Limited': { cls: 'bg-orange-100 text-orange-700', label: 'Limited' },
  'Rare': { cls: 'bg-red-100 text-red-600', label: 'Rare' },
  'Variable': { cls: 'bg-purple-100 text-purple-700', label: 'Variable' },
  'Competitive': { cls: 'bg-sky-100 text-sky-700', label: 'Competitive' },
  '—': { cls: 'bg-navy-100 text-navy-400', label: '—' },
};

function FundingBadge({ level }) {
  const style = FUNDING_LEVELS[level] || FUNDING_LEVELS['Variable'];
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.cls}`}>{style.label}</span>;
}

export default function FundingGuide() {
  const [section, setSection] = useState('types');

  return (
    <div className="space-y-6">
      {/* Sub-nav */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'types', label: '📚 TA / RA / GA Explained' },
          { id: 'howto', label: '🎯 How to Get Funding' },
          { id: 'stories', label: '🗣️ Community Stories' },
          { id: 'landscape', label: '📊 By Field' },
        ].map(s => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              section === s.id ? 'bg-navy-900 text-white' : 'bg-white border border-navy-200 text-navy-600 hover:border-navy-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {section === 'types' && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-navy-100 p-5 mb-2">
            <h3 className="font-bold text-navy-900 mb-2">Assistantships: the basics</h3>
            <p className="text-sm text-navy-600 leading-relaxed">
              US graduate programs — especially PhD and research-focused MS programs — often fund students through assistantship positions. In exchange for 15–20 hours of research or teaching work per week, students receive a tuition waiver and a monthly stipend. For most international students, this is the single most impactful way to reduce the cost of a US education.
            </p>
          </div>
          {TA_RA_INFO.map(info => (
            <TypeCard key={info.type} info={info} />
          ))}
        </div>
      )}

      {section === 'howto' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-navy-100 p-5">
            <h3 className="font-bold text-navy-900 mb-1">How to get funded — a practical guide</h3>
            <p className="text-sm text-navy-500">For international students applying to US graduate programs</p>
          </div>
          {HOW_TO_APPLY_STEPS.map((step, i) => (
            <div key={i} className="bg-white rounded-2xl border border-navy-100 p-5 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center font-bold text-navy-900 text-sm flex-shrink-0">
                {step.step}
              </div>
              <div>
                <p className="font-bold text-navy-900 mb-1.5">{step.title}</p>
                <p className="text-sm text-navy-600 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {section === 'stories' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-navy-100 p-4">
            <p className="text-sm text-navy-600">Real experiences from international students across fields and schools. Stories are anonymized with details changed to protect identities.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ASSISTANTSHIP_STORIES.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      )}

      {section === 'landscape' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-navy-100 p-4">
            <p className="text-sm text-navy-600">How well-funded is your field? This is a rough guide based on typical US graduate funding patterns. Individual programs vary significantly.</p>
          </div>
          <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-navy-50 border-b border-navy-100">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-bold text-navy-600">Field</th>
                    <th className="px-4 py-3 text-xs font-bold text-navy-600">PhD</th>
                    <th className="px-4 py-3 text-xs font-bold text-navy-600">MS/MA</th>
                    <th className="px-4 py-3 text-xs font-bold text-navy-600">MBA/Prof</th>
                    <th className="px-5 py-3 text-xs font-bold text-navy-600">Avg Stipend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-50">
                  {FUNDING_BY_FIELD.map((row, i) => (
                    <tr key={i} className="hover:bg-navy-50/50 transition-colors">
                      <td className="px-5 py-3">
                        <p className="text-sm font-semibold text-navy-900">{row.field}</p>
                        <p className="text-xs text-navy-400 mt-0.5">{row.note}</p>
                      </td>
                      <td className="px-4 py-3 text-center"><FundingBadge level={row.phd} /></td>
                      <td className="px-4 py-3 text-center"><FundingBadge level={row.ms} /></td>
                      <td className="px-4 py-3 text-center"><FundingBadge level={row.mba} /></td>
                      <td className="px-5 py-3 text-xs font-medium text-navy-700">{row.avgStipend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
