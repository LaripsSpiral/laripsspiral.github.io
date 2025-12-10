'use client';

import { Code, Cpu, Zap, Users, GraduationCap, Award } from 'lucide-react';
import {
  THEME_PRIMARY,
  THEME_PRIMARY_BORDER,
  THEME_PRIMARY_TINT,
  THEME_COMPLEMENT_TINT,
} from '../theme/palette';

export function AboutTab() {
  const skills = [
    {
      icon: Code,
      title: 'Programming',
      description: 'C#, C, Python - Building robust game systems and mechanics.',
    },
    {
      icon: Cpu,
      title: 'Game Engines',
      description: 'Unity, Unreal Engine - Creating immersive interactive experiences.',
    },
    {
      icon: Zap,
      title: 'Optimization',
      description: 'Specializing in performance optimization for mobile and VR platforms.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Experienced in team development and rapid prototyping.',
    },
  ];

  const strengths = [
    'Responsibility',
    'Quick Learner',
    'Resourceful',
    'Proactive Developer',
  ];

  const languages = ['Thai', 'English'];

  const achievements = [
    {
      icon: Award,
      title: 'School of Survival | อยู่รอดวิทยา',
      description: 'CoSI x Dentsu - ADPEOPLE 2024 (8 Awards), ADFEST 2025 (1 Award)',
    },
    {
      icon: Award,
      title: 'IEEE 2nd ChatGPT4PCG Competition 2024',
      description: 'Third Place Winner',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-20 text-center">
        <div
          className="mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full p-1"
          style={{
            background: `linear-gradient(135deg, ${THEME_PRIMARY_TINT}, ${THEME_COMPLEMENT_TINT})`,
            border: `1px solid ${THEME_PRIMARY_BORDER}`,
          }}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0d1117]">
            <span className="text-2xl font-bold" style={{ color: THEME_PRIMARY }}>
              ST
            </span>
          </div>
        </div>
        <h2 className="mb-2 text-white">Sirasit Tumvijit</h2>
        <p className="mb-4" style={{ color: THEME_PRIMARY }}>
          Game Developer
        </p>
        <p className="mx-auto max-w-3xl text-gray-400">
          Unity Game Programmer with hands-on experience in research, rapid prototyping and
          collaborative development, specializing in optimization. Strong responsibility,
          problem-solving skills and a highly receptive approach to the team.
        </p>
      </div>

      <div className="mb-20">
        <h3 className="mb-8 text-center text-white">Skills & Expertise</h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="rounded-lg p-6 shadow-lg transition-transform hover:-translate-y-1"
              style={{ backgroundColor: THEME_PRIMARY_TINT, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ backgroundColor: THEME_COMPLEMENT_TINT, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
              >
                <skill.icon className="h-6 w-6" style={{ color: THEME_PRIMARY }} />
              </div>
              <h4 className="mb-2 text-white">{skill.title}</h4>
              <p className="text-sm text-gray-400">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20 grid gap-8 sm:grid-cols-2">
        <div
          className="rounded-lg p-6 shadow-lg"
          style={{ backgroundColor: THEME_PRIMARY_TINT, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
        >
          <h3 className="mb-4 text-white">Strengths</h3>
          <div className="flex flex-wrap gap-2">
            {strengths.map((strength) => (
              <span
                key={strength}
                className="rounded-full px-4 py-2 text-sm"
                style={{
                  backgroundColor: THEME_COMPLEMENT_TINT,
                  border: `1px solid ${THEME_PRIMARY_BORDER}`,
                  color: THEME_PRIMARY,
                }}
              >
                {strength}
              </span>
            ))}
          </div>
        </div>

        <div
          className="rounded-lg p-6 shadow-lg"
          style={{ backgroundColor: THEME_PRIMARY_TINT, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
        >
          <h3 className="mb-4 text-white">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full px-4 py-2 text-sm"
                style={{
                  backgroundColor: THEME_COMPLEMENT_TINT,
                  border: `1px solid ${THEME_PRIMARY_BORDER}`,
                  color: THEME_PRIMARY,
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h3 className="mb-8 text-center text-white">Key Achievements</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className="rounded-lg p-6 shadow-lg transition-transform hover:-translate-y-1"
              style={{ backgroundColor: THEME_PRIMARY_TINT, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ backgroundColor: THEME_COMPLEMENT_TINT, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
              >
                <achievement.icon className="h-6 w-6" style={{ color: THEME_PRIMARY }} />
              </div>
              <h4 className="mb-2 text-white">{achievement.title}</h4>
              <p className="text-sm text-gray-400">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl p-12 shadow-lg"
        style={{ backgroundColor: THEME_PRIMARY_TINT, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
      >
        <div className="mb-6 flex items-center justify-center gap-3">
          <GraduationCap className="h-6 w-6" style={{ color: THEME_PRIMARY }} />
          <h3 className="text-white">Education</h3>
        </div>
        <div className="mx-auto max-w-3xl space-y-4 text-gray-400">
          <p className="text-lg font-medium text-white">Bangkok University</p>
          <p>Bachelor&apos;s Degree in Information Technology</p>
          <p>Majoring in Game and Interactive Media</p>
          <p style={{ color: THEME_PRIMARY }}>June 2023 - Ongoing</p>
        </div>
      </div>

      <div
        className="mt-20 rounded-2xl p-12 shadow-lg"
        style={{ backgroundColor: THEME_PRIMARY_TINT, border: `1px solid ${THEME_PRIMARY_BORDER}` }}
      >
        <h3 className="mb-6 text-center text-white">Experience</h3>
        <div className="mx-auto max-w-3xl space-y-6">
          <div>
            <h4 className="mb-2 text-lg font-medium text-white">CoSI | Center of Specialty Innovation</h4>
            <p className="mb-4" style={{ color: THEME_PRIMARY }}>
              Research Assistant
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <span style={{ color: THEME_PRIMARY }}>•</span>
                <span>
                  <strong>Roblox School of Survival | อยู่รอดวิทยา</strong> (Game Programmer) -
                  Collaborated with Dentsu team in development
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: THEME_PRIMARY }}>•</span>
                <span>
                  Developed and implemented gameplay &apos;Run Hide Fight&apos; events with quick time events
                  using IK animation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: THEME_PRIMARY }}>•</span>
                <span>
                  <strong>Unity Project Medicals Mobile AR</strong> (Optimizer) - Improved
                  performance and compatibility for mobiles
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: THEME_PRIMARY }}>•</span>
                <span>
                  <strong>Prototype Lead Programmer</strong> - Unity Medicals VR & Mobile, Unity
                  Multiplayer VR with Match Making, Voice Chat, Webcam and avatar/environments
                  changes
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

