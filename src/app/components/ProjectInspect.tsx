'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import BackBtn from "./BackBtn";

import { ProjectInterface } from "../lib/project/Interface";

export default function ProjectInspect(project : ProjectInterface) {
  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg p-8"
      >
        <BackBtn/>
        
        <Image
          src={'/Default_image.svg'}
          alt={project.title}
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover rounded-xl mb-8"
        />

        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-400 mb-6">{project.date}</p>

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
