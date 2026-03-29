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
      title: 'Enterprise Skills Academy',
      tagline:
        'Expert-led training in AI Security, Cyber Security, Cloud, and Financial Marketing',
      primaryCta: 'View schedule',
      secondaryCta: 'Explore courses',
    },
    trainer: {
      name: 'Dr. Alex Morgan',
      title: 'Principal Security & Cloud Instructor',
      bio: '15+ years across security architecture, cloud platforms, and regulated financial services. Former lead at a global bank and cloud partner; now focused on practical, compliance-aware training for teams adopting AI and hybrid cloud.',
      shortBio: 'Security architect, cloud strategist, and hands-on instructor for enterprise teams.',
      profileImage: 'assets/trainer.jpg',
      contact: {
        email: 'training@example.com',
        phone: '+1 (555) 010-2030',
        whatsapp: '+15550102030',
      },
      social: {
        linkedin: 'https://www.linkedin.com/in/example',
        twitter: 'https://twitter.com/example',
        github: 'https://github.com/example',
        website: 'https://example.com',
      },
      credentials: [
        'CISSP, CCSP',
        'AWS & Azure Solutions Architect',
        'Former ISO 27001 lead implementer',
      ],
    },
    courses: [
      {
        id: 'ai-security',
        domain: 'AI Security',
        summary: 'Secure design, deployment, and governance of AI systems in the enterprise.',
        topics: [
          'Threat modeling for LLM pipelines',
          'Data leakage & prompt injection mitigations',
          'Model supply chain & third-party AI',
          'Governance, audit, and responsible use',
        ],
        level: 'Intermediate',
        format: 'Workshop + labs',
      },
      {
        id: 'cyber-security',
        domain: 'Cyber Security',
        summary: 'Defense-in-depth, identity, and incident readiness for modern organizations.',
        topics: [
          'Zero trust & identity-centric security',
          'Detection, SIEM, and SOC fundamentals',
          'Vulnerability management & patching',
          'Incident response playbooks',
        ],
        level: 'Foundations to Intermediate',
        format: 'Lecture + scenarios',
      },
      {
        id: 'cloud-computing',
        domain: 'Cloud Computing',
        summary: 'Architecture, cost, and operations across major cloud providers.',
        topics: [
          'Well-architected patterns (IaaS/PaaS/SaaS)',
          'Networking, IAM, and encryption',
          'Cost optimization & FinOps basics',
          'Hybrid and multi-cloud considerations',
        ],
        level: 'Intermediate',
        format: 'Hands-on labs',
      },
      {
        id: 'financial-marketing',
        domain: 'Financial Marketing Management',
        summary: 'Regulatory-aware marketing strategy for banks, fintech, and asset managers.',
        topics: [
          'Product positioning & segment strategy',
          'Compliance frameworks (marketing disclosures)',
          'Digital channels & campaign measurement',
          'Brand risk and stakeholder alignment',
        ],
        level: 'Professional',
        format: 'Case studies + frameworks',
      },
    ],
    sessions: [
      { date: '2026-04-08', topic: 'AI Security: Threats to LLM Systems', duration: '3 hours', mode: 'Live online' },
      { date: '2026-04-15', topic: 'Cyber Security: Zero Trust in Practice', duration: '4 hours', mode: 'On-site / hybrid' },
      { date: '2026-04-22', topic: 'Cloud: Well-Architected Review Lab', duration: 'Full day', mode: 'Live online' },
      { date: '2026-04-29', topic: 'Financial Marketing: Compliant Campaign Design', duration: '3 hours', mode: 'Live online' },
    ],
    curriculum: [
      {
        phase: 'Foundation',
        description: 'Shared vocabulary, risk context, and tooling setup across all four domains.',
        milestones: ['Security & cloud fundamentals', 'Regulatory landscape primer', 'Lab environment access'],
      },
      {
        phase: 'Core skills',
        description: 'Domain-deep modules with exercises aligned to your catalog courses.',
        milestones: ['AI & cloud security controls', 'Identity & detection basics', 'Marketing compliance checkpoints'],
      },
      {
        phase: 'Applied capstone',
        description: 'Cross-domain scenario: ship a cloud-hosted AI feature with security and marketing sign-off.',
        milestones: ['Architecture review', 'Control mapping', 'Stakeholder briefing'],
      },
    ],
    resources: [
      { title: 'Session notes (PDF)', type: 'Notes', status: 'placeholder', href: '#' },
      { title: 'Reading list & standards index', type: 'Links', status: 'placeholder', href: '#' },
      { title: 'Recorded sessions (2026 Q2)', type: 'Recordings', status: 'placeholder', href: '#' },
      { title: 'Lab starter templates', type: 'Downloads', status: 'placeholder', href: '#' },
    ],
    testimonials: [
      {
        quote: 'Clear, pragmatic framing of AI risks—we reused the threat model in our SOC review the same week.',
        name: 'Priya S.',
        role: 'Head of Security, FinTech',
      },
      {
        quote: 'Cloud labs were the best part; our architects finally aligned on naming and tagging.',
        name: 'Jordan L.',
        role: 'Engineering Manager',
      },
      {
        quote: 'Marketing + compliance module gave us a checklist we could hand to legal.',
        name: 'Elena R.',
        role: 'CMO, Regional Bank',
      },
    ],
    faq: [
      {
        q: 'Who should attend?',
        a: 'Security engineers, cloud architects, product/engineering leads, and marketing leaders in regulated industries—or anyone building a cross-functional training program.',
      },
      {
        q: 'Are sessions recorded?',
        a: 'Recordings are provided where policy allows; placeholders in Resources will be replaced with links after each cohort.',
      },
      {
        q: 'Do I need cloud accounts?',
        a: 'Labs use sandbox-friendly patterns; you may use provided shared tenants or your own (with admin approval).',
      },
      {
        q: 'Can this scale to a full LMS later?',
        a: 'Yes. Content is data-driven from JSON; you can swap in an API, auth, and progress tracking without rewriting the page structure.',
      },
    ],
    registration: {
      notifyEmail: 'your-email@example.com',
      web3formsAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
    },
    footer: {
      company: 'Enterprise Skills Academy',
      address: 'Remote-first · Workshops worldwide',
      copyrightYear: 2026,
    },
  };

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function initialsFromName(name) {
    if (!name || typeof name !== 'string') return '?';
    const parts = name.replace(/\./g, '').split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
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

  function renderHero() {
    $('#hero-title').textContent = data.site?.title || '';
    $('#hero-tagline').textContent = data.site?.tagline || '';
    const p = $('#hero-primary-cta');
    const s = $('#hero-secondary-cta');
    if (p) p.textContent = data.site?.primaryCta || 'Schedule';
    if (s) s.textContent = data.site?.secondaryCta || 'Courses';
  }

  function renderTrainer() {
    const t = data.trainer;
    if (!t) return;
    $('#trainer-name').textContent = t.name || '';
    $('#trainer-role').textContent = t.title || '';
    $('#trainer-bio').textContent = t.bio || '';
    const img = $('#trainer-photo');
    const ph = $('#trainer-photo-placeholder');
    if (img) {
      img.alt = t.name ? `Photo of ${t.name}` : 'Trainer';
      if (t.profileImage) {
        img.style.display = '';
        img.src = t.profileImage;
        if (ph) ph.classList.add('hidden');
        img.onerror = function () {
          this.style.display = 'none';
          if (ph) {
            ph.textContent = initialsFromName(t.name);
            ph.classList.remove('hidden');
          }
        };
      } else {
        img.style.display = 'none';
        if (ph) {
          ph.textContent = initialsFromName(t.name);
          ph.classList.remove('hidden');
        }
      }
    }
    const cred = $('#trainer-credentials');
    if (cred && Array.isArray(t.credentials)) {
      cred.innerHTML = t.credentials
        .map((c) => `<li class="flex gap-2"><span class="text-sky-600 dark:text-sky-400">✓</span>${escapeHtml(c)}</li>`)
        .join('');
    }
    const email = $('#contact-email');
    const phone = $('#contact-phone');
    const wa = $('#contact-whatsapp');
    if (email) {
      email.textContent = t.contact?.email || '';
      email.href = t.contact?.email ? `mailto:${t.contact.email}` : '#';
    }
    if (phone) {
      phone.textContent = t.contact?.phone || '';
      phone.href = t.contact?.phone ? `tel:${t.contact.phone.replace(/\s/g, '')}` : '#';
    }
    if (wa) {
      wa.textContent = t.contact?.whatsapp ? 'WhatsApp' : '';
      const num = (t.contact?.whatsapp || '').replace(/\D/g, '');
      wa.href = num ? `https://wa.me/${num}` : '#';
      wa.classList.toggle('hidden', !num);
    }
    const social = t.social || {};
    const map = [
      ['social-linkedin', social.linkedin, 'LinkedIn'],
      ['social-twitter', social.twitter, 'X / Twitter'],
      ['social-github', social.github, 'GitHub'],
      ['social-website', social.website, 'Website'],
    ];
    map.forEach(([id, url, label]) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (url) {
        el.href = url;
        el.classList.remove('hidden');
        el.setAttribute('aria-label', label);
      } else el.classList.add('hidden');
    });
  }

  function renderCourses() {
    const host = $('#course-grid');
    if (!host || !Array.isArray(data.courses)) return;
    host.innerHTML = data.courses
      .map(
        (c) => `
      <article class="card-surface rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between gap-3 mb-3">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">${escapeHtml(c.domain)}</h3>
          <span class="text-xs font-medium px-2 py-1 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-200">${escapeHtml(c.level)}</span>
        </div>
        <p class="text-slate-600 dark:text-slate-400 text-sm flex-1 mb-4">${escapeHtml(c.summary)}</p>
        <p class="text-xs text-slate-500 dark:text-slate-500 mb-2">${escapeHtml(c.format)}</p>
        <ul class="text-sm text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
          ${(c.topics || []).map((t) => `<li>${escapeHtml(t)}</li>`).join('')}
        </ul>
      </article>`
      )
      .join('');
  }

  function renderSessions() {
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
    const host = $('#testimonials-grid');
    if (!host || !Array.isArray(data.testimonials)) return;
    host.innerHTML = data.testimonials
      .map(
        (t) => `
      <blockquote class="card-surface rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-sm">
        <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">“${escapeHtml(t.quote)}”</p>
        <footer class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <cite class="not-italic font-semibold text-slate-900 dark:text-white text-sm">${escapeHtml(t.name)}</cite>
          <p class="text-xs text-slate-500 dark:text-slate-400">${escapeHtml(t.role)}</p>
        </footer>
      </blockquote>`
      )
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
    $('#footer-company').textContent = f.company || '';
    $('#footer-address').textContent = f.address || '';
    const t = data.trainer;
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
      const organization = String(fd.get('organization') || '').trim();
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
        `Work email: ${email}`,
        `Organization: ${organization || '—'}`,
        `Primary interest: ${interest}`,
        `Goals: ${goals || '—'}`,
        `Notify target (config): ${reg.notifyEmail || '—'}`,
      ].join('\n');

      const siteTitle = data?.site?.title || 'Training site';
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

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
        if (submitBtn) submitBtn.disabled = false;
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
    renderTrainer();
    renderCourses();
    renderSessions();
    renderCurriculum();
    renderResources();
    renderTestimonials();
    renderFaq();
    renderFooter();
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
