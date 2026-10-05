/**
 * LEAP — main.js
 * Shared utilities: navigation, data loading, card rendering, filtering
 */

/* ============================================================
   NAVIGATION
   ============================================================ */

function initNav() {
  const toggle = document.getElementById('nav-mobile-toggle');
  const mobileMenu = document.getElementById('nav-mobile');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.innerHTML = open ? iconX() : iconMenu();
    });
  }

  // Close mobile nav on link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        if (toggle) {
          toggle.setAttribute('aria-expanded', false);
          toggle.innerHTML = iconMenu();
        }
      });
    });
  }

  // Keyboard dropdown support
  document.querySelectorAll('.nav-item').forEach(item => {
    const trigger = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');
    if (trigger && dropdown) {
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.classList.toggle('open');
        }
        if (e.key === 'Escape') {
          item.classList.remove('open');
          trigger.focus();
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.nav-item.open').forEach(item => item.classList.remove('open'));
    }
  });

  // Mark active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPath) && currentPath !== 'index.html') {
      link.classList.add('active');
    }
  });
}

function iconMenu() {
  return `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
    <line x1="3" y1="6" x2="17" y2="6"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="14" x2="17" y2="14"/>
  </svg>`;
}

function iconX() {
  return `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
    <line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/>
  </svg>`;
}


/* ============================================================
   DATA LOADING
   Loads one or more JSON files from the data/ directory.
   ============================================================ */

/**
 * Load all JSON files for a given section by fetching an index.
 * Falls back to loading individual items by ID array if provided.
 * @param {string} folder - e.g. 'resources'
 * @param {string[]} fileNames - e.g. ['cr-001.json','cr-002.json']
 * @returns {Promise<Object[]>}
 */
