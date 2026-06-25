import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const TABS = [
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms of Use' },
  { id: 'disclaimer', label: 'Disclaimer' },
];

function Section({ title, children }) {
  return (
    <div className="space-y-2">
      <h2 className="font-bold text-navy-900 text-lg">{title}</h2>
      <div className="text-sm text-navy-700 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="space-y-8">
      <div className="bg-navy-50 border border-navy-200 rounded-2xl p-4">
        <p className="text-sm text-navy-600"><strong>Last updated:</strong> June 2025 · <strong>Effective:</strong> June 2025</p>
      </div>

      <Section title="1. Overview">
        <p>NexStep ("we", "our", "us") is a community-built platform for international students navigating US graduate admissions. We are committed to your privacy. This policy explains what data we collect, how we use it, and what control you have over it.</p>
        <p>NexStep does not sell your personal data, does not use advertising trackers, and does not share your information with third parties for marketing purposes.</p>
      </Section>

      <Section title="2. Data We Collect">
        <p><strong>Data you enter directly:</strong> Profile information from the onboarding flow (degree type, target programs, timeline, country of origin), application tracker entries, financial planning inputs, and checklist states. This data is stored exclusively in your browser's localStorage — it never leaves your device or gets sent to any server.</p>
        <p><strong>Usage analytics:</strong> We use Plausible Analytics, a privacy-friendly analytics tool that does not use cookies, does not track individuals across sites, and is fully GDPR-compliant. Plausible collects only aggregated, anonymized data: page views, referrers, country (by IP, not stored), and browser/OS type. No personal identifiers are collected.</p>
        <p><strong>Data we do NOT collect:</strong> We do not collect your name, email address, phone number, or any other personally identifiable information in our current version. We do not use cookies. We do not use Google Analytics, Facebook Pixel, or any advertising trackers.</p>
      </Section>

      <Section title="3. Local Storage">
        <p>All user profile data (stage progress, applications, finances, checklists, community room membership) is stored in your browser's localStorage. This means:</p>
        <p>• Your data stays on your device — we cannot access it<br />• Clearing your browser's site data will delete your NexStep progress<br />• Your data does not sync across devices or browsers<br />• There is no account system — no username or password is required</p>
      </Section>

      <Section title="4. External Links">
        <p>NexStep links to external websites (USCIS, WES, ETS, university sites, etc.). We are not responsible for the privacy practices or content of those sites. Always review the privacy policy of any third-party website you visit from NexStep.</p>
      </Section>

      <Section title="5. Children's Privacy">
        <p>NexStep is intended for users aged 18 and older (university students). We do not knowingly collect any information from children under 13. If you believe a child has provided us with information, please contact us and we will address it.</p>
      </Section>

      <Section title="6. Changes to This Policy">
        <p>We may update this policy periodically. We will indicate the "last updated" date at the top. Continued use of NexStep after changes constitutes acceptance of the updated policy.</p>
      </Section>

      <Section title="7. Contact">
        <p>For privacy-related questions, contact us via the GitHub repository at github.com/nexstep or through the community channels.</p>
      </Section>
    </div>
  );
}

function TermsOfUse() {
  return (
    <div className="space-y-8">
      <div className="bg-navy-50 border border-navy-200 rounded-2xl p-4">
        <p className="text-sm text-navy-600"><strong>Last updated:</strong> June 2025 · By using NexStep, you agree to these terms.</p>
      </div>

      <Section title="1. About NexStep">
        <p>NexStep is a free, community-built resource platform for international students pursuing graduate education in the United States. It is not affiliated with, endorsed by, or connected to any university, government agency, testing organization, or immigration authority.</p>
      </Section>

      <Section title="2. Use of the Platform">
        <p>You may use NexStep for personal, non-commercial purposes — tracking your applications, researching programs, and accessing educational information. You agree not to:</p>
        <p>• Use NexStep for any unlawful purpose<br />• Attempt to reverse-engineer, scrape, or reproduce the platform's content at scale without permission<br />• Use NexStep in any way that could harm other users or the community<br />• Share content in community rooms that is false, defamatory, harassing, or violates the privacy of others</p>
      </Section>

      <Section title="3. Community Conduct">
        <p>NexStep community features (rooms, messages) are intended for constructive peer support. We expect users to:</p>
        <p>• Be respectful and constructive in discussions<br />• Not share personal information of others without consent<br />• Not use community spaces for solicitation, spam, or self-promotion<br />• Not provide false admissions information or fabricate test scores/results</p>
        <p>We reserve the right to remove content or access that violates these guidelines.</p>
      </Section>

      <Section title="4. Intellectual Property">
        <p>NexStep's design, code, and original content are the property of NexStep contributors. Community-contributed content (tips, experiences, advice) remains owned by the contributors but is licensed to NexStep for display on the platform.</p>
        <p>Third-party content (university names, test names, government form names) is used for identification and educational purposes only — no endorsement or affiliation is implied.</p>
      </Section>

      <Section title="5. No Warranties">
        <p>NexStep is provided "as is" without warranties of any kind. We do not warrant that the information on the platform is accurate, complete, current, or error-free. The platform may contain outdated information — always verify with official sources before making any decisions.</p>
      </Section>

      <Section title="6. Limitation of Liability">
        <p>To the fullest extent permitted by law, NexStep and its contributors shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or reliance on the platform.</p>
      </Section>

      <Section title="7. Governing Law">
        <p>These terms are governed by applicable US laws. Any disputes shall be resolved through binding arbitration rather than in court, to the extent permitted by law.</p>
      </Section>

      <Section title="8. Changes to Terms">
        <p>We may update these terms. We will indicate the last updated date. Continued use constitutes acceptance.</p>
      </Section>
    </div>
  );
}

