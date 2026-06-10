import { motion as Motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { content } from "../../data/content";
import { projects } from "../../data/projects";
import { Button } from "../ui/Button";

const ease = [0.22, 1, 0.36, 1];

export function Hero() {
  const words = content.name.split(" ");
  const featuredCount = projects.filter((project) => project.featured).length;

  return (
    <section id="hero" className="hero">
      <div className="hero__orbs" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="shell hero__inner">
        <Motion.div
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span>Available for select projects</span>
          <span>{content.location}</span>
        </Motion.div>

        <h1 className="hero__name" aria-label={content.name}>
          {words.map((word, wordIndex) => (
            <span className="hero__word" key={word} aria-hidden="true">
              {Array.from(word).map((character, characterIndex) => (
                <Motion.span
                  className="hero__letter"
                  key={`${character}-${characterIndex}`}
                  initial={{ opacity: 0, y: "70%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.72,
                    delay:
                      0.12 + (wordIndex * 7 + characterIndex) * 0.03,
                    ease,
                  }}
                >
                  {character}
                </Motion.span>
              ))}
            </span>
          ))}
        </h1>

        <Motion.div
          className="hero__footer"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease }}
        >
          <div className="hero__intro">
            <p>{content.title}</p>
            <h2>{content.tagline}</h2>
          </div>
          <div className="hero__actions">
            <Button href="#work">View my work</Button>
            <Button href="#contact" variant="ghost">
              Let&apos;s talk
            </Button>
          </div>
          <div className="hero__index" aria-label="Featured project count">
            <span>Curated index</span>
            <strong>0{featuredCount}</strong>
            <small>Featured projects</small>
          </div>
        </Motion.div>
      </div>

      <a className="hero__scroll" href="#work" aria-label="Scroll to work">
        <ArrowDown size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
