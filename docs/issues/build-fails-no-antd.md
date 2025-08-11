# Build failure: missing Ant Design dependency

## Summary
`npm run build` failed because Vite could not resolve imports from the `antd` package.

## Steps to Reproduce
1. Clone repository
2. Run `npm run build`

## Actual Behavior
Build stops with errors like:
```
[vite]: Rollup failed to resolve import "antd/dist/reset.css" ...
```

## Expected Behavior
Project builds successfully.

## Notes
The repository lacked the `antd` package. A local stub and Vite alias are now used so the project builds without external downloads.
