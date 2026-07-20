document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    const close = () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

    document.addEventListener('click', (e) => {
        if (links.classList.contains('open') && !links.contains(e.target) && !toggle.contains(e.target)) {
            close();
        }
    });
});
