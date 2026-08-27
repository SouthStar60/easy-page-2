// language.js
const LANG = {
    'zh': {
        'nav.home': '主页',
        'nav.repo': '仓库',
        'nav.categories': '分类',
        'nav.about': '关于',
        'theme.dark': '深色',
        'theme.light': '浅色',
        // 已删除 'lang.zh' 和 'lang.en'
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
        'total_suffix': ' 篇）'
    },
    'en': {
        'nav.home': 'Home',
        'nav.repo': 'Repos',
        'nav.categories': 'Categories',
        'nav.about': 'About',
        'theme.dark': 'Dark',
        'theme.light': 'Light',
        // 已删除 'lang.zh' 和 'lang.en'
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
        'total_suffix': ' total)'
    }
};

// 分类名称翻译（可选）
const CATEGORY_NAMES = {
    'javascript': { zh: 'JavaScript', en: 'JavaScript' },
    'css': { zh: 'CSS', en: 'CSS' },
    'rust': { zh: 'Rust', en: 'Rust' },
    '设计': { zh: '设计', en: 'Design' },
    '性能': { zh: '性能', en: 'Performance' }
};

// 编程语言名称翻译（可选）
const LANGUAGE_NAMES = {
    'TypeScript': { zh: 'TypeScript', en: 'TypeScript' },
    'Rust': { zh: 'Rust', en: 'Rust' },
    'CSS': { zh: 'CSS', en: 'CSS' },
    'Go': { zh: 'Go', en: 'Go' }
};

// ---- 独立语言菜单配置 ----
// 只有在此列出的语言会出现在切换菜单中，名称使用该语言的自称
const LANG_MENU_ITEMS = {
    'zh': '中文',
    'en': 'English'
    // 如需添加更多语言，在此添加，例如：
    // 'ja': '日本語',
    // 'fr': 'Français'
};
// ---- 配置结束 ----

function getCurrentLang() {
    let lang = localStorage.getItem('blog-lang');
    if (lang && LANG[lang]) return lang;
    const browserLang = navigator.language || navigator.languages[0];
    const defaultLang = browserLang.startsWith('zh') ? 'zh' : 'en';
    localStorage.setItem('blog-lang', defaultLang);
    return defaultLang;
}

// 切换语言：保存 → 刷新 → 用 sessionStorage 标记变更
function setLanguage(lang) {
    if (!LANG[lang]) return;
    localStorage.setItem('blog-lang', lang);
    sessionStorage.setItem('lang-changed', 'true');
    location.reload();
}

// 应用语言：只更新 data-i18n 元素，不碰按钮和标题
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

// 显示提示（兼容 main.js 的 showToast）
function showLangToast(message) {
    if (typeof window.showToast === 'function') {
        window.showToast(message);
    } else {
        alert(message);
    }
}

// 初始化：获取语言、应用翻译、检测变更并显示提示
function initLanguage() {
    const lang = getCurrentLang();
    applyLanguage();

    const changed = sessionStorage.getItem('lang-changed');
    if (changed === 'true') {
        sessionStorage.removeItem('lang-changed');
        // 从独立菜单配置中获取语言名称
        const langName = LANG_MENU_ITEMS[lang] || lang.toUpperCase();
        // 统一只显示语言名称，简洁明了
        const msg = langName;
        setTimeout(function() {
            showLangToast(msg);
        }, 100);
    }
}

// 暴露全局
window.LANG = LANG;
window.CATEGORY_NAMES = CATEGORY_NAMES;
window.LANGUAGE_NAMES = LANGUAGE_NAMES;
window.LANG_MENU_ITEMS = LANG_MENU_ITEMS;
window.setLanguage = setLanguage;
window.getCurrentLang = getCurrentLang;
window.initLanguage = initLanguage;
window.applyLanguage = applyLanguage;