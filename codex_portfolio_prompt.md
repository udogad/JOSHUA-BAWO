# Codex Build Prompt — Designer Portfolio (Static, No Database, Netlify)

## Project Summary

Build a **beautiful, fully static single-page portfolio website** for a professional
Graphic Designer and Product Designer. The site has zero backend, zero database, and
zero server. It deploys entirely free on Netlify.

All portfolio content (projects, bio, services, testimonials) is stored in plain JSON
files inside the project. To add or update work, the designer edits a JSON file,
pushes to GitHub, and Netlify rebuilds the site automatically in under a minute.

---

## Hard Constraints

- **No database.** No Firebase, no Supabase, no SQLite, nothing.
- **No backend server.** No API routes, no Express, no serverless functions.
- **No CMS.** No Contentful, no Sanity, no Decap.
- **No authentication.** No login, no admin panel.
- All content lives in JSON files inside `/src/data/`. This is the single source of truth.
- Deploys to **Netlify free tier** as a fully static site.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Smooth Scroll | Lenis |
| Routing | React Router v6 (for 404 only) |
| Icons | Lucide React |
| Fonts | Google Fonts (Playfair Display + Inter) |
| Hosting | Netlify (static, free) |

---

## Data Files (The "Database" Replacement)

All content is in `/src/data/`. These are regular JavaScript/JSON files the designer
edits to update the site.

### `/src/data/projects.js`

```js
export const projects = [
  {
    id: "1",
    url: "https://www.behance.net/your-project-link",
    title: "Brand Identity — Luxe Coffee Co.",
    description: "Full brand identity design including logo, colour palette, typography system and packaging for a premium Lagos coffee brand.",
    category: "Branding",          // "Graphic Design" | "Product Design" | "Branding" | "UI/UX" | "Print" | "Motion"
    tags: ["Logo", "Packaging", "Typography"],
    year: 2024,
    clientName: "Luxe Coffee Co.",
    coverImage: "/images/projects/luxe-coffee.jpg",  // local image in /public/images/projects/
    featured: true,                // true = appears in homepage hero section
    order: 1,                      // lower number = displayed first
  },
  {
    id: "2",
    url: "https://dribbble.com/shots/your-shot",
    title: "Mobile App UI — FinTrack",
    description: "End-to-end UI/UX design for a personal finance tracking mobile app. Covers onboarding, dashboard, and transaction flows.",
    category: "UI/UX",
    tags: ["Mobile", "Figma", "UI Design"],
    year: 2024,
    clientName: "FinTrack",
    coverImage: "/images/projects/fintrack.jpg",
    featured: true,
    order: 2,
  },
  // Add more projects following the same structure
];
```

### `/src/data/content.js`

```js
export const content = {
  // --- PERSONAL INFO ---
  name: "Your Name",
  title: "Graphic Designer & Product Designer",
  tagline: "I design brands and products people remember.",
  location: "Lagos, Nigeria",
  email: "hello@yourname.com",
  resumeUrl: "/resume.pdf",         // place resume.pdf in /public/
  portraitUrl: "/images/portrait.jpg", // place portrait in /public/images/

  // --- SOCIAL LINKS (leave empty string "" to hide) ---
  social: {
    behance: "https://behance.net/yourprofile",
    dribbble: "https://dribbble.com/yourprofile",
    linkedin: "https://linkedin.com/in/yourprofile",
    instagram: "https://instagram.com/yourhandle",
    twitter: "",
  },

  // --- ABOUT ---
  shortBio: "Lagos-based designer with 5+ years crafting brands and digital products.",
  longBio: "I'm a multidisciplinary designer specialising in brand identity and product design. I help startups and established businesses communicate who they are — through thoughtful visuals and seamless digital experiences. Every project starts with deep listening and ends with work that means something.",
  tools: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "After Effects", "Webflow"],

  // --- SERVICES ---
  services: [
    {
      icon: "Layers",   // Lucide icon name
      name: "Brand Identity",
      description: "Logo design, colour systems, typography, brand guidelines, and everything needed to make your brand unforgettable.",
    },
    {
      icon: "Monitor",
      name: "UI/UX Design",
      description: "User research, wireframes, high-fidelity prototypes, and design systems for web and mobile products.",
    },
    {
      icon: "FileText",
      name: "Print & Packaging",
      description: "Brochures, posters, packaging design, and print-ready artwork with precision and craft.",
    },
    {
      icon: "Play",
      name: "Motion & Social",
      description: "Animated brand assets, social media content, and motion graphics for digital platforms.",
    },
  ],

  // --- TESTIMONIALS ---
  testimonials: [
    {
      id: "1",
      text: "Working with this designer transformed how our brand is perceived. The attention to detail was exceptional.",
      clientName: "Amaka Osei",
      role: "CEO",
      company: "Luxe Coffee Co.",
    },
    {
      id: "2",
      text: "Delivered beyond our expectations. The UI work was clean, intuitive, and exactly what our users needed.",
      clientName: "Tunde Adewale",
      role: "Product Manager",
      company: "FinTrack",
    },
    {
      id: "3",
      text: "Professional, fast, and incredibly talented. Our packaging now stands out on every shelf.",
      clientName: "Chisom Nwosu",
      role: "Founder",
      company: "Nwosu Organics",
    },
  ],
};
```

