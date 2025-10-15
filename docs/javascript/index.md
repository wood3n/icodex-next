---
title: JavaScript
slug: /javascript/guides
description: 'mdx-code-block import DocCardList from ''@theme/DocCardList''; import {useCurrentSidebarCategory} from ''@docusaurus/theme-common'';'
keywords: ["index"]
tags: ["index"]
---

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';


<DocCardList items={useCurrentSidebarCategory().items}/>
```
