# Enterprise Skills Academy — static training site

Local-first, no backend. Content is driven by **`config/data.json`** (trainer, courses, sessions, curriculum, resources, testimonials, FAQ, footer).

## Folder structure

```
ed-training-site/
├── index.html          # Main page (Tailwind CDN + sections)
├── js/
│   └── script.js       # Theme, navigation, JSON load, rendering, form
├── config/
│   └── data.json       # Edit all copy and structured content here
├── assets/
│   └── trainer.jpg     # Optional: add your profile image (path in JSON)
└── README.md
```

## Run locally

Browsers often block `fetch()` for `file://` URLs. Use a short-lived local HTTP server from the project directory:

```bash
cd ed-training-site
python3 -m http.server 8080
```

Open **http://localhost:8080**

Alternatives:

- `npx --yes serve .` (then use the URL printed in the terminal)
- VS Code / Cursor “Live Server” on `index.html`

If you open `index.html` directly, the page still works using built-in fallback data (keep `js/script.js` `FALLBACK_DATA` in sync with `config/data.json` if you rely on that path).

## Customize

1. **Trainer** — In `config/data.json`, edit `trainer` (`name`, `bio`, `contact`, `social`, `profileImage`). Set `profileImage` to a path under `assets/` (e.g. `"assets/trainer.jpg"`).
2. **Site & footer** — `site` and `footer` objects.
3. **Courses / schedule / etc.** — Arrays `courses`, `sessions`, `curriculum`, `resources`, `testimonials`, `faq`.

## Registration form

Submits are **frontend-only**: data is logged to the **browser developer console**. Replace the handler in `js/script.js` (`initRegistrationForm`) with `fetch()` to your API when you add a backend.

**GitHub Pages** serves only static files—there is no server on GitHub to send email. To get registrations in your inbox, use a third-party form endpoint (e.g. [Formspree](https://formspree.io), [Getform](https://getform.io)) and point the form or `fetch()` URL there; set the notification email in that service’s dashboard.

## Host on GitHub (and GitHub Pages)

1. **Create a repository** on GitHub (empty, no README if you already have this project locally).

2. **From this folder**, connect and push:

   ```bash
   cd ed-training-site
   git init
   git add .
   git commit -m "Initial commit: static training site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
   git push -u origin main
   ```

   Use your real GitHub username and repository name in the remote URL.

3. **Turn on GitHub Pages**: Repository **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **`main`**, folder **`/ (root)`**, then save. After a minute or two the site will be at:

   - **Project site**: `https://YOUR_USER.github.io/YOUR_REPO/`
   - **User site** (only if the repo is named `YOUR_USER.github.io`): `https://YOUR_USER.github.io/`

4. **Paths**: This site uses relative URLs (`config/data.json`, `js/script.js`), so it works on both a project URL and a custom domain without extra configuration.

## Future LMS

Add API endpoints, auth, and progress by replacing `loadConfig()` with authenticated fetches while keeping the same JSON shape (or a superset) server-side.
