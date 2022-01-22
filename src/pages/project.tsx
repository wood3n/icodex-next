import React from "react";
import Layout from "@theme/Layout";
import GitHubIcon from "@site/static/img/github.svg";
import MailIcon from "@site/static/img/email.svg";
import styles from "./styles.module.css";

export default () => {
  return (
    <Layout title="My Project">
      <div style={{ width: "100%", height: "100%", padding: 100 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            columnGap: 24,
          }}
        >
          <img
            src={require("@site/static/img/happycode.gif").default}
            style={{
              flex: "0 0 auto",
              borderRadius: 8,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", rowGap: 24 }}>
            <div style={{ position: "relative", left: 24, fontSize: "24px" }}>
              Hi, I am
            </div>
            <img src={require("@site/static/img/sign.png").default} />
            <div style={{ position: "relative", left: 24, fontSize: "24px" }}>
              A front end engineer.
            </div>
            <div
              style={{
                position: "relative",
                left: 24,
                display: "flex",
                columnGap: 24,
              }}
            >
              <a
                target="_blank"
                href="https://github.com/wood3n"
                className={styles.linkIcon}
              >
                <GitHubIcon style={{ width: 24, height: 24 }} />
              </a>
              <a
                target="_blank"
                href="mailto:wangkka1@163.com"
                className={styles.linkIcon}
              >
                <MailIcon style={{ width: 24, height: 24 }} />
              </a>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 80,
          }}
        >
          <h1 style={{ textDecoration: "underline" }}>My Skill</h1>
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            columnGap: 24,
            marginTop: 80,
          }}
        >
          <img
            src={require("@site/static/img/typescript.png").default}
            style={{ height: 100 }}
          />
          <img
            src={require("@site/static/img/react.png").default}
            style={{ height: 100 }}
          />
          <img
            src={require("@site/static/img/vue.png").default}
            style={{ height: 100 }}
          />
          <img
            src={require("@site/static/img/nodejs.png").default}
            style={{ height: 100 }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 80,
          }}
        >
          <h1 style={{ textDecoration: "underline" }}>My Project</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: 48,
            marginTop: 80,
          }}
        >
          <div className={styles.projectCard}>
            <div>
              <h2>sweet-i18n</h2>
              <div>
                根据解析 AST 方案，利用 babel 和 @vue/compiler-sfc 一键提取 vue
                sfc 中的中文文案，并转换为对应的 vue-i18n
                的函数，同时生成对应的文案配置 json 文件。
                真正做到了国际化处理的全自动解决方案。项目地址：——
                <a target="_blank" href="https://github.com/wood3n/tvt">
                  sweet-i18n
                </a>
              </div>
            </div>
            <img src={require("@site/static/img/i18n-en.png").default} />
          </div>
          <div className={styles.projectCard}>
            <div>
              <h2>node-ts-boilerplate</h2>
              <div>
                Nodejs 命令行工具开发模板，使用 esbuild 编译，开发环境可基于
                vscode 和 ts-node 进行调试。项目地址：——
                <a target="_blank" href="https://github.com/wood3n/node-ts-cli">
                  node-ts-boilerplate
                </a>
              </div>
            </div>
            <img src={require("@site/static/img/nodejs.png").default} />
          </div>
          <div className={styles.projectCard}>
            <div>
              <h2>promise-aplus</h2>
              <div>
                基于 ES6 class 实现的 promise A+
                规范，可通过所有所有官方测试用例。项目地址：——
                <a
                  target="_blank"
                  href="https://github.com/wood3n/promise-aplus"
                >
                  promise-aplus
                </a>
              </div>
            </div>
            <img src={require("@site/static/img/a-plus.png").default} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
