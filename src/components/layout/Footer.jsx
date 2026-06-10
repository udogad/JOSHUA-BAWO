import {
  BriefcaseBusiness,
  Dribbble,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { content } from "../../data/content";

const socialIcons = {
  behance: BriefcaseBusiness,
  dribbble: Dribbble,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
};

export function SocialLinks({ label = "Social links" }) {
  return (
    <div className="social-links" aria-label={label}>
      {Object.entries(content.social)
        .filter(([, url]) => Boolean(url))
        .map(([network, url]) => {
          const Icon = socialIcons[network];
          return (
            <a
              key={network}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={network}
            >
              <Icon size={18} aria-hidden="true" />
            </a>
          );
        })}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__main">
        <div>
          <span className="eyebrow">Independent designer · Lagos</span>
          <h2>{content.name}</h2>
        </div>
        <p>{content.tagline}</p>
        <SocialLinks label="Footer social links" />
      </div>
      <div className="shell footer__bottom">
        <span>
          © {new Date().getFullYear()} {content.name}. All rights reserved.
        </span>
        <a href="#hero">Back to top ↑</a>
      </div>
    </footer>
  );
}