> **These two files are everything.** The designer never touches any other file to update content.

---

## Public Folder Structure

```
/public/
├── images/
│   ├── portrait.jpg          ← Designer's portrait photo
│   └── projects/
│       ├── project-1.jpg     ← Cover images for each project
│       ├── project-2.jpg
│       └── ...
└── resume.pdf                ← Downloadable CV
```

All project cover images go in `/public/images/projects/`. Reference them in
`projects.js` as `"/images/projects/filename.jpg"`.

---

## Site Layout — Single Scrolling Page

The entire public portfolio is **one page**. The navbar links use smooth scroll to
jump between sections. There are no separate routes except a custom 404 page.

### Navbar (Fixed, top)
- Left: designer name (from `content.name`)
- Right: Work · About · Services · Contact (smooth scroll anchors)
- Dark/Light mode toggle — saves preference to `localStorage`
- Hides on scroll down, reappears on scroll up (Framer Motion)
- Mobile: hamburger → full-screen menu overlay

---

### Section 1 — Hero (`#hero`)
- Full viewport height (`100dvh`)
- **Staggered letter animation** on the designer's name (each letter fades + slides up
  on load, 30ms delay between letters, Framer Motion)
- Title: "Graphic Designer & Product Designer"
- Tagline (from `content.tagline`)
- Two CTA buttons: **"View My Work"** (scrolls to `#work`) + **"Let's Talk"**
  (scrolls to `#contact`)
- Background: 3–4 slowly drifting gradient orbs (`@keyframes` CSS only, no canvas,
  no heavy libs). Colours: deep indigo, violet, near-black. Blurred with
  `filter: blur(80px)`, low opacity.
- Everything enters staggered on page load

---

### Section 2 — Work (`#work`)
- Section heading: "Selected Work"
- **Filter tabs:** All · Graphic Design · Product Design · Branding · UI/UX · Print · Motion
  - Reads categories from `projects` array
  - Active tab has accent underline/fill
  - Filtering animates with Framer Motion `AnimatePresence` (cards fade and reflow)
- **Masonry grid** (CSS columns: 1 on mobile, 2 on tablet, 3 on desktop)
  - Cards vary in height naturally based on image aspect ratio
  - Not a rigid uniform grid
- **Project card:**
  - Full cover image (`object-fit: cover`, `width: 100%`)
  - Thin category badge bottom-left (always visible)
  - On hover: dark overlay fades in showing title, short description, year,
    and "View Project →" with an arrow icon
  - On mobile: overlay is always visible (no hover state possible)
  - Clicking the card opens `project.url` in a new tab
- Show 9 projects initially; **"Load More"** button appends 6 more (filter from
  the in-memory array, no fetch)
- Projects sorted by `order` ascending (lower number first)

---

### Section 3 — About (`#about`)
- Two columns on desktop (portrait left, text right), stacked on mobile
- Portrait image (from `content.portraitUrl`) — rounded, subtle shadow
- Name, title, location with a pin icon
- Long bio text
- **Tools grid:** icon + label badges for each tool in `content.tools`
  (use simple SVG logos from `/public/images/tools/` — include placeholder SVGs or
  source from Simple Icons CDN)
- Resume download button → opens `content.resumeUrl` in new tab
- Section slides in on scroll (`whileInView`, `once: true`)

---

### Section 4 — Services (`#services`)
- Heading: "What I Do"
- 2-column card grid (1 column mobile)
- Each card: Lucide icon (use `content.services[n].icon` as the component name),
  service name (large), description, subtle border, hover lift effect
