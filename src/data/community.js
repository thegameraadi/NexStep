// ─── Room categories ──────────────────────────────────────────────────────────

export const STAGE_ROOMS = [
  { id: 'stage-1', name: 'Stage 1: Research & Shortlisting', stage: 1, description: 'Choosing programs, ranking research, building your target list', memberCount: 2841 },
  { id: 'stage-2', name: 'Stage 2: Test Prep', stage: 2, description: 'GRE/GMAT, TOEFL/IELTS strategy, score timelines', memberCount: 3102 },
  { id: 'stage-3', name: 'Stage 3: Applications', stage: 3, description: 'SOPs, LORs, resumes, deadlines, and the submission grind', memberCount: 4587 },
  { id: 'stage-4', name: 'Stage 4: Waiting Period', stage: 4, description: 'After you hit submit — managing the wait, interview prep', memberCount: 3290 },
  { id: 'stage-5', name: 'Stage 5: Decisions & Admits', stage: 5, description: 'Comparing offers, waitlists, funding negotiation', memberCount: 2764 },
  { id: 'stage-6', name: 'Stage 6: Visa Application', stage: 6, description: 'DS-160, SEVIS, visa interview prep, consulate experiences', memberCount: 2103 },
  { id: 'stage-7', name: 'Stage 7: Pre-Departure & Arrival', stage: 7, description: 'Housing, packing, banking, first month in the US', memberCount: 1892 },
];

export const SCHOOL_ROOMS = [
  { id: 'mit', name: 'MIT', fullName: 'Massachusetts Institute of Technology', memberCount: 1243 },
  { id: 'stanford', name: 'Stanford', fullName: 'Stanford University', memberCount: 1187 },
  { id: 'cmu', name: 'Carnegie Mellon', fullName: 'Carnegie Mellon University', memberCount: 1432 },
  { id: 'columbia', name: 'Columbia', fullName: 'Columbia University', memberCount: 1089 },
  { id: 'cornell', name: 'Cornell', fullName: 'Cornell University', memberCount: 987 },
  { id: 'gatech', name: 'Georgia Tech', fullName: 'Georgia Institute of Technology', memberCount: 1356 },
  { id: 'uiuc', name: 'UIUC', fullName: 'University of Illinois Urbana-Champaign', memberCount: 1521 },
  { id: 'ucsd', name: 'UC San Diego', fullName: 'University of California, San Diego', memberCount: 876 },
  { id: 'ucla', name: 'UCLA', fullName: 'University of California, Los Angeles', memberCount: 934 },
  { id: 'ucb', name: 'UC Berkeley', fullName: 'University of California, Berkeley', memberCount: 1102 },
  { id: 'umich', name: 'Michigan', fullName: 'University of Michigan', memberCount: 1043 },
  { id: 'utaustin', name: 'UT Austin', fullName: 'University of Texas at Austin', memberCount: 1178 },
  { id: 'purdue', name: 'Purdue', fullName: 'Purdue University', memberCount: 892 },
  { id: 'nyu', name: 'NYU', fullName: 'New York University', memberCount: 867 },
  { id: 'uw', name: 'UW Seattle', fullName: 'University of Washington, Seattle', memberCount: 1023 },
];

export const FIELD_ROOMS = [
  { id: 'cs-ml', name: 'Computer Science & ML', description: 'MSCS, MSML, MLE, AI/ML programs', memberCount: 5234, icon: '💻' },
  { id: 'data-science', name: 'Data Science & Analytics', description: 'MSDS, MDS, Business Analytics, Statistics', memberCount: 3102, icon: '📊' },
  { id: 'engineering', name: 'Engineering', description: 'ECE, ME, Civil, Chemical, Aerospace, Materials', memberCount: 2876, icon: '⚙️' },
  { id: 'business', name: 'Business & Finance', description: 'MBA, MFE, MSFE, MS Finance, Business Analytics', memberCount: 2341, icon: '📈' },
  { id: 'biosciences', name: 'Life Sciences & Bio', description: 'Biomedical, Bioinformatics, Public Health, Biology', memberCount: 1456, icon: '🔬' },
  { id: 'humanities', name: 'Humanities & Social Sciences', description: 'Political Science, Economics, Psychology, Design', memberCount: 987, icon: '📚' },
];

