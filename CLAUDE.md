# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NeedBox Web is a Korean-language requirements gathering tool that uses the 6W methodology (What/Why/Who/Where/When/How) to help users document business requirements. It's a React-based single-page application with real-time validation and preview capabilities.

## Essential Commands

```bash
# Development
npm run dev          # Start development server at http://localhost:5173
npm test            # Run Vitest test suite
npm run build       # Build for production to dist/
npm run preview     # Preview production build locally
```

## Architecture Overview

### Core Application Flow
1. **App.tsx** manages all application state and passes data down to components
2. **SixWForm.tsx** handles form input with real-time validation
3. **Preview.tsx** renders live description based on form data
4. **RightPane.tsx** coordinates examples carousel and preview display

### Key Technical Decisions

**Ant Design Stubbing**: The project uses custom lightweight stubs (`src/antd-stubs.tsx`) instead of the full Ant Design library. When modifying UI components, maintain compatibility with these stubs rather than importing from 'antd' directly.

**State Management**: All state is managed in App.tsx using React hooks. There's no Redux or external state management - use prop drilling for passing data to components.

**Validation Logic**: Form validation (`lib/validation.ts`) enforces Korean business rules:
- Effect field must contain one of: "시간", "비용", "오류", "만족도"
- Date format: YYYY-MM-DD
- All fields have specific length requirements

### Component Patterns

- All components are functional with TypeScript interfaces for props
- Use the `SixWData` interface for form data structure
- Custom hooks like `useClipboard` handle reusable logic
- Components in `components/` folder handle UI, utilities in `lib/` handle business logic

### Testing Approach

Tests use Vitest with @testing-library/react. When adding features:
- Test utilities in `lib/` with unit tests
- Test component interactions with integration tests in `__tests__/`
- Run tests with `npm test`

### Deployment

The app auto-deploys to GitHub Pages when pushing to main branch. The base path is configured for `/needbox-web/` in vite.config.ts.

## Important Conventions

**Korean Content**: All user-facing text is in Korean. Maintain Korean language for UI strings, examples, and validation messages.

**Description Rendering**: The `lib/description.ts` module handles converting form data to Korean description text. Any changes to output format should be made here.

**Example Data**: Sample data in `data/examples.ts` demonstrates proper 6W format. New examples should follow the same structure and include all required fields.

**Copy Functionality**: The app provides two copy formats - description text and JSON payload. Both use the `useClipboard` hook and should maintain consistent behavior.