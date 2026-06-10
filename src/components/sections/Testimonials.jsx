import { content } from "../../data/content";

function TestimonialCard({ testimonial }) {
  return (
    <article className="testimonial-card">
      <span className="testimonial-card__quote" aria-hidden="true">
        “
      </span>
      <blockquote>{testimonial.text}</blockquote>
      <footer>
        <strong>{testimonial.clientName}</strong>
        <span>
          {testimonial.role}, {testimonial.company}
        </span>
      </footer>
    </article>
  );
}

export function Testimonials() {
  const repeated = [...content.testimonials, ...content.testimonials];

  return (
    <section
      id="testimonials"
      className="testimonials"
      aria-label="Client testimonials"
    >
      <div className="testimonials__marquee">
        {repeated.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </section>
  );
}
