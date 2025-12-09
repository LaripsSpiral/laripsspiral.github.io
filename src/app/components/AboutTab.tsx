'use client';

import { Code, Cpu, Zap, Users, GraduationCap, Award } from 'lucide-react';

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
        <div className="mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-1">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
            <span className="text-purple-400 text-2xl font-bold">ST</span>
          </div>
        </div>
        <h2 className="mb-2 text-white">Sirasit Tumvijit</h2>
        <p className="mb-4 text-purple-400">Game Developer</p>
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
              className="rounded-lg bg-gray-800 p-6 shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/20">
                <skill.icon className="h-6 w-6 text-purple-400" />
              </div>
              <h4 className="mb-2 text-white">{skill.title}</h4>
              <p className="text-sm text-gray-400">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20 grid gap-8 sm:grid-cols-2">
        <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
          <h3 className="mb-4 text-white">Strengths</h3>
          <div className="flex flex-wrap gap-2">
            {strengths.map((strength) => (
              <span
                key={strength}
                className="rounded-full bg-purple-600/20 px-4 py-2 text-sm text-purple-300"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
          <h3 className="mb-4 text-white">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-300"
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
              className="rounded-lg bg-gray-800 p-6 shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-600/20">
                <achievement.icon className="h-6 w-6 text-yellow-400" />
              </div>
              <h4 className="mb-2 text-white">{achievement.title}</h4>
              <p className="text-sm text-gray-400">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-gray-800 p-12 shadow-lg">
        <div className="mb-6 flex items-center justify-center gap-3">
          <GraduationCap className="h-6 w-6 text-purple-400" />
          <h3 className="text-white">Education</h3>
        </div>
        <div className="mx-auto max-w-3xl space-y-4 text-gray-400">
          <p className="text-lg font-medium text-white">Bangkok University</p>
          <p>Bachelor&apos;s Degree in Information Technology</p>
          <p>Majoring in Game and Interactive Media</p>
          <p className="text-purple-400">June 2023 - Ongoing</p>
        </div>
      </div>

      <div className="mt-20 rounded-2xl bg-gray-800 p-12 shadow-lg">
        <h3 className="mb-6 text-center text-white">Experience</h3>
        <div className="mx-auto max-w-3xl space-y-6">
          <div>
            <h4 className="mb-2 text-lg font-medium text-white">CoSI | Center of Specialty Innovation</h4>
            <p className="mb-4 text-purple-400">Research Assistant</p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>
                  <strong>Roblox School of Survival | อยู่รอดวิทยา</strong> (Game Programmer) -
                  Collaborated with Dentsu team in development
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>
                  Developed and implemented gameplay &apos;Run Hide Fight&apos; events with quick time events
                  using IK animation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>
                  <strong>Unity Project Medicals Mobile AR</strong> (Optimizer) - Improved
                  performance and compatibility for mobiles
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
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

