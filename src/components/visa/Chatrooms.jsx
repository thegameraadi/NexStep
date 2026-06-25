import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { CONSULATES } from '../../data/visa';

const MOCK_MESSAGES = {
  mumbai: [
    { id: 'm1', author: 'Priya_CS25', text: 'Just got back from Mumbai consulate — approved in 4 minutes. Officer barely looked at my documents. Had I-20, SEVIS receipt, and bank statement on top.', time: '2h ago', role: 'Admitted — CMU MSCS' },
    { id: 'm2', author: 'Rahul_EE25', text: 'Booked my Mumbai appointment for July 14. Any recent changes to wait times?', time: '3h ago', role: 'Admitted — UIUC EE' },
    { id: 'm3', author: 'Kavya_DS', text: '@Rahul_EE25 I went last week and it was only a 20-minute wait inside the consulate itself. The appointment system is well-organized.', time: '2h ago', role: 'Admitted — UMich DS' },
    { id: 'm4', author: 'Ananya_Pol', text: 'Does Mumbai ask about career plans more than other consulates? I\'ve seen this mentioned a few times.', time: '5h ago', role: 'Admitted — HKS MPP' },
    { id: 'm5', author: 'Priya_CS25', text: '@Ananya_Pol Yes, from what I\'ve heard. My officer asked "what will you do after graduation?" as the second question. Have a clear answer ready.', time: '4h ago', role: 'Admitted — CMU MSCS' },
  ],
  delhi: [
    { id: 'd1', author: 'Siddharth_PhD', text: 'Delhi interview done — approved! 7 minutes for a PhD application. Officer asked about my advisor and research area. Be ready to explain your research simply.', time: '1h ago', role: 'Admitted — MIT PhD CS' },
    { id: 'd2', author: 'Meera_MBA', text: 'Any recent intel on financial document requirements at Delhi? I have 9 months of bank statements — is that enough?', time: '4h ago', role: 'Admitted — Wharton MBA' },
    { id: 'd3', author: 'Rohan_EE', text: '@Meera_MBA I\'d push for 12 months if possible. Delhi has stricter financial scrutiny based on recent reports here. Better safe than sorry.', time: '3h ago', role: 'Admitted — Stanford EE' },
    { id: 'd4', author: 'Aisha_PP', text: 'Appointment slots at Delhi are tight this week. I\'ve been refreshing every morning at 8 AM and there\'s nothing until August.', time: '6h ago', role: 'Admitted — HKS MPP' },
    { id: 'd5', author: 'Siddharth_PhD', text: '@Aisha_PP Check at 8 AM on Wednesdays — that\'s when new slots typically open.', time: '5h ago', role: 'Admitted — MIT PhD CS' },
  ],
  chennai: [
    { id: 'c1', author: 'Vikram_CS', text: 'Chennai is the chillest consulate. 2-minute interview, officer was friendly, approved immediately. UT Austin here I come!', time: '30m ago', role: 'Admitted — UT Austin MSCS' },
    { id: 'c2', author: 'Divya_ME', text: 'Has anyone had the officer at Chennai ask about salary expectations after graduation? I\'ve been practicing that answer.', time: '2h ago', role: 'Admitted — Georgia Tech ME' },
    { id: 'c3', author: 'Karthik_ML', text: '@Divya_ME They asked me "what kind of jobs will you apply to?" which is similar. I answered with job title and said I\'d return to India after OPT if I use it.', time: '1.5h ago', role: 'Admitted — CMU MSML' },
    { id: 'c4', author: 'Ananya_Bio', text: 'Chennai appointment slots are the easiest to get — I booked within 3 days of checking. Highly recommend if you\'re in South India.', time: '5h ago', role: 'Admitted — JHU BME' },
  ],
  hyderabad: [
    { id: 'h1', author: 'Shreya_CS', text: 'Hyderabad consulate approved! My TA offer at GT made the financial questions trivial. Officer literally said "oh, full funding?" and moved on.', time: '4h ago', role: 'Admitted — Georgia Tech MSCS' },
    { id: 'h2', author: 'Nikhil_Fin', text: 'Anyone know if Hyderabad asks about GMAT scores for MBA applicants?', time: '5h ago', role: 'Admitted — Booth MBA' },
    { id: 'h3', author: 'Riya_MSDS', text: '@Nikhil_Fin They didn\'t ask me. But they did ask about who funds you and what you\'ll do in the US. Have clear answers for both.', time: '4.5h ago', role: 'Admitted — Columbia MSDS' },
  ],
  kolkata: [
    { id: 'k1', author: 'Arnav_CS', text: 'Kolkata consulate is way more chill than I expected. Officer was friendly and asked about Kolkata before the visa questions. Got approved!', time: '6h ago', role: 'Admitted — Boston University CS' },
    { id: 'k2', author: 'Supriya_PP', text: 'Slots at Kolkata are easy to get. Booked mine 2 weeks out.', time: '8h ago', role: 'Admitted — Georgetown MPP' },
  ],
};

