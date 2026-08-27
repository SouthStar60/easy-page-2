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
        'site_name': '简页',
        'updated_prefix': '更新 ',
        'pinned': '置顶'
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
        'site_name': 'Jianye',
        'updated_prefix': 'Updated ',
        'pinned': 'Pinned'
    }
};

const CATEGORY_NAMES = {
    'javascript': { zh: 'JavaScript', en: 'JavaScript' },
    'css': { zh: 'CSS', en: 'CSS' },
    'rust': { zh: 'Rust', en: 'Rust' },
    '设计': { zh: '设计', en: 'Design' },
    '性能': { zh: '性能', en: 'Performance' }
};

const LANGUAGE_NAMES = {
    'TypeScript': { zh: 'TypeScript', en: 'TypeScript' },
    'Rust': { zh: 'Rust', en: 'Rust' },
    'CSS': { zh: 'CSS', en: 'CSS' },
    'Go': { zh: 'Go', en: 'Go' }
};

function getCurrentLang() {
    let lang = localStorage.getItem('blog-lang');
    if (lang && LANG[lang]) return lang;
    const browserLang = navigator.language || navigator.languages[0];
    const defaultLang = browserLang.startsWith('zh') ? 'zh' : 'en';
    localStorage.setItem('blog-lang', defaultLang);
    return defaultLang;
}

function setLanguage(lang) {
    if (!LANG[lang]) return;
    localStorage.setItem('blog-lang', lang);
    // 可选：快速更新按钮文本，但刷新后会重置，保留也无妨
    const langLabel = document.querySelector('.lang-btn-header .lang-label');
    if (langLabel) langLabel.textContent = lang === 'zh' ? '中' : 'EN';
    // 刷新页面，使所有内容重新加载并应用新语言
    location.reload();
}

function applyLanguage() {
    const lang = getCurrentLang();
    const langData = LANG[lang];
    if (!langData) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        let text = langData[key];
        if (text === undefined) return;
        text = text.replace(/\{site\}/g, langData.site_name || 'Jianye');
        el.textContent = text;
    });
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
    getCurrentLang();
    applyLanguage();
    const lang = getCurrentLang();
    const langLabel = document.querySelector('.lang-btn-header .lang-label');
    if (langLabel) langLabel.textContent = lang === 'zh' ? '中' : 'EN';
}

window.LANG = LANG;
window.CATEGORY_NAMES = CATEGORY_NAMES;
window.LANGUAGE_NAMES = LANGUAGE_NAMES;
window.setLanguage = setLanguage;
window.getCurrentLang = getCurrentLang;
window.initLanguage = initLanguage;
window.applyLanguage = applyLanguage;