export const COUNTRY_ROOMS = [
  { id: 'india', name: 'India 🇮🇳', description: 'For students from India — visa, banking, living tips', memberCount: 8432 },
  { id: 'china', name: 'China 🇨🇳', description: 'For students from China — visa, WeChat, VPN, living tips', memberCount: 6213 },
  { id: 'nigeria', name: 'Nigeria 🌍', description: 'For students from Nigeria and West Africa', memberCount: 1243 },
  { id: 'south-korea', name: 'South Korea 🇰🇷', description: 'For students from South Korea', memberCount: 1087 },
  { id: 'mexico', name: 'Mexico & Latin America 🇲🇽', description: 'For students from Mexico and Latin America', memberCount: 743 },
  { id: 'other-countries', name: 'Other Countries 🌐', description: 'All other countries — general international student support', memberCount: 2341 },
];

// ─── Mock messages ─────────────────────────────────────────────────────────────

export const MOCK_MESSAGES = {
  'stage-3': [
    {
      id: 'm1', author: 'Priya_CMU25', avatar: 'P', time: '2h ago', pinned: true,
      text: '📌 PINNED: SOP resource megathread — https://bit.ly/nexstep-sop-guide. All the templates, examples, and review partners are in there. Check before asking SOP questions!',
    },
    {
      id: 'm2', author: 'arjun_mscs', avatar: 'A', time: '45m ago', pinned: false,
      text: 'Just submitted to CMU MSCS. 3.8 GPA, 325 GRE, 3 years work ex at a mid-tier IT company. Anyone know what the profile cutoff feels like this cycle?',
      replies: [
        { id: 'r1', author: 'meera_stanford', avatar: 'M', time: '40m ago', text: 'I got in last year with a very similar profile — 3.7 GPA, 322 GRE, 2 years work ex. The SOP and LORs matter more than people think. Did you get strong LORs?' },
        { id: 'r2', author: 'arjun_mscs', avatar: 'A', time: '35m ago', text: 'Yes! Two from my undergrad profs and one from my manager. All pretty strong I think.' },
      ],
    },
    {
      id: 'm3', author: 'chen_wei_uiuc', avatar: 'C', time: '1h ago', pinned: false,
      text: 'UIUC MSCS portal just went live for Fall 2026. The system is showing "Decision Pending" for everyone who submitted before Dec 15. No movement expected until February per the grad coordinator.',
      replies: [],
    },
    {
      id: 'm4', author: 'rahul_utaustin', avatar: 'R', time: '2h ago', pinned: false,
      text: 'Tip: For UT Austin MSCS, the statement of purpose word limit is 500 words — not 1000 like most schools. I almost submitted a 900 word SOP. Check individual school requirements!',
      replies: [
        { id: 'r3', author: 'kavya_iisc', avatar: 'K', time: '1h 50m ago', text: 'THIS. Saved me from a disaster. Good catch.' },
      ],
    },
    {
      id: 'm5', author: 'dev_nyu', avatar: 'D', time: '3h ago', pinned: false,
      text: 'Anyone else find it impossible to write a compelling SOP when your research experience is limited? I\'m a software engineer transitioning to MSCS — my SOP feels generic.',
      replies: [
        { id: 'r4', author: 'Priya_CMU25', avatar: 'P', time: '2h 45m ago', text: 'Focus on a specific problem you want to solve, not "I love CS." What kind of work at your job made you want an MSCS specifically? Start from there.' },
        { id: 'r5', author: 'meera_stanford', avatar: 'M', time: '2h 30m ago', text: 'The "why this program specifically" section is where most industry applicants lose points. Research one or two professors at each school and connect their work to yours.' },
      ],
    },
  ],
  'india': [
    {
      id: 'm10', author: 'aarav_cmu', avatar: 'A', time: '30m ago', pinned: true,
      text: '📌 PINNED: SBI forex card vs Wise — the definitive comparison for sending money from India. Answer: Wise for regular transfers, SBI card for emergency backup. Full breakdown in the pinned doc.',
    },
    {
      id: 'm11', author: 'sanya_mit', avatar: 'S', time: '1h ago', pinned: false,
      text: 'Visa appointment at Mumbai consulate — got my visa in 2 days after the interview. The officer asked: why this specific program, funding source, and plans after graduation. Very standard. Don\'t overthink it.',
      replies: [
        { id: 'r10', author: 'rohan_stanford', avatar: 'R', time: '55m ago', text: 'Thanks! Did they ask to see your bank statements at the counter or just at the interview?' },
        { id: 'r11', author: 'sanya_mit', avatar: 'S', time: '50m ago', text: 'Counter only saw the DS-160 confirmation + passport. Interview officer asked about the I-20 and who was funding. Didn\'t ask for bank docs.' },
      ],
    },
    {
      id: 'm12', author: 'ishaan_gatech', avatar: 'I', time: '2h ago', pinned: false,
      text: 'For people flying from India: IndiGo + Air India codeshare to JFK is decent pricing right now. Book at least 6 weeks out. Also — carry extra luggage on Air India (2x23kg usually) vs IndiGo (1x20kg). Check your ticket carefully!',
    },
    {
      id: 'm13', author: 'nisha_columbia', avatar: 'N', time: '4h ago', pinned: false,
      text: 'Anyone else navigating the education loan process? Axis Bank\'s secured loan for US education has the lowest rate I found (9.5% for 20L+). HDFC Credila requires property as collateral but is faster to process.',
      replies: [
        { id: 'r12', author: 'vimal_uiuc', avatar: 'V', time: '3h ago', text: 'Prodigy Finance is another option — no collateral required, fixed rate around 10-12%, specifically for international students. Worth checking.' },
      ],
    },
  ],
  'cs-ml': [
    {
      id: 'm20', author: 'alex_cmu', avatar: 'A', time: '20m ago', pinned: false,
      text: 'For 2026 Fall applicants: CMU MSCS results come in waves. First wave: mid-February (mostly funded admits). Second wave: late February/early March. Waitlists: March/April. Don\'t panic if you don\'t hear in Feb.',
      replies: [
        { id: 'r20', author: 'yuna_mit', avatar: 'Y', time: '15m ago', text: 'Is this confirmed by the department or community pattern matching?' },
        { id: 'r21', author: 'alex_cmu', avatar: 'A', time: '10m ago', text: 'Community pattern matching from the last 3 cycles on GradCafe. Take it with a grain of salt but the pattern has been consistent.' },
      ],
    },
    {
      id: 'm21', author: 'lin_stanford', avatar: 'L', time: '1h ago', pinned: true,
      text: '📌 PINNED: Top ML programs ranked by research output (2024): 1. MIT CSAIL, 2. Stanford AI Lab, 3. CMU ML, 4. Berkeley BAIR, 5. UW Allen School. If research is your goal, these are the ones.',
    },
    {
      id: 'm22', author: 'amara_uiuc', avatar: 'A', time: '2h ago', pinned: false,
      text: 'Is the GRE still required for Fall 2026? I see mixed info — some schools say optional, some say required.',
      replies: [
        { id: 'r22', author: 'wei_columbia', avatar: 'W', time: '1h 45m ago', text: 'Most top MSCS programs have gone permanently GRE-optional post-COVID. MIT, Stanford, CMU, Cornell, and most UCs no longer require it. UT Austin still requires it I think. Check each program\'s specific page.' },
      ],
    },
  ],
};

// ─── User-created rooms (seeded examples) ─────────────────────────────────────

export const USER_CREATED_ROOMS = [
  {
    id: 'ucr-1',
    name: 'MSCS 2026 Admit Group',
    description: 'For everyone admitted to MSCS programs for Fall 2026 — housing, roommates, general discussion',
    isPrivate: false,
    admin: 'arjun_mscs',
    memberCount: 342,
    createdAt: '2025-03-15',
    category: 'community',
  },
  {
    id: 'ucr-2',
    name: 'Carnegie Mellon Roommates F26',
    description: 'Finding roommates for CMU Fall 2026 — post your preferences here',
    isPrivate: false,
    admin: 'Priya_CMU25',
    memberCount: 127,
    createdAt: '2025-04-02',
    category: 'housing',
  },
  {
    id: 'ucr-3',
    name: 'SOP Review Exchange',
    description: 'Give feedback on others\' SOPs and get feedback on yours. Private, confidential.',
    isPrivate: true,
    admin: 'meera_stanford',
    memberCount: 48,
    createdAt: '2025-01-20',
    category: 'applications',
  },
];
