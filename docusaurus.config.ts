import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

import path from "node:path";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const config: Config = {
  title: "icodex | 前端技术博客 | 专注 React、TypeScript、AI 与性能优化",
  tagline: "前端不止于界面，更是用户体验的艺术",
  url: "https://icodex.me",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "wood3n",
  projectName: "icodex-next",
  plugins: [
    "@docusaurus/theme-live-codeblock",
    path.resolve(__dirname, "./src/plugins/webpackConfig.js"),
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        pages: {
          path: "src/pages",
          // 指定 pages 的路由路径，因为 blog 作为主页了
          routeBasePath: "/pages",
        },
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, { strict: true, throwOnError: true }]],
          editUrl: ({ docPath }) => {
            return `https://github.com/wood3n/icodex-next/tree/master/docs/${docPath}`;
          },
        },
        blog: {
          // blog作为主页
          routeBasePath: "/",
          path: "./blog",
          showReadingTime: true,
          readingTime: ({ content, defaultReadingTime }) =>
            defaultReadingTime({ content, options: { wordsPerMinute: 100 } }),
          blogTitle: "前端技术博客 | 专注 React、TypeScript、AI 与性能优化",
          blogDescription:
            "一个专注于前端开发的技术博客，系统记录与分享 JavaScript、React、Vue、TypeScript 等框架与语言的学习与实践经验。从性能优化、工程化到前端架构设计，涵盖现代 Web 开发中的核心问题与最佳实践。无论你是刚入门的新手，还是追求进阶的工程师，都能在这里找到有价值的文章与灵感。",
          blogSidebarCount: 20,
          blogSidebarTitle: "Recent posts",
          feedOptions: {
            type: "all",
            copyright: `Copyright © ${new Date().getFullYear()} icodex`,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
              return defaultCreateFeedItems({
                // keep only the 20 most recent blog posts in the feed
                blogPosts: blogPosts.filter((_, index) => index < 20),
                ...rest,
              });
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "UA-153188913-1",
          anonymizeIP: true,
        },
      },
    ],
  ],
  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    metadata: [
      {
        name: "description",
        content:
          "探索前端性能优化、React 源码剖析与实战技巧，通过实用案例和代码演示，助你打造高效、优雅的现代 Web 应用。立即阅读，提升开发技能！",
      },
      {
        name: "keywords",
        content:
          "frontend, react, javascript, css, react, vue, typescript, docusaurus, blog, personal blog, personal website",
      },
    ],
    // 开启 algolia
    algolia: {
      // If Algolia did not provide you any appId, use 'BH4D9OD16A'
      appId: "GMKEEJO8X4",

      // Public API key: it is safe to commit it
      apiKey: "0ccd259970e3e65b1df2f83c4ddd3e8b",

      indexName: "icodex",
    },
    navbar: {
      title: "icodex",
      hideOnScroll: true,
      logo: {
        alt: "icodex",
        src: "img/logo.png",
      },
      items: [
        {
          type: "search",
          position: "right",
        },
        { to: "/pages/project", label: "My Project", position: "right" },
        {
          type: "dropdown",
          label: "Skill",
          position: "right",
          items: [
            {
              type: "doc",
              label: "JavaScript",
              docId: "javascript/index",
            },
            {
              type: "doc",
              label: "CSS",
              docId: "css/index",
            },
            {
              // type: "doc",
              label: "TypeScript",
              to: "docs/typescript",
            },
            {
              type: "doc",
              label: "React",
              docId: "react/index",
            },
            {
              type: "doc",
              label: "NodeJS",
              docId: "nodejs/awesome-nodejs",
            },
            // {
            //   type: "doc",
            //   label: "Engineer",
            //   docId: "engineer/index",
            // },
          ],
        },
        {
          type: "dropdown",
          label: "Learn",
          position: "right",
          items: [
            {
              type: "doc",
              label: "Network",
              docId: "network/index",
            },
            {
              type: "doc",
              label: "Algorithm",
              docId: "algorithm/算法分析",
            },
            {
              type: "doc",
              label: "Interview",
              docId: "interview/index",
            },
          ],
        },
        {
          type: "doc",
          label: "Engineer",
          position: "right",
          docId: "engineer/index",
        },
        {
          type: "doc",
          label: "Tool",
          position: "right",
          docId: "tools/git",
        },
        {
          href: "https://icodex.me/rss.xml",
          position: "right",
          className: "header-feed-link",
          "aria-label": "RSS link",
        },
        {
          href: "https://github.com/wood3n/icodex-next",
          position: "right",
          // custom logo in custom.css
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    liveCodeBlock: {
      /**
       * The position of the live playground, above or under the editor
       * Possible values: "top" | "bottom"
       */
      playgroundPosition: "bottom",
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
      defaultLanguage: "javascript",
    },
  },
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN"],
  },
};

module.exports = config;
