document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('contributors-grid');
    const supportersGrid = document.getElementById('supporters-grid');

    const githubIcon = `<svg class="platform-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>`;
    const redditIcon = `<svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M22 11.5c0-1.38-1.12-2.5-2.5-2.5-.72 0-1.37.31-1.82.81-1.57-1.09-3.71-1.78-6.1-1.87l1.04-4.88 4.25.91c0 1.24 1.01 2.25 2.25 2.25 1.24 0 2.25-1.01 2.25-2.25s-1.01-2.25-2.25-2.25c-.83 0-1.55.45-1.92 1.13l-4.71-1.01c-.18-.04-.37.07-.42.24L8.74 8.01C6.27 8.06 4.05 8.76 2.45 9.87 1.98 9.34 1.3 9 0.5 9 0.08 9-0.89 10.12-0.89 11.5c0 1.01.62 1.87 1.49 2.26-.06.32-.09.65-.09.99 0 4.14 4.56 7.5 10.18 7.5s10.18-3.36 10.18-7.5c0-.34-.03-.67-.09-.99C21.38 13.37 22 12.51 22 11.5zm-15.65 1.98c0-1.12.91-2.03 2.03-2.03 1.12 0 2.03.91 2.03 2.03 0 1.12-.91 2.03-2.03 2.03-1.12 0-2.03-.91-2.03-2.03zm7.39 5.37c-1.31 1.31-4.04 1.31-5.35 0-.15-.15-.15-.39 0-.54.15-.15.39-.15.54 0 .91.91 2.65.91 3.56 0 .15-.15.39-.15.54 0 .15.15.15.39 0 .54zm-.74-3.34c-1.12 0-2.03-.91-2.03-2.03 0-1.12.91-2.03 2.03-2.03 1.12 0 2.03.91 2.03 2.03 0 1.12-.91 2.03-2.03 2.03z"></path></svg>`;
    const discordIcon = `<svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path></svg>`;
    const kofiIcon = `<svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M11.351 2.715c-2.7 0-4.986.025-6.83.26C2.078 3.285 0 5.154 0 8.61c0 3.506.182 6.13 1.585 8.493 1.584 2.701 4.233 4.182 7.662 4.182h.83c4.209 0 6.494-2.234 7.637-4a9.5 9.5 0 0 0 1.091-2.338C21.792 14.688 24 12.22 24 9.208v-.415c0-3.247-2.13-5.507-5.792-5.87-1.558-.156-2.65-.208-6.857-.208m0 1.947c4.208 0 5.09.052 6.571.182 2.624.311 4.13 1.584 4.13 4v.39c0 2.156-1.792 3.844-3.87 3.844h-.935l-.156.649c-.208 1.013-.597 1.818-1.039 2.546-.909 1.428-2.545 3.064-5.922 3.064h-.805c-2.571 0-4.831-.883-6.078-3.195-1.09-2-1.298-4.155-1.298-7.506 0-2.181.857-3.402 3.012-3.714 1.533-.233 3.559-.26 6.39-.26m6.547 2.287c-.416 0-.65.234-.65.546v2.935c0 .311.234.545.65.545 1.324 0 2.051-.754 2.051-2s-.727-2.026-2.052-2.026m-10.39.182c-1.818 0-3.013 1.48-3.013 3.142 0 1.533.858 2.857 1.949 3.897.727.701 1.87 1.429 2.649 1.896a1.47 1.47 0 0 0 1.507 0c.78-.467 1.922-1.195 2.623-1.896 1.117-1.039 1.974-2.364 1.974-3.897 0-1.662-1.247-3.142-3.039-3.142-1.065 0-1.792.545-2.338 1.298-.493-.753-1.246-1.298-2.312-1.298"></path></svg>`;

    const renderInto = (targetGrid, people) => {
        people.forEach(c => {
            const card = document.createElement('a');
            card.className = 'contributor-card';
            if (c.url) {
                card.href = c.url;
                card.target = '_blank';
                card.rel = 'noopener noreferrer';
            } else {
                card.style.cursor = 'default';
            }

            let avatarSrc = '';
            let platformDisplay = '';

            if (c.platform === 'github') {
                avatarSrc = `https://github.com/${c.name}.png`;
                platformDisplay = `${githubIcon} GitHub`;
            } else if (c.platform === 'reddit') {
                platformDisplay = `${redditIcon} Reddit`;
                avatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF4500&color=fff&size=200&font-size=0.33`;
            } else if (c.platform === 'discord') {
                platformDisplay = `${discordIcon} Discord`;
                avatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=5865F2&color=fff&size=200&font-size=0.33`;
            } else if (c.platform === 'kofi') {
                platformDisplay = `${kofiIcon} Ko-fi`;
                avatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF5E5B&color=fff&size=200&font-size=0.33`;
            }

            if (c.avatar_url) {
                avatarSrc = c.avatar_url;
            }

            card.innerHTML = `
                <img src="${avatarSrc}" alt="${c.name}'s Avatar" class="contributor-avatar">
                <div class="contributor-name">${c.name}</div>
                <div class="contributor-platform">
                    ${platformDisplay}
                </div>
            `;

            targetGrid.appendChild(card);
        });
    };

    if (grid && typeof CONTRIBUTORS_DATA !== 'undefined') {
        renderInto(grid, CONTRIBUTORS_DATA);
    } else {
        console.error("CONTRIBUTORS_DATA is not defined. Make sure contributors_data.js is loaded.");
    }

    if (supportersGrid && typeof SUPPORTERS_DATA !== 'undefined' && SUPPORTERS_DATA.length) {
        renderInto(supportersGrid, SUPPORTERS_DATA);
        const section = document.getElementById('supporters-section');
        if (section) section.style.display = '';
    }
});
