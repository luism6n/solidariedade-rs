# App da Campanha Popular de Solidariedade do Rio Grande do Sul

Endereço: [solidariedade-rs.org](https://solidariedade-rs.org).

## About the code

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

We're using [asdf](https://asdf-vm.com/guide/getting-started.html) to manage our node version. If you don't use asdf, you can install the node version specified in `.tool-versions` manually.

### Local deployment

```bash
npm install
npm run dev
```

### Production deployment

```bash
npm install --omit=dev
npm run build
npm start
```

### General info

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

We use [next-pwa](https://www.npmjs.com/package/next-pwa) to work offline using Service Workers.

We use tailwind for styling: https://nerdcave.com/tailwind-cheat-sheet

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
