// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");
const path = require("path");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "icodex",
  tagline: "frontend development cookbook",
  url: "https://icodex.me",
  baseUrl: "/",
  deploymentBranch: "gh-pages",
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
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        pages: {
          path: "src/pages",
          // 指定 pages 的路由路径，因为 blog 作为主页了
          routeBasePath: "/pages",
        },
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [math],
          rehypePlugins: [katex],
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
          blogSidebarCount: 20,
          blogSidebarTitle: "Recent posts",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "UA-153188913-1",
          anonymizeIP: true,
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      metadata: [
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
        theme: darkCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: "javascript",
      },
    },
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN"],
  },
};

module.exports = config;
