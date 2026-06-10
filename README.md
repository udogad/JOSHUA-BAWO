# Oburoh Joshua Bawo — Designer Portfolio

A fully static React portfolio built with Vite, Tailwind CSS, Framer Motion, Lenis, and Netlify Forms. There is no database, backend, CMS, or authentication.

## Run Locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

The deploy-ready output is written to `dist/`. Connect the repository to Netlify and use the included build settings.

## Update Portfolio Content

All editable portfolio text and project entries live in:

- `src/data/projects.js`
- `src/data/content.js`

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

### 🖼 Cover Image Tips

- **Best size:** 1200 × 800px (landscape) or 800 × 800px (square)
- **Best format:** `.jpg` for photos, `.webp` for best performance
- **Don't have a clean screenshot?** Open your Behance/Dribbble project,
  press `Cmd+Shift+4` (Mac) or `Win+Shift+S` (Windows) to screenshot the hero area.
- **Prefer linking directly to an online image?** You can also paste any public image
  URL as the `coverImage` value instead of a local file path.

### ✏️ How to Update Your Bio, Services, or Testimonials

Open `src/data/content.js` and edit any field directly.
Save, commit, push — Netlify rebuilds. Done.

## Netlify Form

The contact form is named `contact`. After the first deploy, enable form detection in the Netlify project if it is not already active. Submissions then appear in the Netlify Forms dashboard.
