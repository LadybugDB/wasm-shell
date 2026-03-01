# LadybugDB WASM Shell

A browser/WebAssembly-based shell for [LadybugDB](https://github.com/ladybugdb/ladybugdb), an embedded graph database that runs entirely in the browser.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000/ in your browser.

## Development

The `dev` command automatically builds the WASM modules from `@ladybugdb/wasm-core` before starting the Vite dev server.

## Building

```bash
pnpm build
```

This builds both the WASM modules and the production bundle.
