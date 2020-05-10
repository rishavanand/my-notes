# Gatsby

- Framework based on React, GraphQL and NodeJS
- Make static + dynamic web apps
- Uses GraphQL for file system queries

* React Link alternative: import {Link} from 'gatsby-link'

## Frontmatter

```
---
path: "/post-one"
date: "2020-04-09"
title: "My First Gatsby Post"
author: "Rishav Anand"
---
```

## Plugins

1. gatsby-source-filesystem: needed for reading files from local system
2. gatsby-transformer-remark: transform md to html files
3. gatsby-plugin-catch-links: intercept markdown from markdown and other non react files and does client side push state to avoid browser having to refresh the page

## API files

1. gatsby-config.js: defines your site’s metadata, plugins, and other general configuration.
2. gatsby-mode.js: is run once in the process of building your site. You can use it to create pages dynamically, add nodes in GraphQL, or respond to events during the build lifecycle.
3. gatsby-browser.js: lets you respond to actions withing the browser and wrap your site in additional components.
4. gatsby-ssr.js: lets you alter the content of static HTML files as they are being Server-Side Rendered (SSR) by Gatsby and Node.js.