async function loadItems(folder, fileNames) {
  const root = getSiteRoot();
  const promises = fileNames.map(name =>
    fetch(`${root}data/${folder}/${name}`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status} for ${name}`);
        return r.json();
      })
      .catch(err => {
        console.warn('[LEAP] Could not load', name, err.message);
        return null;
      })
  );
  const results = await Promise.all(promises);
  return results.filter(Boolean);
}

/**
 * Returns the path from the current page back to the site root,
 * read from data-root on <html>. Every HTML page must set this:
 *   - Root pages (index.html):  <html data-root="./">
 *   - Pages in /pages/:         <html data-root="../">
 * This is the single source of truth — no URL parsing.
 */
function getSiteRoot() {
  const root = document.documentElement.dataset.root;
  if (!root) {
    console.error('[LEAP] Missing data-root on <html>. Set data-root="./" or data-root="../"');
    return './';
  }
  return root;
}


/* ============================================================
   FILTER SYSTEM
   ============================================================ */

/**
 * Initialize tag-based filtering for a card grid.
 * @param {string} filterBarId - ID of the filter bar container
 * @param {string} gridId - ID of the cards grid container
 * @param {string[]} allTags - all possible tag values
 * @param {Object[]} items - loaded data items
 */
function initFilters(filterBarId, gridId, allTags, items) {
  const filterBar = document.getElementById(filterBarId);
  const grid = document.getElementById(gridId);
  const clearBtn = filterBar ? filterBar.querySelector('.filter-clear') : null;
  if (!filterBar || !grid) return;

  let activeFilters = new Set();

  const tagContainer = filterBar.querySelector('.filter-tags');
  if (!tagContainer) return;

  // Render filter tags
  tagContainer.innerHTML = '';
  allTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'filter-tag';
    btn.textContent = formatTag(tag);
    btn.dataset.tag = tag;
    btn.addEventListener('click', () => toggleFilter(tag, btn));
    tagContainer.appendChild(btn);
  });

  function toggleFilter(tag, btn) {
    if (activeFilters.has(tag)) {
      activeFilters.delete(tag);
      btn.classList.remove('active');
    } else {
      activeFilters.add(tag);
      btn.classList.add('active');
    }
    applyFilters();
    if (clearBtn) clearBtn.classList.toggle('visible', activeFilters.size > 0);
  }

  function applyFilters() {
    const cards = grid.querySelectorAll('.resource-card');
    let visibleCount = 0;

    cards.forEach(card => {
      if (activeFilters.size === 0) {
        card.hidden = false;
        visibleCount++;
        return;
      }
      const cardTags = (card.dataset.tags || '').split(',').map(t => t.trim());
      const matches = [...activeFilters].every(f => cardTags.includes(f));
      card.hidden = !matches;
      if (matches) visibleCount++;
    });

    // Show/hide empty state
    let empty = grid.querySelector('.cards-empty');
    if (visibleCount === 0) {
      if (!empty) {
        empty = document.createElement('div');
        empty.className = 'cards-empty';
        empty.innerHTML = `
          <p class="cards-empty-title">No matches found</p>
          <p>Try removing some filters to see more resources.</p>`;
        grid.appendChild(empty);
      }
    } else if (empty) {
      empty.remove();
    }
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeFilters.clear();
      filterBar.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
      applyFilters();
      clearBtn.classList.remove('visible');
    });
  }
}


/* ============================================================
   CARD RENDERING
   ============================================================ */

/**
 * Render a resource card element from a data item.
 * @param {Object} item - JSON data item
 * @param {string} detailPage - relative path to the detail page
 * @returns {HTMLElement}
 */
function renderCard(item, detailPage) {
  const card = document.createElement('a');
  card.className = 'resource-card';
  card.href = `${detailPage}?id=${item.id}`;
  card.dataset.tags = (item.tags || []).join(', ');
  card.setAttribute('aria-label', item.title);

  card.innerHTML = `
    <div class="card-meta">
      <span class="card-format">${escHtml(item.format || '')}</span>
      ${item.duration ? `<span class="card-meta-dot"></span><span class="card-duration">${escHtml(item.duration)}</span>` : ''}
    </div>
    <h3 class="card-title">${escHtml(item.title)}</h3>
    ${item.subtitle ? `<p class="card-subtitle">${escHtml(item.subtitle)}</p>` : ''}
    <p class="card-summary">${escHtml(item.summary)}</p>
    <div class="card-tags">
      ${(item.tags || []).slice(0, 4).map(t => `<span class="card-tag">${escHtml(formatTag(t))}</span>`).join('')}
    </div>
    <span class="card-action">
      View resource
      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 7h10M7.5 2.5 12 7l-4.5 4.5"/>
      </svg>
    </span>
  `;
  return card;
}

/**
 * Render a news/event card for the homepage.
 */
function renderNewsCard(item, detailPage) {
  const card = document.createElement('a');
  card.className = 'news-card';
  card.href = `${detailPage}?id=${item.id}`;

  const dateStr = item.date ? formatDate(item.date) : (item.dateAdded ? formatDate(item.dateAdded) : '');

  card.innerHTML = `
    <span class="news-card-date">${escHtml(dateStr)}</span>
    <div>
      <p class="news-card-title">${escHtml(item.title)}</p>
      <p class="news-card-summary">${escHtml(item.summary)}</p>
    </div>
  `;
  return card;
}


/* ============================================================
   DETAIL PAGE RENDERER
   Renders body[] array from JSON into the detail page.
   ============================================================ */

/**
 * Render a detail body array into a container element.
 * @param {Object[]} bodyBlocks - array of body block objects
 * @param {HTMLElement} container - target DOM element
 */
function renderDetailBody(bodyBlocks, container) {
  container.innerHTML = '';
  bodyBlocks.forEach(block => {
    container.appendChild(renderBodyBlock(block));
  });
}

function renderBodyBlock(block) {
  switch (block.type) {
    case 'section-heading': {
      const el = document.createElement('h2');
      el.className = 'detail-section-heading';
      el.textContent = block.text;
      return el;
    }
    case 'paragraph': {
      const el = document.createElement('p');
      el.className = 'detail-paragraph';
      el.textContent = block.text;
      return el;
    }
    case 'list': {
      const ul = document.createElement('ul');
      ul.className = 'detail-list';
      block.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
      return ul;
    }
    case 'numbered-list': {
      const ol = document.createElement('ol');
      ol.className = 'detail-numbered-list';
      block.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ol.appendChild(li);
      });
      return ol;
    }
    case 'download': {
      const a = document.createElement('a');
      a.className = 'detail-download';
      a.href = block.url || '#';
      a.innerHTML = `
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 1v8M4 6l3 3 3-3M2 11h10"/>
        </svg>
        ${escHtml(block.label)}
      `;
      return a;
    }
    default: {
      const el = document.createElement('div');
      return el;
    }
  }
}


/* ============================================================
   HELPERS
   ============================================================ */

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatTag(tag) {
  return tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return dateStr; }
}

function collectAllTags(items) {
  const tagSet = new Set();
  items.forEach(item => (item.tags || []).forEach(t => tagSet.add(t)));
  return [...tagSet].sort();
}

function showLoading(container) {
  container.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner-ring"></div>
      <span>Loading…</span>
    </div>`;
}

function showError(container, msg) {
  container.innerHTML = `<p style="color:var(--color-text-muted);padding:2rem 0;">${escHtml(msg)}</p>`;
}

/**
 * Fill a grid with skeleton placeholder cards while real data loads.
 * @param {HTMLElement} grid       - the .cards-grid element
 * @param {number}      count      - number of skeleton cards to render (default 6)
 */
function showSkeletonCards(grid, count = 6) {
  grid.innerHTML = '';
  for (let i = 0; i < count; i++) {
    // Vary widths slightly so cards don't look identical
    const titleWidth  = ['85%', '75%', '90%', '70%', '80%'][i % 5];
    const subWidth    = ['60%', '50%', '65%', '55%', '70%'][i % 5];
    const line2Width  = ['100%', '90%', '95%', '85%', '100%'][i % 5];

    const card = document.createElement('div');
    card.className = 'skeleton-card';
    card.setAttribute('aria-hidden', 'true');
    card.innerHTML = `
      <div class="sk sk-meta"></div>
      <div class="sk sk-title" style="width:${titleWidth}"></div>
      <div class="sk sk-sub"   style="width:${subWidth}"></div>
      <div class="sk sk-line"></div>
      <div class="sk sk-line" style="width:${line2Width}"></div>
      <div class="sk sk-line-short"></div>
      <div class="sk-tags">
        <div class="sk sk-tag"></div>
        <div class="sk sk-tag"></div>
        <div class="sk sk-tag" style="width:80px"></div>
      </div>
      <div class="sk sk-action" style="margin-top:auto;padding-top:0.5rem"></div>
    `;
    grid.appendChild(card);
  }
}

// Shared HTML fragments for nav (included in every page)
function getNavHTML() {
  const base = getSiteRoot();
  return `
  <nav class="site-nav" aria-label="Main navigation">
    <div class="container nav-inner">
      <a href="${base}index.html" class="nav-wordmark" aria-label="LEAP home">
        <span class="nav-wordmark-text">LEAP</span>
        <span class="nav-wordmark-sub">AI Literacy for Everyone</span>
      </a>

      <div class="nav-links" role="menubar">

        <div class="nav-item" role="none">
          <a href="${base}pages/classroom-resources.html" class="nav-link" role="menuitem" aria-haspopup="true">
            For Educators
            <svg class="chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M2 4l4 4 4-4"/>
            </svg>
          </a>
          <div class="nav-dropdown" role="menu">
            <a href="${base}pages/classroom-resources.html" class="dropdown-link" role="menuitem">Classroom Resources</a>
            <a href="${base}pages/educator-training.html" class="dropdown-link" role="menuitem">Educator Training</a>
          </div>
        </div>

        <div class="nav-item" role="none">
          <a href="${base}pages/parent-resources.html" class="nav-link" role="menuitem">
            For Families
          </a>
        </div>

        <div class="nav-item" role="none">
          <a href="${base}pages/interactive-demos.html" class="nav-link" role="menuitem">
            Interactive Demos
          </a>
        </div>

        <div class="nav-item" role="none">
          <a href="${base}pages/news-events.html" class="nav-link" role="menuitem" aria-haspopup="true">
            News &amp; Events
            <svg class="chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M2 4l4 4 4-4"/>
            </svg>
          </a>
          <div class="nav-dropdown" role="menu">
            <a href="${base}pages/news-events.html" class="dropdown-link" role="menuitem">All Events</a>
            <a href="${base}pages/research.html" class="dropdown-link" role="menuitem">Research</a>
          </div>
        </div>

        <div class="nav-item" role="none">
          <a href="${base}pages/about.html" class="nav-link" role="menuitem" aria-haspopup="true">
            About
            <svg class="chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M2 4l4 4 4-4"/>
            </svg>
          </a>
          <div class="nav-dropdown" role="menu">
            <a href="${base}pages/about.html#team" class="dropdown-link" role="menuitem">Our Team</a>
            <a href="${base}pages/about.html#philosophy" class="dropdown-link" role="menuitem">Philosophy</a>
            <a href="${base}pages/about.html#research" class="dropdown-link" role="menuitem">Research</a>
          </div>
        </div>

      </div>

      <div class="nav-right">
        <a href="${base}pages/contact.html" class="btn btn-primary" style="font-size:0.8125rem;">Get Involved</a>
      </div>

      <button id="nav-mobile-toggle" class="nav-mobile-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-mobile">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
          <line x1="3" y1="6" x2="17" y2="6"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="14" x2="17" y2="14"/>
        </svg>
      </button>
    </div>
  </nav>

  <div id="nav-mobile" class="nav-mobile" role="dialog" aria-label="Mobile navigation">
    <div class="nav-mobile-section">
      <span class="nav-mobile-label">For Educators</span>
      <a href="${base}pages/classroom-resources.html" class="nav-mobile-link">Classroom Resources</a>
      <a href="${base}pages/educator-training.html" class="nav-mobile-link">Educator Training</a>
    </div>
    <div class="nav-mobile-section">
      <span class="nav-mobile-label">For Families</span>
      <a href="${base}pages/parent-resources.html" class="nav-mobile-link">Parent Resources</a>
    </div>
    <div class="nav-mobile-section">
      <a href="${base}pages/interactive-demos.html" class="nav-mobile-link">Interactive Demos</a>
    </div>
    <div class="nav-mobile-section">
      <span class="nav-mobile-label">News &amp; Events</span>
      <a href="${base}pages/news-events.html" class="nav-mobile-link">All Events</a>
      <a href="${base}pages/research.html" class="nav-mobile-link">Research</a>
    </div>
    <div class="nav-mobile-section">
      <span class="nav-mobile-label">About</span>
      <a href="${base}pages/about.html#team" class="nav-mobile-link">Our Team</a>
      <a href="${base}pages/about.html#philosophy" class="nav-mobile-link">Philosophy</a>
      <a href="${base}pages/about.html#research" class="nav-mobile-link">Research</a>
    </div>
    <div style="padding:1.5rem 0;">
      <a href="${base}pages/contact.html" class="btn btn-primary" style="width:100%;justify-content:center;">Get Involved</a>
    </div>
  </div>
  `;
}

function getFooterHTML() {
  const base = getSiteRoot();
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">LEAP</div>
          <p class="footer-tagline">AI literacy resources, research, and materials — freely available to educators, families, and communities.</p>
        </div>
        <div>
          <p class="footer-col-title">For Educators</p>
          <div class="footer-links">
            <a href="${base}pages/classroom-resources.html" class="footer-link">Classroom Resources</a>
            <a href="${base}pages/educator-training.html" class="footer-link">Educator Training</a>
            <a href="${base}pages/interactive-demos.html" class="footer-link">Interactive Demos</a>
          </div>
        </div>
        <div>
          <p class="footer-col-title">For Families</p>
          <div class="footer-links">
            <a href="${base}pages/parent-resources.html" class="footer-link">Parent Resources</a>
            <a href="${base}pages/news-events.html" class="footer-link">Events</a>
          </div>
        </div>
        <div>
          <p class="footer-col-title">About LEAP</p>
          <div class="footer-links">
            <a href="${base}pages/about.html" class="footer-link">Our Team</a>
            <a href="${base}pages/about.html#philosophy" class="footer-link">Philosophy</a>
            <a href="${base}pages/research.html" class="footer-link">Research</a>
            <a href="${base}pages/contact.html" class="footer-link">Get Involved</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 LEAP Initiative. Free to use and share with attribution.</span>
        <span><a href="${base}pages/contact.html">Contact</a></span>
      </div>
    </div>
  </footer>
  `;
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  // Inject nav if placeholder exists
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) navPlaceholder.innerHTML = getNavHTML();

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.innerHTML = getFooterHTML();

  initNav();
});
