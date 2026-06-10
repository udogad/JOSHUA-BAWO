import { AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }) {
  return (
    <div className="project-grid">
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
}
