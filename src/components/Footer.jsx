import { Heart } from 'lucide-react';

const LINKS = {
  Platform: ['Roadmap', 'Programs', 'Applications', 'Finance', 'Visa', 'Pre-Departure', 'Community'],
  Resources: ['GRE Prep Guide', 'SOP Templates', 'Scholarship Finder', 'Cost Calculator', 'Visa Checklist'],
  About: ['Our Story', 'Contributing', 'GitHub', 'Report an Issue', 'Privacy Policy'],
};

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center">
                <span className="text-[#F5A623] font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-lg">
                Nex<span className="text-[#F5A623]">Step</span>
              </span>
            </div>
            <p className="text-sm text-navy-300 leading-relaxed mb-5">
              Your complete guide from application to orientation. Built by international students, for international students.
            </p>
            <p className="text-xs text-navy-400 flex items-center gap-1.5">
              <Heart size={12} className="text-rose-400 fill-rose-400" />
              Community-built · No ads · Always free
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              {/* GitHub */}
              <button className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-navy-300 hover:text-white hover:bg-navy-700 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/></svg>
              </button>
              {/* X / Twitter */}
              <button className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-navy-300 hover:text-white hover:bg-navy-700 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.23H2.744l7.737-8.835L2 2.25h6.984l4.26 5.632 4.998-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
              {/* LinkedIn */}
              <button className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-navy-300 hover:text-white hover:bg-navy-700 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </button>
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-navy-400 mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-navy-300 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-navy-400">
            © 2025 NexStep. Open-source and community-maintained. Not affiliated with any university or government body.
          </p>
          <p className="text-xs text-navy-500">
            Information is for guidance only — always verify with official sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
