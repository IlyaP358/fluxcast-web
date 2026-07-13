document.addEventListener('DOMContentLoaded', () => {
    const DOCS_URL = 'https://raw.githubusercontent.com/IlyaP358/fluxcast/main/documentation/DOCUMENTATION.md';
    const container = document.getElementById('markdown-content');
    const sidebarNav = document.getElementById('sidebar-nav');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('docs-sidebar');

    marked.setOptions({
        highlight: function (code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-',
        gfm: true,
        breaks: true
    });

    fetch(DOCS_URL)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(markdown => {
            const htmlContent = marked.parse(markdown);
            container.innerHTML = htmlContent;

            addHeadingIds();
            buildSidebar();

            container.querySelectorAll('pre code').forEach(block => {
                hljs.highlightElement(block);
            });

            initScrollSpy();
        })
        .catch(error => {
            console.error('Error fetching documentation:', error);
            container.innerHTML = `
                <div style="text-align:center;padding:4rem 2rem;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="1.5" style="margin:0 auto 1rem;display:block;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    <h3 style="color:#EF4444;margin-bottom:0.75rem;">Failed to load documentation</h3>
                    <p style="color:var(--text-secondary);margin-bottom:1.5rem;">Could not fetch the latest docs from GitHub.</p>
                    <a href="https://github.com/IlyaP358/fluxcast/blob/main/documentation/DOCUMENTATION.md"
                       target="_blank" rel="noopener noreferrer"
                       class="btn btn-secondary" style="display:inline-flex;align-items:center;gap:0.5rem;">
                        View on GitHub
                    </a>
                </div>
            `;
            sidebarNav.innerHTML = '';
        });

    function slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }

    function addHeadingIds() {
        const headings = container.querySelectorAll('h1, h2, h3, h4');
        const usedIds = {};
        headings.forEach(h => {
            let id = slugify(h.textContent);
            if (usedIds[id]) {
                usedIds[id]++;
                id = `${id}-${usedIds[id]}`;
            } else {
                usedIds[id] = 1;
            }
            h.id = id;
        });
    }

    function buildSidebar() {
        const headings = container.querySelectorAll('h1, h2, h3');
        sidebarNav.innerHTML = '';

        headings.forEach(h => {
            const level = parseInt(h.tagName[1]);
            if (level === 1) return;

            const a = document.createElement('a');
            a.href = `#${h.id}`;
            a.textContent = h.textContent;
            a.dataset.level = level;
            a.dataset.target = h.id;

            a.addEventListener('click', e => {
                e.preventDefault();
                scrollToHeading(h);
                if (window.innerWidth <= 900) sidebar.classList.remove('open');
            });

            sidebarNav.appendChild(a);
        });
    }

    function scrollToHeading(el) {
        const navHeight = 65 + 16;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    function initScrollSpy() {
        const allHeadings = Array.from(container.querySelectorAll('h1, h2, h3'));
        const sidebarLinks = Array.from(sidebarNav.querySelectorAll('a[data-target]'));

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        sidebarLinks.forEach(a => {
                            a.classList.toggle('active', a.dataset.target === id);
                        });
                    }
                });
            },
            {
                rootMargin: '-65px 0px -60% 0px',
                threshold: 0
            }
        );

        allHeadings.forEach(h => observer.observe(h));
    }

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    document.addEventListener('click', e => {
        if (
            window.innerWidth <= 900 &&
            sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            e.target !== sidebarToggle
        ) {
            sidebar.classList.remove('open');
        }
    });
});
