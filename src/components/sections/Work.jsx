import { motion as Motion } from "framer-motion";
import { useMemo, useState } from "react";
import { projects } from "../../data/projects";
import { FilterTabs } from "../portfolio/FilterTabs";
import { ProjectGrid } from "../portfolio/ProjectGrid";
import { Button } from "../ui/Button";

const categories = [
  "All",
  "Graphic Design",
  "Product Design",
  "Branding",
  "UI/UX",
  "Print",
  "Motion",
];

export function Work() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredProjects = useMemo(() => {
    const ordered = [...projects].sort((a, b) => a.order - b.order);
    return activeCategory === "All"
      ? ordered
      : ordered.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const changeCategory = (category) => {
    setActiveCategory(category);
    setVisibleCount(9);
  };

  return (
    <Motion.section
      id="work"
      className="section work"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="shell">
        <div className="section-heading section-heading--split">
          <div>
            <span className="eyebrow">01 · Selected portfolio</span>
            <h2>Selected Work</h2>
          </div>
          <p>
            Brand systems, interfaces, and campaigns built to be clear,
            memorable, and useful.
          </p>
        </div>

        <FilterTabs
          categories={categories}
          activeCategory={activeCategory}
          onChange={changeCategory}
        />
        <ProjectGrid projects={visibleProjects} />

        {visibleCount < filteredProjects.length && (
          <div className="work__load">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((count) => count + 6)}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </Motion.section>
  );
}