- **"My Process"** subsection underneath — 4 numbered horizontal steps:
  1. Discover  2. Strategise  3. Design  4. Deliver
  - Each step has a number, title, one-line description
  - Connected by a horizontal line on desktop

---

### Section 5 — Testimonials (`#testimonials`)
- No section heading — let it flow between Services and Contact
- **Infinite horizontal marquee:** duplicated list of testimonial cards scrolling
  left continuously (`@keyframes marquee` CSS animation, 40s linear infinite)
- Pauses on hover (`animation-play-state: paused`)
- Each card: quote mark, testimonial text, client name, role + company
- Cards have a subtle border and glass/frosted feel (backdrop-filter)

---

### Section 6 — Contact (`#contact`)
- Heading: "Let's Build Something."
- Two columns: info left, form right (stacked on mobile)
- **Left column:**
  - Email address (clickable `mailto:`)
  - Social icon links — render only the ones with non-empty URLs in `content.social`
  - Location
  - "I typically respond within 24–48 hours"
- **Right column — Contact Form:**
  - Fields: Name, Email, Subject (select: Project Inquiry / General / Collaboration),
    Message (textarea)
  - Use **Netlify Forms** — add `data-netlify="true"` and `method="POST"` to the form
    element, plus `<input type="hidden" name="form-name" value="contact" />`
  - No backend required. Netlify captures submissions and emails them for free.
  - On submit: show inline success message ("Thanks! I'll be in touch soon.")
  - Honeypot field for spam: `<input type="hidden" name="bot-field" />`

---

### Footer
- Designer name + tagline
- Social icon links (same as contact section)
- Copyright: `© {currentYear} {content.name}. All rights reserved.`
- "Back to top" button (bottom right, appears after scrolling 400px)

---

## Design System

### Visual Aesthetic
**Dark mode default.** Premium, editorial, expressive — like a high-end creative
studio website. Not a generic template. Make type do heavy visual lifting.

### Colour Palette
| Token | Dark Mode | Light Mode |
|---|---|---|
| Background | `#0A0A0A` | `#F7F6F2` |
| Surface (cards) | `#141414` | `#FFFFFF` |
| Text primary | `#EFEFEA` | `#0A0A0A` |
| Text muted | `#888884` | `#555550` |
| Accent | `#6366F1` (indigo) | `#6366F1` |
| Border | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` |

Use CSS custom properties (`--color-bg`, `--color-text`, etc.) toggled via a
`data-theme` attribute on `<html>`. Tailwind config should reference these variables.

### Typography
- **Display / H1–H2:** Playfair Display Bold — large, confident, editorial
- **Body / UI:** Inter — clean, highly legible
- Hero name: `clamp(4rem, 9vw, 9rem)`, letter-spacing `-0.03em`
- Section headings: `clamp(2.5rem, 5vw, 5rem)`
- Body: `1rem / 1.7` line height

### Special Effects

**Custom cursor** (desktop only):
- Small filled circle `14px` that follows the mouse with `~10px` lag (lerp via
  `requestAnimationFrame`, not a library)
- On hover over any link, button, or card: expands to `44px` unfilled ring,
  colour changes to accent
- Implemented as a global `<CustomCursor />` component

**Grain texture overlay:**
- `<GrainOverlay />` component renders a `<canvas>` or SVG filter fixed over the
  entire page at `pointer-events: none`
- Use SVG `feTurbulence` filter at `4% opacity` max
- Gives premium analogue/print feel

**Framer Motion — scroll animations:**
- Every section enters with `opacity: 0, y: 48` → `opacity: 1, y: 0`
- `viewport={{ once: true, amount: 0.15 }}`
- Stagger children where applicable (service cards, tools grid, filter tabs)
- Duration: `0.6s`, easing: `[0.22, 1, 0.36, 1]` (ease-out cubic)

**Lenis smooth scroll:**
- Initialise globally in `App.jsx`
- Sync Lenis RAF loop with Framer Motion's `useScroll`
- Only on desktop (disable on touch devices)

---

## Netlify Configuration

`/netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

`/public/_redirects` (backup):
```
/* /index.html 200
```

No build plugins, no functions, no edge handlers needed.

---

## File Structure

