import { motion as Motion } from "framer-motion";
import { Download, MapPin } from "lucide-react";
import { content } from "../../data/content";
import { Button } from "../ui/Button";

const ease = [0.22, 1, 0.36, 1];

export function About() {
  return (
    <Motion.section
      id="about"
      className="section about"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="shell about__grid">
        <Motion.div
          className="about__portrait-wrap"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="about__portrait-index">02 / ABOUT</div>
          <img
            className="about__portrait"
            src={content.portraitUrl}
            alt={`Portrait of ${content.name}`}
          />
          <span className="about__portrait-caption">
            Independent multidisciplinary designer
          </span>
        </Motion.div>

        <div className="about__content">
          <span className="eyebrow">A little about me</span>
          <h2>
            Design with <em>reason.</em>
            <br />
            Made with feeling.
          </h2>
          <div className="about__identity">
            <div>
              <strong>{content.name}</strong>
              <span>{content.title}</span>
            </div>
            <p>
              <MapPin size={16} aria-hidden="true" />
              {content.location}
            </p>
          </div>
          <p className="about__bio">{content.longBio}</p>

          <div className="about__tools">
            <span className="eyebrow">Tools of the trade</span>
            <div className="tools-grid">
              {content.tools.map((tool, index) => (
                <Motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                >
                  <img src={tool.icon} alt="" aria-hidden="true" />
                  <span>{tool.name}</span>
                </Motion.div>
              ))}
            </div>
          </div>

          <Button
            href={content.resumeUrl}
            target="_blank"
            rel="noreferrer"
            icon={false}
            variant="outline"
          >
            Download résumé <Download size={17} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Motion.section>
  );
}
