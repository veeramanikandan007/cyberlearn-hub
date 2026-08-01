export const learningPaths = [
  {
    title: "Zero to Security Analyst",
    summary: "A beginner-first track from computer basics to incident response fundamentals.",
    steps: ["Computer Basics", "Networking", "Linux", "Windows", "Security Fundamentals"],
    duration: "12 weeks",
  },
  {
    title: "Web Security Engineer",
    summary: "The practical path for understanding web vulnerabilities, defensive controls, and secure development.",
    steps: ["Web Security", "API Security", "OWASP Top 10", "Secure Coding", "Hands-on Labs"],
    duration: "8 weeks",
  },
  {
    title: "Blue Team Operations",
    summary: "Learn detection engineering, log analysis, threat hunting, and incident response.",
    steps: ["SOC Basics", "SIEM", "Threat Hunting", "Digital Forensics", "IR Playbooks"],
    duration: "10 weeks",
  },
];

export const roadmapStages = [
  { stage: "Foundations", detail: "Computer basics, networking, Linux, Windows, Git, and Bash." },
  { stage: "Programming", detail: "Python and shell automation for daily security operations." },
  { stage: "Core Security", detail: "Security fundamentals, cryptography, and web security." },
  { stage: "Specialization", detail: "Ethical hacking, Active Directory, cloud security, and malware analysis." },
  { stage: "Advanced", detail: "Red team, blue team, threat hunting, incident response, and binary exploitation." },
];

export const labs = [
  {
    title: "Linux Privilege Escalation Lab",
    description: "Escalate from an unprivileged shell to root using weak permissions and misconfigurations.",
    difficulty: "Intermediate",
  },
  {
    title: "Wireshark Packet Analysis",
    description: "Inspect network captures to identify command-and-control, credential theft, and exfiltration patterns.",
    difficulty: "Beginner",
  },
  {
    title: "OWASP Juice Shop Walkthrough",
    description: "Practice SQLi, XSS, CSRF, SSRF, and authentication bypass in a realistic app.",
    difficulty: "Intermediate",
  },
  {
    title: "Buffer Overflow in a Controlled Environment",
    description: "Explore memory corruption, shellcode, and mitigation bypass with guided exercises.",
    difficulty: "Advanced",
  },
];

export const practiceChallenges = [
  {
    title: "Credential Stuffing Detection",
    description: "Identify suspicious login behavior from a sample event stream and write a detection rule.",
    type: "SIEM",
  },
  {
    title: "Web Shell Hunt",
    description: "Investigate a compromise report and isolate the persistence mechanism.",
    type: "Incident Response",
  },
  {
    title: "Reverse Engineering Basics",
    description: "Analyze a simple binary to recover the hidden condition behind the prompt.",
    type: "Binary",
  },
];

export const resources = [
  {
    title: "Cybersecurity Glossary",
    description: "Definitions for common terms, acronyms, and attack techniques.",
  },
  {
    title: "Command Cheat Sheets",
    description: "Copy-ready commands for Linux, Windows, networking, and OpenSSL.",
  },
  {
    title: "Practice Exams",
    description: "Timed mock exams for beginner, intermediate, and advanced learners.",
  },
  {
    title: "Downloadable PDFs",
    description: "Printable study notes, lab guides, and assessment checklists.",
  },
];

export const communityHighlights = [
  {
    title: "Weekly study rooms",
    description: "Join live sessions for labs, exam prep, and peer review.",
  },
  {
    title: "Student discussion forums",
    description: "Post questions, share notes, and compare solutions to hands-on challenges.",
  },
  {
    title: "Announcements and updates",
    description: "Get notified when new labs, articles, or exam simulations are released.",
  },
];

export const testimonials = [
  {
    quote: "The labs made the theory finally click. I went from 'I heard of SQLi' to confidently explaining it in interviews.",
    name: "Priyanka R.",
    role: "SOC Analyst",
  },
  {
    quote: "I used the roadmap to guide my transition from IT support into security engineering and never felt lost.",
    name: "Daniel O.",
    role: "Security Intern",
  },
  {
    quote: "The challenge sets are as good as the best paid platforms I tried, but the content feels more practical and less bloated.",
    name: "Marcus T.",
    role: "Pentester",
  },
];

