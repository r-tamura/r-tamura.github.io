# Blog

https://rtam.xyz

## Stack

- SSG: GatsbyJS v3
- Hosting: GitHub Pages
- CDN: Cloudflare
- CI: CircleCI

## Todos

### Required

- [x] Deploy Gatsby version
- [x] Deploy via CircleCI
- [x] Set up Custom domain name
- [x] Set up Cloudflare
- [x] HTTPS
- [x] Service Worker
- [x] manifest.json (Add To Home Screen)
- [x] Migrate Gatsby v0 to v1
- [ ] Test articles with textlint
- [ ] schema.org (JSON-LD)
- [ ] About me page
- [ ] Tag filter
- [ ] Monthly and Yearly article count

### Optional

- [ ] Introduce markdown lint tool
- [ ] Customize Theme
- [ ] Check page speed
- [x] RSS Feed
- [ ] Push Notification
- [x] OGP
- [x] Circle CI 2.0

## Installation

```sh
git clone https://github.com/r-tamura/r-tamura.github.io.git
yarn install
```

## Create a post

```sh
yarn create-post
```

## Scripts

```sh
// Generate HTML for publish
yarn run build

// Clean publish directory
yarn run clean

// Run dev server(http://localhost:8000/)
yarn dev

// Deploy
yarn run deploy

// Docker run
docker-compose up -d

// Stop container
docker-compose down
```
