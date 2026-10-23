"use client";

import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { 
  Linkedin, 
  ExternalLink, 
  Layers, 
  MousePointerClick, 
  FileCode2, 
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Code
} from "lucide-react";

export default function TeamMappedPage() {
  const [activePerson, setActivePerson] = useState<string>("deepan");

  const teamData = {
    deepan: {
      name: "Deepan Deepan",
      role: "Full Stack & Database",
      linkedin: "https://www.linkedin.com/in/deepan062007?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      coords: "180, 225, 80",
      shape: "circle",
      image: "/images/team/deepan.jpeg",
      desc: "Deepan specializes in full-stack architecture, backend API engineering, and database management for CyberLearn Hub.",
      specs: [
        "Primary Hotspot Shape: Circle (center 180, 225, radius 80)",
        "LinkedIn Profile linked via <area> tag and interactive card",
        "Role: Full Stack & Database Administrator"
      ]
    },
    kishore: {
      name: "Kishore G",
      role: "Full Stack & Assistant",
      linkedin: "https://www.linkedin.com/in/kishore-g-a79973424?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      coords: "620, 225, 80",
      shape: "circle",
      image: "/images/team/kishore.jpeg",
      desc: "Kishore focuses on full-stack development, UI integration, and assisting technical architecture for CyberLearn Hub.",
      specs: [
        "Primary Hotspot Shape: Circle (center 620, 225, radius 80)",
        "LinkedIn Profile linked via <area> tag and interactive card",
        "Role: Full Stack & Assistant Developer"
      ]
    }
  };

  const current = teamData[activePerson as keyof typeof teamData];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E7EBEF]">
      <PageHero
        eyebrow="College Practical Record — Experiment 1"
        title="The Team Behind the Route"
        description="A small team of engineering students and one very patient mentor, building the platform we wished we'd had — demonstrated with an interactive HTML Image Map."
        primaryHref="#interactive-map"
        primaryLabel="Interactive Image Map"
        secondaryHref="#reference-record"
        secondaryLabel="View Reference Record Code"
      />

      <div className="mx-auto max-w-7xl px-6 py-12 space-y-16">
        
        {/* INTERACTIVE MAPPED IMAGE SECTION */}
        <section id="interactive-map" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <MousePointerClick className="text-emerald-400" size={24} />
                MAPPED IMAGE (Touch the image to open the LinkedIn profile)
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Hover & click the team hotspots on the mapped image to view profiles or visit LinkedIn.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              HTML &lt;map&gt; & &lt;area&gt; Hotspots Active
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: VISUAL MAPPED IMAGE WITH HTML MAP */}
            <div className="lg:col-span-7 space-y-4">
              <div className="glass rounded-2xl p-5 border border-slate-800 bg-slate-900/60 shadow-2xl relative">
                <div className="flex items-center justify-between mb-3 font-mono text-xs text-slate-400">
                  <span className="flex items-center gap-2 text-emerald-400">
                    <Layers size={14} /> Mapped Image Graphic
                  </span>
                  <span>Dimensions: 800 x 450 px</span>
                </div>

                {/* IMAGE CONTAINER WITH SVG HOTSPOT OVERLAY */}
                <div className="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden flex items-center justify-center">
                  
                  {/* HTML IMAGE WITH USEMAP ATTRIBUTE */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/experiment1-imagemap.png" 
                    useMap="#team-image-map" 
                    alt="The Team Behind the Route Mapped Image" 
                    className="w-full h-auto object-contain select-none"
                    width={800}
                    height={450}
                  />

                  {/* HTML MAP & AREA ELEMENTS */}
                  <map name="team-image-map">
                    {/* Deepan Hotspot */}
                    <area 
                      shape="circle" 
                      coords="180, 120, 70" 
                      href={teamData.deepan.linkedin} 
                      target="_blank" 
                      alt="Deepan Deepan LinkedIn"
                      title="Touch image to open Deepan's LinkedIn Profile"
                      onClick={() => setActivePerson("deepan")}
                      className="cursor-pointer"
                    />

                    {/* Kishore Hotspot */}
                    <area 
                      shape="rect" 
                      coords="480, 50, 720, 190" 
                      href={teamData.kishore.linkedin} 
                      target="_blank" 
                      alt="Kishore G LinkedIn"
                      title="Touch image to open Kishore's LinkedIn Profile"
                      onClick={() => setActivePerson("kishore")}
                      className="cursor-pointer"
                    />
                  </map>
                </div>

                <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">Selected Member: {current.name}</span>
                  <span>Hotspot: <code className="text-amber-400">{current.coords}</code></span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: LINKEDIN PROFILE CARD */}
            <div className="lg:col-span-5">
              <div className="glass rounded-2xl p-6 border border-emerald-500/30 bg-slate-900/90 shadow-2xl space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={current.image} 
                    alt={current.name} 
                    className="w-16 h-16 rounded-full border-2 border-emerald-400 object-cover bg-slate-950" 
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{current.name}</h3>
                    <p className="text-xs font-mono text-emerald-400 font-semibold">{current.role}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  {current.desc}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Hotspot Technical Specs
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {current.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/50">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={current.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <Linkedin size={16} />
                  <span>Open LinkedIn Profile</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* REFERENCE RECORD CODE SECTION */}
        <section id="reference-record" className="scroll-mt-24 glass rounded-2xl p-8 border border-slate-800 bg-slate-900/60 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <FileCode2 className="text-emerald-400" size={24} />
              <div>
                <h2 className="text-xl font-bold text-white">Reference Practical Record (EX 1.docx) Source Code</h2>
                <p className="text-xs text-slate-400">Exact HTML code structure from reference document EX 1.docx</p>
              </div>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
{`PROGRAM:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Section</title>
</head>
<body>

    <h1>The Team Behind the Route</h1>

    <p>
        A small team of engineering students and one very patient mentor,
        building the platform we wished we'd had.
    </p>

    <!-- Deepan -->
    <a href="https://www.linkedin.com/in/deepan062007?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank">
        <img src="image/deepan.jpeg" alt="Deepan Deepan" width="200" height="200">
    </a>

    <h3>Deepan Deepan</h3>
    <p>Full Stack & Database</p>

    <hr>

    <!-- Kishore -->
    <a href="https://www.linkedin.com/in/kishore-g-a79973424?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank">
        <img src="image/kishore.jpeg" alt="Kishore G" width="200" height="200">
    </a>

    <h3>Kishore G</h3>
    <p>Full Stack & Assistant</p>

</body>
</html>

OUTPUT:
MAPPED IMAGE:
Touch the image to open the LinkedIn profile

Result:`}
          </pre>
        </section>

      </div>
    </div>
  );
}
