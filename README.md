# Rishank Kesarwani Portfolio

Modern portfolio website built with Next.js App Router, TypeScript, and Tailwind CSS.

## Step 1: Initialize The Project

```bash
npx create-next-app@latest portfolio --typescript --eslint --app --src-dir=false --tailwind
cd portfolio
npm run dev
```

Recommended folder structure:

```txt
app/
  globals.css
  layout.tsx
  page.tsx
components/
  About.tsx
  ContactForm.tsx
  Hero.tsx
  Navbar.tsx
  Projects.tsx
  Skills.tsx
data/
  portfolio.ts
public/
tailwind.config.js
postcss.config.mjs
next.config.ts
```

## Step 2: Portfolio Sections

This project includes:

- Responsive navigation bar with a mobile hamburger menu
- Hero section with headline, bio, and calls to action
- About Me section based on resume experience
- Projects grid mapped from `data/portfolio.ts`
- Skills section
- Dark-mode friendly styling using Tailwind variants
- Smooth scrolling from `app/globals.css`

Update project links in `data/portfolio.ts` with your real GitHub and live URLs.

## Step 3: Contact Form With Formspree

This project uses the React integration for Formspree:

```bash
npm install @formspree/react
```

The contact form is wired to this Formspree form ID:

```tsx
const [state, handleSubmit] = useForm("mrpzzonj");
```

To test it locally, run the site, submit the contact form, then confirm the message appears in your Formspree dashboard or arrives by email.

## Step 4: Git And GitHub Commands

Initialize and push to a new GitHub repository:

```bash
git init
git add .
git commit -m "Initial portfolio website"
gh repo create portfolio --public --source=. --remote=origin --push
git branch -M main
git push -u origin main
```

Link to an existing repository instead:

```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

If the repository already has commits, use:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git branch -M main
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Step 5: Deploy Free On Vercel

1. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. Select `Add New > Project`.
3. Import your portfolio GitHub repository.
4. Keep the defaults:
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: leave default
5. Click `Deploy`.

After deployment, Vercel automatically creates a production deployment every time you push to the `main` branch. Pull requests get preview deployments so you can test changes before merging.

No Vercel environment variable is required for the current Formspree setup because the public form ID is embedded in the React form component.

## Local Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```
