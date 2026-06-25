export const PIPELINE_STATUSES = [
  { id: 'Researching', label: 'Researching', emoji: '🔍', color: 'navy' },
  { id: 'Preparing', label: 'Preparing', emoji: '✍️', color: 'amber' },
  { id: 'Submitted', label: 'Submitted', emoji: '📨', color: 'blue' },
  { id: 'Interview', label: 'Interview', emoji: '🎤', color: 'purple' },
  { id: 'Decision', label: 'Decision', emoji: '🎯', color: 'emerald' },
];

export const DECISION_RESULTS = [
  { id: 'Admitted', label: 'Admitted 🎉', bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
  { id: 'Waitlisted', label: 'Waitlisted ⏳', bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
  { id: 'Deferred', label: 'Deferred 🔄', bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  { id: 'Rejected', label: 'Rejected 💔', bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-300' },
];

export const REQUIREMENT_TEMPLATES = [
  { id: 'portal', text: 'Create application portal account' },
  { id: 'transcript', text: 'Request official transcripts' },
  { id: 'sop', text: 'Finalize Statement of Purpose' },
  { id: 'cv', text: 'Tailor CV / Resume for this school' },
  { id: 'lor1', text: 'Confirm Letter of Recommendation 1' },
  { id: 'lor2', text: 'Confirm Letter of Recommendation 2' },
  { id: 'lor3', text: 'Confirm Letter of Recommendation 3' },
  { id: 'gre', text: 'Send GRE scores to school' },
  { id: 'toefl', text: 'Send TOEFL / IELTS scores' },
  { id: 'fee', text: 'Pay application fee' },
  { id: 'submit', text: 'Submit application and confirm receipt' },
];

export const SOP_SECTIONS = [
  {
    id: 'whyField',
    title: 'Why this field?',
    prompt: 'What drew you to this specific field of study? Describe the moment or experience that clarified your interest.',
    wordTarget: 150,
    placeholder: 'My interest in machine learning began when I noticed a problem in...',
    tips: [
      'Be specific — mention a course, project, or experience that sparked your interest',
      "Avoid clichés like \"I have always been passionate about...\"",
      'Connect your curiosity to a real problem you want to solve',
      'One strong concrete story beats three generic claims',
    ],
  },
  {
    id: 'whyNow',
    title: 'Why now?',
    prompt: "Why is this the right time for graduate school? What have you done since your undergraduate studies?",
    wordTarget: 100,
    placeholder: 'After two years working as a software engineer at...',
    tips: [
      "If coming directly from undergrad, explain why you don't want to wait",
      'If you have work experience, show what specific gap graduate school fills',
      'Tie your timeline to a concrete goal or opportunity',
    ],
  },
  {
    id: 'background',
    title: 'Your background',
    prompt: 'What research, work, or academic experiences have prepared you for this program?',
    wordTarget: 200,
    placeholder: 'During my undergraduate thesis on distributed systems, I...',
    tips: [
      'Quantify impact where possible: led a team of 5, published in X journal, reduced latency by 40%',
      'Pick 2–3 experiences that directly relate to your proposed field',
      "Don't just list — explain what you learned from each",
      'End with what these experiences made you want to do next (bridge to the program)',
    ],
  },
  {
    id: 'whySchool',
    title: 'Why this school?',
    prompt: "Why is this specific program the right fit? Reference faculty, labs, curriculum, or culture.",
    wordTarget: 150,
    placeholder: "Professor Jane Smith's work on federated learning directly aligns with...",
    tips: [
      "Name a specific professor whose work excites you — and why",
      'Reference a specific course, lab, or research group',
      'Avoid generic praise ("world-class faculty, excellent reputation")',
      'Tip: Customize this section for every school you apply to',
    ],
  },
  {
    id: 'futureGoals',
    title: 'Future goals',
    prompt: 'Where do you want to be in 5–10 years? How does this degree help you get there?',
    wordTarget: 150,
    placeholder: 'My goal is to combine my engineering background with policy work to...',
    tips: [
      '"I want to work in AI policy at a think tank" beats "I want to make a difference"',
      'Show that the program is a bridge, not just a destination',
      "If you're exploring multiple paths, name them — admissions committees respect intellectual honesty",
    ],
  },
];

export const COMMUNITY_SOPS = [
  {
    id: 'sop1',
    field: 'Computer Science',
    degree: 'MS',
    schoolType: 'Top 10',
    result: 'Admitted',
    admitYear: '2024',
    excerpt: "My journey into systems research began with a frustrating bug in my company's distributed cache that took three engineers six weeks to trace...",
    sections: {
      whyField: "My journey into systems research began with a frustrating bug in my company's distributed cache that took three engineers six weeks to trace. The root cause — a subtle race condition in our consensus protocol — fascinated me more than the fix itself. I realized I wanted to understand these systems at a fundamental level, not just patch them.",
      whyNow: "After two years at a mid-sized fintech startup, I've hit the ceiling of what I can learn on the job. The problems I want to work on — formally verified distributed systems — require depth that industry roles rarely offer. Graduate school is the right next step.",
      background: "At [COMPANY], I led the migration of our order-processing pipeline from a monolithic architecture to a distributed event-driven system, reducing p99 latency from 340ms to 47ms. My undergraduate thesis on B-tree optimizations gave me tools for low-level performance work, but I had no formal grounding in consensus algorithms or fault tolerance models.",
      whySchool: "Professor [ADVISOR]'s recent work on Paxos variants for geo-distributed deployments directly addresses the problem I spent six months wrestling with at work. The systems group's combination of theory and implementation — rare in most programs — is exactly the environment I need.",
      futureGoals: "I want to build the infrastructure that makes large-scale distributed systems more reliable and easier to reason about. In five years, I see myself either in an industrial research lab or returning to industry to apply what I've learned.",
    },
    karma: 47,
    feedbackCount: 12,
    tags: ['systems', 'distributed', 'industry-background'],
  },
  {
    id: 'sop2',
    field: 'Public Policy',
    degree: 'MPP',
    schoolType: 'Top 25',
    result: 'Admitted',
    admitYear: '2024',
    excerpt: "Growing up in a city where the water was not safe to drink taught me that policy is never abstract...",
    sections: {
      whyField: "Growing up in a city where the water was not safe to drink taught me that policy is never abstract. The lead contamination crisis I witnessed as a child shaped every career decision I've made since. I studied environmental engineering not to build treatment plants, but to understand the technical constraints that policymakers ignore at our peril.",
      whyNow: "My three years at an environmental NGO have shown me the limit of advocacy without institutional power. We could identify problems precisely, but our recommendations disappeared into policy processes we didn't understand. I need the analytical toolkit — cost-benefit frameworks, regulatory design, political economy — that an MPP provides.",
      background: "As a program officer at [NGO], I managed a $2M portfolio of water-access projects across Southeast Asia. I co-authored a brief cited in the UNEP's 2023 water security report. That visibility showed me both the power of rigorous analysis and how much I still don't know.",
      whySchool: "The [SCHOOL] MPP's concentration in environmental policy, combined with the opportunity to work with the [INSTITUTE], is the specific combination I've been looking for. Professor [NAME]'s work on regulatory capture in environmental agencies is directly relevant to my thesis question.",
      futureGoals: "I want to work at the intersection of environmental science and regulatory policy, ideally at an agency like the EPA or an international body. Within ten years, I hope to be in a position to actually design the policies I spent my twenties trying to influence from the outside.",
    },
    karma: 32,
    feedbackCount: 8,
    tags: ['environment', 'policy', 'NGO-background'],
  },
  {
    id: 'sop3',
    field: 'Business',
    degree: 'MBA',
    schoolType: 'M7',
    result: 'Admitted',
    admitYear: '2023',
    excerpt: "I did not always plan to go to business school. The path that brought me here runs through three countries, two industries, and one moment of clarity...",
    sections: {
      whyField: "I did not always plan to go to business school. The path here runs through three countries, two industries, and one moment of clarity: sitting across from a founder in Lagos whose supply-chain solution was technically elegant but financially unsustainable, I realized I was the wrong person in the room.",
      whyNow: "After five years in operations consulting and two years building a startup, the gaps in my knowledge are specific: venture deal structuring, unit economics modeling, and the network that lets you close a Series A in emerging markets. Business school is the most efficient way to fill them simultaneously.",
      background: "At [CONSULTING FIRM], I managed supply chain transformations across West Africa. I then co-founded [STARTUP], a B2B logistics platform, growing it to $400K ARR before we ran out of runway. That failure taught me more than my consulting years combined.",
      whySchool: "I've spoken to twelve [SCHOOL] alumni in the past six months. The [CLUB] community has co-invested in six African startups in the last two years — that's the network I need. Professor [NAME]'s course on emerging-market venture is, to my knowledge, the only MBA elective in the US that takes the Lagos ecosystem seriously.",
      futureGoals: "My post-MBA goal is to join a growth equity fund focused on African tech, and eventually raise my own fund. The MBA is the first step — not because it hands me a fund, but because the pattern-matching and the network compound over time.",
    },
    karma: 61,
    feedbackCount: 19,
    tags: ['entrepreneurship', 'africa', 'consulting-background'],
  },
  {
    id: 'sop4',
    field: 'Biomedical Engineering',
    degree: 'PhD',
    schoolType: 'Top 10',
    result: 'Admitted',
    admitYear: '2025',
    excerpt: "The question that keeps me up at night is simple: why do medical devices that work in labs so rarely work in bodies?",
    sections: {
      whyField: "The question that keeps me up at night is simple: why do medical devices that work in labs so rarely work in bodies? My undergraduate thesis on neural implant biocompatibility turned a three-month project into a two-year obsession when I discovered that every implant in our test subjects failed not from technical malfunction but from immune rejection. The engineering worked. The biology didn't cooperate.",
      whyNow: "I am applying directly from undergraduate because my research trajectory is already defined. I spent two years in Professor [NAME]'s lab, published first-author work at BMES, and have a specific research question I want to pursue. Waiting would mean losing momentum.",
      background: "My undergraduate research focused on surface modification for neural probes. I developed a hydrogel coating that reduced glial scarring by 60% over 12 weeks compared to uncoated controls. This was published in [JOURNAL] and led to a collaboration with [LAB] at [HOSPITAL], where I worked with post-surgical spinal cord patients.",
      whySchool: "Professor [ADVISOR]'s lab is one of the few groups actively working on the chronic biocompatibility problem at the materials-neuroscience interface. Her recent Science paper on zwitterionic polymer coatings is the direct inspiration for my proposed research direction.",
      futureGoals: "My goal is to become a principal investigator working on translational neural engineering — to close the gap between promising lab results and devices that actually help patients. The PhD is year one through five of a ten-year path.",
    },
    karma: 38,
    feedbackCount: 9,
    tags: ['biomedical', 'research', 'direct-from-undergrad'],
  },
];

export const RESUME_TIPS = [
  {
    section: 'Format & Length',
    icon: '📐',
    tips: [
      '1 page if under 5 years of experience; 2 pages maximum for PhD applicants with publications',
      'Use a clean single-column or two-column layout — avoid heavy graphics or color blocks',
      'Font: 10–12pt body, 14–16pt name. Stick to Times New Roman, Garamond, or Calibri',
      'Margins: 0.5"–1". Consistent spacing. Save and submit as PDF',
      'File name: FirstName_LastName_Resume.pdf',
    ],
  },
  {
    section: 'Education',
    icon: '🎓',
    tips: [
      'Put education first if you are a recent graduate; after experience if you have 3+ years of work',
      'Include GPA only if 3.5 or above — admissions already have your transcripts',
      'List relevant coursework if applying directly from undergrad',
      'Include thesis title if it is relevant to your proposed field',
    ],
  },
  {
    section: 'Research Experience',
    icon: '🔬',
    tips: [
      'Lead with research for PhD and research-focused Master\'s applications',
      'For each project: What was the question? What was your contribution? What was the outcome?',
      'Name specific methods, tools, or datasets — not just "conducted experiments"',
      'Publications: list separately in a Publications section with full citation',
      'Conference posters and presentations count — include them',
    ],
  },
  {
    section: 'Work Experience',
    icon: '💼',
    tips: [
      'Lead with the most impactful bullet first in each role',
      'Quantify impact: "reduced latency by 40%", "managed $2M budget", "grew team from 3 to 12"',
      'Use action verbs: Led, Built, Designed, Analyzed, Published, Reduced, Increased',
      "Don't describe job duties — describe accomplishments and contributions",
      'For MBA applications, emphasize leadership, scope, and business impact over technical detail',
    ],
  },
  {
    section: 'Skills',
    icon: '⚡',
    tips: [
      'Only list tools you can use at an interview level — not just names you\'ve heard',
      'Group by category: Programming Languages / Frameworks / Tools / Languages',
      "Don't list Microsoft Office unless the program specifically asks for it",
      'For language proficiency: Native / Fluent / Conversational / Basic',
    ],
  },
  {
    section: 'International Applicants',
    icon: '🌍',
    tips: [
      'Translate your university name if it\'s not widely known in the US',
      'Add "(equivalent to US Bachelor\'s)" or grade scale note if needed',
      'GRE/TOEFL/IELTS scores are your primary language signals — include them prominently',
      'International conference papers and publications are fully valued — don\'t undersell them',
    ],
  },
];

export const COMMON_MISTAKES = [
  { id: 'm1', mistake: 'Listing every job and activity without prioritizing', fix: 'Pick the 4–6 most relevant experiences. Depth beats breadth.' },
  { id: 'm2', mistake: 'Describing what you did, not what you achieved', fix: 'Replace "Responsible for X" with "Built X, resulting in Y".' },
  { id: 'm3', mistake: 'Using the same resume for every application', fix: "Tailor your highlights to each program's emphasis (research vs. industry vs. policy)." },
  { id: 'm4', mistake: 'Including a photo or personal details (age, nationality)', fix: 'US applications do not expect photos. Include nationality only if relevant (visa sponsorship).' },
  { id: 'm5', mistake: 'Objective statement at the top', fix: 'Replace with a 2-line Summary highlighting your strongest credentials, or skip it entirely.' },
  { id: 'm6', mistake: 'GPA hidden or inconsistently formatted', fix: "If your GPA is strong, show it clearly. If it's below 3.5, omit it entirely." },
  { id: 'm7', mistake: '"References available upon request" at the bottom', fix: 'This is obvious and wastes space. Just don\'t include it.' },
  { id: 'm8', mistake: 'Typos and inconsistent formatting', fix: 'Read it out loud. Then have a native English speaker read it. Check every period and comma.' },
];

export const SAMPLE_STRUCTURES = [
  {
    id: 'research',
    title: 'Research-Focused (MS / PhD)',
    description: 'For applicants with research experience applying to research-intensive programs.',
    sections: ['Education', 'Research Experience', 'Publications & Presentations', 'Work Experience', 'Skills', 'Awards & Honors'],
    note: 'Lead with your strongest research contribution. Publications go in a separate section.',
  },
  {
    id: 'professional',
    title: 'Professional (MBA / MPP / MPA)',
    description: 'For applicants with 3+ years of work experience applying to professional programs.',
    sections: ['Work Experience', 'Education', 'Leadership & Extracurriculars', 'Skills & Certifications'],
    note: 'Lead with the most senior or impactful role. Quantify business outcomes in every bullet.',
  },
  {
    id: 'fresh',
    title: 'Recent Graduate (MS — Direct Entry)',
    description: 'For applicants applying directly from undergraduate without significant work experience.',
    sections: ['Education', 'Research / Projects', 'Internships & Work Experience', 'Skills', 'Extracurriculars & Leadership'],
    note: 'Classroom projects are acceptable — name them properly and describe technical depth.',
  },
  {
    id: 'switcher',
    title: 'Career Switcher (MS — Industry to Academia)',
    description: 'For engineers or technical workers pivoting to a new field.',
    sections: ['Summary (2 lines)', 'Work Experience', 'Education', 'Projects', 'Skills'],
    note: "Use the 2-line Summary to frame the career pivot. Connect past skills to the new field.",
  },
];

export const LOR_STATUSES = [
  { id: 'Not Requested', label: 'Not Requested', dot: 'bg-navy-300' },
  { id: 'Requested', label: 'Requested', dot: 'bg-amber-400' },
  { id: 'Confirmed', label: 'Confirmed', dot: 'bg-blue-500' },
  { id: 'Submitted', label: 'Submitted', dot: 'bg-emerald-500' },
];

export const LOR_TIPS = [
  'Ask at least 6–8 weeks before your earliest deadline.',
  'Give each recommender: your resume, your SOP draft, the specific program, and a deadline list.',
  'A strong recommender is someone who has seen your work closely. A research supervisor beats a class professor.',
  'Academic programs want at least 1–2 academic recommenders. MBA programs weight professional recommenders more.',
  'Follow up politely every 2–3 weeks if you have not received confirmation.',
  'Create a shared folder with all application materials for each recommender — make it easy for them.',
  'Thank your recommenders after each deadline and send them a note when you get your results.',
];
