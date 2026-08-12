document.addEventListener('DOMContentLoaded', () => {
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
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    initCommunitySection();
    initInstallCopy();
    initSupportGlow();
});

function initSupportGlow() {
    const card = document.querySelector('.support-inner');
    if (!card) return;

    const STIFFNESS = 0.020;
    const DAMPING = 0.82;

    let targetX = 0, targetY = 0;
    let posX = 0, posY = 0, velX = 0, velY = 0;
    let hovering = false, raf = null;

    const setTarget = (e) => {
        const rect = card.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
    };

    const tick = () => {
        velX = (velX + (targetX - posX) * STIFFNESS) * DAMPING;
        velY = (velY + (targetY - posY) * STIFFNESS) * DAMPING;
        posX += velX;
        posY += velY;
        card.style.setProperty('--mx', `${posX}px`);
        card.style.setProperty('--my', `${posY}px`);

        const settled = Math.abs(velX) < 0.03 && Math.abs(velY) < 0.03
            && Math.abs(targetX - posX) < 0.03 && Math.abs(targetY - posY) < 0.03;
        if (hovering || !settled) {
            raf = requestAnimationFrame(tick);
        } else {
            raf = null;
        }
    };

    card.addEventListener('mouseenter', (e) => {
        hovering = true;
        setTarget(e);
        posX = targetX; posY = targetY; velX = 0; velY = 0;
        card.style.setProperty('--mx', `${posX}px`);
        card.style.setProperty('--my', `${posY}px`);
        if (!raf) raf = requestAnimationFrame(tick);
    });

    card.addEventListener('mousemove', setTarget);

    card.addEventListener('mouseleave', () => {
        hovering = false;
    });
}

function initInstallCopy() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const text = btn.dataset.copy;
            if (!text) return;

            try {
                await navigator.clipboard.writeText(text);
            } catch {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); } catch { }
                ta.remove();
            }

            btn.classList.add('copied');
            btn.setAttribute('aria-label', 'Copied!');
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.setAttribute('aria-label', 'Copy command');
            }, 1600);
        });
    });
}

