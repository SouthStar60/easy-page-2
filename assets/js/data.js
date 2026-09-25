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
            category: 'javascript',
            excerpt: {
                zh: '闭包是 JavaScript 最核心的概念之一，它让函数可以「记住」定义时的环境。本文从执行上下文、词法环境出发，逐步拆解闭包的工作机制，并结合实际场景分析内存泄漏与性能优化。',
                en: 'Closures are one of the most fundamental concepts in JavaScript, allowing functions to "remember" the environment in which they were defined. This article starts from execution context and lexical environment, gradually dissecting the working mechanism of closures, and analyzing memory leaks and performance optimization in real-world scenarios.'
            },
            cover: 'cover-grad-1',
            image: 'https://picsum.photos/seed/js/800/400',
            link: 'redirect.html'
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
        },
        {
            id: 3,
            title: {
                zh: 'Rust 异步编程：理解 Future 与 Tokio 运行时',
                en: 'Rust Async Programming: Understanding Future and Tokio Runtime'
            },
            pinned: false,
            date: '2026-08-10',
            updated: '2026-08-12',
            category: 'rust',
            excerpt: {
                zh: 'Rust 的异步模型基于 Future 和 Poll 机制，与 Tokio 运行时结合可以构建高并发系统。本文从底层原理讲起，逐步实现一个简单的异步运行时，并对比 async/await 语法糖。',
                en: 'Rust\'s async model is based on Future and Poll mechanisms. Combined with the Tokio runtime, it can build high-concurrency systems. This article starts from the underlying principles, gradually implements a simple async runtime, and compares the async/await syntax sugar.'
            },
            cover: 'cover-grad-3',
            image: 'https://picsum.photos/seed/rust/800/400',
            link: '/article/3.html'
        },
        {
            id: 4,
            title: {
                zh: '设计系统构建指南 — 从原子到页面',
                en: 'Design System Building Guide — From Atoms to Pages'
            },
            pinned: false,
            date: '2026-08-05',
            updated: '2026-08-07',
            category: '设计',
            excerpt: {
                zh: '设计系统是产品一致性的基石。本文分享如何从设计 token 出发，构建原子组件、组合模式，最终形成完整的页面模板，并探讨设计与工程之间的协作流程。',
                en: 'A design system is the cornerstone of product consistency. This article shares how to start from design tokens, build atomic components and composition patterns, and finally form complete page templates, while exploring the collaboration between design and engineering.'
            },
            cover: 'cover-grad-4',
            image: 'https://picsum.photos/seed/design/800/400',
            link: '/article/4.html'
        },
        {
            id: 5,
            title: {
                zh: 'Web 性能优化：从加载到交互的全链路分析',
                en: 'Web Performance Optimization: Full-Link Analysis from Loading to Interaction'
            },
            pinned: false,
            date: '2026-07-28',
            updated: '2026-07-30',
            category: '性能',
            excerpt: {
                zh: '性能是用户体验的核心指标。本文从网络请求、资源加载、渲染流水线、JavaScript 执行等维度，系统分析 Web 性能优化的关键节点，并给出可落地的优化策略。',
                en: 'Performance is a core metric of user experience. This article systematically analyzes the key nodes of Web performance optimization from dimensions such as network requests, resource loading, rendering pipeline, and JavaScript execution, and provides actionable optimization strategies.'
            },
            cover: 'cover-grad-5',
            image: 'https://picsum.photos/seed/perf/800/400',
            link: '/article/5.html'
        }
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
        },
        {
            id: 2,
            name: {
                zh: 'rust-toy-redis',
                en: 'rust-toy-redis'
            },
            description: {
                zh: '使用 Rust 实现的简易 Redis 服务器，支持基本 KV 操作和持久化，学习 Tokio 异步框架。',
                en: 'A simple Redis server implemented in Rust, supporting basic KV operations and persistence, learning the Tokio async framework.'
            },
            language: 'Rust',
            image: 'https://picsum.photos/seed/redis/800/400',
            link: 'https://github.com/your/repo'
        },
        {
            id: 3,
            name: {
                zh: 'design-system-starter',
                en: 'design-system-starter'
            },
            description: {
                zh: '基于 CSS Variables 和 Web Components 的设计系统脚手架，包含原子组件与文档生成。',
                en: 'Design system scaffold based on CSS Variables and Web Components, including atomic components and documentation generation.'
            },
            language: 'CSS',
            image: 'https://picsum.photos/seed/ds/800/400',
            link: 'https://github.com/your/repo'
        },
        {
            id: 4,
            name: {
                zh: 'go-microservice-template',
                en: 'go-microservice-template'
            },
            description: {
                zh: 'Go 微服务模板，集成 gRPC、Consul、Jaeger，提供可扩展的分层架构。',
                en: 'Go microservice template with gRPC, Consul, Jaeger, providing a scalable layered architecture.'
            },
            language: 'Go',
            image: 'https://picsum.photos/seed/go/800/400',
            link: 'https://github.com/your/repo'
        }
    ]
};