import { motion as Motion } from "framer-motion";

export function FilterTabs({ categories, activeCategory, onChange }) {
  return (
    <div className="filter-tabs" role="group" aria-label="Filter projects">
      {categories.map((category) => {
        const active = category === activeCategory;
        return (
          <button
            key={category}
            type="button"
            className={active ? "is-active" : ""}
            aria-pressed={active}
            onClick={() => onChange(category)}
          >
            {category}
            {active && (
              <Motion.span
                layoutId="filter-underline"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