function initCommunitySection() {
    const bubblesContainer = document.getElementById('community-bubbles');
    const countEl = document.getElementById('community-count');
    if (!bubblesContainer) return;

    const GUILD_ID = '1503031381461303364';
    const INVITE_API = 'https://discord.com/api/v10/invites/GCmPNpJZM7?with_counts=true';
    const WIDGET_API = `https://discord.com/api/guilds/${GUILD_ID}/widget.json`;
    const MAX_BUBBLES = 50;
    const MIN_BUBBLES = 10;
    const BUBBLE_SCALE = 1.3;

    const BUBBLE_POSITIONS = [
        { size: 62, top: 10, left: 6,  delay: 0,   duration: 5.2 },
        { size: 48, top: 58, left: 3,  delay: 1.1, duration: 6.8 },
        { size: 40, top: 76, left: 12, delay: 2.3, duration: 4.9 },
        { size: 54, top: 18, left: 20, delay: 0.7, duration: 7.1 },
        { size: 36, top: 68, left: 24, delay: 3.2, duration: 5.5 },
        { size: 44, top: 4,  left: 32, delay: 1.8, duration: 6.2 },
        { size: 66, left: 70, top: 10, delay: 2.1, duration: 5.8 },
        { size: 46, left: 80, top: 62, delay: 0.9, duration: 7.3 },
        { size: 38, left: 88, top: 22, delay: 3.6, duration: 4.7 },
        { size: 56, left: 74, top: 76, delay: 1.5, duration: 6.0 },
        { size: 32, left: 63, top: 84, delay: 2.8, duration: 5.1 },
        { size: 50, left: 58, top: 4,  delay: 0.3, duration: 7.6 },
        { size: 42, left: 10, top: 40, delay: 1.2, duration: 6.5 },
        { size: 34, left: 20, top: 92, delay: 2.6, duration: 5.3 },
        { size: 52, left: 84, top: 46, delay: 0.5, duration: 7.0 },
        { size: 38, left: 78, top: 90, delay: 3.1, duration: 4.8 },
        { size: 30, left: 2,  top: 30, delay: 1.9, duration: 6.6 },
        { size: 44, left: 66, top: 52, delay: 2.4, duration: 5.7 },
        { size: 36, left: 90, top: 84, delay: 0.8, duration: 7.2 },
        { size: 40, left: 6,  top: 66, delay: 3.4, duration: 5.0 },
    ];

    const FALLBACK_COLORS = [
        ['#5865F2','#4752c4'], ['#57F287','#23A559'], ['#FEE75C','#f0c840'],
        ['#EB459E','#c03d85'], ['#ED4245','#c73b3e'], ['#3ba55c','#2d7d46'],
        ['#9B59B6','#7d4593'], ['#1ABC9C','#16a085'], ['#E67E22','#ca6f1e'],
        ['#3498DB','#2980b9'], ['#E91E63','#c2185b'], ['#607D8B','#546e7a'],
    ];

    fetch(INVITE_API)
        .then(r => r.json())
        .then(data => {
            const count = data.approximate_member_count;
            if (!count) throw new Error('no member count');
            if (countEl) countEl.textContent = count.toLocaleString();
        })
        .catch(() => {
            const stats = document.getElementById('community-stats');
            if (stats) stats.style.display = 'none';
        });

    fetch(WIDGET_API)
        .then(r => {
            if (!r.ok) throw new Error('widget disabled');
            return r.json();
        })
        .then(data => {
            const online = (data.members || []).map(m => m.avatar_url).filter(Boolean);
            renderBubbles(buildAvatarList(online));
        })
        .catch(() => {
            renderBubbles(buildAvatarList([]));
        });

    function buildAvatarList(onlineUrls) {
        const urls = onlineUrls.slice(0, MAX_BUBBLES);

        if (urls.length < MIN_BUBBLES && typeof CONTRIBUTORS_DATA !== 'undefined') {
            const seen = new Set(urls);
            for (const c of CONTRIBUTORS_DATA) {
                if (urls.length >= MIN_BUBBLES) break;
                const url = contributorAvatarUrl(c);
                if (url && !seen.has(url)) {
                    urls.push(url);
                    seen.add(url);
                }
            }
        }
        return urls.slice(0, MAX_BUBBLES);
    }

    function contributorAvatarUrl(c) {
        if (c.avatar_url) return c.avatar_url;
        if (c.platform === 'github') return `https://github.com/${c.name}.png`;
        if (c.platform === 'reddit') return `https://ui-avatars.com/api/?name=${c.name}&background=FF4500&color=fff&size=200&font-size=0.33`;
        if (c.platform === 'discord') return `https://ui-avatars.com/api/?name=${c.name}&background=5865F2&color=fff&size=200&font-size=0.33`;
        return '';
    }

    function renderBubbles(avatarUrls) {
        bubblesContainer.innerHTML = '';
        const count = Math.min(avatarUrls.length, MAX_BUBBLES);
        const positions = BUBBLE_POSITIONS.slice(0, count);

        positions.forEach((pos, i) => {
            const el = document.createElement('div');
            el.className = 'bubble';
            el.style.cssText = `
                width: ${Math.round(pos.size * BUBBLE_SCALE)}px;
                height: ${Math.round(pos.size * BUBBLE_SCALE)}px;
                top: ${pos.top}%;
                left: ${pos.left}%;
                animation-delay: -${pos.delay}s;
                animation-duration: ${pos.duration}s;
            `;

            const url = avatarUrls[i];
            if (url) {
                const img = document.createElement('img');
                img.src = url;
                img.alt = '';
                img.loading = 'lazy';
                img.onerror = () => {
                    img.remove();
                    const fb = makeFallbackInner(i);
                    el.appendChild(fb);
                };
                el.style.borderColor = 'rgba(255,255,255,0.15)';
                el.appendChild(img);
            } else {
                el.appendChild(makeFallbackInner(i));
            }

            bubblesContainer.appendChild(el);
        });
    }

    function makeFallbackInner(i) {
        const [c1, c2] = FALLBACK_COLORS[i % FALLBACK_COLORS.length];
        const div = document.createElement('div');
        div.className = 'bubble-placeholder';
        div.style.background = `linear-gradient(135deg, ${c1}55, ${c2}88)`;
        return div;
    }
}
