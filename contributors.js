document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('contributors-grid');

    const githubIcon = `<svg class="platform-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>`;
    const redditIcon = `<svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M22 11.5c0-1.38-1.12-2.5-2.5-2.5-.72 0-1.37.31-1.82.81-1.57-1.09-3.71-1.78-6.1-1.87l1.04-4.88 4.25.91c0 1.24 1.01 2.25 2.25 2.25 1.24 0 2.25-1.01 2.25-2.25s-1.01-2.25-2.25-2.25c-.83 0-1.55.45-1.92 1.13l-4.71-1.01c-.18-.04-.37.07-.42.24L8.74 8.01C6.27 8.06 4.05 8.76 2.45 9.87 1.98 9.34 1.3 9 0.5 9 0.08 9-0.89 10.12-0.89 11.5c0 1.01.62 1.87 1.49 2.26-.06.32-.09.65-.09.99 0 4.14 4.56 7.5 10.18 7.5s10.18-3.36 10.18-7.5c0-.34-.03-.67-.09-.99C21.38 13.37 22 12.51 22 11.5zm-15.65 1.98c0-1.12.91-2.03 2.03-2.03 1.12 0 2.03.91 2.03 2.03 0 1.12-.91 2.03-2.03 2.03-1.12 0-2.03-.91-2.03-2.03zm7.39 5.37c-1.31 1.31-4.04 1.31-5.35 0-.15-.15-.15-.39 0-.54.15-.15.39-.15.54 0 .91.91 2.65.91 3.56 0 .15-.15.39-.15.54 0 .15.15.15.39 0 .54zm-.74-3.34c-1.12 0-2.03-.91-2.03-2.03 0-1.12.91-2.03 2.03-2.03 1.12 0 2.03.91 2.03 2.03 0 1.12-.91 2.03-2.03 2.03z"></path></svg>`;

    const renderContributors = (contributors) => {
        contributors.forEach(c => {
            const card = document.createElement('a');
            card.className = 'contributor-card';
            card.href = c.url;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';

            let avatarSrc = '';
            let platformDisplay = '';

            if (c.platform === 'github') {
                avatarSrc = `https://github.com/${c.name}.png`;
                platformDisplay = `${githubIcon} GitHub`;
            } else if (c.platform === 'reddit') {
                platformDisplay = `${redditIcon} Reddit`;
                avatarSrc = `https://ui-avatars.com/api/?name=${c.name}&background=FF4500&color=fff&size=200&font-size=0.33`;
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

            grid.appendChild(card);
        });
    };

    if (typeof CONTRIBUTORS_DATA !== 'undefined') {
        renderContributors(CONTRIBUTORS_DATA);
    } else {
        console.error("CONTRIBUTORS_DATA is not defined. Make sure contributors_data.js is loaded.");
    }
});
