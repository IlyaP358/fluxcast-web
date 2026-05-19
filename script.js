document.addEventListener('DOMContentLoaded', () => {
    const DOCS_URL = 'https://raw.githubusercontent.com/IlyaP358/fluxcast/main/documentation/DOCUMENTATION.md';
    const container = document.getElementById('markdown-content');

    marked.setOptions({
        highlight: function(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-',
        gfm: true,
        breaks: true
    });

    fetch(DOCS_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(markdown => {
            const htmlContent = marked.parse(markdown);
            
            container.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error fetching documentation:', error);
            container.innerHTML = `
                <div style="text-align: center; color: #EF4444; padding: 2rem;">
                    <h3>Failed to load documentation</h3>
                    <p>There was an error loading the latest documentation from GitHub.</p>
                    <a href="https://github.com/IlyaP358/fluxcast/blob/main/documentation/documentation.md" target="_blank" class="btn btn-secondary" style="margin-top: 1rem; display: inline-block;">
                        View on GitHub
                    </a>
                </div>
            `;
        });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
