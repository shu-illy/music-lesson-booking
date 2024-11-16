This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Migration

- 開発環境:
  - schemaの差分からマイグレーションファイルの生成: `pnpm db:generate`
  - マイグレーションの実行: `pnpm db:migrate`
  - スキーマ変更の直接適用: `pnpm db:push`
  - データベース管理: `pnpm db:studio`

- 本番環境
  - マイグレーションの適用: `pnpm db:apply:prd`
