// language.js
const LANG = {
    'zh': {
        'nav.home': '主页',
        'nav.repo': '仓库',
        'nav.categories': '分类',
        'nav.about': '关于',
        'theme.dark': '深色',
        'theme.light': '浅色',
        'lang.zh': '中文',
        'lang.en': 'English',
        'readmore': '阅读全文 →',
        'view': '查看 →',
        'articles': '文章',
        'categories': '分类',
        'repos': '仓库',
        'about': '关于',
        'badge': '标签',
        'search_placeholder': '搜索文章标题或简介…',
        'filter_all': '全部',
        'no_result': '没有找到匹配的文章',
        'footer_text': '时间 {site} — 用 ❤️ 构建',
        'site_name': '简页'
    },
    'en': {
        'nav.home': 'Home',
        'nav.repo': 'Repos',
        'nav.categories': 'Categories',
        'nav.about': 'About',
        'theme.dark': 'Dark',
        'theme.light': 'Light',
        'lang.zh': 'Chinese',
        'lang.en': 'English',
        'readmore': 'Read More →',
        'view': 'View →',
        'articles': 'Articles',
        'categories': 'Categories',
        'repos': 'Repositories',
        'about': 'About',
        'badge': 'Tag',
        'search_placeholder': 'Search article title or excerpt…',
        'filter_all': 'All',
        'no_result': 'No matching articles found',
        'footer_text': '{site} — Built with ❤️',
        'site_name': 'Jianye'
    }
};

let currentLang = 'zh';

function setLanguage(lang) {
    if (!LANG[lang]) return;
    currentLang = lang;
    localStorage.setItem('blog-lang', lang);
    applyLanguage();
    // 更新语言按钮显示（可选）
    const langLabel = document.querySelector('.lang-btn-header .lang-label');
    if (langLabel) langLabel.textContent = lang === 'zh' ? '中' : 'EN';
}

function getCurrentLang() {
    return currentLang;
}

function applyLanguage() {
    const langData = LANG[currentLang];
    if (!langData) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        let text = langData[key];
        if (text === undefined) return;
        // 支持模板变量 {site}
        text = text.replace(/\{site\}/g, langData.site_name || 'Jianye');
        el.textContent = text;
    });
    // 更新页面 title
    const titleEl = document.querySelector('title');
    if (titleEl) {
        const siteName = langData.site_name || 'Jianye';
        const pageKey = document.body.dataset.page || 'home';
        const pageMap = {
            'home': langData.nav.home || 'Home',
            'repo': langData.nav.repo || 'Repos',
            'categories': langData.nav.categories || 'Categories',
            'about': langData.nav.about || 'About'
        };
        const pageName = pageMap[pageKey] || '';
        titleEl.textContent = pageName ? `${siteName} - ${pageName}` : siteName;
    }
}

function initLanguage() {
    let saved = localStorage.getItem('blog-lang');
    if (saved && LANG[saved]) {
        currentLang = saved;
    } else {
        const browserLang = navigator.language || navigator.languages[0];
        currentLang = browserLang.startsWith('zh') ? 'zh' : 'en';
        localStorage.setItem('blog-lang', currentLang);
    }
    applyLanguage();
    // 更新语言按钮显示
    const langLabel = document.querySelector('.lang-btn-header .lang-label');
    if (langLabel) langLabel.textContent = currentLang === 'zh' ? '中' : 'EN';
}

// 暴露全局
window.LANG = LANG;
window.setLanguage = setLanguage;
window.getCurrentLang = getCurrentLang;
window.initLanguage = initLanguage;