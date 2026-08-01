import {
  Facebook,
  Instagram,
  Linkedin,
  Music2,
} from "lucide-react";
import { content } from "../../data/content";

const socialIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Music2,
};

const socialLabels = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
};

export function SocialLinks({ label = "Social links" }) {
  return (
    <div className="social-links" aria-label={label}>
      {Object.entries(content.social)
        .filter(([, url]) => Boolean(url))
        .map(([network, url]) => {
          const Icon = socialIcons[network];
          if (!Icon) return null;

          const name = socialLabels[network] ?? network;
          return (
            <a
              key={network}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              title={name}
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
          <span className="eyebrow">Independent designer · {content.location}</span>
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
