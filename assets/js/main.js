(function () {
    'use strict';

    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('drawerOverlay');
    const menuToggle = document.getElementById('menuToggle');
    const drawerClose = document.getElementById('drawerClose');
    const backTop = document.getElementById('backTop');
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    const toast = document.getElementById('toast');

    let toastTimer = null;
    let isDark = true;
    let langMenuVisible = false;

    function openDrawer() {
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (menuToggle) menuToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    window.addEventListener('scroll', function () {
        if (backTop) {
            if (window.scrollY > 420) {
                backTop.classList.add('visible');
            } else {
                backTop.classList.remove('visible');
            }
        }
    });
    if (backTop) {
        backTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function setTheme(dark) {
        isDark = dark;
        document.body.classList.toggle('light', !dark);
        try {
            localStorage.setItem('blog-theme', dark ? 'dark' : 'light');
        } catch (e) { }

        if (themeToggle) {
            const svg = dark ?
                '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>' :
                '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>';
            themeToggle.innerHTML = svg;
        }
    }

    function initTheme() {
        let saved = 'dark';
        try {
            const stored = localStorage.getItem('blog-theme');
            if (stored === 'light' || stored === 'dark') {
                saved = stored;
            }
        } catch (e) { }
        setTheme(saved === 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            setTheme(!isDark);

            // 从语言包取文案，取不到就兜底
            var lang = (typeof window.getCurrentLang === 'function') ? window.getCurrentLang() : 'zh';
            var langData = (window.LANG && window.LANG[lang]) ? window.LANG[lang] : (window.LANG && window.LANG['zh']) || {};
            var fallback = isDark ? '已切换到深色模式' : '已切换到浅色模式';
            var msg = isDark
                ? (langData['theme.toast.dark'] || fallback)
                : (langData['theme.toast.light'] || fallback);

            showToast(msg);
        });
    }

    function createLangMenu() {
        const menu = document.createElement('div');
        menu.id = 'langMenu';
        menu.style.cssText = `
            position: fixed;
            top: 60px;
            right: 16px;
            background: var(--bg-card);
            backdrop-filter: blur(16px);
            border: 1px solid var(--border-light);
            border-radius: var(--radius-sm);
            box-shadow: var(--shadow-heavy);
            padding: 8px 0;
            z-index: 300;
            min-width: 120px;
            display: none;
            flex-direction: column;
        `;

        const menuItems = window.LANG_MENU_ITEMS || { 'zh': '中文', 'en': 'English' };
        const langCodes = Object.keys(menuItems);

        langCodes.forEach(code => {
            const btn = document.createElement('button');
            const displayName = menuItems[code] || code.toUpperCase();

            btn.textContent = displayName;
            btn.style.cssText = `
                background: transparent;
                border: none;
                color: var(--text-primary);
                padding: 8px 20px;
                text-align: left;
                cursor: pointer;
                font-size: 0.9rem;
                font-family: var(--font);
                transition: background 0.2s;
            `;
            btn.addEventListener('mouseenter', () => btn.style.background = 'var(--accent-dim)');
            btn.addEventListener('mouseleave', () => btn.style.background = 'transparent');
            btn.addEventListener('click', function () {
                window.setLanguage(code);
                hideLangMenu();
            });

            menu.appendChild(btn);
        });

        document.body.appendChild(menu);
        return menu;
    }

    let langMenu = null;

    function showLangMenu() {
        if (!langMenu) langMenu = createLangMenu();
        langMenu.style.display = 'flex';
        langMenuVisible = true;
    }

    function hideLangMenu() {
        if (langMenu) langMenu.style.display = 'none';
        langMenuVisible = false;
    }

    function toggleLangMenu(e) {
        e.stopPropagation();
        if (langMenuVisible) {
            hideLangMenu();
        } else {
            showLangMenu();
        }
    }

    if (langToggle) {
        langToggle.addEventListener('click', toggleLangMenu);
        document.addEventListener('click', function (e) {
            if (langMenuVisible && !langMenu.contains(e.target) && e.target !== langToggle) {
                hideLangMenu();
            }
        });
    }

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            toast.classList.remove('show');
        }, 2200);
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (drawer && drawer.classList.contains('open')) closeDrawer();
            if (langMenuVisible) hideLangMenu();
        }
    });

    initTheme();
    window.initLanguage();

    window.showToast = showToast;
    console.log('你好，简页！');
})();