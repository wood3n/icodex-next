import React from "react";
import Layout from "@theme/Layout";
import GitHubIcon from "@site/static/img/github.svg";
import MailIcon from "@site/static/img/email.svg";
import styles from "./styles.module.css";

export default () => {
  return (
    <Layout>
      <h1 style={{ textAlign: "center", padding: "24px 0" }}>My Project</h1>
      <div style={{ width: "100%", height: "100%", padding: 100 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            columnGap: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", rowGap: 24 }}>
            <div style={{ position: "relative", left: 24, fontSize: "24px" }}>
              Hi, I am
            </div>
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
          <h1 style={{ textDecoration: "underline" }}>👨‍💻 My Skill</h1>
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
        ></div>
      </div>
    </Layout>
  );
};
