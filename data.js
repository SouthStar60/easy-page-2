// data.js
const BLOG_DATA = {
    articles: [
        {
            id: 1,
            title: {
                zh: '深入理解 JavaScript 闭包与作用域链',
                en: 'Deep Dive into JavaScript Closures and Scope Chains'
            },
            pinned: true,
            date: '2026-08-20',
            updated: '2026-08-22',
            category: 'javascript',  // 唯一标识，用于分组
            excerpt: {
                zh: '闭包是 JavaScript 最核心的概念之一，它让函数可以「记住」定义时的环境。本文从执行上下文、词法环境出发，逐步拆解闭包的工作机制，并结合实际场景分析内存泄漏与性能优化。',
                en: 'Closures are one of the most fundamental concepts in JavaScript, allowing functions to "remember" the environment in which they were defined. This article starts from execution context and lexical environment, gradually dissecting the working mechanism of closures, and analyzing memory leaks and performance optimization in real-world scenarios.'
            },
            cover: 'cover-grad-1',
            image: 'https://picsum.photos/seed/js/800/400',
            link: '/article/1.html'
        },
        {
            id: 2,
            title: {
                zh: 'CSS Grid 布局完全指南 — 从入门到精通',
                en: 'CSS Grid Layout Complete Guide — From Beginner to Master'
            },
            pinned: false,
            date: '2026-08-15',
            updated: '2026-08-18',
            category: 'css',
            excerpt: {
                zh: 'Grid 布局彻底改变了网页布局的方式。本文将系统讲解 Grid 的核心属性：网格容器、网格项、轨道尺寸、放置与对齐，并通过多个实战案例展示如何构建复杂响应式布局。',
                en: 'Grid layout has fundamentally changed the way we design web layouts. This article systematically explains the core properties of Grid: grid containers, grid items, track sizing, placement and alignment, and demonstrates how to build complex responsive layouts with practical examples.'
            },
            cover: 'cover-grad-2',
            image: 'https://picsum.photos/seed/css/800/400',
            link: '/article/2.html'
        }
        // ... 其他文章同理
    ],
    repos: [
        {
            id: 1,
            name: {
                zh: 'vue3-ts-admin',
                en: 'vue3-ts-admin'
            },
            description: {
                zh: '基于 Vue 3 + TypeScript + Vite 的后台管理模板，包含动态路由、权限控制、主题切换。',
                en: 'Vue 3 + TypeScript + Vite admin template with dynamic routing, permission control, and theme switching.'
            },
            language: 'TypeScript',
            image: 'https://picsum.photos/seed/vue/800/400',
            link: 'https://github.com/your/repo'
        }
        // ...
    ]
};