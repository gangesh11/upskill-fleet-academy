# Enterprise Skills Academy — static training site

Local-first, no backend. Content is driven by **`config/data.json`** (`trainers`, courses, sessions, curriculum, resources, testimonials, FAQ, footer). The registration form sends submissions to your inbox via [Web3Forms](https://web3forms.com), which works on **GitHub Pages** without your own server.

## Folder structure

```
ed-training-site/
├── index.html          # Main page (Tailwind CDN + sections)
├── js/
│   └── script.js       # Theme, navigation, JSON load, rendering, registration submit
├── config/
│   └── data.json       # Edit all copy, structured content, and registration keys
├── assets/
│   ├── favicon.svg     # Tab / bookmark icon (referenced from index.html)
│   ├── trainer.jpg     # Optional: first trainer photo (`trainers[0].profileImage`)
│   └── trainer2.jpg    # Optional: second trainer photo (`trainers[1].profileImage`)
├── LICENSE             # Copyright and usage terms
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

1. **Trainers** — In `config/data.json`, edit the **`trainers`** array. Each entry supports the same fields (`name`, `title`, `bio`, `contact`, `social`, `credentials`, `profileImage`). Add or remove array items for more/fewer profiles. Legacy single-object **`trainer`** is still read if **`trainers`** is omitted.
2. **Site & footer** — `site` and `footer` objects. Optional `site` fields: **`seoDescription`** (search/social description), **`audience`** (“who it’s for” line under the hero), **`ogImage`** (path for Open Graph preview image; defaults to `assets/favicon.svg`).
3. **Courses / schedule / etc.** — Arrays `courses`, `sessions`, `curriculum`, `resources`, `testimonials`, `faq`.

---

## Receive registration submissions in your email

The **Register** section on the site sends data to **[Web3Forms](https://web3forms.com)**. Web3Forms forwards each submission to the **inbox you used when you created the access key**. Your job is to (1) create that key with the right email, and (2) paste the key into this repo so the site can call their API.

### Where to put your email address and `web3formsAccessKey`

**File (in this project):** `config/data.json`  
**Place in the file:** Immediately after the `"site": { ... }` block, there is a **`registration`** object. Edit only these two fields:

| Field | What to put |
|--------|----------------|
| **`notifyEmail`** | The email address you want on file for your own reference (for example `you@yourdomain.com`). It is copied into the body of notification emails so you can see which address you configured. **It does not replace Web3Forms’ delivery rules.** |
| **`web3formsAccessKey`** | The **Access Key** string from Web3Forms (see below). **This is required** for the form to send anything. |

**Example** (replace with your real values; keep JSON commas and quotes valid):

```json
"registration": {
  "notifyEmail": "you@yourdomain.com",
  "web3formsAccessKey": "paste-your-web3forms-access-key-here"
}
```

**Important:**

- **`web3formsAccessKey`** — Until this is a real key (not the placeholder `YOUR_WEB3FORMS_ACCESS_KEY`), the site **will not submit** to Web3Forms and will show a setup error instead.
- **Which inbox actually receives mail?** The address you enter on **Web3Forms** when you generate the key. Use the **same** address as `notifyEmail` if you want everything aligned.
- After you change `config/data.json`, **commit and push** (if the site is on GitHub Pages) so the live site loads the new key.

### Step 1: Create a Web3Forms access key (ties delivery to your email)

1. Open **[https://web3forms.com](https://web3forms.com)**.
2. Enter the **email address where registration messages should arrive** (your main inbox).
3. Complete sign-up and copy the **Access Key**.
4. Paste that key into **`config/data.json`** → **`registration.web3formsAccessKey`**, as described above.

### Step 2: Set `notifyEmail` in `config/data.json`

In the same **`registration`** object, set **`notifyEmail`** to that same email (or any note you prefer). Save the file.

### Step 3: Test the form

1. Run the site over HTTP (see **Run locally** above); do not rely on `file://` for a full test of `fetch`.
2. Open the **Register** section, fill the form, and click **Submit interest**.
3. You should see the green success message and receive an email shortly. If not, check spam and the Web3Forms dashboard for errors.

### Step 4 (optional): Restrict submissions to your live site

In the Web3Forms dashboard, enable **domain / referrer restrictions** and add your live URL(s), for example:

- `https://YOUR_USER.github.io/YOUR_REPO/`
- or your **custom domain** (e.g. `https://www.yourdomain.com`) after DNS is working

That reduces abuse if someone reuses your public key elsewhere.

### Security note

The access key lives in public JSON and is visible to anyone who can load your site—this is normal for static contact forms. Use Web3Forms limits and domain restrictions; do not put SMTP passwords or unrelated API secrets in `data.json`.

---

## Publish to GitHub Pages

If you prefer **Netlify, Cloudflare Pages, Vercel, S3, Firebase**, or traditional hosting, skip to **[Other ways to publish the site](#other-ways-to-publish-the-site-not-github-pages)** below.

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

This project uses **relative** paths (`config/data.json`, `js/script.js`), so it works on a project URL, a user site, or a **custom domain** without changing those paths.

### C. Use your own custom domain (GitHub Pages)

You can serve this site at a domain you own (for example `www.yourdomain.com` or `yourdomain.com`) instead of only `*.github.io`.

#### 1. Decide apex vs `www`

- **Apex (root):** `yourdomain.com`  
- **Subdomain:** `www.yourdomain.com` (often easier; a single **CNAME** is enough)

You can configure both; GitHub’s docs describe **apex + www** together.

#### 2. Add the domain in the GitHub repository

1. Open the repository on GitHub → **Settings → Pages**.
2. Under **Custom domain**, enter your domain (e.g. `www.yourdomain.com` or `yourdomain.com`) and **Save**.
3. Wait for GitHub to check DNS. Leave **Enforce HTTPS** off until DNS is verified; enable it after the certificate is issued (can take up to a day after DNS propagates).

GitHub may create or update a **`CNAME`** file in the repo root with your custom hostname. Commit that file when you pull or push so your local copy stays in sync.

#### 3. Configure DNS at your registrar (or DNS host)

Values below match GitHub’s documented setup; if GitHub changes them, follow **[Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)**.

**If you use the apex domain (`yourdomain.com`):**

- Create **four `A`** records for `@` (or the bare domain), each pointing to one of:

  `185.199.108.153`  
  `185.199.109.153`  
  `185.199.110.153`  
  `185.199.111.153`

**If you use `www.yourdomain.com`:**

- Create a **`CNAME`** record for `www` pointing to **`<YOUR_GITHUB_USERNAME>.github.io`** (no `https://`, no path). This is correct for both **user** sites (`username.github.io`) and **project** sites (`username.github.io/repo-name`); GitHub routes by the hostname you enter under **Custom domain**. Confirm any extra records (e.g. **AAAA**) in GitHub’s doc if they apply to your setup.

Remove or replace any old **A** or **CNAME** records that pointed the same hostname to a previous host, or verification will fail.

#### 4. Wait for DNS and HTTPS

- DNS propagation can take from minutes to 48 hours.
- When GitHub shows the domain as valid, turn on **Enforce HTTPS** under **Settings → Pages**.

#### 5. Registration / Web3Forms on a custom domain

After the site loads at your custom URL, add that URL to **Web3Forms** domain restrictions (optional but recommended) so only your real site can submit using your key.

### D. After you change content or registration settings

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

## Other ways to publish the site (not GitHub Pages)

This project is a **static** site: `index.html`, `js/`, `config/`, and `assets/` at the **repository root**. There is **no build step**. Any host that can serve those files over **HTTPS** will work, including the registration form (Web3Forms).

**On every host:** After you know your public URL, add it to **Web3Forms** domain restrictions if you use that feature.

### Netlify

- **Git integration:** Sign in at [Netlify](https://www.netlify.com) → **Add new site** → **Import an existing project** → connect GitHub/GitLab/Bitbucket → pick the repo. Set **base directory** empty, **build command** empty, **publish directory** to **`.`** (root).
- **Manual upload:** Drag the project folder onto Netlify Drop, or use the CLI: `npm i -g netlify-cli` then `netlify deploy --prod` from the project root (follow prompts).
- **Custom domain:** **Site settings → Domain management**. Netlify provides DNS instructions (often **CNAME** to `your-site.netlify.app`).

### Cloudflare Pages

- In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**. Select the repo, set **build command** blank (or `exit 0`), **build output directory** to **`/`** or **`.`** as your provider’s UI expects for “root.”
- Custom domains are configured in the Pages project; DNS on Cloudflare is straightforward if the domain is already there.

### Vercel

- [Vercel](https://vercel.com) → **Add New** → **Project** → import the Git repository. Set **Framework Preset** to **Other** (or static). **Root Directory** default; leave **Build Command** empty; **Output Directory** can be left default or set to **`.`** so `index.html` at the repo root is the entry.
- Attach a custom domain under **Project → Settings → Domains**.

### Amazon S3 (+ optional CloudFront)

- Create an **S3** bucket, enable **static website hosting**, upload all site files preserving structure (`index.html` at bucket root, folders `js/`, `config/`, `assets/`).
- For HTTPS and a custom domain, front the bucket with **CloudFront** (or use another CDN). This is more manual but cheap and very scalable.
- See [AWS static website hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html).

### Firebase Hosting

- Install [Firebase CLI](https://firebase.google.com/docs/hosting/quickstart), `firebase init hosting`, set **public directory** to **`.`** (project root) or copy files into `public/` if you prefer that layout—either way the deployed root must contain `index.html`.
- `firebase deploy`. Add a custom domain in the Firebase console.

### Azure Static Web Apps

- In [Azure Portal](https://portal.azure.com), create a **Static Web App**, connect your Git repo. For a repo with no build, configure the workflow so the app’s **output** is the repository root (Azure’s templates often assume a framework; you may need to adjust the GitHub Action to upload the root folder as artifacts—see Microsoft’s docs for “static site, no build”).

### Render, Railway, or similar PaaS

- **Render:** [Static Site](https://render.com/docs/static-sites) → connect repo, **build command** empty, **publish directory** **`.`**.
- **Railway** and similar can serve static files via a minimal static server or their static hosting product if offered; read their current docs for “static site.”

### Any VPS or shared hosting (Nginx, Apache, cPanel)

- Upload the project files so the web root contains `index.html`. Ensure `config/data.json` and `js/script.js` are reachable at `/config/data.json` and `/js/script.js` (default relative paths).

### Quick comparison

| Option | Good if you want |
|--------|------------------|
| **GitHub Pages** | Free, same place as code, simple (see above). |
| **Netlify / Cloudflare Pages / Vercel** | Fast global CDN, easy HTTPS and custom domain, Git auto-deploy. |
| **S3 + CloudFront** | Full AWS control, enterprise patterns. |
| **Firebase / Azure** | Already using that ecosystem. |
| **Traditional host** | You already pay for cPanel or a VPS. |

---

## License

This project is **proprietary**. **All rights reserved** unless you grant permission otherwise.

- Full text: see **[LICENSE](LICENSE)** in the repository root.
- **Copyright © 2026 Gangesh Vats.** Update the name and year in `LICENSE` (and here) if someone else owns the copyright.
- **Public GitHub repository:** others may still **view** or **fork** on GitHub per [GitHub’s Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service); that does **not** grant a broad license to reuse this code for their own products or sites. For explicit open-source terms (for example MIT), you would replace `LICENSE` with a standard open-source license file.

This section is for clarity only and is **not legal advice**.

---

## Future LMS

Add API endpoints, auth, and progress by replacing `loadConfig()` with authenticated fetches while keeping the same JSON shape (or a superset) server-side.
