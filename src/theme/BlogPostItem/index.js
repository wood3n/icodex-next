import React, { useEffect, useRef } from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import { useColorMode } from "@docusaurus/theme-common";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import Giscus from "@giscus/react";

export default function BlogPostItemWrapper(props) {
  const { isBlogPostPage } = useBlogPost();
  const { colorMode } = useColorMode();

  return (
    <>
      <BlogPostItem {...props} />
      {isBlogPostPage && (
        <div style={{ marginTop: 24 }}>
          <Giscus
            id="comments"
            repo="wood3n/icodex-next"
            repoId="R_kgDOGmTCog"
            category="Q&A"
            categoryId="DIC_kwDOGmTCos4CRMD5"
            mapping="pathname"
            term="请留言"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={colorMode === "dark" ? "dark" : "light"}
            lang="zh-CN"
            loading="lazy"
          />
        </div>
      )}
    </>
  );
}
