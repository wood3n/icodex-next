---
title: 前端常考面试题
slug: /interview/guides
description: '```mdx-code-block import DocCardList from ''@theme/DocCardList''; import {useCurrentSidebarCategory} from ''@docusaurus/theme-common'';    ```'
keywords: ["index"]
tags: ["index"]
---

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';


<DocCardList items={useCurrentSidebarCategory().items}/>
```
