import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CourseCard from "@/components/CourseCard";
import { courses, Course } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Browse CyberLearn Hub's cybersecurity courses across networking, Linux, web security, ethical hacking, cloud security, and more.",
};

const categories: Course["track"][] = ["Beginner", "Intermediate", "Advanced"];
const trackOrder: Course["track"][] = ["Beginner", "Intermediate", "Advanced"];

const trackStyles: Record<Course["track"], string> = {
  Beginner: "border-severity-low/30 bg-severity-low/10 text-severity-low",
  Intermediate: "border-severity-medium/30 bg-severity-medium/10 text-severity-medium",
  Advanced: "border-severity-critical/30 bg-severity-critical/10 text-severity-critical",
};

const beginnerSyllabus = [
  {
    phase: "Phase 1: Computer Fundamentals",
    topics: [
      "Introduction to Computers",
      "Hardware & Software",
      "CPU, RAM, ROM",
      "Storage Devices",
      "Binary Number System",
      "File Management",
      "Computer Security Basics",
    ],
  },
  {
    phase: "Phase 2: Operating System Fundamentals",
    topics: [
      "What is an Operating System?",
      "Windows Basics",
      "Linux Introduction",
      "File Systems",
      "Process Management",
      "Memory Management",
      "Command Line Basics",
    ],
  },
  {
    phase: "Phase 3: Networking Basics",
    topics: [
      "Network Fundamentals",
      "LAN, WAN, MAN",
      "OSI Model",
      "TCP/IP Model",
      "IPv4 & IPv6",
      "DNS",
      "DHCP",
      "HTTP/HTTPS",
      "FTP",
      "SSH",
      "Ports & Protocols",
    ],
  },
  {
    phase: "Phase 4: Linux Basics",
    topics: [
      "Linux Installation",
      "Linux Terminal",
      "Basic Commands",
      "File & Directory Management",
      "Permissions",
      "Users & Groups",
      "Package Management",
      "Shell Basics",
    ],
  },
  {
    phase: "Phase 5: Python for Cybersecurity",
    topics: [
      "Python Installation",
      "Variables",
      "Data Types",
      "Operators",
      "Loops",
      "Functions",
      "Lists & Dictionaries",
      "File Handling",
      "Modules",
      "Exception Handling",
    ],
  },
  {
    phase: "Phase 6: Cybersecurity Fundamentals",
    topics: [
      "CIA Triad",
      "Types of Hackers",
      "Malware",
      "Phishing",
      "Password Security",
      "Encryption Basics",
      "Hashing",
      "Authentication",
      "Firewalls",
      "VPN Basics",
    ],
  },
];

const intermediateSyllabus = [
  {
    phase: "Web Technologies",
    topics: [
      "HTML",
      "CSS",
      "JavaScript Basics",
      "HTTP Requests",
      "Cookies & Sessions",
      "REST APIs",
    ],
  },
  {
    phase: "Web Security",
    topics: [
      "OWASP Top 10",
      "SQL Injection",
      "Cross-Site Scripting (XSS)",
      "CSRF",
      "File Upload Vulnerabilities",
      "Directory Traversal",
      "Authentication Vulnerabilities",
    ],
  },
  {
    phase: "Kali Linux",
    topics: [
      "Installing Kali Linux",
      "Virtual Machines",
      "Kali Configuration",
      "Networking in Kali",
      "Essential Kali Commands",
      "Package Management",
    ],
  },
  {
    phase: "Ethical Hacking Tools",
    topics: [
      "Nmap",
      "Wireshark",
      "Burp Suite",
      "Gobuster",
      "Nikto",
      "Netcat",
      "Hydra",
      "John the Ripper",
      "Metasploit Basics",
    ],
  },
  {
    phase: "Network Security",
    topics: [
      "Packet Analysis",
      "Firewall Configuration",
      "IDS/IPS Basics",
      "VPN Configuration",
      "Network Monitoring",
      "Secure Network Design",
    ],
  },
  {
    phase: "Python Automation",
    topics: [
      "Socket Programming",
      "Port Scanner",
      "Banner Grabbing",
      "Network Automation",
      "Log Analysis",
      "Security Scripts",
    ],
  },
  {
    phase: "Capture The Flag (CTF)",
    topics: [
      "Linux Challenges",
      "Networking Challenges",
      "Web Exploitation",
      "Cryptography",
      "Privilege Escalation",
      "Basic Reverse Engineering",
    ],
  },
];

