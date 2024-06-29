# firxworx.com - Astro Code Demo Starter Template

Project starter/template project for code examples related to articles and guides from https://firxworx.com.

This is a "blank slate" Astro project with a minimal layout and a few extras:

- React
- TailwindCSS

Refer to `tailwind.config.ts` and `tailwind.preset.ts` for customizations.

This repo is based on Astro's official `framework-react` template and bootstrapped using the following command:

```sh
pnpm create astro@latest --template framework-react --typescript=strictest --git --install ./PROJECT_NAME
```

## Prerequisites

The following environment is recommended to run this project:

- linux/unix environment (WSL2 is recommended for Windows users)
- pnpm package manager
- Node v20+ (see `.npmrc` for version config)

If you use VSCode consider adding the extensions listed in `.vscode/settings.json` to your workspace.

## Development

Run `pnpm install` to install dependencies.

Start the dev server:

```sh
pnpm dev
```

Astro's dev server runs at http://localhost:4321 by default.

Stop the dev server with CTRL/COMMAND + C.

