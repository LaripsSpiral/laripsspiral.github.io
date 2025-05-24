'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectInspectProps {
  project: {
    title: string;
    description: string;
    image: string;
    organize?: string[];
    platform?: string[];
    github?: string;
    demo?: string;
    date: string;
  };
}

export default function ProjectInspect({ project }: ProjectInspectProps) {
  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg p-8"
      >
        <Link href="/projects" className="text-blue-500 hover:text-blue-600 mb-4 block">
          ← Back to Projects
        </Link>
        
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover rounded-xl mb-8"
        />

        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-400 mb-6">{project.date}</p>

        <div className="flex gap-4 mb-8">
          {project.github && (
            <Link href={project.github} target="_blank" 
              className="px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700">
              View on GitHub
            </Link>
          )}
          {project.demo && (
            <Link href={project.demo} target="_blank"
              className="px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700">
              Live Demo
            </Link>
          )}
        </div>

        <div className="prose prose-invert max-w-none">
          <p>{project.description}</p>
        </div>

        <div className="mt-8">
          {project.organize && (
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Organizations</h3>
              <div className="flex flex-wrap gap-2">
                {project.organize.map(org => (
                  <span key={org} className="px-3 py-1 bg-gray-200 text-black rounded-full">
                    {org}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.platform && (
            <div>
              <h3 className="text-xl font-bold mb-2">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {project.platform.map(plt => (
                  <span key={plt} className="px-3 py-1 bg-blue-200 text-black rounded-full">
                    {plt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
