import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";

import {
  RiGithubFill,
  RiReactjsFill,
  RiNodejsFill,
  RiExternalLinkLine,
  RiCodeSSlashLine,
  RiVuejsFill,
} from "@remixicon/react";

type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  topics?: string[];
};

const repos: Repo[] = [
  {
    name: "i18n-parser",
    description: "基于 babel 的 i18n 解析器，提取项目中的 i18n 资源",
    language: "TypeScript",
    html_url: "https://github.com/wood3n/i18n-parser",
    topics: ["i18n", "translation", "babel", "pnpm workspace"],
  },
  {
    name: "Microsoft To do Chrome Extension",
    description: "微软 To do 任务管理 Chrome 插件",
    language: "TypeScript",
    html_url: "https://github.com/wood3n/ms-todo-chrome-extension",
    topics: ["chrome extension", "task management", "Microsoft To do"],
  },
  {
    name: "Awesome Bookmark",
    description: "基于 rsbuild 与 shadcn-ui 的 Chrome 书签管理插件",
    language: "TypeScript",
    html_url: "https://github.com/wood3n/awesome-bookmark",
    topics: ["chrome extension", "bookmark management"],
  },
  {
    name: "fe-kit",
    description: "前端开发工具集 monorepo 模板项目",
    language: "TypeScript",
    html_url: "https://github.com/wood3n/fe-kit",
    topics: ["utils", "components", "turporepo", "pnpm workspace"],
  },
  {
    name: "rsbuild-shadcn-boilerplate",
    description: "基于 rsbuild 与 shadcn-ui 的 React 项目模板",
    language: "TypeScript",
    html_url: "https://github.com/wood3n/rsbuild-shadcn-boilerplate",
    topics: ["ui", "components", "shadcn-ui"],
  },
];

const skills = [
  {
    label: "TypeScript",
    icon: RiCodeSSlashLine as any,
    color: "text-blue-600",
  },
  { label: "React", icon: RiReactjsFill, color: "text-sky-500" },
  { label: "Vue.js", icon: RiVuejsFill, color: "text-green-500" },
  { label: "Node.js", icon: RiNodejsFill, color: "text-emerald-600" },
];

export default function ProjectPage() {
  // 监听 Docusaurus 暗色主题：html[data-theme="dark"] 或 theme-dark class
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const read = () =>
      html.getAttribute("data-theme") === "dark" ||
      html.classList.contains("theme-dark");
    setIsDark(read());
    const obs = new MutationObserver(() => setIsDark(read()));
    obs.observe(html, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    return () => obs.disconnect();
  }, []);

  const headlineGradient = useMemo(
    () =>
      "bg-gradient-to-r from-brand dark:from-brand-dark via-purple-500 to-pink-500 bg-clip-text text-transparent",
    []
  );

  return (
    <div className={isDark ? "dark" : ""}>
      <Layout>
        <main className="mx-auto max-w-6xl px-4 py-12">
          {/* Header */}
          <section className="mb-12">
            <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
              <div className="text-center md:text-left">
                <h1
                  className={`text-3xl font-extrabold md:text-4xl ${headlineGradient}`}
                >
                  前端开发工程师
                </h1>
                <p className="mt-3 text-neutral-700 dark:text-neutral-300">
                  专注于 React/TypeScript
                  技术栈，热爱工程化与性能优化，持续维护开源项目。
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  <span className="badge">可视化与交互</span>
                  <span className="badge">组件工程</span>
                  <span className="badge">测试与质量</span>
                  <span className="badge">性能优化</span>
                </div>
              </div>

              <img
                src="/img/avatar.png"
                alt="avatar"
                className="h-28 w-28 rounded-full border border-neutral-200 object-cover shadow-soft dark:border-neutral-700"
              />
            </div>
          </section>

          {/* Skills */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <RiCodeSSlashLine className="h-6 w-6 text-brand dark:text-brand-dark" />
              <h2
                className="text-xl mb-0 font-semibold text-neutral-900 dark:text-neutral-100"
                style={{ margin: 0 }}
              >
                技能栈
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {skills.map(({ label, icon: Icon, color }) => (
                <div
                  key={label}
                  className="card flex items-center gap-3 p-4 transition-colors hover:border-brand/50"
                >
                  <Icon className={`h-6 w-6 ${color}`} />
                  <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* GitHub Projects */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <RiGithubFill className="h-6 w-6 text-neutral-900 dark:text-neutral-100" />
              <h2
                className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
                style={{ margin: 0 }}
              >
                GitHub 开源项目
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {repos.map((repo, id) => (
                <article key={id} className="card p-5">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1 text-base font-semibold text-neutral-900 hover:text-brand dark:text-neutral-100 dark:hover:text-brand-dark"
                      >
                        {repo.name}
                        <RiExternalLinkLine className="h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" />
                      </a>
                    </div>

                    {repo.description && (
                      <p className="mt-2 line-clamp-3 text-sm text-neutral-700 dark:text-neutral-300">
                        {repo.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 justify-self-end">
                    {repo.language && (
                      <span className="badge">{repo.language}</span>
                    )}
                    {(repo.topics || []).slice(0, 3).map((t) => (
                      <span key={t} className="badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}