const advancedSyllabus = [
  {
    phase: "Penetration Testing",
    topics: [
      "Reconnaissance",
      "Enumeration",
      "Vulnerability Assessment",
      "Exploitation",
      "Privilege Escalation",
      "Post Exploitation",
      "Report Writing",
    ],
  },
  {
    phase: "Active Directory Security",
    topics: [
      "Windows Server",
      "Active Directory",
      "Domain Controllers",
      "Kerberos",
      "SMB",
      "BloodHound",
      "Lateral Movement",
    ],
  },
  {
    phase: "Cloud Security",
    topics: [
      "AWS Security",
      "Azure Security",
      "IAM",
      "S3 Security",
      "Docker Security",
      "Kubernetes Security",
    ],
  },
  {
    phase: "Digital Forensics",
    topics: [
      "Incident Response",
      "Disk Forensics",
      "Memory Forensics",
      "Log Analysis",
      "Autopsy",
      "Volatility Framework",
    ],
  },
  {
    phase: "Malware Analysis",
    topics: [
      "Static Analysis",
      "Dynamic Analysis",
      "PE File Analysis",
      "Reverse Engineering",
      "YARA Rules",
      "Sandboxing",
    ],
  },
  {
    phase: "Wireless Security",
    topics: [
      "Wi-Fi Security",
      "WPA/WPA2/WPA3",
      "Aircrack-ng",
      "Evil Twin Attacks",
      "Wireless Auditing",
    ],
  },
  {
    phase: "Bug Bounty",
    topics: [
      "Reconnaissance",
      "Subdomain Enumeration",
      "Directory Fuzzing",
      "API Security Testing",
      "Advanced Web Exploitation",
      "Vulnerability Reporting",
    ],
  },
  {
    phase: "Advanced Exploitation",
    topics: [
      "Buffer Overflow",
      "Binary Exploitation",
      "Shellcoding",
      "Return-Oriented Programming (ROP)",
      "Kernel Exploitation",
      "Exploit Development",
      "Fuzzing",
    ],
  },
  {
    phase: "Capstone Projects",
    topics: [
      "Enterprise Penetration Test",
      "Secure Linux Server Deployment",
      "Python Security Toolkit",
      "Web Application Security Assessment",
      "Active Directory Attack & Defense Lab",
      "SOC Monitoring Dashboard",
      "Professional Penetration Testing Report",
    ],
  },
];

export default function CoursesPage() {
  const coursesByTrack = trackOrder.map((track) => ({
    track,
    courses: courses.filter((course) => course.track === track),
  }));

  return (
    <div>
      <PageHero
        eyebrow="Course catalog"
        title="Every course, one path forward"
        description="Filter by track or category to find where you are right now. Each course is built to support practical understanding, lab work, and measurable progress."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-3 sm:grid-cols-3">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase()}`}
              className={`rounded-3xl border px-4 py-3 text-center font-semibold transition ${trackStyles[category]}`}
            >
              {category}
            </a>
          ))}
        </div>

        <div className="mt-10 space-y-20">
          {coursesByTrack.map(({ track, courses }) => (
            <div key={track} id={track.toLowerCase()}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold ${trackStyles[track]}`}>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-base shadow-sm">
                      {track.charAt(0)}
                    </span>
                    {track} Courses
                  </div>
                  <p className="mt-3 max-w-2xl text-sm text-text-dim">
                    Explore the {track.toLowerCase()} cybersecurity courses designed to build the right skills at the right pace.
                  </p>
                </div>
                <span className="rounded-full bg-surface px-4 py-2 text-sm text-text-dim shadow-sm">
                  {courses.length} courses
                </span>
              </div>
              {track === "Beginner" ? (
                <div className="mt-6 rounded-3xl border border-border bg-surface p-6">
                  <h3 className="text-xl font-semibold text-text">Beginner learning path</h3>
                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    {beginnerSyllabus.map((phase) => (
                      <div key={phase.phase} className="rounded-2xl bg-panel p-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-text-dim">
                          {phase.phase}
                        </h4>
                        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-text-dim">
                          {phase.topics.map((topic) => (
                            <li key={topic}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {track === "Intermediate" ? (
                <div className="mt-6 rounded-3xl border border-border bg-surface p-6">
                  <h3 className="text-xl font-semibold text-text">Intermediate learning path</h3>
                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    {intermediateSyllabus.map((phase) => (
                      <div key={phase.phase} className="rounded-2xl bg-panel p-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-text-dim">
                          {phase.phase}
                        </h4>
                        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-text-dim">
                          {phase.topics.map((topic) => (
                            <li key={topic}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {track === "Advanced" ? (
                <div className="mt-6 rounded-3xl border border-border bg-surface p-6">
                  <h3 className="text-xl font-semibold text-text">Advanced learning path</h3>
                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    {advancedSyllabus.map((phase) => (
                      <div key={phase.phase} className="rounded-2xl border border-border/50 bg-panel p-4 shadow-sm">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-text-dim">
                          {phase.phase}
                        </h4>
                        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-text-dim">
                          {phase.topics.map((topic) => (
                            <li key={topic}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
