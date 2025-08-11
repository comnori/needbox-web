# NeedBox Web

NeedBox Web is a client-side tool that collects software requirements through a 6W (What/Why/Who/Where/When/How) form and displays live examples and description previews.

## Live

https://comnori.github.io/needbox-web/

## Features

- Responsive two-pane layout with a form on the left and an examples carousel with preview on the right
- Field validation with clear messages
- One-click copy for the rendered description or JSON payload
- Automated GitHub Pages deployment via GitHub Actions

## Getting Started

### Development

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173 by default.

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

## Deployment

Pushing to the `main` branch triggers a workflow that builds the project and publishes the `dist` folder to GitHub Pages.

## Project Structure

- `src/` – application source code
- `src/data/examples.ts` – sample 6W payloads used in the carousel
- `src/lib/` – utilities for description rendering, validation, and clipboard
- `src/__tests__/` – lightweight tests using Vitest

## License

MIT

![screenshot](docs/screenshot.png)
