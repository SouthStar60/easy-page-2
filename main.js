(function() {
    'use strict';

    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('drawerOverlay');
    const menuToggle = document.getElementById('menuToggle');
    const drawerClose = document.getElementById('drawerClose');
    const backTop = document.getElementById('backTop');
    const themeToggle = document.getElementById('themeToggle');
    const toast = document.getElementById('toast');

    let toastTimer = null;
    let isDark = true;

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

    window.addEventListener('scroll', function() {
        if (backTop) {
            if (window.scrollY > 420) {
                backTop.classList.add('visible');
            } else {
                backTop.classList.remove('visible');
            }
        }
    });
    if (backTop) {
        backTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function setTheme(dark) {
        isDark = dark;
        document.body.classList.toggle('light', !dark);
        try {
            localStorage.setItem('blog-theme', dark ? 'dark' : 'light');
        } catch (e) { /* ignore */ }

        if (themeToggle) {
            const svg = dark ?
                '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>' :
                '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>';
            const label = dark ? '深色' : '浅色';
            themeToggle.innerHTML = svg + '<span id="themeLabel">' + label + '</span>';
        }
    }

    function initTheme() {
        let saved = 'dark';
        try {
            const stored = localStorage.getItem('blog-theme');
            if (stored === 'light' || stored === 'dark') {
                saved = stored;
            }
        } catch (e) { /* ignore */ }
        setTheme(saved === 'dark');
        console.log('当前主题:', saved);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            setTheme(!isDark);
            showToast(isDark ? '切换到深色模式' : '切换到浅色模式');
        });
    }

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function() {
            toast.classList.remove('show');
        }, 2200);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (drawer && drawer.classList.contains('open')) closeDrawer();
        }
    });

    initTheme();

    window.showToast = showToast;
    console.log('你好，简页！');
})();