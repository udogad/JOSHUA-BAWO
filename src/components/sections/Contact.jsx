import { motion as Motion } from "framer-motion";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { useState } from "react";
import { content } from "../../data/content";
import { SocialLinks } from "../layout/Footer";

function encode(data) {
  return new URLSearchParams(data).toString();
}

export function Contact() {
  const [status, setStatus] = useState("idle");

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(formData),
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Motion.section
      id="contact"
      className="section contact"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="shell">
        <span className="eyebrow">04 · Start a conversation</span>
        <h2>
          Let&apos;s Build
          <br />
          <em>Something.</em>
        </h2>

        <div className="contact__grid">
          <div className="contact__info">
            <p>
              Have a project in mind or need a fresh design perspective? Tell me
              what you&apos;re building.
            </p>
            <a className="contact__email" href={`mailto:${content.email}`}>
              {content.email}
              <ArrowUpRight size={24} aria-hidden="true" />
            </a>
            <div className="contact__details">
              <span>
                <MapPin size={17} aria-hidden="true" />
                {content.location}
              </span>
              <span>
                <Clock3 size={17} aria-hidden="true" />
                {content.responseNote}
              </span>
            </div>
            <SocialLinks label="Contact social links" />
          </div>

          <form
            className="contact-form"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={submitForm}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="sr-only">
              <label>
                Don&apos;t fill this out if you&apos;re human:
                <input type="hidden" name="bot-field" />
              </label>
            </p>
            <div className="field-row">
              <label>
                <span>Name</span>
                <input name="name" type="text" placeholder="Your name" required />
              </label>
              <label>
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                />
              </label>
            </div>
            <label>
              <span>Subject</span>
              <select name="subject" defaultValue={content.contactSubjects[0]}>
                {content.contactSubjects.map((subject) => (
                  <option key={subject}>{subject}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Message</span>
              <textarea
                name="message"
                rows="5"
                placeholder="A little about your project, timeline, and goals..."
                required
              />
            </label>
            <button
              className="contact-form__submit"
              type="submit"
              disabled={status === "submitting"}
            >
              <span>
                {status === "submitting" ? "Sending..." : "Send inquiry"}
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </button>
            <div className="contact-form__status" aria-live="polite">
              {status === "success" && (
                <p className="is-success">Thanks! I&apos;ll be in touch soon.</p>
              )}
              {status === "error" && (
                <p className="is-error">
                  The form could not send. Email me directly at {content.email}.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </Motion.section>
  );
}
