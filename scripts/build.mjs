// Builds the tree the deploy ships (dist/): the app source with the emitted
// contract, the static files the app reads at run time, and the service
// declaration the app imports at boot. The layout mirrors the repository
// root, so relative paths such as ../public and ../service.mjs keep
// resolving inside the build output.
import { cpSync, mkdirSync, rmSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
cpSync('src', 'dist/src', { recursive: true });
cpSync('public', 'dist/public', { recursive: true });
cpSync('service.mjs', 'dist/service.mjs');
