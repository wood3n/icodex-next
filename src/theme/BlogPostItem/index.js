import React, { useEffect, useRef } from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import { useColorMode } from '@docusaurus/theme-common';
import { useBlogPost } from '@docusaurus/theme-common/internal'

export default function BlogPostItemWrapper(props) {
  const { isBlogPostPage } = useBlogPost();
  const { isDarkTheme } = useColorMode();
  const commentContainerRef = useRef();

  const injectScript = () => {
    const script = document.createElement("script");

    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "wood3n/icodex-next");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "comment");
    script.setAttribute("theme", isDarkTheme ? "github-dark" : "github-light");
    script.crossOrigin = "anonymous";
    script.async = true;    

    commentContainerRef.current.appendChild(script);
  }

  const changeCommentTheme = () => {
    const utterancesEl = commentContainerRef.current.querySelector("iframe.utterances-frame");

    if(utterancesEl) {
      utterancesEl.contentWindow.postMessage({
        type: "set-theme",
        theme: isDarkTheme ? "github-dark" : "github-light",
      }, "https://utteranc.es");
    }
  }

  useEffect(() => {
    isBlogPostPage && injectScript();
  }, [])

  useEffect(() => {
    isBlogPostPage && changeCommentTheme();
  }, [isDarkTheme])

  return (
    <>
      <BlogPostItem {...props} />
      {isBlogPostPage && <div ref={commentContainerRef}></div>}
    </>
  );
}