function Disclaimer() {
  return (
    <div className="space-y-8">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">⚠️</span>
        <div>
          <p className="font-bold text-red-900 mb-1">Important: Read Before Using NexStep</p>
          <p className="text-sm text-red-800 leading-relaxed">NexStep provides general educational information only. It is NOT a substitute for official government sources, professional immigration advice, or academic counseling. Always verify critical information with official sources before making decisions.</p>
        </div>
      </div>

      <Section title="Not Legal or Immigration Advice">
        <p>NexStep provides general informational content about F-1 visa processes, OPT/CPT, and US immigration procedures. <strong>This is not legal advice and should not be relied upon as such.</strong></p>
        <p>Immigration rules change frequently. Violations of F-1 status can have serious and long-lasting consequences. For any specific immigration situation — especially anything involving a potential status violation, H-1B sponsorship, or departure/re-entry — consult a licensed immigration attorney or your university's Designated School Official (DSO).</p>
      </Section>

      <Section title="Not Financial Advice">
        <p>Information about banking, money transfers, scholarships, loans, and tuition is provided for general guidance. It does not constitute financial or tax advice.</p>
        <p>For US tax obligations (Form 1040-NR, Form 8843, ITIN), consult a qualified tax professional familiar with international student tax rules, or use services like Sprintax or GLACIER that specialize in nonresident alien tax filing.</p>
      </Section>

      <Section title="Not Official Admissions Guidance">
        <p>Admission requirements, deadlines, and processes change annually. Information on NexStep reflects community-sourced guidance and may be outdated. Always verify requirements directly with the university's official admissions website before submitting any application.</p>
        <p>NexStep is not affiliated with any university, college, or graduate program. Use of program names and rankings is for informational purposes only.</p>
      </Section>

      <Section title="Community Content">
        <p>Community-contributed content (experiences, tips, advice from other students) represents individual opinions and experiences. NexStep does not verify the accuracy of community posts. Treat peer advice as a starting point for research, not as authoritative guidance.</p>
      </Section>

      <Section title="External Links">
        <p>NexStep links to government websites (USCIS, State Department), evaluation services (WES, NACES), and testing organizations (ETS, GMAC). These links are provided for convenience — NexStep does not control their content and is not responsible for any changes, inaccuracies, or accessibility issues on those sites.</p>
        <p>Always confirm you are on the correct official domain (e.g., .gov for US government sites) before entering personal information.</p>
      </Section>

      <Section title="Accuracy of Information">
        <p>NexStep makes reasonable efforts to provide accurate and current information. However, information may be incomplete, outdated, or incorrect. We make no representations or warranties about the accuracy, reliability, or completeness of any information on the platform.</p>
        <p>Use NexStep as a helpful starting point — not as your sole source of truth for any consequential decision.</p>
      </Section>
    </div>
  );
}

export default function LegalPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'privacy';
  const [activeTab, setActiveTab] = useState(TABS.find(t => t.id === initialTab) ? initialTab : 'privacy');

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-navy-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Legal</h1>
          <p className="text-navy-300 text-base">Privacy policy, terms of use, and important disclaimers.</p>
          <div className="mt-8 flex gap-1 overflow-x-auto pb-px">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium rounded-t-xl transition-colors flex-shrink-0 ${
                  activeTab === tab.id ? 'bg-[#F9FAFB] text-navy-900' : 'text-navy-400 hover:text-navy-200 hover:bg-navy-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'privacy' && <PrivacyPolicy />}
        {activeTab === 'terms' && <TermsOfUse />}
        {activeTab === 'disclaimer' && <Disclaimer />}
      </div>
    </div>
  );
}
