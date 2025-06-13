# callix-sdk-examples

## Getting Started

This repository contains example applications that use the Callix SDK. Before running any example, you must configure the required environment variables and authentication tokens.

---

## 1. Configure Environment Variables

Each example app may require specific environment variables. For the Next.js demo app, copy the provided `.env.template` to `.env` and fill in the required values:

```bash
cp apps/demo-next-app/.env.template apps/demo-next-app/.env
```

Edit `apps/demo-next-app/.env` and set the following variables:

- `NEXT_PUBLIC_CALLIX_DOMAIN` – Your Callix domain (e.g., `api.callix.com`)
- `CALLIX_API_KEY` – Your Callix API key
- `CALLIX_USERNAME` – Your Callix username

---

## 2. Configure npm Authentication

This repository uses private npm packages from the `@callixbrasil` scope. You must provide an authentication token for the npm registry.

- The `.npmrc` file expects the environment variable `CALLIX_SDK_TOKEN` to be set with your GitHub Package Registry token.

**Export your token before installing dependencies:**

```bash
export CALLIX_SDK_TOKEN=your_github_package_token
```

Replace `your_github_package_token` with your actual token.

---

## 3. Install Dependencies

After setting up your environment variables and authentication token, install dependencies:

```bash
pnpm install
```

---

## 4. Run the Example

Navigate to the desired example app directory and start the application as instructed in its README or with:

```bash
pnpm run dev
```

## 5. SDK Documentation

For detailed information about the Callix SDK API and available features, refer to the documentation located in your project at:

You can open these files in your browser or text editor to explore the SDK capabilities, method references, and implementation examples.

```bash
apps/demo-next-app/node_modules/@callixbrasil/client-sdk/docs/README.pt-BR.md
```


---

## Troubleshooting

- Ensure all required environment variables are set in your `.env` file.
- Make sure you have exported the `CALLIX_SDK_TOKEN` token in your shell before running `npm install`.
- If you encounter authentication errors with npm, double-check your token and `.npmrc` configuration.

---

For more information, refer to the documentation of each example app or contact the Callix support team.

