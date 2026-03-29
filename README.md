# Enterprise Skills Academy — static training site

Local-first, no backend. Content is driven by **`config/data.json`** (trainer, courses, sessions, curriculum, resources, testimonials, FAQ, footer). The registration form sends submissions to your inbox via [Web3Forms](https://web3forms.com), which works on **GitHub Pages** without your own server.

## Folder structure

```
ed-training-site/
├── index.html          # Main page (Tailwind CDN + sections)
├── js/
│   └── script.js       # Theme, navigation, JSON load, rendering, registration submit
├── config/
│   └── data.json       # Edit all copy, structured content, and registration keys
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

## Customize site content

1. **Trainer** — In `config/data.json`, edit `trainer` (`name`, `bio`, `contact`, `social`, `profileImage`). Set `profileImage` to a path under `assets/` (e.g. `"assets/trainer.jpg"`).
2. **Site & footer** — `site` and `footer` objects.
3. **Courses / schedule / etc.** — Arrays `courses`, `sessions`, `curriculum`, `resources`, `testimonials`, `faq`.

---

## Receive registration submissions in your email

The **Register** section submits through **Web3Forms**. Messages are delivered to the **email address you register** when you create your Web3Forms access key.

### Step 1: Create a Web3Forms access key

1. Open **[https://web3forms.com](https://web3forms.com)**.
2. Enter the **email address where you want to receive** registration messages (your main inbox).
3. Complete their sign-up flow and copy the **Access Key** they give you (a long string).

### Step 2: Put the key and your email in `config/data.json`

Open `config/data.json` and find the `registration` object. Update it like this (use your real values):

```json
"registration": {
  "notifyEmail": "you@yourdomain.com",
  "web3formsAccessKey": "paste-your-access-key-here"
}
```

- **`web3formsAccessKey`** — Required. Must be the real key from Web3Forms. While it is still the placeholder `YOUR_WEB3FORMS_ACCESS_KEY`, the site **will not send** anything and will show a setup message instead.
- **`notifyEmail`** — For your own records; it is also included in the body of the email you receive so you can confirm which address you configured in JSON. **Delivery always goes to the email tied to your Web3Forms key**, so keep that Web3Forms email aligned with the inbox you want.

### Step 3: Test the form

1. Run the site over HTTP (see **Run locally** above); do not rely on `file://` for a full test of `fetch`.
2. Open the **Register** section, fill the form, and click **Submit interest**.
3. You should see the green success message and receive an email shortly. If not, check spam and Web3Forms dashboard for errors.

### Step 4 (optional): Restrict submissions to your live site

In the Web3Forms dashboard, enable **domain / referrer restrictions** and add your GitHub Pages URL (for example `https://YOUR_USER.github.io/YOUR_REPO/`). That reduces abuse from copies of your key used on other sites.

### Security note

The access key is stored in public JSON and is visible to anyone who can load your site—this is normal for static contact forms. Use Web3Forms limits and domain restrictions; do not put SMTP passwords or unrelated API secrets in `data.json`.

---

## Publish to GitHub Pages

### A. Put the project on GitHub

1. **Create a new repository** on GitHub (e.g. `static-training-site`). You can start empty or with a README; if GitHub already has commits you do not have locally, see **Sync troubles** below.

2. In a terminal, from your project folder:

   ```bash
   cd ed-training-site
   git init
   git add .
   git commit -m "Initial commit: static training site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
   git push -u origin main
   ```

   Replace `YOUR_USER` and `YOUR_REPO` with your GitHub username and repository name.

3. If the remote already exists and you only need to push updates after editing files:

   ```bash
   git add .
   git commit -m "Describe your change"
   git push origin main
   ```

### B. Enable GitHub Pages

1. On GitHub, open your repository.
2. Go to **Settings → Pages** (left sidebar).
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **`main`** and folder **`/ (root)`**, then click **Save**.
5. Wait one or two minutes. Refresh the Pages section; GitHub shows your **live URL**.

**URLs:**

- **Project repository** (most common): `https://YOUR_USER.github.io/YOUR_REPO/`
- **User site** (only if the repo is named `YOUR_USER.github.io`): `https://YOUR_USER.github.io/`

This project uses **relative** paths (`config/data.json`, `js/script.js`), so it works on a project URL, a user site, or a **custom domain** without changing paths.

### C. After you change content or registration settings

1. Edit `config/data.json` (or other files) locally.
2. Commit and push to `main`:

   ```bash
   git add .
   git commit -m "Update site content / registration"
   git push origin main
   ```

3. GitHub Pages will redeploy automatically. Hard-refresh the live site (or wait a minute) if you do not see changes.

### Sync troubles

- **`Updates were rejected` / branch behind remote:** The remote has commits you do not have (for example you added a README on GitHub). Integrate first, then push:

  ```bash
  git pull origin main --rebase
  git push origin main
  ```

  If Git reports **unrelated histories**, try once:

  ```bash
  git pull origin main --allow-unrelated-histories
  ```

  Resolve any conflicts, commit, then `git push origin main`.

- **Only use `git push --force`** if you intend to **overwrite** the remote branch and discard its unique commits. Prefer `git pull` + merge/rebase for normal work.

---

## Future LMS

Add API endpoints, auth, and progress by replacing `loadConfig()` with authenticated fetches while keeping the same JSON shape (or a superset) server-side.
