'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  organize?: string[];
  platform?: string[];
  github?: string;
  demo?: string;
}

export default function ProjectCard({ title, description, image, organize, platform, github, demo }: ProjectCardProps) {
  return (
    <Link href={`/projects/${encodeURIComponent(title)}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
      >
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex flex-wrap gap-1 text-black bolder">
              {organize?.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm mr-2">
                {tag}
              </span>
              ))}
              {platform?.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-blue-200 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {github && (
              <Link href={github} target="_blank" className="text-blue-500 hover:text-blue-600">
                GitHub
              </Link>
            )}
            {demo && (
              <Link href={demo} target="_blank" className="text-green-500 hover:text-green-600">
                Live Demo
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
