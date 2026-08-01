export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface TaskQuestion {
  id: string;
  question: string;
  hint: string;
  flag: string;
  points: number;
}

export interface RoomTask {
  title: string;
  content: string;
  questions: TaskQuestion[];
}

export interface Course {
  slug: string;
  title: string;
  category: string;
  track: Difficulty;
  duration: string;
  modules: number;
  lessons: number;
  students: string;
  rating: number;
  summary: string;
  description: string;
  objectives: string[];
  hasFullContent: boolean;
  tasks?: RoomTask[];
}

export const courses: Course[] = [
  {
    slug: "computer-fundamentals",
    title: "Computer Fundamentals",
    category: "Fundamentals",
    track: "Beginner",
    duration: "4h 00m",
    modules: 5,
    lessons: 20,
    students: "12,124",
    rating: 4.6,
    summary: "Core computer architecture, hardware, and system principles for cybersecurity beginners.",
    description: "Explore the basics of computers, storage, binary, and file management with security-aware examples.",
    objectives: [
      "Understand hardware vs. software and how a computer boots",
      "Describe CPU, RAM, ROM, and storage device types",
      "Work with files and folders safely in a desktop environment",
      "Use the binary number system to represent data",
      "Recognize computer security basics such as malware and access control",
    ],
    hasFullContent: true,
    tasks: [
      {
        title: "Task 1: Introduction to Computer Architecture",
        content: "Computers process data using a Central Processing Unit (CPU) and volatile Random Access Memory (RAM). In cybersecurity, understanding memory layout and CPU registers helps security analysts identify buffer overflows and memory corruption vulnerabilities.",
        questions: [
          {
            id: "q1",
            question: "What hardware component holds temporary data while programs are actively running?",
            hint: "It stands for Random Access Memory.",
            flag: "RAM",
            points: 50
          }
        ]
      },
      {
        title: "Task 2: Binary & Data Representation",
        content: "At the hardware level, all data (strings, files, executable code) is represented in binary (0s and 1s) or hexadecimal. In security analysis, hex dumps are used to inspect uncompiled binaries and network packets.",
        questions: [
          {
            id: "q2",
            question: "What is the decimal equivalent of the 8-bit binary value 00001010?",
            hint: "8 + 2 = 10",
            flag: "10",
            points: 50
          }
        ]
      }
    ]
  },
  {
    slug: "os-fundamentals",
    title: "OS Fundamentals",
    category: "Operating Systems",
    track: "Beginner",
    duration: "5h 15m",
    modules: 6,
    lessons: 24,
    students: "14,800",
    rating: 4.7,
    summary: "Understand processes, memory, filesystems, and access controls across Windows and Linux.",
    description: "Learn operating system concepts, file systems, process and memory management, and command line basics.",
    objectives: [
      "Explain what an operating system does and why it matters",
      "Navigate Windows and Linux user interfaces and file systems",
      "Describe process and memory management fundamentals",
      "Use basic command line tools to inspect and manipulate files",
      "Understand how OS access controls affect system security",
    ],
    hasFullContent: true,
    tasks: [
      {
        title: "Task 1: Operating System Kernel & User Space",
        content: "The kernel acts as the core interface between computer hardware and system processes. It manages CPU scheduling, memory allocation, and hardware device drivers.",
        questions: [
          {
            id: "q1",
            question: "What central component of an operating system controls hardware resources and system calls?",
            hint: "It starts with K.",
            flag: "kernel",
            points: 50
          }
        ]
      }
    ]
  },
  {
    slug: "network-basics",
    title: "Network Basics",
    category: "Networking",
    track: "Beginner",
    duration: "6h 00m",
    modules: 6,
    lessons: 24,
    students: "18,500",
    rating: 4.8,
    summary: "TCP/IP, routing, switching, and packet flows explained for security analysis.",
    description: "Master fundamental networking concepts, protocols, and services that underpin secure systems.",
    objectives: [
      "Distinguish LAN, WAN, and MAN network types",
      "Explain the OSI and TCP/IP models",
      "Compare IPv4 and IPv6 addressing",
      "Understand DNS, DHCP, HTTP/HTTPS, FTP, SSH, and ports",
      "Recognize how network protocols affect security posture",
    ],
    hasFullContent: true,
    tasks: [
      {
        title: "Task 1: The OSI Reference Model",
        content: "The Open Systems Interconnection (OSI) model standardizes network communications into 7 distinct layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.",
        questions: [
          {
            id: "q1",
            question: "Which layer of the OSI model does the IP protocol operate on?",
            hint: "Layer 3 - Network Layer",
            flag: "Network",
            points: 50
          },
          {
            id: "q2",
            question: "What is the standard port number used for secure HTTPS traffic?",
            hint: "HTTP is 80, HTTPS is 443",
            flag: "443",
            points: 50
          }
        ]
      }
    ]
  },
  {
    slug: "linux-basics",
    title: "Linux Basics",
    category: "Linux",
    track: "Beginner",
    duration: "5h 30m",
    modules: 5,
    lessons: 22,
    students: "16,700",
    rating: 4.8,
    summary: "Linux command line, file permissions, process management, and shell fundamentals.",
    description: "Get comfortable with Linux installation, the terminal, file management, permissions, and shell usage.",
    objectives: [
      "Install Linux and explore the desktop and terminal environments",
      "Use commands for file and directory management",
      "Interpret Linux permissions and manage users/groups",
      "Install and update packages using native tools",
      "Write simple shell commands and scripts",
    ],
    hasFullContent: true,
    tasks: [
      {
        title: "Task 1: Essential Linux Navigation Commands",
        content: "Linux administrators and security analysts rely on the command line interface (CLI). Key commands include `pwd` (print working directory), `ls` (list directory contents), and `cd` (change directory).",
        questions: [
          {
            id: "q1",
            question: "Which Linux command displays your current directory location?",
            hint: "print working directory",
            flag: "pwd",
            points: 50
          },
          {
            id: "q2",
            question: "What command is used to read file permissions and hidden files?",
            hint: "ls -la",
            flag: "ls -la",
            points: 50
          }
        ]
      }
    ]
  },
  {
    slug: "python-for-cybersecurity",
    title: "Python for Cybersecurity",
    category: "Python",
    track: "Beginner",
    duration: "7h 00m",
    modules: 7,
    lessons: 28,
    students: "22,300",
    rating: 4.9,
    summary: "Build scripts, scanners, and automation tools for real security workflows.",
    description: "Learn Python fundamentals and apply them to automation, parsing, and security tooling for practical cybersecurity work.",
    objectives: [
      "Install Python and configure a secure development environment",
      "Use variables, data types, operators, and control flow for scripting",
      "Build and reuse functions to automate security tasks",
      "Work with lists, dictionaries, and file I/O for log parsing",
      "Handle exceptions and use modules for real-world tool development",
    ],
    hasFullContent: true,
    tasks: [
      {
        title: "Task 1: Python Socket Programming for Port Scanning",
        content: "Python provides native socket libraries to initiate TCP connections. A basic port scanner creates a TCP socket (`socket.socket(socket.AF_INET, socket.SOCK_STREAM)`) and attempts connection via `connect_ex((ip, port))`.",
        questions: [
          {
            id: "q1",
            question: "What built-in Python module is used for low-level network communications?",
            hint: "import socket",
            flag: "socket",
            points: 50
          }
        ]
      }
    ]
  },
  {
    slug: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    category: "Cybersecurity",
    track: "Beginner",
    duration: "6h 30m",
    modules: 6,
    lessons: 24,
    students: "21,740",
    rating: 4.8,
    summary: "Learn the foundational security concepts every analyst needs: CIA, malware, phishing, encryption, and access controls.",
    description: "This course covers the essential cybersecurity principles that protect systems, networks, and data from common threats.",
    objectives: [
      "Explain the CIA triad and how confidentiality, integrity, and availability protect information",
      "Identify common malware families and phishing tactics",
      "Describe password security, authentication methods, and hashing",
      "Understand basic encryption and VPN concepts",
      "Recognize the role of firewalls and network access controls",
    ],
    hasFullContent: true,
    tasks: [
      {
        title: "Task 1: The CIA Triad",
        content: "The CIA Triad is the cornerstone of information security: Confidentiality ensures data is accessible only to authorized users, Integrity preserves data accuracy and prevents tampering, and Availability ensures services remain accessible when needed.",
        questions: [
          {
            id: "q1",
            question: "Which component of the CIA Triad prevents unauthorized modification of data?",
            hint: "Confidentiality, Integrity, or Availability",
            flag: "Integrity",
            points: 50
          }
        ]
      }
    ]
  },
  {
    slug: "kali-linux",
    title: "Kali Linux",
    category: "Pentesting",
    track: "Beginner",
    duration: "6h 45m",
    modules: 6,
    lessons: 26,
    students: "20,100",
    rating: 4.7,
    summary: "Install, configure, and use Kali Linux tools for reconnaissance and validation.",
    description: "Master Kali Linux distribution, default penetration testing utilities, Metasploit, Nmap, and Hydra.",
    objectives: [
      "Navigate Kali Linux tools menu",
      "Run Nmap recon and Burp Suite proxy",
      "Execute automated security audits safely"
    ],
    hasFullContent: true,
    tasks: [
      {
        title: "Task 1: Reconnaissance with Nmap on Kali",
        content: "Nmap is pre-installed on Kali Linux. A SYN scan (`nmap -sS <target>`) probes open TCP ports discreetly.",
        questions: [
          {
            id: "q1",
            question: "What Nmap flag is used for service version detection?",
            hint: "-sV",
            flag: "-sV",
            points: 50
          }
        ]
      }
    ]
  },
  {
    slug: "web-application-security",
    title: "Web Application Security Fundamentals",
    category: "Web Security",
    track: "Intermediate",
    duration: "6h 30m",
    modules: 3,
    lessons: 3,
    students: "18,204",
    rating: 4.8,
    summary: "Understand and defend against SQL injection, XSS, and missing security headers.",
    description: "Understand vulnerabilities behind SQL injection, XSS, and missing security headers with hands-on practice.",
    objectives: [
      "Explain SQL injection mechanics",
      "Identify Stored vs Reflected XSS",
      "Implement Content Security Policy (CSP)"
    ],
    hasFullContent: true,
    tasks: [
      {
        title: "Task 1: SQL Injection Mechanics",
        content: "SQL Injection occurs when user input is concatenated directly into SQL strings. Example payload: `' OR '1'='1`. Defense: Parameterized queries / Prepared statements.",
        questions: [
          {
            id: "q1",
            question: "What mechanism completely prevents SQL Injection by keeping query logic separate from user parameters?",
            hint: "Prepared statements",
            flag: "Prepared statements",
            points: 50
          }
        ]
      }
    ]
  }
];

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export const difficultyColor: Record<Difficulty, string> = {
  Beginner: "text-severity-low border-severity-low/30 bg-severity-low/10",
  Intermediate: "text-severity-medium border-severity-medium/30 bg-severity-medium/10",
  Advanced: "text-severity-critical border-severity-critical/30 bg-severity-critical/10",
};
