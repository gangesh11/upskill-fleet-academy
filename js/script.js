/**
 * Training site — loads config from config/data.json.
 * For file:// opens without a server, falls back to embedded copy (keep in sync when editing JSON only).
 */
(function () {
  'use strict';

  const CONFIG_URL = 'config/data.json';

  /** @type {object} */
  let data = null;

  /** Mirrors config/data.json when fetch is blocked (e.g. file://). Keep in sync when editing JSON. */
  const FALLBACK_DATA = {
    site: {
      title: 'Upskill Fleet Academy',
      heroEyebrow: 'Upskill Fleet Academy',
      heroHeadline: 'Learn AI, Cyber Security & AWS Cloud Through Real-World Training',
      heroSubheading:
        'Practical learning, industry insights, hands-on demonstrations, and career guidance for students and professionals looking to build future-ready skills.',
      heroTags: '',
      heroSupporting: '',
      seoDescription:
        'Upskill Fleet Academy — Real-world AI, Cyber Security & AWS Cloud learning for students and professionals.',
      primaryCta: 'Join Free Masterclass',
      primaryCtaHref: '#masterclasses',
      secondaryCta: 'Join WhatsApp Community',
      secondaryCtaHref: '#community',
      aboutAcademyTitle: 'About Upskill Fleet Academy',
      aboutAcademyBody:
        'Upskill Fleet Academy is a learning initiative focused on helping students and working professionals understand AI, Cyber Security, and AWS Cloud through practical, real-world training.\n\nOur goal is to bridge the gap between academic learning and industry expectations by sharing knowledge gained from years of experience in technology and cybersecurity.',
      aboutTitle: 'Meet your instructor',
      aboutIntro: 'Learn from an experienced practitioner focused on real-world skills—not theory alone.',
      masterclassesTitle: 'Free Masterclasses',
      masterclassesIntro: 'Short, live sessions to explore AI, Cyber Security, and AWS Cloud.',
      domainsTitle: 'Learning Areas',
      domainsIntro: 'Practical topics we cover through masterclasses, demonstrations, and community learning.',
      guestFacultyIntro: '',
    },
    whyJoin: {
      title: 'Why Join?',
      items: [
        'Real-world focused training',
        'Industry-oriented learning',
        'Beginner-friendly sessions',
        'Practical demonstrations',
        'Career guidance and mentorship',
        'Learn at your own pace',
      ],
    },
    learningAreas: [
      { icon: '🤖', name: 'AI & Generative AI', topics: ['AI Fundamentals', 'Prompt Engineering', 'AI Tools for Productivity', 'Practical Use Cases'] },
      { icon: '🔐', name: 'Cyber Security', topics: ['Security Fundamentals', 'Cloud Security Concepts', 'Security Best Practices', 'Industry Trends'] },
      { icon: '☁️', name: 'AWS Cloud', topics: ['Cloud Fundamentals', 'AWS Services Overview', 'Architecture Concepts', 'Security in AWS'] },
    ],
    community: {
      title: 'Join Our Learning Community',
      body: 'Get updates on free masterclasses, learning resources, AI tools, cloud technologies, cybersecurity insights, and career guidance.',
      cta: 'Join WhatsApp Channel',
      whatsappChannelUrl: '',
    },
    youtube: {
      title: 'YouTube Channel (Launching Soon)',
      body: 'Subscribe for practical content on AI, Cyber Security, AWS Cloud, career guidance, and technology trends.',
      cta: 'Subscribe on YouTube',
      channelUrl: '',
    },
    upcomingHighlight: {
      title: 'Upcoming Masterclasses',
      intro: 'June 2026 weekend sessions — live online.',
      registerLabel: 'Register',
      registerHref: '#register',
    },
    finalCta: {
      title: 'Start Learning Today',
      body: 'Join a free masterclass or our WhatsApp community to stay updated on sessions and practical learning content.',
      primaryCta: 'Join Free Masterclass',
      primaryHref: '#masterclasses',
      secondaryCta: 'Join WhatsApp Community',
      secondaryHref: '#community',
    },
    masterclasses: [
      { id: 'mc-ai', badge: 'Free Masterclass', title: 'AI & Generative AI — Getting Started', summary: 'A practical introduction to AI fundamentals and prompt engineering.', topics: ['AI Fundamentals', 'Prompt Engineering'], duration: '1–2 hours', format: 'Live Interactive Session' },
    ],
    bootcamps: [],
    registrationInterests: [
      { id: 'ai-generative', label: 'AI & Generative AI' },
      { id: 'cyber-security', label: 'Cyber Security' },
      { id: 'aws-cloud', label: 'AWS Cloud' },
      { id: 'general', label: 'General interest' },
    ],
    trainers: [
      {
        name: 'Mr. Gangesh Vats',
        title: 'Lead Instructor — AI, Cyber Security & AWS Cloud',
        bio: 'Security Architect and AI Security Professional with 20+ years of experience in cybersecurity, cloud security, and enterprise technology.',
        bioSecondary: 'Having worked across large-scale enterprise environments, I share practical insights that help learners understand how technology and security work in real organizations—not just in textbooks.',
        profileImage: '',
        credentialsLabel: 'Background',
        contact: { email: 'connectupskillfleetacademy@gmail.com', phone: '9999753152', whatsapp: '9999753152' },
        social: { linkedin: 'https://www.linkedin.com/in/gangesh-vats11/' },
        credentials: ['Security architecture', 'Cloud & AI security', 'Enterprise technology'],
      },
    ],
    courses: [],
    sessions: [
      { date: '2026-06-21', topic: 'Free Masterclass — AI & Generative AI', shortLabel: 'AI & Generative AI', sessionType: 'Live', duration: '1–2 hours', mode: 'Online' },
      { date: '2026-06-28', topic: 'Free Masterclass — Cyber Security', shortLabel: 'Cyber Security', sessionType: 'Live', duration: '1–2 hours', mode: 'Online' },
      { date: '2026-07-05', topic: 'Free Masterclass — AWS Cloud', shortLabel: 'AWS Cloud', sessionType: 'Live', duration: '1–2 hours', mode: 'Online' },
    ],
    curriculum: [],
    resources: [],
    testimonials: [],
    faq: [
      { q: 'Who is this for?', a: 'Students and working professionals who want practical, real-world learning in AI, Cyber Security, and AWS Cloud.' },
      { q: 'How do I get started?', a: 'Join a free masterclass, follow our WhatsApp channel, or register your interest on this page.' },
      { q: 'Is there a cost?', a: 'Masterclasses are free to join. We are building a learning community first.' },
    ],
    registration: {
      notifyEmail: 'your-email@example.com',
      web3formsAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
    },
    footer: {
      company: 'Upskill Fleet Academy',
      tagline: 'Learn. Build. Grow.',
      closing: 'Real-world AI, Cyber Security & AWS Cloud learning for students and professionals.',
      address: 'Remote-first · Online learning community',
      copyrightYear: 2026,
    },
  };

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  const NAME_PREFIXES = new Set(['mr', 'mrs', 'ms', 'miss', 'dr', 'prof', 'sir']);

  function initialsFromName(name) {
    if (!name || typeof name !== 'string') return '?';
    const parts = name
      .replace(/\./g, '')
      .split(/\s+/)
      .filter(Boolean)
      .filter((p) => !NAME_PREFIXES.has(p.toLowerCase()));
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return '?';
  }

  function escapeHtml(s) {
    if (s == null) return '';
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso + 'T12:00:00');
      return d.toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return iso;
    }
  }

  function formatDateShort(iso) {
    try {
      const d = new Date(iso + 'T12:00:00');
      return d.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
    } catch {
      return iso;
    }
  }

  function setTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    const btn = $('#theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.querySelector('.theme-icon-light')?.classList.toggle('hidden', !dark);
      btn.querySelector('.theme-icon-dark')?.classList.toggle('hidden', dark);
    }
  }

  function initTheme() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(stored === 'dark' || (!stored && prefersDark));
    $('#theme-toggle')?.addEventListener('click', () => {
      setTheme(!document.documentElement.classList.contains('dark'));
    });
  }

  function renderNav() {
    const year = data.footer?.copyrightYear || new Date().getFullYear();
    $('#nav-brand').textContent = data.site?.title || 'Training';
    $('#footer-copy').textContent = `© ${year} ${data.footer?.company || ''}. All rights reserved.`;
  }

  function siteTaglineLines(site) {
    if (!site || typeof site !== 'object') return [];
    if (Array.isArray(site.taglines)) {
      return site.taglines.map((t) => String(t).trim()).filter(Boolean);
    }
    if (typeof site.tagline === 'string' && site.tagline.trim()) return [site.tagline.trim()];
    return [];
  }

  function renderHero() {
    const site = data.site || {};
    const eyebrow = $('#hero-eyebrow');
    const headline = $('#hero-headline');
    const sub = $('#hero-subheading');
    const tags = $('#hero-tags');
    const supporting = $('#hero-supporting');

    if (headline) {
      headline.textContent =
        (typeof site.heroHeadline === 'string' && site.heroHeadline.trim()) ||
        site.title ||
        'Training';
    }
    if (eyebrow) {
      eyebrow.textContent =
        (typeof site.heroEyebrow === 'string' && site.heroEyebrow.trim()) || 'Professional learning';
    }
    if (sub) {
      const subText =
        (typeof site.heroSubheading === 'string' && site.heroSubheading.trim()) ||
        siteTaglineLines(site)[0] ||
        '';
      sub.textContent = subText;
      sub.classList.toggle('hidden', !subText);
    }
    if (tags) {
      const tagText = (typeof site.heroTags === 'string' && site.heroTags.trim()) || '';
      tags.textContent = tagText;
      tags.classList.toggle('hidden', !tagText);
    }
    if (supporting) {
      const supText = (typeof site.heroSupporting === 'string' && site.heroSupporting.trim()) || '';
      supporting.textContent = supText;
      supporting.classList.toggle('hidden', !supText);
    }

    const legacyTitle = $('#hero-title');
    if (legacyTitle) legacyTitle.textContent = site.title || '';

    const p = $('#hero-primary-cta');
    const s = $('#hero-secondary-cta');
    if (p) {
      p.textContent = site.primaryCta || 'Join Free Masterclass';
      if (site.primaryCtaHref) p.setAttribute('href', site.primaryCtaHref);
    }
    if (s) {
      s.textContent = site.secondaryCta || 'Join WhatsApp Community';
      if (site.secondaryCtaHref) s.setAttribute('href', site.secondaryCtaHref);
    }
  }

  function renderAboutAcademy() {
    const site = data.site || {};
    const titleEl = $('#about-academy-title');
    const bodyEl = $('#about-academy-body');
    if (titleEl && site.aboutAcademyTitle) titleEl.textContent = site.aboutAcademyTitle;
    if (!bodyEl) return;
    const body =
      (typeof site.aboutAcademyBody === 'string' && site.aboutAcademyBody.trim()) || '';
    if (!body) {
      bodyEl.innerHTML = '';
      return;
    }
    bodyEl.innerHTML = body
      .split(/\n\n+/)
      .map((para) => `<p>${escapeHtml(para.trim())}</p>`)
      .join('');
  }

  function whatsappFallbackUrl() {
    const trainers = normalizeTrainers(data);
    const wa = trainers[0]?.contact?.whatsapp;
    const num = typeof wa === 'string' ? wa.replace(/\D/g, '') : '';
    if (!num) return '';
    const full = num.length === 10 ? `91${num}` : num;
    return `https://wa.me/${full}`;
  }

  function renderCommunity() {
    const c = data.community;
    if (!c || typeof c !== 'object') return;
    const titleEl = $('#community-title');
    const bodyEl = $('#community-body');
    const cta = $('#community-cta');
    if (titleEl && c.title) titleEl.textContent = c.title;
    if (bodyEl) bodyEl.textContent = (typeof c.body === 'string' && c.body.trim()) || '';
    if (!cta) return;
    cta.textContent = c.cta || 'Join WhatsApp Channel';
    const url =
      (typeof c.whatsappChannelUrl === 'string' && c.whatsappChannelUrl.trim()) ||
      whatsappFallbackUrl() ||
      '#register';
    cta.setAttribute('href', url);
    if (url.startsWith('http')) {
      cta.setAttribute('target', '_blank');
      cta.setAttribute('rel', 'noopener noreferrer');
    } else {
      cta.removeAttribute('target');
    }
  }

  function renderYoutube() {
    const yt = data.youtube;
    if (!yt || typeof yt !== 'object') return;
    const titleEl = $('#youtube-title');
    const bodyEl = $('#youtube-body');
    const cta = $('#youtube-cta');
    if (titleEl && yt.title) titleEl.textContent = yt.title;
    if (bodyEl) bodyEl.textContent = (typeof yt.body === 'string' && yt.body.trim()) || '';
    if (!cta) return;
    cta.textContent = yt.cta || 'Subscribe on YouTube';
    const url = (typeof yt.channelUrl === 'string' && yt.channelUrl.trim()) || '';
    if (url) {
      cta.setAttribute('href', url);
      cta.setAttribute('target', '_blank');
      cta.setAttribute('rel', 'noopener noreferrer');
      cta.classList.remove('opacity-60', 'cursor-not-allowed', 'pointer-events-none');
      cta.removeAttribute('aria-disabled');
    } else {
      cta.setAttribute('href', '#youtube');
      cta.classList.add('opacity-60', 'cursor-not-allowed', 'pointer-events-none');
      cta.setAttribute('aria-disabled', 'true');
      cta.removeAttribute('target');
    }
  }

  function renderTrustMetrics() {
    const tm = data.trustMetrics;
    if (!tm || typeof tm !== 'object') return;
    const titleEl = $('#trust-title');
    const grid = $('#trust-grid');
    if (titleEl && tm.title) titleEl.textContent = tm.title;
    if (!grid || !Array.isArray(tm.items)) return;
    grid.innerHTML = tm.items
      .map(
        (item) => `
      <div class="card-surface rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 sm:p-6 text-center">
        <p class="text-2xl sm:text-3xl font-display font-semibold text-sky-600 dark:text-sky-400">${escapeHtml(item.value || '')}</p>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">${escapeHtml(item.label || '')}</p>
      </div>`
      )
      .join('');
  }

  function renderAudiencePaths() {
    const ap = data.audiencePaths;
    if (!ap || typeof ap !== 'object') return;
    const titleEl = $('#paths-title');
    const introEl = $('#paths-intro');
    const grid = $('#paths-grid');
    if (titleEl && ap.title) titleEl.textContent = ap.title;
    if (introEl) {
      introEl.textContent = (typeof ap.intro === 'string' && ap.intro.trim()) || '';
      introEl.classList.toggle('hidden', !introEl.textContent);
    }
    if (!grid || !Array.isArray(ap.items)) return;
    grid.innerHTML = ap.items
      .map(
        (item) => `
      <a href="${escapeHtml(item.href || '#courses')}" class="card-surface rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 block hover:border-sky-300 dark:hover:border-sky-600 transition-colors group h-full">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-sky-700 dark:group-hover:text-sky-300">${escapeHtml(item.title || '')}</h3>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">${escapeHtml(item.description || '')}</p>
        <span class="inline-block mt-4 text-sm font-medium text-sky-600 dark:text-sky-400">Explore →</span>
      </a>`
      )
      .join('');
  }

  function renderLearningFormats() {
    const lf = data.learningFormats;
    if (!lf || typeof lf !== 'object') return;
    const titleEl = $('#formats-title');
    const introEl = $('#formats-intro');
    const grid = $('#formats-grid');
    if (titleEl && lf.title) titleEl.textContent = lf.title;
    if (introEl) {
      introEl.textContent = (typeof lf.intro === 'string' && lf.intro.trim()) || '';
      introEl.classList.toggle('hidden', !introEl.textContent);
    }
    if (!grid || !Array.isArray(lf.formats)) return;
    grid.innerHTML = lf.formats
      .map(
        (f) => `
      <article class="card-surface rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8">
        <div class="flex items-start justify-between gap-3 mb-3">
          <h3 class="text-xl font-semibold text-slate-900 dark:text-white">${escapeHtml(f.name || '')}</h3>
          <span class="text-xs font-medium px-2 py-1 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-200 shrink-0">${escapeHtml(f.badge || '')}</span>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">${escapeHtml(f.description || '')}</p>
        <p class="mt-4 text-sm font-semibold text-slate-900 dark:text-white">Duration: <span class="font-normal text-slate-600 dark:text-slate-400">${escapeHtml(f.duration || '')}</span></p>
        <p class="mt-2 text-xs text-slate-500 dark:text-slate-500 leading-relaxed">${escapeHtml(f.detail || '')}</p>
      </article>`
      )
      .join('');
  }

  function renderProgramCard(item, variant) {
    const topicsHtml = (Array.isArray(item.topics) ? item.topics : [])
      .map(
        (topic) =>
          `<li class="flex gap-2 text-sm text-slate-700 dark:text-slate-300"><span class="text-sky-600 dark:text-sky-400 shrink-0">•</span><span>${escapeHtml(topic)}</span></li>`
      )
      .join('');
    const modulesHtml = (Array.isArray(item.modules) ? item.modules : [])
      .map(
        (mod) =>
          `<li class="flex gap-2 text-sm text-slate-700 dark:text-slate-300"><span class="text-sky-600 dark:text-sky-400 shrink-0">→</span><span>${escapeHtml(mod)}</span></li>`
      )
      .join('');
    const listBlock =
      topicsHtml && variant === 'masterclass'
        ? `<h4 class="text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300 mt-4 mb-2">Topics Covered</h4><ul class="space-y-1.5">${topicsHtml}</ul>`
        : modulesHtml && variant === 'bootcamp'
          ? `<h4 class="text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300 mt-4 mb-2">Modules</h4><ul class="space-y-1.5">${modulesHtml}</ul>`
          : '';
    const outcomeBlock =
      variant === 'bootcamp' && typeof item.outcome === 'string' && item.outcome.trim()
        ? `<p class="mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-700/80 text-sm text-slate-600 dark:text-slate-400"><span class="font-semibold text-slate-700 dark:text-slate-300">Outcome:</span> ${escapeHtml(item.outcome.trim())}</p>`
        : '';
    const summaryBlock =
      typeof item.summary === 'string' && item.summary.trim()
        ? `<p class="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">${escapeHtml(item.summary.trim())}</p>`
        : '';
    return `
      <article id="${escapeHtml(item.id || '')}" class="card-surface rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8 flex flex-col scroll-mt-24">
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">${escapeHtml(item.title || '')}</h3>
          <span class="text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 shrink-0">${escapeHtml(item.badge || (variant === 'masterclass' ? 'Masterclass' : 'Bootcamp'))}</span>
        </div>
        ${summaryBlock}
        ${listBlock}
        <div class="mt-auto pt-4 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-500">
          <span><span class="font-semibold text-slate-600 dark:text-slate-400">Duration:</span> ${escapeHtml(item.duration || '')}</span>
          <span><span class="font-semibold text-slate-600 dark:text-slate-400">Format:</span> ${escapeHtml(item.format || '')}</span>
        </div>
        ${outcomeBlock}
      </article>`;
  }

  function renderMasterclasses() {
    const host = $('#masterclasses-grid');
    if (!host || !Array.isArray(data.masterclasses) || !data.masterclasses.length) return;
    host.innerHTML = data.masterclasses.map((mc) => renderProgramCard(mc, 'masterclass')).join('');
  }

  function renderBootcamps() {
    const host = $('#bootcamps-grid');
    const section = $('#bootcamps');
    if (!host || !Array.isArray(data.bootcamps) || !data.bootcamps.length) {
      section?.classList.add('hidden');
      return;
    }
    section?.classList.remove('hidden');
    host.innerHTML = data.bootcamps.map((bc) => renderProgramCard(bc, 'bootcamp')).join('');
  }

  function renderUpcomingHighlight() {
    const uh = data.upcomingHighlight;
    const titleEl = $('#upcoming-title');
    const introEl = $('#upcoming-intro');
    const tbody = $('#upcoming-body');
    if (titleEl && uh?.title) titleEl.textContent = uh.title;
    if (introEl) {
      introEl.textContent = (typeof uh?.intro === 'string' && uh.intro.trim()) || '';
      introEl.classList.toggle('hidden', !introEl.textContent);
    }
    if (!tbody || !Array.isArray(data.sessions)) return;
    const registerHref = (typeof uh?.registerHref === 'string' && uh.registerHref.trim()) || '#register';
    const registerLabel = (typeof uh?.registerLabel === 'string' && uh.registerLabel.trim()) || 'Register';
    const rows = data.sessions.slice(0, 4);
    tbody.innerHTML = rows
      .map(
        (row) => {
          const label =
            (typeof row.shortLabel === 'string' && row.shortLabel.trim()) ||
            row.topic ||
            '';
          const format =
            (typeof row.sessionType === 'string' && row.sessionType.trim()) ||
            row.mode ||
            'Live';
          return `
      <tr class="border-b border-sky-100/80 dark:border-sky-900/30 last:border-0 hover:bg-sky-50/50 dark:hover:bg-sky-950/20">
        <td class="py-3 px-4 text-slate-900 dark:text-slate-100 whitespace-nowrap font-medium">${escapeHtml(formatDateShort(row.date))}</td>
        <td class="py-3 px-4 text-slate-700 dark:text-slate-300">${escapeHtml(label)}</td>
        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">${escapeHtml(format)}</td>
        <td class="py-3 px-4"><a href="${escapeHtml(registerHref)}" class="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline">${escapeHtml(registerLabel)}</a></td>
      </tr>`;
        }
      )
      .join('');
  }

  function renderFinalCta() {
    const fc = data.finalCta;
    if (!fc || typeof fc !== 'object') return;
    const titleEl = $('#final-cta-title');
    const bodyEl = $('#final-cta-body');
    const primary = $('#final-cta-primary');
    const secondary = $('#final-cta-secondary');
    if (titleEl && fc.title) titleEl.textContent = fc.title;
    if (bodyEl) {
      bodyEl.textContent = (typeof fc.body === 'string' && fc.body.trim()) || '';
      bodyEl.classList.toggle('hidden', !bodyEl.textContent);
    }
    if (primary) {
      primary.textContent = fc.primaryCta || 'Explore Programs';
      if (fc.primaryHref) primary.setAttribute('href', fc.primaryHref);
    }
    if (secondary) {
      secondary.textContent = fc.secondaryCta || 'Register Interest';
      if (fc.secondaryHref) secondary.setAttribute('href', fc.secondaryHref);
    }
  }

  function renderLearningDomains() {
    const site = data.site || {};
    const titleEl = $('#domains-title');
    const introEl = $('#domains-intro');
    if (titleEl && site.domainsTitle) titleEl.textContent = site.domainsTitle;
    if (introEl && site.domainsIntro) introEl.textContent = site.domainsIntro;

    const host = $('#domains-grid');
    const areas = Array.isArray(data.learningAreas)
      ? data.learningAreas
      : Array.isArray(data.learningDomains)
        ? data.learningDomains
        : [];
    if (!host || !areas.length) return;

    host.innerHTML = areas
      .map((d) => {
        const topics = Array.isArray(d.topics) ? d.topics : [];
        const topicsHtml = topics.length
          ? `<ul class="mt-4 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
              ${topics.map((t) => `<li class="flex gap-2"><span class="text-sky-600 dark:text-sky-400 shrink-0">•</span><span>${escapeHtml(t)}</span></li>`).join('')}
            </ul>`
          : d.description
            ? `<p class="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">${escapeHtml(d.description)}</p>`
            : '';
        return `
      <article class="card-surface rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 h-full">
        <span class="text-2xl" aria-hidden="true">${escapeHtml(d.icon || '')}</span>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white mt-3">${escapeHtml(d.name || '')}</h3>
        ${topicsHtml}
      </article>`;
      })
      .join('');
  }

  function renderValueProposition() {
    const vp = data.whyJoin || data.valueProposition;
    if (!vp || typeof vp !== 'object') return;
    const titleEl = $('#value-prop-title');
    if (titleEl && vp.title) titleEl.textContent = vp.title;
    const list = $('#value-prop-list');
    if (!list || !Array.isArray(vp.items)) return;
    list.innerHTML = vp.items
      .filter((item) => item != null && String(item).trim())
      .map(
        (item) => `
      <li class="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
        <span class="text-emerald-600 dark:text-emerald-400 shrink-0 font-semibold" aria-hidden="true">✓</span>
        <span>${escapeHtml(String(item))}</span>
      </li>`
      )
      .join('');
  }

  function renderOutcomes() {
    const out = data.outcomes;
    if (!out || typeof out !== 'object') return;
    const titleEl = $('#outcomes-title');
    const introEl = $('#outcomes-intro');
    const list = $('#outcomes-list');
    if (titleEl && out.title) titleEl.textContent = out.title;
    if (introEl) {
      introEl.textContent = (typeof out.intro === 'string' && out.intro.trim()) || '';
      introEl.classList.toggle('hidden', !introEl.textContent);
    }
    if (!list || !Array.isArray(out.items)) return;
    list.innerHTML = out.items
      .filter((item) => item != null && String(item).trim())
      .map(
        (item) => `
      <li class="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
        <span class="text-emerald-600 dark:text-emerald-400 shrink-0 font-semibold" aria-hidden="true">✓</span>
        <span>${escapeHtml(String(item))}</span>
      </li>`
      )
      .join('');
  }

  function renderAboutIntro() {
    const site = data.site || {};
    const titleEl = $('#about-title');
    const introEl = $('#about-intro');
    const guestEl = $('#guest-faculty-intro');
    if (titleEl) titleEl.textContent = site.aboutTitle || 'Meet your instructors';
    if (introEl) introEl.textContent = site.aboutIntro || '';
    if (guestEl) {
      const guestText =
        (typeof site.guestFacultyIntro === 'string' && site.guestFacultyIntro.trim()) || '';
      if (guestText && normalizeTrainers(data).length > 1) {
        guestEl.textContent = guestText;
        guestEl.classList.remove('hidden');
      } else {
        guestEl.textContent = '';
        guestEl.classList.add('hidden');
      }
    }
    const mcTitle = $('#masterclasses-title');
    const mcIntro = $('#masterclasses-intro');
    if (mcTitle) mcTitle.textContent = site.masterclassesTitle || 'Free Masterclasses';
    if (mcIntro) mcIntro.textContent = site.masterclassesIntro || '';
  }

  function setNamedMeta(name, content) {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setPropertyMeta(property, content) {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function applySeoMeta() {
    const site = data?.site || {};
    const titleBase = typeof site.title === 'string' && site.title.trim() ? site.title.trim() : 'Training site';
    const title = site.heroEyebrow
      ? `${titleBase} — ${String(site.heroEyebrow).trim()}`
      : `${titleBase} — Training`;
    const taglineFallback = siteTaglineLines(site).join(' ');
    const desc =
      (typeof site.seoDescription === 'string' && site.seoDescription.trim()) ||
      (typeof site.heroSubheading === 'string' && site.heroSubheading.trim()) ||
      taglineFallback ||
      'Expert-led enterprise training.';
    document.title = title;
    setNamedMeta('description', desc);

    const pageUrl = window.location.href.split('#')[0];
    let linkCanon = document.querySelector('link[rel="canonical"]');
    if (!linkCanon) {
      linkCanon = document.createElement('link');
      linkCanon.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanon);
    }
    linkCanon.setAttribute('href', pageUrl);

    const ogPath =
      typeof site.ogImage === 'string' && site.ogImage.trim() ? site.ogImage.trim() : 'assets/favicon.svg';
    let ogImageUrl = pageUrl;
    try {
      ogImageUrl = new URL(ogPath, pageUrl).href;
    } catch {
      /* keep pageUrl */
    }

    setPropertyMeta('og:type', 'website');
    setPropertyMeta('og:title', title);
    setPropertyMeta('og:description', desc);
    setPropertyMeta('og:url', pageUrl);
    setPropertyMeta('og:image', ogImageUrl);

    setNamedMeta('twitter:card', 'summary_large_image');
    setNamedMeta('twitter:title', title);
    setNamedMeta('twitter:description', desc);
    setNamedMeta('twitter:image', ogImageUrl);
  }

  function normalizeTrainers(d) {
    if (!d || typeof d !== 'object') return [];
    if (Array.isArray(d.trainers) && d.trainers.length) {
      return d.trainers.filter((x) => x && typeof x === 'object');
    }
    if (d.trainer && typeof d.trainer === 'object') return [d.trainer];
    return [];
  }

  function renderTrainerSocialRow(social) {
    const s = social && typeof social === 'object' ? social : {};
    const items = [
      ['LinkedIn', s.linkedin],
      ['X', s.twitter],
      ['GitHub', s.github],
      ['Website', s.website],
    ];
    return items
      .filter(([, url]) => typeof url === 'string' && url.trim())
      .map(
        ([label, url]) =>
          `<a href="${escapeHtml(url.trim())}" class="text-sm font-medium px-4 py-2 rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors" rel="noopener noreferrer" target="_blank">${escapeHtml(label)}</a>`
      )
      .join('');
  }

  function renderTrainerCard(t, i) {
    const namePlain = typeof t.name === 'string' ? t.name : '';
    const name = escapeHtml(namePlain);
    const title = escapeHtml(t.title || '');
    const bio = escapeHtml(t.bio || '');
    const bioSecondary =
      typeof t.bioSecondary === 'string' && t.bioSecondary.trim()
        ? `<p class="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">${escapeHtml(t.bioSecondary.trim())}</p>`
        : '';
    const credLabel = escapeHtml(t.credentialsLabel || 'Credentials');
    const credHtml = (Array.isArray(t.credentials) ? t.credentials : [])
      .filter((c) => c != null && String(c).trim())
      .map((c) => `<li class="flex gap-2"><span class="text-sky-600 dark:text-sky-400">✓</span>${escapeHtml(String(c))}</li>`)
      .join('');
    const teachLabel = escapeHtml(t.teachTopicsLabel || '');
    const teachHtml = (Array.isArray(t.teachTopics) ? t.teachTopics : [])
      .filter((x) => x != null && String(x).trim())
      .map((x) => `<li class="flex gap-2"><span class="text-slate-400">→</span>${escapeHtml(String(x))}</li>`)
      .join('');
    const teachBlock =
      teachHtml && teachLabel
        ? `<div>
              <h4 class="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">${teachLabel}</h4>
              <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">${teachHtml}</ul>
            </div>`
        : '';
    const sectionHeading =
      typeof t.sectionHeading === 'string' && t.sectionHeading.trim()
        ? `<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-8">${escapeHtml(t.sectionHeading.trim())}</h3>`
        : '';
    const email = (t.contact?.email && String(t.contact.email).trim()) || '';
    const phone = (t.contact?.phone && String(t.contact.phone).trim()) || '';
    const waRaw = (t.contact?.whatsapp && String(t.contact.whatsapp).trim()) || '';
    const waNum = waRaw.replace(/\D/g, '');
    const emailId = i === 0 && email ? ' id="contact-email"' : '';
    const emailCell = email
      ? `<a${emailId} href="mailto:${escapeHtml(email)}" class="text-sky-600 dark:text-sky-400 font-medium break-all hover:underline">${escapeHtml(email)}</a>`
      : '<span class="text-slate-400">—</span>';
    const phoneCell = phone
      ? `<a href="tel:${escapeHtml(phone.replace(/\s/g, ''))}" class="text-slate-900 dark:text-white font-medium hover:text-sky-600 dark:hover:text-sky-400">${escapeHtml(phone)}</a>`
      : '<span class="text-slate-400">—</span>';
    const waCell = waNum
      ? `<a href="https://wa.me/${escapeHtml(waNum)}" class="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">WhatsApp</a>`
      : '<span class="text-slate-400">—</span>';
    const imgSrc = (t.profileImage && String(t.profileImage).trim()) || '';
    const initials = escapeHtml(initialsFromName(namePlain));
    const socialRow = renderTrainerSocialRow(t.social);
    const topRule = i > 0 ? 'pt-16 mt-16 border-t border-slate-200/80 dark:border-slate-800/80' : '';
    const imgVisible = imgSrc ? '' : ' hidden';
    const phHidden = imgSrc ? 'hidden ' : '';

    return `
      <div class="trainer-card ${topRule}" data-trainer-index="${i}">
        ${sectionHeading}
        <div class="grid lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          <div class="lg:col-span-1 flex flex-col items-center lg:items-start">
            <div class="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg bg-slate-200 dark:bg-slate-800">
              <img src="${imgSrc ? escapeHtml(imgSrc) : ''}" alt="${escapeHtml(namePlain ? `Photo of ${namePlain}` : 'Trainer')}" class="trainer-photo w-full h-full object-cover${imgVisible}" width="224" height="224" />
              <div class="${phHidden}trainer-photo-ph absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-600 to-indigo-700 text-white text-4xl font-display font-normal" aria-hidden="true">${initials}</div>
            </div>
          </div>
          <div class="lg:col-span-2 space-y-6">
            <div>
              <h3 class="text-2xl font-semibold text-slate-900 dark:text-white">${name}</h3>
              <p class="text-sky-600 dark:text-sky-400 font-medium mt-1">${title}</p>
            </div>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">${bio}</p>
            ${bioSecondary}
            ${teachBlock}
            <div>
              <h4 class="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">${credLabel}</h4>
              <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">${credHtml || '<li class="text-slate-500">—</li>'}</ul>
            </div>
            ${socialRow ? `<div class="flex flex-wrap gap-3 pt-2">${socialRow}</div>` : ''}
            <div class="card-surface rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-slate-500 dark:text-slate-500 block text-xs uppercase tracking-wide mb-1">Email</span>
                ${emailCell}
              </div>
              <div>
                <span class="text-slate-500 dark:text-slate-500 block text-xs uppercase tracking-wide mb-1">Phone</span>
                ${phoneCell}
              </div>
              <div class="sm:col-span-2">
                <span class="text-slate-500 dark:text-slate-500 block text-xs uppercase tracking-wide mb-1">WhatsApp</span>
                ${waCell}
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  function bindTrainerImages(root) {
    root.querySelectorAll('.trainer-card').forEach((card) => {
      const img = card.querySelector('.trainer-photo');
      const ph = card.querySelector('.trainer-photo-ph');
      if (!img || !ph) return;
      const src = (img.getAttribute('src') || '').trim();
      if (!src) {
        img.classList.add('hidden');
        ph.classList.remove('hidden');
        return;
      }
      img.addEventListener('error', function () {
        this.classList.add('hidden');
        ph.classList.remove('hidden');
      });
    });
  }

  function renderTrainers() {
    const host = $('#trainers-root');
    if (!host) return;
    const list = normalizeTrainers(data);
    if (!list.length) {
      host.innerHTML = '';
      return;
    }
    host.innerHTML = list.map((t, i) => renderTrainerCard(t, i)).join('');
    bindTrainerImages(host);

    const regFollow = $('#reg-success-followup');
    if (regFollow) {
      const primary = list[0];
      const em = primary?.contact?.email;
      const emStr = typeof em === 'string' ? em.trim() : '';
      regFollow.textContent = emStr
        ? `If you do not see a reply within a few days, check your spam folder or email us at ${emStr}.`
        : 'If you do not receive a reply, check your spam folder or use the contact details in the About section.';
    }
  }

  function renderCourseTopics(c) {
    if (Array.isArray(c.topicGroups) && c.topicGroups.length) {
      return c.topicGroups
        .map(
          (g) => `
        <div class="mt-4 first:mt-0">
          <h5 class="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300 mb-2">${escapeHtml(g.level || '')}</h5>
          <ul class="text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
            ${(g.topics || [])
              .map(
                (topic) =>
                  `<li class="flex gap-2"><span class="text-sky-600 dark:text-sky-400 shrink-0">•</span><span>${escapeHtml(topic)}</span></li>`
              )
              .join('')}
          </ul>
        </div>`
        )
        .join('');
    }
    return `<ul class="text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
      ${(c.topics || [])
        .map(
          (topic) =>
            `<li class="flex gap-2"><span class="text-sky-600 dark:text-sky-400 shrink-0">•</span><span>${escapeHtml(topic)}</span></li>`
        )
        .join('')}
    </ul>`;
  }

  function renderCourses() {
    const host = $('#course-grid');
    if (!host || !Array.isArray(data.courses)) return;
    host.innerHTML = data.courses
      .map((c) => {
        const idealFor =
          typeof c.idealFor === 'string' && c.idealFor.trim()
            ? `<p class="text-xs text-slate-600 dark:text-slate-400 mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-700/80"><span class="font-semibold text-slate-700 dark:text-slate-300">Ideal for:</span> ${escapeHtml(c.idealFor.trim())}</p>`
            : '';
        const topicsBlock = renderCourseTopics(c);
        const topicsHeading =
          Array.isArray(c.topicGroups) && c.topicGroups.length
            ? '<h4 class="text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-1">Learning path</h4>'
            : '<h4 class="text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-2">Key topics</h4>';
        return `
      <article id="${escapeHtml(c.id || '')}" class="card-surface rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow scroll-mt-24">
        <div class="flex items-start justify-between gap-3 mb-3">
          <h3 class="text-xl font-semibold text-slate-900 dark:text-white">${escapeHtml(c.domain)}</h3>
          <span class="text-xs font-medium px-2 py-1 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-200 shrink-0">${escapeHtml(c.level || '')}</span>
        </div>
        <p class="text-slate-600 dark:text-slate-400 text-sm flex-1 mb-4 leading-relaxed">${escapeHtml(c.summary)}</p>
        <p class="text-xs font-medium text-slate-500 dark:text-slate-500 mb-3">${escapeHtml(c.format || '')}</p>
        ${topicsHeading}
        ${topicsBlock}
        ${idealFor}
      </article>`;
      })
      .join('');
  }

  function renderRegistrationOptions() {
    const sel = $('#reg-course');
    if (!sel) return;
    const interests = Array.isArray(data.registrationInterests) ? data.registrationInterests : [];
    if (interests.length) {
      sel.innerHTML = interests
        .map(
          (item) =>
            `<option value="${escapeHtml(item.id || item.label || '')}">${escapeHtml(item.label || item.id || '')}</option>`
        )
        .join('');
      return;
    }
    const courses = Array.isArray(data.courses) ? data.courses : [];
    const opts = courses.map(
      (c) =>
        `<option value="${escapeHtml(c.id || c.domain || '')}">${escapeHtml(c.domain || c.id || '')}</option>`
    );
    sel.innerHTML =
      opts.join('') +
      '<option value="general">General interest</option>';
  }

  function renderSessions() {
    const intro = $('#schedule-intro');
    const note =
      (typeof data.site?.scheduleNote === 'string' && data.site.scheduleNote.trim()) ||
      'Weekends only · live online. See table for dates and topics.';
    if (intro) intro.textContent = note;
    const tbody = $('#schedule-body');
    if (!tbody || !Array.isArray(data.sessions)) return;
    tbody.innerHTML = data.sessions
      .map(
        (row) => `
      <tr class="border-b border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
        <td class="py-3 px-4 text-slate-900 dark:text-slate-100 whitespace-nowrap">${escapeHtml(formatDate(row.date))}</td>
        <td class="py-3 px-4 text-slate-700 dark:text-slate-300">${escapeHtml(row.topic)}</td>
        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">${escapeHtml(row.duration)}</td>
        <td class="py-3 px-4"><span class="inline-flex text-xs font-medium px-2 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200">${escapeHtml(row.mode)}</span></td>
      </tr>`
      )
      .join('');
  }

  function renderCurriculum() {
    const host = $('#curriculum-path');
    if (!host || !Array.isArray(data.curriculum)) return;
    host.innerHTML = data.curriculum
      .map(
        (p, i) => `
      <div class="relative pl-8 pb-10 last:pb-0 border-l-2 border-sky-200 dark:border-sky-800 ml-3">
        <span class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-500 dark:bg-sky-400 ring-4 ring-white dark:ring-slate-900"></span>
        <span class="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">Phase ${i + 1}</span>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white mt-1">${escapeHtml(p.phase)}</h3>
        <p class="text-slate-600 dark:text-slate-400 text-sm mt-2">${escapeHtml(p.description)}</p>
        <ul class="mt-3 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          ${(p.milestones || []).map((m) => `<li class="flex gap-2"><span class="text-slate-400">→</span>${escapeHtml(m)}</li>`).join('')}
        </ul>
      </div>`
      )
      .join('');
  }

  function renderResources() {
    const host = $('#resources-grid');
    if (!host || !Array.isArray(data.resources)) return;
    host.innerHTML = data.resources
      .map(
        (r) => `
      <a href="${escapeHtml(r.href)}" class="card-surface rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-5 block hover:border-sky-300 dark:hover:border-sky-600 transition-colors group">
        <span class="text-xs font-medium text-sky-600 dark:text-sky-400">${escapeHtml(r.type)}</span>
        <h3 class="text-base font-semibold text-slate-900 dark:text-white mt-1 group-hover:text-sky-700 dark:group-hover:text-sky-300">${escapeHtml(r.title)}</h3>
        <p class="text-xs text-amber-700 dark:text-amber-300/90 mt-2">${r.status === 'placeholder' ? 'Link placeholder — update in data.json' : ''}</p>
      </a>`
      )
      .join('');
  }

  function renderTestimonials() {
    const site = data.site || {};
    const brandEl = $('#testimonials-brand');
    const titleEl = $('#testimonials-title');
    const introEl = $('#testimonials-intro');
    if (brandEl) {
      brandEl.textContent =
        (typeof site.testimonialsBrand === 'string' && site.testimonialsBrand.trim()) ||
        site.title ||
        'Upskill Fleet Academy';
    }
    if (titleEl) {
      titleEl.textContent =
        (typeof site.testimonialsTitle === 'string' && site.testimonialsTitle.trim()) ||
        'What participants say';
    }
    if (introEl) {
      const intro =
        (typeof site.testimonialsIntro === 'string' && site.testimonialsIntro.trim()) || '';
      introEl.textContent = intro;
      introEl.classList.toggle('hidden', !intro);
    }

    const section = $('#testimonials');
    const host = $('#testimonials-grid');
    if (!host || !Array.isArray(data.testimonials) || !data.testimonials.length) {
      section?.classList.add('hidden');
      return;
    }
    section?.classList.remove('hidden');
    host.innerHTML = data.testimonials
      .map((t) => {
        const role =
          typeof t.role === 'string' && t.role.trim()
            ? `<footer class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p class="text-xs font-medium text-sky-600 dark:text-sky-400">${escapeHtml(t.role.trim())}</p>
        </footer>`
            : '';
        return `
      <blockquote class="card-surface rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-sm flex flex-col">
        <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed flex-1">“${escapeHtml(t.quote)}”</p>
        ${role}
      </blockquote>`;
      })
      .join('');
  }

  function renderFaq() {
    const host = $('#faq-list');
    if (!host || !Array.isArray(data.faq)) return;
    host.innerHTML = data.faq
      .map(
        (item, i) => `
      <div class="border border-slate-200/80 dark:border-slate-700/80 rounded-xl overflow-hidden card-surface">
        <button type="button" class="faq-trigger w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors" aria-expanded="false" aria-controls="faq-panel-${i}" id="faq-btn-${i}">
          <span>${escapeHtml(item.q)}</span>
          <span class="faq-chevron text-slate-400 shrink-0 transition-transform" aria-hidden="true">▼</span>
        </button>
        <div id="faq-panel-${i}" class="faq-panel hidden px-5 pb-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-700/80 pt-3" role="region" aria-labelledby="faq-btn-${i}">
          ${escapeHtml(item.a)}
        </div>
      </div>`
      )
      .join('');

    host.querySelectorAll('.faq-trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('aria-controls');
        const panel = id ? document.getElementById(id) : null;
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        if (panel) panel.classList.toggle('hidden', open);
        const ch = btn.querySelector('.faq-chevron');
        if (ch) ch.style.transform = open ? '' : 'rotate(-180deg)';
      });
    });
  }

  function renderFooter() {
    const f = data.footer;
    if (!f) return;
    const taglineEl = $('#footer-tagline');
    const closingEl = $('#footer-closing');
    if (taglineEl) taglineEl.textContent = f.tagline || f.company || '';
    if (closingEl) {
      closingEl.textContent = (typeof f.closing === 'string' && f.closing.trim()) || '';
      closingEl.classList.toggle('hidden', !closingEl.textContent);
    }
    $('#footer-company').textContent = f.company || '';
    $('#footer-address').textContent = f.address || '';
    const trainers = normalizeTrainers(data);
    const t = trainers[0];
    if (t?.contact?.email) {
      const fe = $('#footer-email');
      fe.textContent = t.contact.email;
      fe.href = `mailto:${t.contact.email}`;
    }
  }

  function initSmoothNav() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', id);
        }
      });
    });
  }

  function initMobileNav() {
    const toggle = $('#mobile-menu-toggle');
    const panel = $('#mobile-menu');
    if (!toggle || !panel) return;
    toggle.addEventListener('click', () => {
      const open = !panel.classList.contains('hidden');
      panel.classList.toggle('hidden', open);
      toggle.setAttribute('aria-expanded', String(!open));
    });
    panel.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        panel.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

  function initRegistrationForm() {
    const form = $('#registration-form');
    const successEl = $('#reg-success');
    const errorEl = $('#reg-error');
    if (!form) return;

    function hideRegMessages() {
      successEl?.classList.add('hidden');
      errorEl?.classList.add('hidden');
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideRegMessages();

      const reg = data?.registration && typeof data.registration === 'object' ? data.registration : {};
      const accessKey =
        typeof reg.web3formsAccessKey === 'string' ? reg.web3formsAccessKey.trim() : '';
      const keyMissing =
        !accessKey ||
        accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY';

      const fd = new FormData(form);
      const name = String(fd.get('name') || '').trim();
      const email = String(fd.get('email') || '').trim();
      const phone = String(fd.get('phone') || '').trim();
      const interest = String(fd.get('interest') || '').trim();
      const goals = String(fd.get('goals') || '').trim();

      if (keyMissing) {
        if (errorEl) {
          errorEl.textContent =
            'Registration email is not set up yet. Replace registration.web3formsAccessKey in config/data.json with your key from web3forms.com (free). Update registration.notifyEmail there for your own records.';
          errorEl.classList.remove('hidden');
        }
        return;
      }

      const messageBody = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone number: ${phone}`,
        `Primary interest: ${interest}`,
        `Goals: ${goals || '—'}`,
      ].join('\n');

      const siteTitle = data?.site?.title || 'Training site';
      const submitBtn = $('#reg-submit-btn') || form.querySelector('button[type="submit"]');
      const defaultBtnLabel = (submitBtn && submitBtn.textContent.trim()) || 'Submit interest';
      form.setAttribute('aria-busy', 'true');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      try {
        const res = await fetch(WEB3FORMS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Registration interest — ${siteTitle}`,
            name,
            email,
            phone,
            'Phone number': phone,
            'Primary interest': interest,
            Goals: goals || '—',
            message: messageBody,
            replyto: email,
            from_name: name,
          }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.success === false) {
          throw new Error(json.message || 'Submission failed');
        }
        successEl?.classList.remove('hidden');
        form.reset();
        setTimeout(() => successEl?.classList.add('hidden'), 8000);
      } catch {
        if (errorEl) {
          errorEl.textContent =
            'Could not send your registration. Please try again or contact us using the email on this page.';
          errorEl.classList.remove('hidden');
        }
      } finally {
        form.removeAttribute('aria-busy');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = defaultBtnLabel;
        }
      }
    });
  }

  function showLoadError() {
    const el = $('#config-error');
    if (el) el.classList.remove('hidden');
  }

  async function loadConfig() {
    try {
      const res = await fetch(CONFIG_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } catch (e) {
      console.warn('[training-site] Could not load config/data.json — using fallback.', e);
      return null;
    }
  }

  async function boot() {
    initTheme();
    const loaded = await loadConfig();
    data = loaded && typeof loaded === 'object' ? loaded : FALLBACK_DATA;
    if (!loaded) showLoadError();

    renderNav();
    renderHero();
    renderAboutAcademy();
    renderLearningDomains();
    renderValueProposition();
    renderCommunity();
    renderYoutube();
    renderAboutIntro();
    renderTrainers();
    renderMasterclasses();
    renderRegistrationOptions();
    renderUpcomingHighlight();
    renderFinalCta();
    renderFaq();
    renderFooter();
    applySeoMeta();
    initSmoothNav();
    initMobileNav();
    initRegistrationForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
