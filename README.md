# Proxy Cache

Simple CLI app for proxy cache.

## Features
- forward port to dummyjson
- clean cache

## Tech Stack

- TypeScript
- Node.js

## Project Structure

- `index.ts`: entry point
- `proxy-server`: server for proxy and caching



## Installation

```bash
git clone <your-repo-url>
cd caching-proxy
npm install
npm run build
```

## Run as CLI Command (`aching-proxy`)

```bash
npm link
caching-proxy --port 3000 --origin http://dummyjson.com
```

## Available Commands

```bash
caching-proxy --port 3000 --origin http://dummyjson.com
caching-proxy --clean-cache
```
## Development

```bash
npm run dev
```

## Formatting

```bash
npm run format
npm run format:check
```

project url: https://roadmap.sh/projects/github-user-activity
