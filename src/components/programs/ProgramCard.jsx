import { useNavigate } from 'react-router-dom';
import { Bookmark, BookmarkCheck, MapPin, Clock, DollarSign, Users, Star, ExternalLink } from 'lucide-react';
import StarRating from './StarRating';
import StatusSelector from './StatusSelector';
import { useMyList } from '../../context/MyListContext';

const GRE_STYLES = {
  'Required': 'bg-red-50 text-red-700',
  'Optional': 'bg-amber-50 text-amber-700',
  'Not Required': 'bg-emerald-50 text-emerald-700',
};

const TAG_ICONS = {
  'STEM OPT': '🔬',
  'Co-op Available': '💼',
  'Strong Alumni': '🤝',
  'Assistantships': '🎓',
  'TA/RA Available': '📚',
  'Affordable': '💰',
  'Online Option': '💻',
  'Research Focused': '🔍',
  'NYC Location': '🗽',
  'Bay Area Location': '🌁',
  'Rolling Admissions': '📅',
  'Finance Focus': '📈',
  'Flexible Curriculum': '🧩',
};

export default function ProgramCard({ program, compact = false }) {
  const navigate = useNavigate();
  const { isInList, addToList, removeFromList } = useMyList();
  const saved = isInList(program.id);

  const handleSave = (e) => {
    e.stopPropagation();
    saved ? removeFromList(program.id) : addToList(program.id);
  };

  const visibleTags = program.tags.slice(0, compact ? 2 : 3);

  return (
    <div
      onClick={() => navigate(`/programs/${program.id}`)}
      className="bg-white rounded-2xl border border-navy-100 p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {/* School avatar */}
            <div className="w-7 h-7 rounded-lg bg-navy-900 flex items-center justify-center flex-shrink-0">
              <span className="text-[#F5A623] text-[10px] font-bold leading-none">
                {program.shortSchool.charAt(0)}
              </span>
            </div>
            <span className="text-xs font-semibold text-navy-400 truncate">{program.school}</span>
          </div>
          <h3 className="font-bold text-navy-900 text-sm leading-snug group-hover:text-navy-700 transition-colors">
            {program.program}
          </h3>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className={`p-1.5 rounded-lg flex-shrink-0 transition-all ${
            saved
              ? 'text-[#F5A623] bg-amber-50 hover:bg-amber-100'
              : 'text-navy-300 hover:text-navy-600 hover:bg-navy-50'
          }`}
          title={saved ? 'Remove from My List' : 'Save to My List'}
        >
          {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
        </button>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-navy-500">
          <MapPin size={11} className="flex-shrink-0 text-navy-400" />
          {program.city}, {program.state}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-navy-500">
          <Clock size={11} className="flex-shrink-0 text-navy-400" />
          {program.duration}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-navy-700">
          <DollarSign size={11} className="flex-shrink-0 text-navy-400" />
          ${program.tuition.toLocaleString()}/yr
        </div>
        <div className="flex items-center gap-1.5 text-xs text-navy-500">
          <Users size={11} className="flex-shrink-0 text-navy-400" />
          {program.acceptanceRate}% admit
        </div>
      </div>

      {/* GRE + deadline */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${GRE_STYLES[program.greRequired] ?? 'bg-navy-50 text-navy-600'}`}>
          GRE {program.greRequired}
        </span>
        <span className="text-xs text-navy-400">Deadline: {program.deadline}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {visibleTags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-navy-50 text-navy-600">
            {TAG_ICONS[tag] && <span>{TAG_ICONS[tag]}</span>}
            {tag}
          </span>
        ))}
        {program.tags.length > visibleTags.length && (
          <span className="text-[10px] font-semibold text-navy-400">+{program.tags.length - visibleTags.length}</span>
        )}
      </div>

      {/* Footer: rating + status */}
      <div className="mt-auto pt-3 border-t border-navy-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StarRating value={program.rating} size={11} />
          <span className="text-xs font-bold text-navy-700">{program.rating}</span>
          <span className="text-xs text-navy-400">({program.reviewCount})</span>
        </div>
        {saved && (
          <div onClick={(e) => e.stopPropagation()}>
            <StatusSelector programId={program.id} compact />
          </div>
        )}
      </div>
    </div>
  );
}
