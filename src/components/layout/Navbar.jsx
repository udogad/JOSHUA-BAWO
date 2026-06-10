import {
  AnimatePresence,
  motion as Motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { content } from "../../data/content";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme");
    const initialTheme = stored === "light" ? "light" : "dark";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 120 && !menuOpen);
  });

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("portfolio-theme", nextTheme);
  };

  return (
    <>
      <Motion.header
        className="navbar"
        variants={{ visible: { y: 0 }, hidden: { y: "-120%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className="navbar__brand" href="#hero" aria-label="Go to top">
          <span>{content.shortName}</span>
          <i aria-hidden="true" />
        </a>

        <nav className="navbar__links" aria-label="Primary navigation">
          {content.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            className="icon-button navbar__menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </Motion.header>

      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            className="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 42px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 42px) 38px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 42px) 38px)" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu__top">
              <span>{content.shortName}</span>
              <button
                type="button"
                className="icon-button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {content.navigation.map((item, index) => (
                <Motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.08 }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                </Motion.a>
              ))}
            </nav>
            <p>{content.email}</p>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
