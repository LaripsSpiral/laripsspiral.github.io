'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { ProjectInterface } from "../lib/project/Interface";

export default function ProjectCard(project: ProjectInterface) {
  return (
    <Link 
      href={`/projects/${project.slug}`} 
      className="block hover:scale-[1.02] transition-transform duration-200"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
      >
        
        <Image
          src={project.image || '/Default_image.svg'}
          alt={project.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-1 text-black bolder">
              {project.organize?.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm mr-2">
                {tag}
              </span>
              ))}
              {project.platform?.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-blue-200 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}