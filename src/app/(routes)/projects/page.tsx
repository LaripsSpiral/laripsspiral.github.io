'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import ProjectCard from "@/app/components/ProjectCard";

import SearchBar from "@/app/components/SearchBar";

import { ProjectInterface } from "@/app/lib/project/Interface";
import { filterProjects } from "@/app/lib/project/Queuery";

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "latest">("latest");
  const [filteredProjects, setFilteredProjects] = useState<ProjectInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const filtered = await filterProjects(searchQuery);
        setFilteredProjects(filtered);
      } catch (error) {
        console.error("Error loading projects:", error);
        setFilteredProjects([]);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen p-8">
      <div className="relative flex items-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold"
        >
          Projects
        </motion.h1>

        <div className="absolute left-1/2 -translate-x-1/2">
          <SearchBar
            onSearch={setSearchQuery}
            onSort={setSortBy}
            sortBy={sortBy}
          />
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      )}
    </div>
  );
}