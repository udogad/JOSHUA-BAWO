import { motion as Motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "../ui/Badge";

export function ProjectCard({ project, index }) {
  const cardContent = (
    <>
      <img
        src={project.coverImage}
        alt={`${project.title} project cover`}
        loading={index > 2 ? "lazy" : "eager"}
        style={{ objectPosition: project.position }}
      />
      <div className="project-card__shade" />
      <Badge>{project.category}</Badge>
      <div className="project-card__overlay">
        <div className="project-card__meta">
          <span>{project.clientName}</span>
          <span>{project.year}</span>
        </div>
        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <span className="project-card__link">
          {project.url ? (
            <>
              View project <ArrowUpRight size={18} aria-hidden="true" />
            </>
          ) : (
            "Portfolio item"
          )}
        </span>
      </div>
    </>
  );

  return (
    <Motion.article
      className={`project-card project-card--${project.aspect}`}
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {project.url ? (
        <a
          className="project-card__media"
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.title}`}
          data-cursor
        >
          {cardContent}
        </a>
      ) : (
        <div
          className="project-card__media"
          role="group"
          aria-label={`${project.title} portfolio item`}
        >
          {cardContent}
        </div>
      )}
    </Motion.article>
  );
}