function MessageBubble({ msg }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-full bg-navy-200 flex items-center justify-center flex-shrink-0 text-xs font-bold text-navy-700">
        {msg.author[0].toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-xs font-bold text-navy-900">{msg.author}</span>
          <span className="text-xs text-navy-400">{msg.role}</span>
          <span className="text-xs text-navy-300 ml-auto">{msg.time}</span>
        </div>
        <p className="text-sm text-navy-700 leading-relaxed mt-0.5">{msg.text}</p>
      </div>
    </div>
  );
}

export default function Chatrooms() {
  const [activeRoom, setActiveRoom] = useState('mumbai');
  const [draft, setDraft] = useState('');
  const [localMessages, setLocalMessages] = useState({});

  const roomMessages = [...(MOCK_MESSAGES[activeRoom] || []), ...(localMessages[activeRoom] || [])];
  const activeConsulate = CONSULATES.find(c => c.id === activeRoom);

  const sendMessage = () => {
    if (!draft.trim()) return;
    const msg = {
      id: `local_${Date.now()}`,
      author: 'You',
      text: draft.trim(),
      time: 'Just now',
      role: 'NexStep Member',
    };
    setLocalMessages(prev => ({ ...prev, [activeRoom]: [...(prev[activeRoom] || []), msg] }));
    setDraft('');
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-navy-100 p-4">
        <p className="text-xs font-semibold text-navy-600 mb-3 flex items-center gap-1.5">
          <MessageCircle size={13} /> Consulate Chatrooms
        </p>
        <div className="flex flex-wrap gap-2">
          {CONSULATES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveRoom(c.id)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-colors ${
                activeRoom === c.id ? 'bg-navy-900 text-white border-navy-900' : 'border-navy-200 text-navy-600 hover:border-navy-400'
              }`}
            >
              {c.city}
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${activeRoom === c.id ? 'bg-white/20' : 'bg-emerald-100 text-emerald-700'}`}>
                {(MOCK_MESSAGES[c.id]?.length || 0) + (localMessages[c.id]?.length || 0)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-navy-100 bg-navy-50/50">
          <p className="font-bold text-navy-900 text-sm">#{activeRoom} — {activeConsulate?.city} Consulate</p>
          <p className="text-xs text-navy-400">{activeConsulate?.fullName}</p>
        </div>

        <div className="p-5 space-y-4 max-h-96 overflow-y-auto">
          {roomMessages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
        </div>

        <div className="border-t border-navy-100 p-4">
          <div className="flex gap-2">
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder={`Message #${activeRoom}...`}
              className="flex-1 border border-navy-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-400 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!draft.trim()}
              className="p-2.5 bg-navy-900 rounded-xl text-white hover:bg-navy-800 disabled:opacity-40 transition-colors flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-xs text-navy-400 mt-1.5">These are community discussions. Always verify with your DSO for official guidance.</p>
        </div>
      </div>
    </div>
  );
}
