# BlockBounties 🖥️

BlockBounties is a decentralized platform for secure, trustless agreements. Using attestations, smart contracts, and decentralized storage, it automates payments for any project needing escrow—from bug bounties to milestone-based collaborations. Trust made easy on-chain!


## Tech Stack

- **Blockchain**: Base
- **Smart Contracts**: Solidity, Foundry, Hardhat
- **Frontend**: TypeScript, Next.js, ethers.js
- **Decentralized Storage**: Tableland
- **Authentication**: Web3Auth
- **Attestations**: SignProtocol

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

Contracts

- Escrow: [0x5FbDB2315678afecb367f032d93F642f64180aa3](https://sepolia.basescan.org/address/0x5FbDB2315678afecb367f032d93F642f64180aa3)
- CommitmentHook: [0xA486118610CfAF9ca28d207F841062363C6AF804](https://sepolia.basescan.org/address/0xA486118610CfAF9ca28d207F841062363C6AF804)
- CompletionHook: [0xA486118610CfAF9ca28d207F841062363C6AF804](https://sepolia.basescan.org/address/0xA486118610CfAF9ca28d207F841062363C6AF804)