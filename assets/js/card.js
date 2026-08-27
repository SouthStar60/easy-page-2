// card-renderer.js - 独立文章卡片渲染器
// 依赖：data.js (必须), language.js (可选，若不存在则用默认语言)

(function() {
    'use strict';

    // ---------- 核心渲染函数 ----------
    function renderArticleCardById(id, container) {
        if (!container) return;

        // 检查 BLOG_DATA 是否已加载
        if (typeof BLOG_DATA === 'undefined') {
            console.error('card-renderer: BLOG_DATA 未定义，请先引入 data.js');
            container.innerHTML = '<div style="color:red;">错误：数据未加载</div>';
            return;
        }

        var articles = BLOG_DATA.articles || [];
        var article = articles.find(function(a) { return a.id === Number(id); });

        // 获取当前语言（若 language.js 已加载）
        var lang = (typeof getCurrentLang === 'function') ? getCurrentLang() : 'zh';
        var langData = (typeof LANG !== 'undefined' && LANG[lang]) ? LANG[lang] : LANG['zh'];

        // 如果 language.js 未加载，使用默认中文
        if (!langData) {
            langData = {
                updated_prefix: '更新 ',
                pinned: '置顶',
                readmore: '阅读全文 →'
            };
        }

        var updatedPrefix = langData.updated_prefix || '更新 ';
        var pinnedText = langData.pinned || '置顶';
        var readmoreText = langData.readmore || '阅读全文 →';

        if (!article) {
            container.innerHTML = '<div style="text-align:center;padding:30px 0;color:var(--text-muted);">🔍 未找到 ID 为 ' + id + ' 的文章</div>';
            return;
        }

        // 提取标题和摘要（支持多语言对象）
        var title = (typeof article.title === 'object') ? (article.title[lang] || article.title.zh) : article.title;
        var excerpt = (typeof article.excerpt === 'object') ? (article.excerpt[lang] || article.excerpt.zh) : article.excerpt;
        var categoryDisplay = article.category;
        if (typeof CATEGORY_NAMES !== 'undefined' && CATEGORY_NAMES[article.category]) {
            categoryDisplay = CATEGORY_NAMES[article.category][lang] || CATEGORY_NAMES[article.category].zh;
        }

        var pinHtml = article.pinned ? '<span class="pin-icon">📌</span> ' : '';
        var dateHtml = article.updated ? updatedPrefix + article.updated : article.date;
        var coverClass = article.cover || '';
        var coverStyle = article.image ? 'background-image: url(' + article.image + '); background-size: cover; background-position: center;' : '';

        var cardHtml =
            '<a href="' + (article.link || '#') + '" class="article-card">' +
            '<div class="article-cover">' +
            '<div class="cover-img ' + coverClass + '" style="' + coverStyle + '"></div>' +
            (article.pinned ? '<span class="cover-tag top">' + pinnedText + '</span>' : '') +
            '<span class="cover-tag">' + article.category + '</span>' +
            '</div>' +
            '<div class="article-body">' +
            '<div class="article-title">' + pinHtml + title + '</div>' +
            '<div class="article-meta">' +
            '<span>' + article.date + '</span>' +
            '<span class="dot">·</span>' +
            '<span>' + dateHtml + '</span>' +
            '<span class="dot">·</span>' +
            '<span class="cat">' + categoryDisplay + '</span>' +
            '</div>' +
            '<div class="article-excerpt">' + excerpt + '</div>' +
            '<div class="article-footer"><span>' + readmoreText + '</span></div>' +
            '</div></a>';

        container.innerHTML = cardHtml;
    }

    // ---------- 自动渲染所有占位 ----------
    function renderAllPlaceholders() {
        var placeholders = document.querySelectorAll('.card-placeholder');
        placeholders.forEach(function(el) {
            var id = el.getAttribute('data-id');
            if (id) {
                renderArticleCardById(id, el);
            }
        });
    }

    // ---------- 在 DOM 准备好后执行 ----------
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAllPlaceholders);
    } else {
        // DOM 已就绪，直接执行
        renderAllPlaceholders();
    }

    // ---------- 监听语言切换事件（由 language.js 触发） ----------
    window.addEventListener('languageChanged', function() {
        // 重新渲染所有占位
        renderAllPlaceholders();
    });

    // ---------- 暴露渲染函数供外部调用 ----------
    window.renderArticleCardById = renderArticleCardById;
    window.renderAllPlaceholders = renderAllPlaceholders;

})();