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
      heroEyebrow: 'Enterprise Security & AI Learning',
      heroHeadline: 'Build Real-World Skills in AI Security, Cybersecurity & Cloud Security',
      heroSubheading:
        'Expert-led, hands-on training designed for students, security professionals, cloud engineers, and technology leaders looking to advance their careers.',
      heroSupporting:
        'Learn through practical labs, real-world case studies, threat simulations, and industry best practices used by modern enterprises.',
      seoDescription:
        'Upskill Fleet Academy — Expert-led programs in AI Security, Cyber Security, Cloud Security, DevSecOps, and Financial Markets & Management.',
      primaryCta: 'Explore Programs',
      secondaryCta: 'View Schedule',
      tertiaryCta: 'Register Interest',
      scheduleNote:
        'Weekends only · live online. Master classes are 1 hour each (weekends 1–3 from 21 June 2026). Bootcamp is 12 hours total — 3 hours per weekend over four weekends.',
      aboutTitle: 'Meet your instructors',
      aboutIntro: 'Learn from experienced practitioners focused on real-world skills and career outcomes.',
      coursesTitle: 'Course catalog',
      coursesIntro:
        'Three learning paths—AI & Cyber Security, AWS Cloud Computing, and FMM—each structured from beginner to advanced.',
      guestFacultyIntro:
        'Guest faculty bring financial markets and investment perspectives into the classroom.',
    },
    learningDomains: [
      { icon: '🔐', name: 'AI & Cyber Security', description: 'AI security & cyber defense', href: '#ai-cyber-security' },
      { icon: '☁️', name: 'AWS Cloud Computing', description: 'Cloud fundamentals to AWS', href: '#aws-cloud-computing' },
      { icon: '📈', name: 'Financial Markets & Management', description: 'Markets & certifications', href: '#financial-markets' },
    ],
    valueProposition: {
      title: 'Why Learn With Us?',
      items: [
        'Industry-focused curriculum aligned with enterprise security challenges',
        'Practical workshops and guided labs—not just theory',
        'Learn from experienced cloud, AI, and security practitioners',
        'Small cohorts with interactive discussions and mentoring',
        'Career-oriented paths for students and professionals',
      ],
    },
    outcomes: {
      title: "What You'll Gain",
      intro: 'By completing our programs, learners will:',
      items: [
        'Understand real-world enterprise security practices',
        'Build hands-on technical security skills',
        'Strengthen cloud and AI security knowledge',
        'Improve certification readiness',
        'Gain experience through labs and projects',
        'Enhance career opportunities in security and cloud roles',
      ],
    },
    trainers: [
      {
        name: 'Dr. Alex Morgan',
        title: 'Principal Security & Cloud Instructor',
        bio: '15+ years across security architecture, cloud platforms, and regulated financial services. Former lead at a global bank and cloud partner; now focused on practical, compliance-aware training for teams adopting AI and hybrid cloud.',
        shortBio: 'Security architect, cloud strategist, and hands-on instructor for enterprise teams.',
        profileImage: '',
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
      {
        name: 'Jordan Lee',
        title: 'Co-instructor',
        bio: 'Second trainer bio — replace in config/data.json under trainers[1].',
        shortBio: '',
        profileImage: '',
        contact: {
          email: '',
          phone: '',
          whatsapp: '',
        },
        social: {},
        credentials: ['Industry certifications'],
      },
    ],
    courses: [
      {
        id: 'ai-cyber-security',
        domain: 'AI & Cyber Security',
        summary: 'AI security and cyber defense from fundamentals to governance.',
        level: 'Beginner to Advanced',
        format: 'Workshop · Labs · Scenarios',
        topicGroups: [
          { level: 'Beginner', topics: ['Introduction to AI Security', 'Understanding LLMs', 'Cyber security fundamentals'] },
          { level: 'Intermediate', topics: ['AI attacks and defenses using DevSecOps', 'Prompt injection defense', 'IAM & security monitoring'] },
          { level: 'Advanced', topics: ['Supply chain attacks in AI', 'Governance and compliance in AI', 'Incident response for AI systems'] },
        ],
      },
      {
        id: 'aws-cloud-computing',
        domain: 'AWS Cloud Computing',
        summary: 'Cloud computing on AWS from core concepts to networking and security.',
        level: 'Beginner to Advanced',
        format: 'Hands-on Labs · AWS Walkthroughs',
        topicGroups: [
          { level: 'Beginner', topics: ['What is cloud computing?', 'AWS infrastructure overview'] },
          { level: 'Intermediate', topics: ['IAM — users, roles & policies', 'Amazon EC2 fundamentals'] },
          { level: 'Advanced', topics: ['VPC, networking & compute', 'AWS security best practices'] },
        ],
      },
      {
        id: 'financial-markets',
        domain: 'Financial Markets & Management (FMM)',
        summary: 'Financial markets, investing, and NISM/NCFM certification guidance.',
        topics: ['Introduction to Financial Markets', 'NISM & NCFM Certification Preparation', 'Stock Market Fundamentals', 'Risk Management'],
        level: 'Beginner to Advanced',
        format: 'Interactive Sessions · Certification Guidance',
      },
    ],
    sessions: [
      {
        date: '2026-06-21',
        topic: 'Master Class — Weekend 1: AI Security & Cyber Security',
        duration: '1 hour',
        mode: 'Online only',
      },
      {
        date: '2026-06-28',
        topic: 'Master Class — Weekend 2: AWS Cloud Computing',
        duration: '1 hour',
        mode: 'Online only',
      },
      {
        date: '2026-07-05',
        topic: 'Master Class — Weekend 3: Financial Marketing Management (NCMF & NISM certification pathways)',
        duration: '1 hour',
        mode: 'Online only',
      },
      {
        date: '2026-07-12',
        topic: 'Bootcamp — Weekend 4: Full-module kickoff & shared foundations (all four domains)',
        duration: '3 hours',
        mode: 'Online only',
      },
      {
        date: '2026-07-19',
        topic: 'Bootcamp — Weekend 5: AI Security & Cyber Security',
        duration: '3 hours',
        mode: 'Online only',
      },
      {
        date: '2026-07-26',
        topic: 'Bootcamp — Weekend 6: AWS Cloud Computing (IAM, EC2, VPC & networking labs)',
        duration: '3 hours',
        mode: 'Online only',
      },
      {
        date: '2026-08-02',
        topic: 'Bootcamp — Weekend 7: Financial Marketing & integrated capstone (compliance, campaign design, review)',
        duration: '3 hours',
        mode: 'Online only',
      },
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
        quote:
          'The AI security labs turned abstract risks into skills I could use immediately. Threat modeling for LLMs went from intimidating to practical.',
        role: 'AI & Cyber Security track',
      },
      {
        quote:
          'The AWS path made IAM, EC2, and networking build on each other naturally. The hands-on exercises felt like real work, not theory.',
        role: 'AWS Cloud Computing track',
      },
      {
        quote:
          'Financial markets finally clicked. NISM concepts and risk were explained clearly—exactly what I needed as someone new to investing.',
        role: 'Financial Markets & Management track',
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
        q: 'Do I need cloud accounts for labs?',
        a: 'Most labs use open-source tools you can run locally or in our guided lab setup—no paid cloud subscription is required to start. When a session needs cloud resources (for example AWS Cloud Computing labs), we will say so in advance; you may create an AWS free-tier account only if required for that lab. If you use your own cloud account or company environment, follow organizational policies and obtain admin approval where needed.',
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
      company: 'Upskill Fleet Academy',
      tagline: 'Practical learning. Industry experience. Career growth.',
      closing:
        "Whether you're starting your journey in technology or advancing into specialized security or financial markets roles, our programs help you build skills that matter in today's AI-driven world.",
      address: 'Remote-first · Weekend online cohorts',
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
    if (supporting) {
      const supText = (typeof site.heroSupporting === 'string' && site.heroSupporting.trim()) || '';
      supporting.textContent = supText;
      supporting.classList.toggle('hidden', !supText);
    }

    const legacyTitle = $('#hero-title');
    if (legacyTitle) legacyTitle.textContent = site.title || '';

    const p = $('#hero-primary-cta');
    const s = $('#hero-secondary-cta');
    const t = $('#hero-tertiary-cta');
    if (p) p.textContent = site.primaryCta || 'Explore Programs';
    if (s) s.textContent = site.secondaryCta || 'View Schedule';
    if (t) t.textContent = site.tertiaryCta || 'Register Interest';
  }

  function renderLearningDomains() {
    const host = $('#domains-grid');
    if (!host || !Array.isArray(data.learningDomains)) return;
    host.innerHTML = data.learningDomains
      .map(
        (d) => `
      <a href="${escapeHtml(d.href || '#courses')}" class="card-surface rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 block hover:border-sky-300 dark:hover:border-sky-600 transition-colors group text-center sm:text-left">
        <span class="text-2xl" aria-hidden="true">${escapeHtml(d.icon || '')}</span>
        <h3 class="text-base font-semibold text-slate-900 dark:text-white mt-3 group-hover:text-sky-700 dark:group-hover:text-sky-300">${escapeHtml(d.name || '')}</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">${escapeHtml(d.description || '')}</p>
      </a>`
      )
      .join('');
  }

  function renderValueProposition() {
    const vp = data.valueProposition;
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
        <span class="text-sky-600 dark:text-sky-400 shrink-0" aria-hidden="true">→</span>
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
    const coursesTitle = $('#courses-title');
    const coursesIntro = $('#courses-intro');
    if (coursesTitle) coursesTitle.textContent = site.coursesTitle || 'Course catalog';
    if (coursesIntro) coursesIntro.textContent = site.coursesIntro || '';
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
    const courses = Array.isArray(data.courses) ? data.courses : [];
    const opts = courses.map(
      (c) =>
        `<option value="${escapeHtml(c.id || c.domain || '')}">${escapeHtml(c.domain || c.id || '')}</option>`
    );
    sel.innerHTML =
      opts.join('') +
      '<option value="multiple">Multiple learning paths</option>';
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

    const host = $('#testimonials-grid');
    if (!host || !Array.isArray(data.testimonials)) return;
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
    renderLearningDomains();
    renderValueProposition();
    renderAboutIntro();
    renderTrainers();
    renderCourses();
    renderOutcomes();
    renderRegistrationOptions();
    renderSessions();
    renderCurriculum();
    renderResources();
    renderTestimonials();
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
