import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { WAITLIST_DATA } from '../../data/decisions';

function MovementBadge({ moved }) {
  if (moved === 0) return <span className="text-xs text-navy-400">No movement</span>;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
      +{moved} admitted
    </span>
  );
}

function SubmitMovementModal({ program, onClose, onSubmit }) {
  const [form, setForm] = useState({ outcome: 'Admitted', days: '', gpa: '', notes: '' });
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, days: parseInt(form.days) || null, gpa: form.gpa ? parseFloat(form.gpa) : null, date: new Date().toISOString().slice(0, 10) });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-5 py-4 border-b border-navy-100">
          <div>
            <h3 className="font-bold text-navy-900 text-sm">Submit Waitlist Update</h3>
            <p className="text-xs text-navy-400 mt-0.5">{program.school} — {program.program}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">What happened?</label>
              <select value={form.outcome} onChange={e => set('outcome', e.target.value)}
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-navy-400">
                <option>Admitted</option>
                <option>Still Waiting</option>
                <option>Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">Days since waitlist</label>
              <input type="number" min="1" value={form.days} onChange={e => set('days', e.target.value)} placeholder="e.g. 30"
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-600 mb-1.5">GPA (optional)</label>
              <input type="number" step="0.01" min="0" max="4" value={form.gpa} onChange={e => set('gpa', e.target.value)} placeholder="3.8"
                className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-600 mb-1.5">Notes (optional)</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={3}
              placeholder="Did you send an LOI? Get a call? Anything useful for others..."
              className="w-full border border-navy-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-400 resize-none" />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-navy-200 rounded-xl text-sm font-semibold text-navy-700 hover:bg-navy-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 bg-navy-900 rounded-xl text-sm font-semibold text-white hover:bg-navy-800 transition-colors">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function WaitlistCard({ program }) {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [localSubmissions, setLocalSubmissions] = useState([]);

  const allSubmissions = [...program.communitySubmissions, ...localSubmissions];
  const totalMoved = program.movementHistory.reduce((a, e) => a + e.moved, 0);

  const handleSubmit = (sub) => {
    setLocalSubmissions(prev => [sub, ...prev]);
  };

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all ${open ? 'border-navy-300 shadow-card' : 'border-navy-100'}`}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-navy-900 text-sm">{program.school}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">⏳ Waitlisted</span>
            </div>
            <p className="text-xs text-navy-500 mt-0.5">{program.program} · {program.season}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-lg font-bold text-emerald-600">{totalMoved}</p>
            <p className="text-xs text-navy-400">moved this season</p>
          </div>
        </div>

        {/* Movement history summary */}
        {program.movementHistory.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {program.movementHistory.map((m, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-navy-500">{m.date} — {m.note}</span>
                <MovementBadge moved={m.moved} />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mt-4">
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-navy-900 text-white rounded-xl hover:bg-navy-800 transition-colors">
            <Plus size={12} /> Submit Update
          </button>
          <button onClick={() => setOpen(v => !v)} className="flex items-center gap-1 text-xs font-medium text-[#F5A623] hover:underline ml-auto">
            {open ? 'Less' : 'Full history & tips'}
            {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-navy-100 bg-navy-50/30 p-5 space-y-5">
          {/* Tip */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
            <p className="text-xs font-bold text-amber-700 mb-1">💡 Strategy tip</p>
            <p className="text-xs text-amber-700 leading-relaxed">{program.tip}</p>
          </div>

          {/* Community submissions */}
          {allSubmissions.length > 0 && (
            <div>
              <p className="text-xs font-bold text-navy-700 mb-2">Community updates ({allSubmissions.length})</p>
              <div className="space-y-2">
                {allSubmissions.map((s, i) => (
                  <div key={i} className="bg-white rounded-xl border border-navy-100 p-3">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.outcome === 'Admitted' ? 'bg-emerald-100 text-emerald-700' : s.outcome === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-navy-100 text-navy-600'}`}>
                        {s.outcome}
                      </span>
                      <span className="text-xs text-navy-400">{s.date}</span>
                    </div>
                    <div className="flex gap-3 text-xs text-navy-500 mb-1.5">
                      {s.daysSinceWaitlist && <span>{s.daysSinceWaitlist} days after waitlist</span>}
                      {s.gpa && <span>GPA {s.gpa}</span>}
                    </div>
                    {s.notes && <p className="text-xs text-navy-600 leading-relaxed">{s.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Historical movement */}
          <div>
            <p className="text-xs font-bold text-navy-700 mb-2">Historical movement</p>
            <div className="space-y-1.5">
              {program.historicalMovement.map((h, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-white rounded-lg px-3 py-2 border border-navy-100">
                  <span className="text-navy-600">{h.season}</span>
                  <span className="font-semibold text-emerald-700">+{h.moved} admitted</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && <SubmitMovementModal program={program} onClose={() => setShowModal(false)} onSubmit={handleSubmit} />}
    </div>
  );
}

export default function WaitlistTracker() {
  return (
    <div className="space-y-5">
      {/* Info banner */}
      <div className="bg-white rounded-2xl border border-navy-100 p-5">
        <h3 className="font-bold text-navy-900 mb-2">How to read this tracker</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-xs text-navy-600">
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 text-base">📊</span>
            <p>Movement data is community-reported. Each entry represents a real student who submitted an update.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 text-base">✉️</span>
            <p>A Letter of Intent (LOI) — a short 200-word email reconfirming your interest — is your most effective action while waiting.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 text-base">📅</span>
            <p>Most waitlist movement happens between mid-March and April 15. After April 15, a second wave often follows.</p>
          </div>
        </div>
      </div>

      {/* Program cards */}
      <div className="space-y-3">
        {WAITLIST_DATA.map(program => <WaitlistCard key={program.id} program={program} />)}
      </div>
    </div>
  );
}
