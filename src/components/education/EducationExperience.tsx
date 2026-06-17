"use client";

import Image from "next/image";
import { useState } from "react";
import type { EducationContent } from "@/lib/types";

export function EducationExperience({ education }: { education: EducationContent }) {
  const [activeId, setActiveId] = useState(education.degrees[0]?.id ?? "");

  const activeDegree = education.degrees.find((d) => d.id === activeId);

  return (
    <div className="space-y-16">
      {/* Map + schools */}
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#e8f0fe] via-surface to-[#f0f4ff] p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.04] md:p-10">
          <p className="mb-6 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Education Journey
          </p>

          <div className="relative aspect-[4/3] w-full">
            <svg
              viewBox="0 0 100 80"
              className="h-full w-full"
              aria-label="中国教育地图示意"
            >
              <defs>
                <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#007AFF" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#5856D6" stopOpacity="0.04" />
                </linearGradient>
              </defs>
              <path
                d="M15 25 Q35 15 55 20 T85 30 Q90 45 80 60 Q65 72 45 68 Q25 65 18 50 Z"
                fill="url(#mapGrad)"
                stroke="rgba(0,113,227,0.15)"
                strokeWidth="0.5"
                className="animate-[pulse_4s_ease-in-out_infinite]"
              />
              {education.degrees.map((degree, index) => (
                <g key={degree.id}>
                  {index > 0 && (
                    <line
                      x1={education.degrees[index - 1].mapPosition.x}
                      y1={education.degrees[index - 1].mapPosition.y}
                      x2={degree.mapPosition.x}
                      y2={degree.mapPosition.y}
                      stroke="#007AFF"
                      strokeWidth="0.4"
                      strokeDasharray="2 1.5"
                      opacity="0.5"
                      className="transition-all duration-500"
                    />
                  )}
                  <circle
                    cx={degree.mapPosition.x}
                    cy={degree.mapPosition.y}
                    r={activeId === degree.id ? 3.5 : 2.5}
                    fill={activeId === degree.id ? "#007AFF" : "#86868b"}
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => setActiveId(degree.id)}
                  />
                  {activeId === degree.id && (
                    <circle
                      cx={degree.mapPosition.x}
                      cy={degree.mapPosition.y}
                      r="6"
                      fill="none"
                      stroke="#007AFF"
                      strokeWidth="0.4"
                      opacity="0.6"
                      className="animate-ping"
                    />
                  )}
                </g>
              ))}
            </svg>

            {education.degrees.map((degree) => (
              <button
                key={degree.id}
                type="button"
                onClick={() => setActiveId(degree.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  left: `${degree.mapPosition.x}%`,
                  top: `${degree.mapPosition.y}%`,
                }}
              >
                <span
                  className={`block whitespace-nowrap rounded-full px-2.5 py-1 text-[0.6875rem] font-medium transition-all ${
                    activeId === degree.id
                      ? "bg-accent text-white shadow-md"
                      : "bg-surface/90 text-muted ring-1 ring-black/[0.06]"
                  }`}
                >
                  {degree.city}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active school card */}
        <div className="flex flex-col justify-center">
          {activeDegree && (
            <div className="animate-[fadeIn_0.4s_ease-out] rounded-[2rem] bg-surface p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04] md:p-8">
              <div className="mb-6 flex items-start gap-4">
                {activeDegree.logo && (
                  <Image
                    src={activeDegree.logo}
                    alt={activeDegree.school}
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-2xl"
                  />
                )}
                <div>
                  <h3 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-foreground">
                    {activeDegree.school}
                  </h3>
                  {activeDegree.schoolEn && (
                    <p className="mt-0.5 text-[0.8125rem] text-muted">{activeDegree.schoolEn}</p>
                  )}
                  <p className="mt-2 text-[0.9375rem] text-muted">
                    {activeDegree.major} · {activeDegree.degree}
                  </p>
                  <p className="text-[0.8125rem] text-muted/80">
                    {activeDegree.city}，{activeDegree.province} · {activeDegree.start} –{" "}
                    {activeDegree.end}
                  </p>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {activeDegree.badges?.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-accent/10 px-3 py-1 text-[0.75rem] font-medium text-accent"
                  >
                    {badge}
                  </span>
                ))}
                {activeDegree.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-foreground/[0.05] px-3 py-1 text-[0.75rem] text-foreground/80"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {activeDegree.honors && activeDegree.honors.length > 0 && (
                <div className="border-t border-black/[0.06] pt-5">
                  <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted">
                    在校荣誉
                  </p>
                  <ul className="space-y-2">
                    {activeDegree.honors.map((honor) => (
                      <li
                        key={honor}
                        className="flex items-start gap-2 text-[0.875rem] text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {honor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex gap-2">
            {education.degrees.map((degree) => (
              <button
                key={degree.id}
                type="button"
                onClick={() => setActiveId(degree.id)}
                className={`flex-1 rounded-2xl px-3 py-3 text-center text-[0.8125rem] font-medium transition-all ${
                  activeId === degree.id
                    ? "bg-foreground text-background"
                    : "bg-foreground/[0.04] text-muted hover:bg-foreground/[0.08]"
                }`}
              >
                {degree.school.replace("中国", "").replace("大学", "")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Competitions marquee-style grid */}
      <div>
        <h3 className="mb-6 text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground">
          竞赛与成就
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {education.competitions.map((item) => (
            <div
              key={`${item.name}-${item.award}`}
              className="group rounded-2xl bg-surface p-4 ring-1 ring-black/[0.04] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ${
                    item.level === "国家级"
                      ? "bg-[#FF9500]/15 text-[#C93400]"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {item.level ?? "竞赛"}
                </span>
              </div>
              <p className="text-[0.875rem] font-medium leading-snug text-foreground group-hover:text-accent">
                {item.name}
              </p>
              <p className="mt-1 text-[0.8125rem] text-muted">{item.award}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Research */}
      <div>
        <h3 className="mb-6 text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground">
          科研实践
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {education.research.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-surface p-5 ring-1 ring-black/[0.04]"
            >
              <p className="mb-1 text-[0.75rem] font-medium text-accent">{item.role}</p>
              <h4 className="mb-2 text-[0.9375rem] font-medium text-foreground">{item.title}</h4>
              <p className="text-[0.8125rem] leading-relaxed text-muted">{item.description}</p>
              {item.publication && (
                <p className="mt-3 text-[0.75rem] text-muted/80">{item.publication}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div className="flex flex-wrap gap-2">
        {education.certificates.map((cert) => (
          <span
            key={cert}
            className="rounded-full bg-foreground/[0.04] px-4 py-2 text-[0.8125rem] text-foreground/70"
          >
            {cert}
          </span>
        ))}
      </div>
    </div>
  );
}