```
/
├── public/
│   ├── images/
│   │   ├── portrait.jpg
│   │   ├── projects/          ← Project cover images go here
│   │   └── tools/             ← Tool logo SVGs (Figma, Illustrator, etc.)
│   └── resume.pdf
├── src/
│   ├── data/
│   │   ├── projects.js        ← ALL project entries live here
│   │   └── content.js         ← Bio, services, testimonials, social links
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CustomCursor.jsx
│   │   │   └── GrainOverlay.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── Work.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Contact.jsx
│   │   ├── portfolio/
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectGrid.jsx
│   │   │   └── FilterTabs.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Badge.jsx
│   │       └── BackToTop.jsx
│   ├── hooks/
│   │   └── useLenis.js
│   ├── styles/
│   │   └── index.css          ← Tailwind + CSS vars + grain + marquee keyframes
│   ├── App.jsx
│   └── main.jsx
├── netlify.toml
├── public/_redirects
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## README — How to Add & Display Your Work

The README must include this section verbatim, written in plain friendly language
(not technical jargon):

---

### ➕ How to Add a New Project

**Step 1 — Get a cover image for your project**
Take a screenshot of your work (from Behance, Dribbble, Notion, or wherever it lives).
Save it as a `.jpg` or `.webp` file. Name it something clear like `brand-luxe-coffee.jpg`.
Put it in the `public/images/projects/` folder.

**Step 2 — Open `src/data/projects.js`**
Copy one of the existing project entries (everything from `{` to `},`) and paste it
at the bottom of the list.

**Step 3 — Fill in your details**
Update each field:
- `url` — The link to your work (Behance page, Dribbble shot, live site, Notion doc, etc.)
- `title` — The project name (e.g. "Brand Identity — Luxe Coffee Co.")
- `description` — 1–2 sentences describing the work
- `category` — Pick one: `"Graphic Design"`, `"Product Design"`, `"Branding"`,
  `"UI/UX"`, `"Print"`, or `"Motion"`
- `tags` — Short keywords: `["Logo", "Packaging"]`
- `year` — The year you did it
- `clientName` — Client or project name (optional, can be `""`)
- `coverImage` — The path to your image: `"/images/projects/your-filename.jpg"`
- `featured` — Set to `true` if you want it in the top hero section, `false` otherwise
- `order` — A number. Lower numbers appear first. Use `1`, `2`, `3`... to control order.

**Step 4 — Save, commit, and push to GitHub**

In your terminal:
```bash
git add .
git commit -m "Add new project: Your Project Name"
git push
```

Netlify will automatically detect the push and rebuild your site.
**Your work will be live in about 60 seconds.** ✅

---

### 🖼 Cover Image Tips

- **Best size:** 1200 × 800px (landscape) or 800 × 800px (square)
- **Best format:** `.jpg` for photos, `.webp` for best performance
- **Don't have a clean screenshot?** Open your Behance/Dribbble project,
  press `Cmd+Shift+4` (Mac) or `Win+Shift+S` (Windows) to screenshot the hero area.
- **Prefer linking directly to an online image?** You can also paste any public image
  URL as the `coverImage` value instead of a local file path.

---

### ✏️ How to Update Your Bio, Services, or Testimonials

Open `src/data/content.js` and edit any field directly.
Save, commit, push — Netlify rebuilds. Done.

---

## Deliverables Checklist

- [ ] React + Vite project with Tailwind CSS configured and running
- [ ] `src/data/projects.js` with 3 realistic sample projects
- [ ] `src/data/content.js` fully populated with sample/placeholder content
- [ ] All 6 page sections built (Hero, Work, About, Services, Testimonials, Contact)
- [ ] Masonry project grid with working category filter + Load More
- [ ] Project cards with hover overlay, open link in new tab on click
- [ ] Infinite CSS marquee testimonials
- [ ] Netlify contact form (`data-netlify="true"`) — no backend
- [ ] Custom cursor (desktop), grain overlay, dark/light mode toggle
- [ ] Framer Motion scroll-triggered animations on all sections
- [ ] Lenis smooth scroll (desktop only)
- [ ] Navbar hides on scroll down, reveals on scroll up
- [ ] Fully responsive (mobile-first, tested at 375px, 768px, 1280px)
- [ ] Custom 404 page (on-brand)
- [ ] `netlify.toml` + `_redirects` for SPA routing
- [ ] `vite.config.js` properly configured
- [ ] `/public/images/projects/` folder with placeholder images
- [ ] README with plain-English guide on how to add work and update content

---

*Build this as a complete, production-ready codebase. Every feature must be fully
implemented and functional. No TODOs, no placeholder logic, no unfinished components.
The two data files (`projects.js` and `content.js`) must be the ONLY files a
non-developer needs to ever touch after setup.*
