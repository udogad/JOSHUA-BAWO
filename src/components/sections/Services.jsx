import { motion as Motion } from "framer-motion";
import { FileText, Layers, Monitor, Play } from "lucide-react";
import { content } from "../../data/content";

const iconMap = { FileText, Layers, Monitor, Play };
const ease = [0.22, 1, 0.36, 1];

export function Services() {
  return (
    <Motion.section
      id="services"
      className="section services"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="shell">
        <div className="section-heading section-heading--split">
          <div>
            <span className="eyebrow">03 · Capabilities</span>
            <h2>What I Do</h2>
          </div>
          <p>
            From first idea to final system, I connect strategy and craft across
            brand and product.
          </p>
        </div>

        <div className="services__grid">
          {content.services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Layers;
            return (
              <Motion.article
                key={service.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08, ease }}
              >
                <div className="services__card-top">
                  <span>0{index + 1}</span>
                  <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </Motion.article>
            );
          })}
        </div>

        <div className="process">
          <div className="process__heading">
            <span className="eyebrow">How we get there</span>
            <h3>My Process</h3>
          </div>
          <div className="process__steps">
            {content.process.map((step, index) => (
              <Motion.div
                key={step.title}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <span className="process__number">0{index + 1}</span>
                <i aria-hidden="true" />
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </Motion.section>
  );
}
