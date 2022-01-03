import React from "react";
import Layout from "@theme/Layout";
import GitHubIcon from "@site/static/img/github.svg";
import MailIcon from "@site/static/img/email.svg";
import LocationIcon from "@site/static/img/location.svg";
import CareerIcon from "@site/static/img/center_icon_frontend_n.svg";
import SkillIcon from "@site/static/img/skill_entity.svg";
import styles from "./styles.module.css";

export default () => {
  return (
    <Layout title="My Project">
      <div className={styles.container}>
        <div className={styles.personalCard}>
          <img
            alt="wood3n"
            src={require("@site/static/img/back.jpg").default}
            className={styles.backImg}
          />
          <div style={{ display: "inline-block", margin: "0 160px" }}>
            <img
              alt="wood3n"
              src={require("@site/static/img/avatar.png").default}
              className={styles.avatar}
            />
            <div className={styles.userInfo}>
              <a
                target="_blank"
                href="https://github.com/wood3n"
                className={styles.information}
              >
                <GitHubIcon />
                <span className={styles.username}>wood3n</span>
              </a>
              <div className={styles.information}>
                <CareerIcon />
                <span>Front End Engineer</span>
              </div>

              <div className={styles.information}>
                <MailIcon />
                <span>wangkka1@163.com</span>
              </div>
              <div className={styles.information}>
                <LocationIcon />
                <span>Hang zhou</span>
              </div>
            </div>
          </div>
          <div className={styles.skill} style={{ display: "inline-block" }}>
            <div className={styles.information}>
              <SkillIcon style={{ width: 30, height: 30 }} />
              <span>Personal Skills</span>
            </div>
            <div className={styles.skillCard}>
              <span>
                <img
                  height="20"
                  src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"
                />
              </span>
              <span>
                <img
                  height="20"
                  src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png"
                />
              </span>
              <span>
                <img
                  height="24"
                  src={require("@site/static/img/react.png").default}
                />
              </span>
              <span>
                <img
                  height="20"
                  src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png"
                />
              </span>
            </div>
            <div>
              <img
                src="https://camo.githubusercontent.com/794a9aa3668294549a87c7a3277b5b8f6d32632749dd02a3930e74d821fc07ef/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170692f746f702d6c616e67732f3f757365726e616d653d776f6f64336e266c61796f75743d636f6d70616374267468656d653d7261646963616c"
                alt="Top Langs"
                data-canonical-src="https://github-readme-stats.vercel.app/api/top-langs/?username=wood3n&amp;layout=compact&amp;"
              ></img>
            </div>
          </div>
        </div>
        <div className={styles.projectList}>
          <div className={styles.projectCard}>
            <div></div>
          </div>
          <div className={styles.projectCard}>
            <div></div>
          </div>
          <div className={styles.projectCard}></div>
        </div>
      </div>
    </Layout>
  );
};