export const articles = [
  {
    title: "Ethical hacking, explained without the hype",
    category: "Ethical Hacking",
    readTime: "8 min read",
    summary: "Understand the mindset, scope, and legal boundaries behind legitimate security testing.",
  },
  {
    title: "Linux for defenders: the commands that save time every day",
    category: "Linux",
    readTime: "6 min read",
    summary: "From process inspection to log triage, these commands make incident work faster.",
  },
  {
    title: "Windows hardening checklist for new defenders",
    category: "Windows",
    readTime: "7 min read",
    summary: "A practical checklist for secure baselines, logging, and endpoint hygiene.",
  },
  {
    title: "How to read network traffic like a SOC analyst",
    category: "Networking",
    readTime: "9 min read",
    summary: "Use common protocol behavior and packet patterns to spot suspicious activity.",
  },
  {
    title: "Python automation for threat hunting",
    category: "Python",
    readTime: "10 min read",
    summary: "Automate enrichment, parsing, and correlation tasks with scripts that scale.",
  },
  {
    title: "Ransomware response essentials",
    category: "Ransomware",
    readTime: "8 min read",
    summary: "A calm, stepwise response plan for identification, containment, and recovery.",
  },
  {
    title: "What a SOC actually does in year one",
    category: "SOC",
    readTime: "6 min read",
    summary: "A realistic view of the daily work, metrics, and handoffs in a modern SOC.",
  },
  {
    title: "SIEM alert tuning without breaking visibility",
    category: "SIEM",
    readTime: "7 min read",
    summary: "Learn how to reduce noise while keeping critical detections intact.",
  },
  {
    title: "Threat intelligence in plain English",
    category: "Threat Intelligence",
    readTime: "5 min read",
    summary: "A practical guide to collecting, scoring, and applying threat intel to daily operations.",
  },
  {
    title: "OWASP Top 10, explained for beginners",
    category: "OWASP Top 10",
    readTime: "8 min read",
    summary: "Translate the most common web risks into language that makes sense for new learners.",
  },
  {
    title: "Active Directory attack paths you should know",
    category: "Active Directory",
    readTime: "9 min read",
    summary: "Connect common identity weaknesses to defensive priorities and hardening steps.",
  },
  {
    title: "Cloud security posture basics",
    category: "Cloud Security",
    readTime: "7 min read",
    summary: "Understand the shared responsibility model, IAM hygiene, and logging in the cloud.",
  },
  {
    title: "Incident response playbooks that actually work",
    category: "Incident Response",
    readTime: "8 min read",
    summary: "Build a repeatable response process for phishing, malware, and account misuse.",
  },
  {
    title: "Digital forensics fundamentals for beginners",
    category: "Digital Forensics",
    readTime: "9 min read",
    summary: "Learn how evidence is preserved, analyzed, and presented without losing integrity.",
  },
  {
    title: "Malware analysis: static and dynamic basics",
    category: "Malware",
    readTime: "10 min read",
    summary: "Break down a sample into its behavioral and structural clues without getting overwhelmed.",
  },
];

export const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for learners who want to explore the fundamentals and complete a few labs.",
    features: ["Access to beginner courses", "Limited lab attempts", "Community forum access"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$24/mo",
    description: "Hands-on practice, advanced labs, and full progress tracking for serious learners.",
    features: ["All course content", "Full lab environment access", "Certificates and projects"],
    highlight: true,
  },
  {
    name: "Team",
    price: "$79/mo",
    description: "For study groups, bootcamps, and internal upskilling programs.",
    features: ["Team dashboards", "Admin controls", "Bulk reporting and analytics"],
    highlight: false,
  },
];

export const glossaryTerms = [
  { term: "CSRF", definition: "Cross-site request forgery is a web attack that tricks a browser into submitting a forged action." },
  { term: "SIEM", definition: "A security information and event management system aggregates and correlates security events." },
  { term: "MFA", definition: "Multi-factor authentication adds a second or third factor to verify a user." },
  { term: "IOC", definition: "Indicators of compromise are forensic artifacts that suggest malicious activity." },
];

export const dashboardStats = [
  { label: "Current streak", value: "17 days" },
  { label: "XP earned", value: "8,420" },
  { label: "Badges", value: "12" },
  { label: "Certificates", value: "3" },
];
