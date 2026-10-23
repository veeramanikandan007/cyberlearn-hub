import React from "react";
import PageHero from "@/components/PageHero";
import { Linkedin, ExternalLink, Code2, Database, Sparkles, UserCheck } from "lucide-react";

export const metadata = {
  title: "The Team Behind the Route | CyberLearn Hub",
  description: "Meet the engineering students and mentor building CyberLearn Hub.",
};

const teamMembers = [
  {
    name: "Deepan Deepan",
    role: "Full Stack & Database",
    linkedin: "https://www.linkedin.com/in/deepan062007?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    image: "/images/team/deepan.jpeg",
    icon: Database,
    badgeColor: "bg-sky-500/10 border-sky-500/30 text-sky-400",
    skills: ["Full Stack Architecture", "Database Design", "API Engineering"]
  },
  {
    name: "Kishore G",
    role: "Full Stack & Assistant",
    linkedin: "https://www.linkedin.com/in/kishore-g-a79973424?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    image: "/images/team/kishore.jpeg",
    icon: Code2,
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    skills: ["Full Stack Development", "Frontend Systems", "Technical Assistance"]
  }
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E7EBEF]">
      <PageHero
        eyebrow="Our Engineering Team"
        title="The Team Behind the Route"
        description="A small team of engineering students and one very patient mentor, building the platform we wished we'd had."
        primaryHref="#team-section"
        primaryLabel="Meet the Team"
        secondaryHref="/about"
        secondaryLabel="Learn About Our Platform"
      />

      <section id="team-section" className="mx-auto max-w-7xl px-6 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles size={13} /> Engineering Student Builders
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Meet the Builders & Designers
          </h2>
          <p className="text-sm text-slate-400">
            Connecting technical expertise, database management, and full-stack development.
          </p>
        </div>

        {/* TEAM CARDS GRID */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member) => {
            const RoleIcon = member.icon;
            return (
              <div 
                key={member.name}
                className="glass rounded-2xl p-8 border border-slate-800 bg-slate-900/60 hover:border-emerald-500/40 transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* PROFILE IMAGE WITH LINKEDIN HOVER OVERLAY */}
                <div className="relative mb-6">
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block relative rounded-full overflow-hidden border-2 border-emerald-500/40 p-1 group-hover:border-emerald-400 transition-all duration-300 group-hover:scale-105"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      width={180}
                      height={180}
                      className="rounded-full w-40 h-40 object-cover bg-slate-950"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                      <Linkedin size={28} className="text-emerald-400" />
                    </div>
                  </a>
                  <span className="absolute bottom-1 right-1 p-2 rounded-full bg-slate-900 border border-slate-700 text-emerald-400">
                    <UserCheck size={16} />
                  </span>
                </div>

                {/* NAME & ROLE */}
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {member.name}
                </h3>
                
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full text-xs font-mono border font-medium ${member.badgeColor}`}>
                  <RoleIcon size={14} />
                  {member.role}
                </span>

                {/* SKILLS TAGS */}
                <div className="flex flex-wrap justify-center gap-2 mt-5">
                  {member.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-950 text-slate-400 border border-slate-800">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* LINKEDIN BUTTON */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-950 transition-all"
                >
                  <Linkedin size={15} />
                  <span>Connect on LinkedIn</span>
                  <ExternalLink size={13} />
                </a>

              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
