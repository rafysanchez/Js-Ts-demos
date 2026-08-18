# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Windows build note

On Windows, this project may require native optional dependencies from Vite's toolchain. If `npm install` finishes but `npm run build` fails with missing native binding errors, reinstalling or explicitly keeping these packages in `devDependencies` fixes the issue:

- `@rolldown/binding-win32-x64-msvc`
- `lightningcss-win32-x64-msvc`

They are included here so the build is reproducible on this machine.
