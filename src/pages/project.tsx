import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import styles from "./project.module.css";

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
    name: "biu",
    description: "B站音乐播放器",
    language: "TypeScript",
    html_url: "https://github.com/wood3n/biu",
    topics: ["bilibili", "music player"],
  },
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
    color: "blue600",
  },
  { label: "React", icon: RiReactjsFill, color: "sky500" },
  { label: "Vue.js", icon: RiVuejsFill, color: "green500" },
  { label: "Node.js", icon: RiNodejsFill, color: "emerald600" },
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

  const headlineGradient = useMemo(() => styles.headlineGradient, []);

  const colorClassMap: Record<string, string> = {
    blue600: styles.iconBlue600,
    sky500: styles.iconSky500,
    green500: styles.iconGreen500,
    emerald600: styles.iconEmerald600,
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <Layout>
        <main className={styles.main}>
          {/* Header */}
          <section className={styles.section}>
            <div className={styles.headerRow}>
              <div className={styles.textContainer}>
                <h1 className={`${styles.headline} ${headlineGradient}`}>
                  前端开发工程师
                </h1>
                <p className={styles.subtitle}>
                  专注于 React/TypeScript
                  技术栈，热爱工程化与性能优化，持续维护开源项目。
                </p>
                <div className={styles.badgeRow}>
                  <span className={styles.badge}>可视化与交互</span>
                  <span className={styles.badge}>组件工程</span>
                  <span className={styles.badge}>测试与质量</span>
                  <span className={styles.badge}>性能优化</span>
                </div>
              </div>

              <img
                src="/img/avatar.png"
                alt="avatar"
                className={styles.avatar}
              />
            </div>
          </section>

          {/* Skills */}
          <section className={styles.section}>
            <div className={styles.sectionTitleRow}>
              <RiCodeSSlashLine
                className={`${styles.icon} ${styles.iconBrand}`}
              />
              <h2 className={styles.sectionTitle} style={{ margin: 0 }}>
                技能栈
              </h2>
            </div>
            <div className={styles.skillsGrid}>
              {skills.map(({ label, icon: Icon, color }) => (
                <div key={label} className={styles.skillCard}>
                  <Icon className={`${styles.icon} ${colorClassMap[color]}`} />
                  <span className={styles.skillLabel}>{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* GitHub Projects */}
          <section>
            <div className={styles.sectionTitleRow}>
              <RiGithubFill className={styles.icon} />
              <h2 className={styles.sectionTitle} style={{ margin: 0 }}>
                GitHub 开源项目
              </h2>
            </div>

            <div className={styles.projectsGrid}>
              {repos.map((repo, id) => (
                <article key={id} className={styles.projectCard}>
                  <div className={styles.projectCardBody}>
                    <div className={styles.projectTitleRow}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.projectLink}
                      >
                        {repo.name}
                        <RiExternalLinkLine className={styles.externalIcon} />
                      </a>
                    </div>

                    {repo.description && (
                      <p className={styles.projectDesc}>{repo.description}</p>
                    )}
                  </div>

                  <div className={styles.tagsRow}>
                    {repo.language && (
                      <span className={styles.badge}>{repo.language}</span>
                    )}
                    {(repo.topics || []).slice(0, 3).map((t) => (
                      <span key={t} className={styles.badge}>
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
