export const OUTCOME_STYLES = {
  'Admitted':        { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500', emoji: '🎉' },
  'Rejected':        { bg: 'bg-red-100',     text: 'text-red-600',     border: 'border-red-200',     dot: 'bg-red-400',    emoji: '💔' },
  'Waitlisted':      { bg: 'bg-amber-100',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-400',  emoji: '⏳' },
  'Interview Invite':{ bg: 'bg-blue-100',    text: 'text-blue-700',    border: 'border-blue-200',    dot: 'bg-blue-500',   emoji: '🎤' },
};

export const SEASONS = ['Fall 2025', 'Fall 2024', 'Fall 2023'];
export const OUTCOMES = ['Admitted', 'Rejected', 'Waitlisted', 'Interview Invite'];

// ─── Mock Results Feed ────────────────────────────────────────────────────────

let _id = 1;
const mkResult = (data) => ({ id: `r${_id++}`, ...data });

export const MOCK_RESULTS = [
  // Fall 2025
  mkResult({ school: 'MIT', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Admitted', date: '2025-02-14', gpa: 3.92, greQuant: 170, greVerbal: 162, greAWA: 5.0, season: 'Fall 2025', notes: 'Interview in January. Decision came 3 weeks later. No funding for MS.' }),
  mkResult({ school: 'MIT', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Rejected', date: '2025-03-01', gpa: 3.75, greQuant: 169, greVerbal: 158, greAWA: 4.0, season: 'Fall 2025', notes: 'No interview before rejection. Strong stats weren\'t enough — probably needed research publications.' }),
  mkResult({ school: 'MIT', program: 'PhD Computer Science', field: 'Computer Science', degree: 'PhD', outcome: 'Admitted', date: '2025-02-20', gpa: 3.95, greQuant: 170, greVerbal: 165, greAWA: 5.5, season: 'Fall 2025', notes: 'Full funding + RA with Prof. Johnson. Had email contact with advisor before applying.' }),
  mkResult({ school: 'MIT', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Waitlisted', date: '2025-02-28', gpa: 3.88, greQuant: 168, greVerbal: 160, season: 'Fall 2025', notes: 'Waitlisted, position unknown. Holding.' }),
  mkResult({ school: 'Stanford University', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Admitted', date: '2025-02-10', gpa: 3.89, greQuant: 170, greVerbal: 163, greAWA: 4.5, season: 'Fall 2025', notes: 'Applied HCI track. Co-term preference mentioned in application. No GRE required but submitted anyway.' }),
  mkResult({ school: 'Stanford University', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Rejected', date: '2025-02-25', gpa: 3.82, greQuant: 169, greVerbal: 162, season: 'Fall 2025' }),
  mkResult({ school: 'Stanford University', program: 'PhD Computer Science', field: 'Computer Science', degree: 'PhD', outcome: 'Interview Invite', date: '2025-01-28', gpa: 3.95, greQuant: 170, greVerbal: 164, season: 'Fall 2025', notes: 'Visit Days invitation. Final decision pending.' }),
  mkResult({ school: 'Carnegie Mellon University', program: 'MS Machine Learning', field: 'Computer Science', degree: 'MS', outcome: 'Admitted', date: '2025-02-05', gpa: 3.85, greQuant: 169, greVerbal: 160, greAWA: 4.0, season: 'Fall 2025', notes: 'No funding (standard for CMU MSML). Tuition ~$55K/year.' }),
  mkResult({ school: 'Carnegie Mellon University', program: 'MS Machine Learning', field: 'Computer Science', degree: 'MS', outcome: 'Rejected', date: '2025-03-10', gpa: 3.78, greQuant: 167, greVerbal: 159, season: 'Fall 2025' }),
  mkResult({ school: 'Carnegie Mellon University', program: 'PhD Computer Science', field: 'Computer Science', degree: 'PhD', outcome: 'Admitted', date: '2025-02-18', gpa: 3.9, greQuant: 170, greVerbal: 163, season: 'Fall 2025', notes: 'Full funding, RA from Day 1. Advisor committed before application.' }),
  mkResult({ school: 'UC Berkeley', program: 'MS Electrical Engineering & Computer Sciences', field: 'Computer Science', degree: 'MS', outcome: 'Rejected', date: '2025-03-05', gpa: 3.82, greQuant: 169, greVerbal: 161, season: 'Fall 2025', notes: 'EECS MEng might be easier to get into for those with Berkeley undergrad.' }),
  mkResult({ school: 'UC Berkeley', program: 'PhD Computer Science', field: 'Computer Science', degree: 'PhD', outcome: 'Admitted', date: '2025-02-22', gpa: 3.93, greQuant: 170, greVerbal: 166, season: 'Fall 2025', notes: 'Fully funded. Had research pubs — two first-author NeurIPS papers.' }),
  mkResult({ school: 'Columbia University', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Admitted', date: '2025-01-20', gpa: 3.72, greQuant: 166, greVerbal: 158, season: 'Fall 2025', notes: 'Rolling admissions. Applied October 1, heard back January 20. No funding.' }),
  mkResult({ school: 'Columbia University', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Admitted', date: '2025-01-25', gpa: 3.68, greQuant: 165, greVerbal: 156, season: 'Fall 2025' }),
  mkResult({ school: 'Cornell University', program: 'MEng Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Admitted', date: '2025-02-28', gpa: 3.78, greQuant: 167, greVerbal: 159, season: 'Fall 2025', notes: 'No GRE required. Cornell undergrad connection helped. Rolling decisions.' }),
  mkResult({ school: 'University of Illinois Urbana-Champaign', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Admitted', date: '2025-02-15', gpa: 3.82, greQuant: 167, greVerbal: 158, season: 'Fall 2025', notes: 'TA offer came with admission. One of the best value MS CS programs.' }),
  mkResult({ school: 'University of Illinois Urbana-Champaign', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Waitlisted', date: '2025-03-01', gpa: 3.75, greQuant: 165, greVerbal: 156, season: 'Fall 2025' }),
  mkResult({ school: 'University of Texas at Austin', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Admitted', date: '2025-02-20', gpa: 3.78, greQuant: 166, greVerbal: 157, season: 'Fall 2025', notes: 'TA position offered. Very affordable if you get TA — tuition waiver + stipend.' }),
  mkResult({ school: 'Georgia Institute of Technology', program: 'MS Computer Science (OMSCS)', field: 'Computer Science', degree: 'MS', outcome: 'Admitted', date: '2025-02-10', gpa: 3.55, greQuant: 162, greVerbal: 152, season: 'Fall 2025', notes: 'OMSCS is much more accessible. $8K total for entire program.' }),
  mkResult({ school: 'UCLA', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Rejected', date: '2025-03-15', gpa: 3.80, greQuant: 167, greVerbal: 159, season: 'Fall 2025' }),
  // MBA results
  mkResult({ school: 'Harvard Business School', program: 'MBA', field: 'Business', degree: 'MBA', outcome: 'Admitted', date: '2025-02-04', gpa: 3.7, season: 'Fall 2025', notes: 'R2 applicant. 4 years consulting, promoted to Manager. Interview on Jan 22.' }),
  mkResult({ school: 'Harvard Business School', program: 'MBA', field: 'Business', degree: 'MBA', outcome: 'Rejected', date: '2025-02-04', gpa: 3.62, season: 'Fall 2025', notes: 'R2 ding. Strong GMAT (750). The essays were probably my weak point.' }),
  mkResult({ school: 'Wharton', program: 'MBA', field: 'Business', degree: 'MBA', outcome: 'Admitted', date: '2025-02-05', gpa: 3.55, season: 'Fall 2025', notes: 'VC/PE background. GMAT 760. Scholarship offered.' }),
  mkResult({ school: 'Wharton', program: 'MBA', field: 'Business', degree: 'MBA', outcome: 'Waitlisted', date: '2025-02-05', gpa: 3.68, season: 'Fall 2025' }),
  mkResult({ school: 'Booth School of Business', program: 'MBA', field: 'Business', degree: 'MBA', outcome: 'Admitted', date: '2025-01-30', gpa: 3.6, season: 'Fall 2025', notes: 'R2 decision. GMAT 740. Finance background, quant focus.' }),
  // Engineering
  mkResult({ school: 'MIT', program: 'MS Electrical Engineering', field: 'Electrical Engineering', degree: 'MS', outcome: 'Admitted', date: '2025-02-16', gpa: 3.9, greQuant: 169, greVerbal: 160, season: 'Fall 2025', notes: 'RA funded. Strong research background in RF systems.' }),
  mkResult({ school: 'Stanford University', program: 'MS Electrical Engineering', field: 'Electrical Engineering', degree: 'MS', outcome: 'Admitted', date: '2025-02-12', gpa: 3.87, greQuant: 168, greVerbal: 159, season: 'Fall 2025' }),
  mkResult({ school: 'Johns Hopkins University', program: 'PhD Biomedical Engineering', field: 'Biomedical Engineering', degree: 'PhD', outcome: 'Admitted', date: '2025-02-08', gpa: 3.88, greQuant: 167, greVerbal: 161, season: 'Fall 2025', notes: 'Full funding. Rotation labs program in Year 1.' }),
  mkResult({ school: 'University of Michigan', program: 'MS Data Science', field: 'Data Science', degree: 'MS', outcome: 'Admitted', date: '2025-02-19', gpa: 3.75, greQuant: 166, greVerbal: 158, season: 'Fall 2025', notes: 'Part-time TA opportunity available from Semester 2.' }),
  // Policy
  mkResult({ school: 'Harvard Kennedy School', program: 'MPA / MPP', field: 'Public Policy', degree: 'MPP', outcome: 'Admitted', date: '2025-03-20', gpa: 3.78, season: 'Fall 2025', notes: 'Partial scholarship offered ($15K/year). Strong NGO background helped.' }),
  mkResult({ school: 'Harvard Kennedy School', program: 'MPA / MPP', field: 'Public Policy', degree: 'MPP', outcome: 'Rejected', date: '2025-03-20', gpa: 3.62, season: 'Fall 2025' }),
  // Fall 2024 historical
  mkResult({ school: 'MIT', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Admitted', date: '2024-02-12', gpa: 3.9, greQuant: 170, greVerbal: 163, season: 'Fall 2024' }),
  mkResult({ school: 'Stanford University', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Rejected', date: '2024-02-22', gpa: 3.84, greQuant: 169, greVerbal: 161, season: 'Fall 2024' }),
  mkResult({ school: 'Carnegie Mellon University', program: 'MS Machine Learning', field: 'Computer Science', degree: 'MS', outcome: 'Admitted', date: '2024-02-06', gpa: 3.82, greQuant: 168, greVerbal: 160, season: 'Fall 2024' }),
  mkResult({ school: 'Columbia University', program: 'MS Computer Science', field: 'Computer Science', degree: 'MS', outcome: 'Admitted', date: '2024-01-18', gpa: 3.70, greQuant: 165, greVerbal: 156, season: 'Fall 2024' }),
];

// ─── Program-level aggregate helper (computed from MOCK_RESULTS) ──────────────

export function aggregateByProgram(results) {
  const map = {};
  for (const r of results) {
    const key = `${r.school}||${r.program}`;
    if (!map[key]) map[key] = { school: r.school, program: r.program, field: r.field, degree: r.degree, entries: [] };
    map[key].entries.push(r);
  }
  return Object.values(map).map(({ entries, ...rest }) => {
    const admitted = entries.filter(e => e.outcome === 'Admitted').length;
    const gpas = entries.filter(e => e.gpa).map(e => e.gpa).sort((a, b) => a - b);
    const quants = entries.filter(e => e.greQuant).map(e => e.greQuant).sort((a, b) => a - b);
    return {
      ...rest,
      total: entries.length,
      admitted,
      rejected: entries.filter(e => e.outcome === 'Rejected').length,
      waitlisted: entries.filter(e => e.outcome === 'Waitlisted').length,
      interviews: entries.filter(e => e.outcome === 'Interview Invite').length,
      admitRate: entries.length > 0 ? Math.round((admitted / entries.length) * 100) : null,
      gpaRange: gpas.length >= 2 ? { min: gpas[0], max: gpas[gpas.length - 1], median: gpas[Math.floor(gpas.length / 2)] } : gpas.length === 1 ? { min: gpas[0], max: gpas[0], median: gpas[0] } : null,
      greQuantRange: quants.length >= 2 ? { min: quants[0], max: quants[quants.length - 1], median: quants[Math.floor(quants.length / 2)] } : quants.length === 1 ? { min: quants[0], max: quants[0], median: quants[0] } : null,
    };
  }).sort((a, b) => b.total - a.total);
}

// ─── Waitlist Data ────────────────────────────────────────────────────────────

export const WAITLIST_DATA = [
  {
    id: 'wl1',
    school: 'MIT',
    program: 'MS Computer Science',
    field: 'Computer Science',
    degree: 'MS',
    season: 'Fall 2025',
    status: 'Active',
    movementHistory: [
      { date: '2025-03-15', moved: 2, note: '2 waitlisted students admitted after initial round' },
      { date: '2025-04-01', moved: 1, note: '1 more offer extended after April 15 deadline passed' },
    ],
    communitySubmissions: [
      { date: '2025-03-18', outcome: 'Admitted', daysSinceWaitlist: 32, gpa: 3.9, notes: 'Got a call on a Monday morning.' },
      { date: '2025-04-03', outcome: 'Admitted', daysSinceWaitlist: 46, gpa: 3.85, notes: 'Email saying a spot opened up. Sent an LOI in March.' },
    ],
    tip: 'Sending a Letter of Intent by early March significantly increases your chances. Keep it to 200 words: confirm your interest, update them on anything new, be specific about why MIT over your other admits.',
    historicalMovement: [
      { season: 'Fall 2024', moved: 3, total: 'Unknown' },
      { season: 'Fall 2023', moved: 2, total: 'Unknown' },
      { season: 'Fall 2022', moved: 5, total: 'Unknown' },
    ],
  },
  {
    id: 'wl2',
    school: 'Stanford University',
    program: 'MS Computer Science',
    field: 'Computer Science',
    degree: 'MS',
    season: 'Fall 2025',
    status: 'Active',
    movementHistory: [
      { date: '2025-03-20', moved: 3, note: 'First movement of the season' },
    ],
    communitySubmissions: [
      { date: '2025-03-22', outcome: 'Admitted', daysSinceWaitlist: 36, gpa: 3.93, notes: 'Submitted LOI + updated CV. Heard back 2 days after LOI.' },
    ],
    tip: 'Stanford MSCS waitlist moves later than most — peak movement is mid-March to mid-April. Update them with any new publications, conference acceptances, or job offers you\'ve declined to attend.',
    historicalMovement: [
      { season: 'Fall 2024', moved: 4, total: 'Unknown' },
      { season: 'Fall 2023', moved: 2, total: 'Unknown' },
    ],
  },
  {
    id: 'wl3',
    school: 'Carnegie Mellon University',
    program: 'MS Machine Learning',
    field: 'Computer Science',
    degree: 'MS',
    season: 'Fall 2025',
    status: 'Active',
    movementHistory: [
      { date: '2025-03-12', moved: 5, note: 'Wave of offers sent after initial yield analysis' },
      { date: '2025-04-05', moved: 3, note: 'Post-April 15 movement' },
    ],
    communitySubmissions: [
      { date: '2025-03-14', outcome: 'Admitted', daysSinceWaitlist: 27, notes: 'No LOI — just got an email out of nowhere.' },
      { date: '2025-03-14', outcome: 'Admitted', daysSinceWaitlist: 27, gpa: 3.82, notes: 'Same wave. Called to confirm same day.' },
      { date: '2025-04-08', outcome: 'Admitted', daysSinceWaitlist: 52, notes: 'Post-April 15 movement. Had committed elsewhere but CMU is CMU.' },
    ],
    tip: 'CMU MSML waitlist tends to move in waves — a big wave mid-March and then again after April 15. Sending an LOI is optional but recommended. Some admitted off WL reported not sending one.',
    historicalMovement: [
      { season: 'Fall 2024', moved: 8, total: 'Unknown' },
      { season: 'Fall 2023', moved: 6, total: 'Unknown' },
    ],
  },
  {
    id: 'wl4',
    school: 'Columbia University',
    program: 'MS Computer Science',
    field: 'Computer Science',
    degree: 'MS',
    season: 'Fall 2025',
    status: 'Active',
    movementHistory: [
      { date: '2025-03-08', moved: 10, note: 'Large first wave — Columbia MS tends to have significant WL movement' },
    ],
    communitySubmissions: [
      { date: '2025-03-10', outcome: 'Admitted', daysSinceWaitlist: 46, notes: 'Part of the March 8 wave.' },
      { date: '2025-03-11', outcome: 'Admitted', daysSinceWaitlist: 47, gpa: 3.75, notes: 'Same.' },
    ],
    tip: 'Columbia MSCS historically has high WL movement — the program is large and yield is lower than its peer programs. If you\'re waitlisted here, don\'t give up.',
    historicalMovement: [
      { season: 'Fall 2024', moved: 15, total: 'Unknown' },
      { season: 'Fall 2023', moved: 12, total: 'Unknown' },
    ],
  },
  {
    id: 'wl5',
    school: 'Harvard Kennedy School',
    program: 'MPA / MPP',
    field: 'Public Policy',
    degree: 'MPP',
    season: 'Fall 2025',
    status: 'Active',
    movementHistory: [],
    communitySubmissions: [],
    tip: 'HKS waitlist is more opaque than most — they rarely disclose movement. An LOI is important here. Emphasize your commitment to attend if admitted.',
    historicalMovement: [
      { season: 'Fall 2024', moved: 5, total: 'Unknown' },
      { season: 'Fall 2023', moved: 3, total: 'Unknown' },
    ],
  },
  {
    id: 'wl6',
    school: 'University of Michigan',
    program: 'MS Data Science',
    field: 'Data Science',
    degree: 'MS',
    season: 'Fall 2025',
    status: 'Active',
    movementHistory: [
      { date: '2025-03-25', moved: 7, note: 'Offers sent after initial yield returns came in' },
    ],
    communitySubmissions: [
      { date: '2025-03-27', outcome: 'Admitted', daysSinceWaitlist: 38, gpa: 3.72, notes: 'Got in during the March 25 wave. Hadn\'t sent an LOI.' },
    ],
    tip: 'UMich DS is growing rapidly — class size increases mean more WL movement in recent years. Check the subreddit and GradCafe for real-time updates.',
    historicalMovement: [
      { season: 'Fall 2024', moved: 10, total: 'Unknown' },
    ],
  },
];

// ─── Decision Community Threads ───────────────────────────────────────────────

export const COMMUNITY_THREADS = [
  {
    id: 'dt1',
    title: 'Deciding between CMU MSML and Stanford MSCS — help',
    field: 'Computer Science',
    degree: 'MS',
    admits: ['CMU MSML', 'Stanford MSCS', 'Columbia MSCS'],
    author: 'Anonymous',
    profile: 'Indian, 4.2 GPA (10-point scale), 2 years industry at a fintech startup, no publications',
    question: 'Got into CMU MSML (no funding, $57K/year), Stanford MSCS (no funding, ~$60K/year), and Columbia MSCS (no funding). Goal is to work in AI/ML in the US after graduation — ideally at a top lab or big tech. Budget is ₹50 lakh from family + loan. Does Stanford justify the premium over CMU for my goal? I keep going back and forth.',
    upvotes: 89,
    postedAt: '2025-03-05',
    season: 'Fall 2025',
    tags: ['CS', 'ML', 'industry-goal'],
    replies: [
      { id: 'r1', author: 'Anonymous (CMU alum)', text: 'CMU MSML is one of the most respected ML-specific programs in the world. Recruiters at Google DeepMind, OpenAI, and Anthropic know exactly what it is. The alumni network in ML research is unmatched. Unless you have a specific reason to prefer Stanford\'s particular research culture, CMU wins for ML career goals.', upvotes: 56, isTop: true },
      { id: 'r2', author: 'Anonymous', text: 'Stanford for the location alone — Bay Area internship access is real. But if you\'re doing ML, CMU has the edge. I\'d honestly flip a coin between the two.', upvotes: 22 },
      { id: 'r3', author: 'Anonymous (Stanford MS grad)', text: 'I did MSCS at Stanford. The brand opens doors but so does CMU MSML. If funding is tight, CMU in Pittsburgh vs Stanford in the Bay Area is also a significant cost-of-living difference. That $25K/year in CoL savings over 2 years is meaningful.', upvotes: 38 },
    ],
  },
  {
    id: 'dt2',
    title: 'Full TA at UIUC vs no funding at Columbia — gut check needed',
    field: 'Computer Science',
    degree: 'MS',
    admits: ['UIUC MSCS (TA)', 'Columbia MSCS'],
    author: 'Anonymous',
    profile: 'Pakistan, BS CS with 3.82 GPA, 1 year internship, GRE 169Q/159V',
    question: 'UIUC offered me a TA position — tuition waiver + $18,000/year stipend. Columbia is no funding, $62K/year all-in. I\'m leaning UIUC hard for financial reasons but my parents think Columbia brand name is worth the debt. Is Columbia worth $100K more over 2 years?',
    upvotes: 67,
    postedAt: '2025-03-12',
    season: 'Fall 2025',
    tags: ['CS', 'funding', 'UIUC', 'Columbia'],
    replies: [
      { id: 'r1', author: 'Anonymous (UIUC CS grad)', text: 'UIUC CS is a top-5 program. Anyone who works in tech knows this. Columbia has a brand name but UIUC CS is not worse in any meaningful way for software engineering or research roles. Take the TA and the free tuition. You\'ll thank yourself in 3 years when you\'re not paying off a $100K loan.', upvotes: 61, isTop: true },
      { id: 'r2', author: 'Anonymous', text: 'There are 3 scenarios where Columbia might win: (1) you want to stay in NYC after graduating, (2) you want to go into finance/consulting where the Ivy brand matters more, (3) your family is paying and the debt doesn\'t fall on you. Otherwise UIUC.', upvotes: 44 },
      { id: 'r3', author: 'Anonymous', text: 'I turned down Columbia for a funded offer at a lower-ranked school. Graduated debt-free, got a job at a company I love. Never regretted it for a single day.', upvotes: 29 },
    ],
  },
  {
    id: 'dt3',
    title: 'Waitlisted at MIT, admitted at CMU and UT Austin — when to commit?',
    field: 'Computer Science',
    degree: 'MS',
    admits: ['CMU MSCS', 'UT Austin MSCS (TA)'],
    author: 'Anonymous',
    profile: 'India, 3.87 GPA, 3 years at Amazon India',
    question: 'Waitlisted at MIT MSCS, admitted at CMU (no funding) and UT Austin (TA offer). April 15 is approaching. I want to give MIT a fair chance but I also don\'t want to lose the UT Austin TA offer. Has anyone navigated this? Is it okay to ask UT Austin for a deadline extension?',
    upvotes: 43,
    postedAt: '2025-04-02',
    season: 'Fall 2025',
    tags: ['waitlist', 'MIT', 'decision-deadline'],
    replies: [
      { id: 'r1', author: 'Anonymous', text: 'Yes, you can ask for a deadline extension. Email the UT Austin graduate coordinator — explain that you\'re on MIT\'s waitlist and ask if they can extend your deadline to April 22 or April 29. Many programs will accommodate this, especially if you indicate genuine intent to attend. Be polite and specific about the date you need.', upvotes: 35, isTop: true },
      { id: 'r2', author: 'Anonymous (UT Austin faculty)', text: 'We get these requests every year and almost always grant them within reason. 1-2 week extensions are fine. Email the coordinator, CC the admission office, and be direct.', upvotes: 28 },
      { id: 'r3', author: 'Anonymous', text: 'Also send a strong Letter of Intent to MIT this week if you haven\'t. Mention you have offers and need to decide soon. Sometimes that triggers movement.', upvotes: 21 },
    ],
  },
  {
    id: 'dt4',
    title: 'PhD vs industry — everyone around me says do the PhD but I\'m not sure',
    field: 'Computer Science',
    degree: 'PhD',
    admits: ['PhD offer (full funding)', 'Industry (L4 at Google)'],
    author: 'Anonymous',
    profile: 'India, top IIT, 9.2 GPA, two conference papers, Google return offer',
    question: 'Have a fully funded PhD offer (stipend $35K at a top-10 program) and a return offer from Google as a new grad L4. I enjoyed research but I\'m not sure I want to be an academic. My advisor says the PhD is worth it "for the optionality." My parents think I should take the money. I\'ve been going back and forth for 3 weeks.',
    upvotes: 127,
    postedAt: '2025-03-18',
    season: 'Fall 2025',
    tags: ['PhD', 'industry', 'career'],
    replies: [
      { id: 'r1', author: 'Anonymous (PhD + industry experience)', text: 'Do the PhD if and only if there are specific research questions you want to answer that require 5 years of focused work. Do NOT do the PhD for "optionality" — that is the PhD industrial complex talking. Google at L4 compounds faster than a $35K stipend. The optionality argument works if you want a faculty career or research lab role; for engineering, it doesn\'t.', upvotes: 98, isTop: true },
      { id: 'r2', author: 'Anonymous (research scientist at DeepMind)', text: 'I did the PhD and it was worth it for me. But I knew I wanted research — not engineering. The honest question is: do you want to write papers or ship products? Both are valid. Be honest about which excites you more.', upvotes: 72 },
      { id: 'r3', author: 'Anonymous', text: 'One thing no one says: Google in 5 years will look at a Stanford PhD differently than a Google entry-level engineer. For research roles specifically, the PhD matters. For senior engineering, the gap closes by Year 3. Know which track you want.', upvotes: 51 },
    ],
  },
  {
    id: 'dt5',
    title: 'HBS vs Wharton — I know this is a great problem to have',
    field: 'Business',
    degree: 'MBA',
    admits: ['HBS MBA', 'Wharton MBA ($25K scholarship)'],
    author: 'Anonymous',
    profile: 'India, 4 years consulting (McKinsey), GMAT 750, post-MBA goal: VC in India',
    question: 'Both HBS and Wharton admitted me (R2). Wharton offered a $25K merit scholarship. My post-MBA plan is to go back to India and join/start a VC fund focused on South Asian tech. Does the HBS brand have a meaningful edge for Indian VC, or does Wharton\'s alumni network in finance offset it? The $25K matters but isn\'t decisive.',
    upvotes: 55,
    postedAt: '2025-02-22',
    season: 'Fall 2025',
    tags: ['MBA', 'HBS', 'Wharton', 'VC'],
    replies: [
      { id: 'r1', author: 'Anonymous (India VC)', text: 'For India VC, HBS edges Wharton — the case study method trains you for pattern recognition in uncertain environments (relevant to early-stage investing), and HBS alumni are disproportionately represented in senior Indian VC. That said, Wharton finance grads are everywhere in global VC too. For a $25K premium, I\'d go HBS.', upvotes: 42, isTop: true },
      { id: 'r2', author: 'Anonymous (Wharton MBA)', text: 'Wharton\'s alumni in India finance/VC is underrated. The W network in Asia is strong. Take the $25K and go to Wharton — you\'ll be fine.', upvotes: 28 },
    ],
  },
];
