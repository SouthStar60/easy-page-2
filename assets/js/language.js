const LANG = {
    'zh': {
        'nav.home': '主页',
        'nav.repo': '仓库',
        'nav.categories': '分类',
        'nav.about': '关于',
        'theme.dark': '深色',
        'theme.light': '浅色',
        'redirect.jump_to': '继续前往 →',
        'redirect.jumping': '正在跳转…',
        'redirect.unsafe_protocol': '不支持的链接协议',
        'redirect.about_to_jump': '即将跳转到：',
        'redirect.missing_param': '缺少文章 ID 或跳转链接',
        'redirect.missing_param_hint': '请使用 ?id=数字 或 ?link=网址 访问',
        'redirect.invalid_id': 'ID 格式不正确',
        'redirect.invalid_id_hint': 'ID 必须为正整数，当前值：',
        'redirect.article_not_found_prefix': '未找到 ID 为 ',
        'redirect.article_not_found_suffix': ' 的文章',
        'redirect.no_link': '该文章没有配置跳转链接',
        'redirect.unsafe_link': '该文章配置的链接协议不安全',
        'redirect.card_renderer_missing': '卡片渲染器未加载',
        'theme.toast.dark': '已切换到深色模式',
        'theme.toast.light': '已切换到浅色模式',
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
        'pinned': '置顶',
        'show': '显示',
        'total_prefix': '（共 ',
        'total_suffix': ' 篇）',
        'contact': '联系',
    },
    'en': {
        'nav.home': 'Home',
        'nav.repo': 'Repos',
        'nav.categories': 'Categories',
        'nav.about': 'About',
        'theme.dark': 'Dark',
        'theme.light': 'Light',
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
        'pinned': 'Pinned',
        'show': 'Show',
        'total_prefix': ' (',
        'total_suffix': ' total)',
        'redirect.jump_to': 'Jump to →',
        'redirect.jumping': 'Jumping…',
        'redirect.unsafe_protocol': 'Unsupported link protocol',
        'redirect.about_to_jump': 'Redirecting to:',
        'redirect.missing_param': 'Missing article ID or redirect link',
        'redirect.missing_param_hint': 'Please use ?id=number or ?link=url',
        'redirect.invalid_id': 'Invalid ID format',
        'redirect.invalid_id_hint': 'ID must be a positive integer. Current value: ',
        'redirect.article_not_found_prefix': 'Article with ID ',
        'redirect.article_not_found_suffix': ' not found',
        'redirect.no_link': 'This article has no redirect link configured',
        'redirect.unsafe_link': 'The configured link protocol is unsafe',
        'redirect.card_renderer_missing': 'Card renderer not loaded',
        'theme.toast.dark': 'Switched to dark mode',
        'theme.toast.light': 'Switched to light mode',
        'contact': 'Contact',
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

const LANG_MENU_ITEMS = {
    'zh': '中文',
    'en': 'English'
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
    sessionStorage.setItem('lang-changed', 'true');
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

        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            el.textContent = text;
        }
    });
}

function showLangToast(message) {
    if (typeof window.showToast === 'function') {
        window.showToast(message);
    } else {
        alert(message);
    }
}

function initLanguage() {
    const lang = getCurrentLang();
    applyLanguage();

    const changed = sessionStorage.getItem('lang-changed');
    if (changed === 'true') {
        sessionStorage.removeItem('lang-changed');
        const langName = LANG_MENU_ITEMS[lang] || lang.toUpperCase();
        const msg = langName;
        setTimeout(function () {
            showLangToast(msg);
        }, 100);
    }
}

window.LANG = LANG;
window.CATEGORY_NAMES = CATEGORY_NAMES;
window.LANGUAGE_NAMES = LANGUAGE_NAMES;
window.LANG_MENU_ITEMS = LANG_MENU_ITEMS;
window.setLanguage = setLanguage;
window.getCurrentLang = getCurrentLang;
window.initLanguage = initLanguage;
window.applyLanguage = applyLanguage;